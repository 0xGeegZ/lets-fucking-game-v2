// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import { Cron as CronExternal } from "@chainlink/contracts/src/v0.8/libraries/external/Cron.sol";

import { ICronUpkeep } from "../interfaces/ICronUpkeep.sol";
import { IKeeper } from "../interfaces/IKeeper.sol";

contract Keeper is IKeeper, Ownable, Pausable {
    uint256 private constant DEFAULT_CRON_UPKEEP_JOB_ID = 999;

    uint256 private cronUpkeepJobId;

    address public cronUpkeep;
    string public encodedCron;
    string public handler;

    ///
    /// CONSTRUCTOR
    ///

    constructor(address _cronUpkeep, string memory _handler, string memory _encodedCron) {
        encodedCron = _encodedCron;
        handler = _handler;
        cronUpkeep = _cronUpkeep;
    }

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Register the cron to the upkeep contract
     * @dev Callable by only by owner
     */
    function registerCronToUpkeep() external override onlyOwner {
        _registerCronToUpkeep(owner());
        emit CronUpkeepRegistered(cronUpkeepJobId, address(cronUpkeep));
    }

    /**
     * @notice Register the cron to the upkeep contract
     * @dev Callable by only by owner
     */
    function registerCronToUpkeep(address _target) external override onlyOwner {
        _registerCronToUpkeep(_target);
        emit CronUpkeepRegistered(cronUpkeepJobId, address(cronUpkeep));
    }

    ///
    /// GETTERS FUNCTIONS
    ///

    /**
     * @notice Return cronUpkeep
     * @dev Callable by only by owner
     */
    function getCronUpkeep() external view override onlyOwner returns (address _cronUpkeep) {
        return cronUpkeep;
    }

    /**
     * @notice Return encodedCron
     * @dev Callable by only by owner
     */
    function getEncodedCron() external view override onlyOwner returns (string memory _encodedCron) {
        return encodedCron;
    }

    /**
     * @notice Return handler
     * @dev Callable by only by owner
     */
    function getHandler() external view override onlyOwner returns (string memory _handler) {
        return handler;
    }

    /**
     * @notice Set the keeper address
     * @param _cronUpkeep the new keeper address
     * @dev Callable by only by owner
     */
    function setCronUpkeep(address _cronUpkeep) external override onlyOwner {
        cronUpkeep = _cronUpkeep;
        _registerCronToUpkeep(owner());
        emit CronUpkeepUpdated(cronUpkeepJobId, address(cronUpkeep));
    }

    /**
     * @notice Set the encoded cron
     * @param _encodedCron the new encoded cron as * * * * *
     * @dev Callable by only by owner
     */
    function setEncodedCron(string memory _encodedCron) external override onlyOwner {
        _setEncodedCron(_encodedCron);
    }

    ///
    /// ADMIN FUNCTIONS
    ///

    /**
     * @notice Pause the current keeper and associated keeper job
     * @dev Callable by only by owner
     */
    function pauseKeeper() external override whenNotPaused {
        _pause();
        ICronUpkeep(cronUpkeep).deleteCronJob(cronUpkeepJobId);
        cronUpkeepJobId = DEFAULT_CRON_UPKEEP_JOB_ID;
    }

    /**
     * @notice Unpause the current keeper and associated keeper job
     * @dev Callable by only by owner
     */
    function unpauseKeeper() external override whenPaused onlyIfKeeperDataInit {
        // check if cronUpkeepJobId has already been updated by calling setEncodedCron before unpausing game
        if (cronUpkeepJobId != DEFAULT_CRON_UPKEEP_JOB_ID) return;

        _unpause();
        _registerCronToUpkeep(owner());
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public override(IKeeper, Ownable) onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _transferOwnership(newOwner);
    }

    ///
    /// INTERNAL FUNCTIONS
    ///

    function _setEncodedCron(string memory _encodedCron) internal whenPaused onlyOwner {
        require(bytes(_encodedCron).length != 0, "Keeper cron need to be initialised");
        encodedCron = _encodedCron;
        _registerCronToUpkeep(owner());
        emit EncodedCronUpdated(cronUpkeepJobId, encodedCron);
    }

    function _registerCronToUpkeep(address _target) internal onlyOwner {
        uint256 nextCronJobIDs = ICronUpkeep(cronUpkeep).getNextCronJobIDs();
        cronUpkeepJobId = nextCronJobIDs;

        bytes memory encodedCronBytes = CronExternal.toEncodedSpec(encodedCron);

        ICronUpkeep(cronUpkeep).createCronJobFromEncodedSpec(
            _target,
            abi.encodeWithSignature(handler),
            encodedCronBytes
        );
    }

    /**
     * @notice Modifier that ensure that keeper data are initialised
     */
    modifier onlyIfKeeperDataInit() {
        require(address(cronUpkeep) != address(0), "Keeper need to be initialised");
        require(bytes(encodedCron).length != 0, "Keeper cron need to be initialised");
        _;
    }
}
