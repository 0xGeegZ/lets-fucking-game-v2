// SPDX-License-Identifier: MIT

/**
  The Cron contract is a chainlink keepers-powered cron job runner for smart contracts.
  The contract enables developers to trigger actions on various targets using cron
  strings to specify the cadence. For example, a user may have 3 tasks that require
  regular service in their dapp ecosystem:
    1) 0xAB..CD, update(1), "0 0 * * *"     --> runs update(1) on 0xAB..CD daily at midnight
    2) 0xAB..CD, update(2), "30 12 * * 0-4" --> runs update(2) on 0xAB..CD weekdays at 12:30
    3) 0x12..34, trigger(), "0 * * * *"     --> runs trigger() on 0x12..34 hourly

  To use this contract, a user first deploys this contract and registers it on the chainlink
  keeper registry. Then the user adds cron jobs by following these steps:
    1) Convert a cron string to an encoded cron spec by calling encodeCronString()
    2) Take the encoding, target, and handler, and create a job by sending a tx to createCronJob()
    3) Cron job is running :)
*/

pragma solidity >=0.8.6;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "@chainlink/contracts/src/v0.8/KeeperBase.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

import { Cron as CronInternal, Spec } from "@chainlink/contracts/src/v0.8/libraries/internal/Cron.sol";
import { Cron as CronExternal } from "@chainlink/contracts/src/v0.8/libraries/external/Cron.sol";

import { getRevertMsg } from "@chainlink/contracts/src/v0.8/utils/utils.sol";

import { ICronUpkeep } from "../interfaces/ICronUpkeep.sol";

/**
 * @title The CronUpkeep contract
 * @notice A keeper-compatible contract that runs various tasks on cron schedules.
 * Users must use the encodeCronString() function to encode their cron jobs before
 * setting them. This keeps all the string manipulation off chain and reduces gas costs.
 */
contract CronUpkeep is ICronUpkeep, KeeperCompatibleInterface, KeeperBase, ConfirmedOwner, Pausable {
    using EnumerableSet for EnumerableSet.UintSet;

    using CronInternal for Spec;

    uint256 public immutable s_maxJobs;
    address[] s_delegators;

    uint256 private s_nextCronJobID = 1;
    EnumerableSet.UintSet private s_activeCronJobIDs;

    mapping(uint256 => uint256) private s_lastRuns;
    mapping(uint256 => Spec) private s_specs;
    mapping(uint256 => address) private s_targets;
    mapping(uint256 => bytes) private s_handlers;
    mapping(uint256 => bytes32) private s__handlerSignatures;

    ///
    /// CONSTRUCTOR
    ///

    /**
     * @param owner the initial owner of the contract
     * @param maxJobs the max number of cron jobs this contract will support
     * @param firstJob an optional encoding of the first cron job
     */
    constructor(address owner, uint256 maxJobs, bytes memory firstJob) ConfirmedOwner(owner) {
        s_maxJobs = maxJobs;
        if (firstJob.length > 0) {
            (address target, bytes memory handler, Spec memory spec) = abi.decode(firstJob, (address, bytes, Spec));
            _createCronJobFromSpec(target, handler, spec);
        }
    }

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Executes the cron job with id encoded in performData
     * @param performData abi encoding of cron job ID and the cron job's next run-at datetime
     */
    function performUpkeep(bytes calldata performData) external override whenNotPaused {
        (uint256 id, uint256 tickTime, address target, bytes memory handler) = abi.decode(
            performData,
            (uint256, uint256, address, bytes)
        );

        _validate(id, tickTime, target, handler);
        s_lastRuns[id] = block.timestamp;

        (bool success, bytes memory payload) = target.call(handler);

        if (!success) revert CallFailed(id, getRevertMsg(payload));
        emit CronJobExecuted(id, block.timestamp);
    }

    /**
     * @notice Creates a cron job from the given encoded spec
     * @param target the destination contract of a cron job
     * @param handler the function signature on the target contract to call
     * @param encodedCronSpec abi encoding of a cron spec
     */
    function createCronJobFromEncodedSpec(
        address target,
        bytes memory handler,
        bytes memory encodedCronSpec
    ) external override onlyOwnerOrDelegator {
        if (s_activeCronJobIDs.length() >= s_maxJobs) {
            revert ExceedsMaxJobs();
        }
        Spec memory spec = abi.decode(encodedCronSpec, (Spec));
        _createCronJobFromSpec(target, handler, spec);
    }

    /**
     * @notice Updates a cron job from the given encoded spec
     * @param id the id of the cron job to update
     * @param newTarget the destination contract of a cron job
     * @param newHandler the function signature on the target contract to call
     * @param newEncodedCronSpec abi encoding of a cron spec
     */
    function updateCronJob(
        uint256 id,
        address newTarget,
        bytes memory newHandler,
        bytes memory newEncodedCronSpec
    ) external override onlyOwnerOrDelegator onlyValidCronID(id) {
        Spec memory newSpec = abi.decode(newEncodedCronSpec, (Spec));
        s_targets[id] = newTarget;
        s_handlers[id] = newHandler;
        s_specs[id] = newSpec;
        s__handlerSignatures[id] = _handlerSig(newTarget, newHandler);
        emit CronJobUpdated(id, newTarget, newHandler);
    }

    /**
     * @notice Deletes the cron job matching the provided id. Reverts if
     * the id is not found.
     * @param id the id of the cron job to delete
     */
    function deleteCronJob(uint256 id) external override onlyOwnerOrDelegator onlyValidCronID(id) {
        delete s_lastRuns[id];
        delete s_specs[id];
        delete s_targets[id];
        delete s_handlers[id];
        delete s__handlerSignatures[id];
        s_activeCronJobIDs.remove(id);
        emit CronJobDeleted(id);
    }

    /**
     * @notice Add a delegator to the smart contract.
     * @param delegator the address of delegator to add
     */
    function addDelegator(address delegator) external override onlyOwnerOrDelegator {
        if (!_isExistDelegator(delegator)) {
            s_delegators.push(delegator);
            emit DelegatorAdded(delegator);
        }
    }

    /**
     * @notice Remove a delegator to the smart contract.
     * @param delegator the address of delegator to remove
     */
    function removeDelegator(address delegator) external override onlyOwnerOrDelegator {
        for (uint256 i = 0; i < s_delegators.length; i++) {
            if (s_delegators[i] == delegator) {
                delete s_delegators[i];
                emit DelegatorRemoved(delegator);
            }
        }
    }

    /**
     * @notice Get the id of an eligible cron job
     * @return upkeepNeeded signals if upkeep is needed, performData is an abi encoding
     * of the id and "next tick" of the eligible cron job
     */
    function checkUpkeep(bytes calldata) external view override whenNotPaused returns (bool, bytes memory) {
        //     cannotExecute

        // DEV: start at a random spot in the list so that checks are
        // spread evenly among cron jobs
        uint256 numCrons = s_activeCronJobIDs.length();

        if (numCrons == 0) {
            return (false, bytes(""));
        }
        uint256 startIdx = block.number % numCrons;
        bool result;
        bytes memory payload;
        (result, payload) = _checkInRange(startIdx, numCrons);
        if (result) {
            return (result, payload);
        }
        (result, payload) = _checkInRange(0, startIdx);
        if (result) {
            return (result, payload);
        }
        return (false, bytes(""));
    }

    /**
     * @notice gets a list of active cron job IDs
     * @return list of active cron job IDs
     */
    function getActiveCronJobIDs() external view override returns (uint256[] memory) {
        uint256 length = s_activeCronJobIDs.length();
        uint256[] memory jobIDs = new uint256[](length);
        for (uint256 idx = 0; idx < length; idx++) {
            jobIDs[idx] = s_activeCronJobIDs.at(idx);
        }
        return jobIDs;
    }

    /**
     * @notice gets the next cron job IDs
     * @return next cron job IDs
     */
    function getNextCronJobIDs() external view override returns (uint256) {
        return s_nextCronJobID;
    }

    /**
     * @notice gets a list of all delegators
     * @return list of adelegators address
     */
    function getDelegators() external view override returns (address[] memory) {
        return s_delegators;
    }

    /**
     * @notice gets a cron job
     * @param id the cron job ID
     * @return target - the address a cron job forwards the eth tx to
     *     handler - the encoded function sig to execute when forwarding a tx
     *     cronString - the string representing the cron job
     *     nextTick - the timestamp of the next time the cron job will run
     */
    function getCronJob(
        uint256 id
    )
        external
        view
        override
        onlyValidCronID(id)
        returns (address target, bytes memory handler, string memory cronString, uint256 nextTick)
    {
        Spec memory spec = s_specs[id];
        return (s_targets[id], s_handlers[id], CronExternal.toCronString(spec), CronExternal.nextTick(spec));
    }

    /**
     * @notice Pauses the contract, which prevents executing performUpkeep
     */
    function pause() external override onlyOwner {
        _pause();
    }

    /**
     * @notice Unpauses the contract
     */
    function unpause() external override onlyOwner {
        _unpause();
    }

    ///
    /// INTERNAL FUNCTIONS
    ///

    /**
     * @notice Adds a cron spec to storage and the ID to the list of jobs
     * @param target the destination contract of a cron job
     * @param handler the function signature on the target contract to call
     * @param spec the cron spec to create
     */
    function _createCronJobFromSpec(address target, bytes memory handler, Spec memory spec) internal {
        uint256 newID = s_nextCronJobID;
        s_activeCronJobIDs.add(newID);
        s_targets[newID] = target;
        s_handlers[newID] = handler;
        s_specs[newID] = spec;
        s_lastRuns[newID] = block.timestamp;
        s__handlerSignatures[newID] = _handlerSig(target, handler);
        s_nextCronJobID++;
        emit CronJobCreated(newID, target, handler);
    }

    function _isExistDelegator(address delegator) internal view returns (bool) {
        bool isFinded = false;
        for (uint256 i = 0; i < s_delegators.length; i++) {
            if (s_delegators[i] == delegator) {
                isFinded = true;
                continue;
            }
        }
        return isFinded;
    }

    /**
     * @notice _validates the input to performUpkeep
     * @param id the id of the cron job
     * @param tickTime the observed tick time
     * @param target the contract to forward the tx to
     * @param handler the handler of the contract receiving the forwarded tx
     */
    function _validate(uint256 id, uint256 tickTime, address target, bytes memory handler) private view {
        tickTime = tickTime - (tickTime % 60); // remove seconds from tick time
        if (block.timestamp < tickTime) {
            revert TickInFuture();
        }
        if (tickTime <= s_lastRuns[id]) {
            revert TickTooOld();
        }
        if (!CronInternal.matches(s_specs[id], tickTime)) {
            revert TickDoesntMatchSpec();
        }
        if (_handlerSig(target, handler) != s__handlerSignatures[id]) {
            revert InvalidHandler();
        }
    }

    /**
     * @notice returns a unique identifier for target/handler pairs
     * @param target the contract to forward the tx to
     * @param handler the handler of the contract receiving the forwarded tx
     * @return a hash of the inputs
     */
    function _handlerSig(address target, bytes memory handler) private pure returns (bytes32) {
        return keccak256(abi.encodePacked(target, handler));
    }

    /**
     * @notice checks the cron jobs in a given range
     * @param start the starting id to check (inclusive)
     * @param end the ending id to check (exclusive)
     * @return upkeepNeeded signals if upkeep is needed, performData is an abi encoding
     * of the id and "next tick" of the eligible cron job
     */
    function _checkInRange(uint256 start, uint256 end) private view returns (bool, bytes memory) {
        uint256 id;
        uint256 lastTick;
        for (uint256 idx = start; idx < end; idx++) {
            id = s_activeCronJobIDs.at(idx);
            lastTick = s_specs[id].lastTick();
            if (lastTick > s_lastRuns[id]) {
                return (true, abi.encode(id, lastTick, s_targets[id], s_handlers[id]));
            }
        }
    }

    modifier onlyValidCronID(uint256 id) {
        if (!s_activeCronJobIDs.contains(id)) {
            revert CronJobIDNotFound(id);
        }
        _;
    }

    modifier onlyOwnerOrDelegator() {
        require(msg.sender == owner() || _isExistDelegator(msg.sender), "Caller is not the owner or a delegator");
        _;
    }
}
