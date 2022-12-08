// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import { IChild } from "../interfaces/IChild.sol";
import { ICronUpkeep } from "../interfaces/ICronUpkeep.sol";
import { IKeeper } from "../interfaces/IKeeper.sol";

abstract contract Factory is Pausable, Ownable, ReentrancyGuard {
    using Address for address;
    using Counters for Counters.Counter;

    Counters.Counter public nextId;

    uint256 public childCreationAmount;

    uint256 public latestVersionId;

    ChildVersion[] public childsVersions;

    Child[] public childs;

    address public cronUpkeep;

    ///
    ///STRUCTS
    ///

    /**
     * @notice Child structure that contain all usefull data for a child
     */
    struct Child {
        uint256 id;
        uint256 versionId;
        address creator;
        address deployedAddress;
        uint256 childCreationAmount;
    }

    /**
     * @notice ChildVersion structure that contain all usefull data for a child Implementation version
     */
    struct ChildVersion {
        uint256 id;
        address deployedAddress;
    }

    ///
    ///EVENTS
    ///

    /**
     * @notice Called when a transfert have failed
     */
    event FailedTransfer(address receiver, uint256 amount);
    /**
     * @notice Called when the factory or admin update cronUpkeep
     */
    event CronUpkeepUpdated(address cronUpkeep);
    /**
     * @notice Called when the contract have receive funds via receive() or fallback() function
     */
    event Received(address sender, uint256 amount);

    /**
     * @notice Constructor Tha initialised the factory configuration
     * @param _child the child implementation address
     * @param _cronUpkeep the keeper address
     * @param _childCreationAmount the child creation amount
     */
    constructor(
        address _child,
        address _cronUpkeep,
        uint256 _childCreationAmount
    ) onlyAddressInit(_child) onlyAddressInit(_cronUpkeep) {
        cronUpkeep = _cronUpkeep;
        childCreationAmount = _childCreationAmount;
        childsVersions.push(ChildVersion({ id: latestVersionId, deployedAddress: _child }));
    }

    ///
    ///INTERNAL FUNCTIONS
    ///
    /**
     * @notice Transfert funds
     * @param _receiver the receiver address
     * @param _amount the amount to transfert
     * @dev TODO NEXT VERSION use SafeERC20 library from OpenZeppelin
     */
    function _safeTransfert(address _receiver, uint256 _amount) internal {
        uint256 balance = address(this).balance;
        if (balance < _amount) require(false, "Not enough in contract balance");
        (bool success, ) = _receiver.call{ value: _amount }("");
        if (!success) {
            emit FailedTransfer(_receiver, _amount);
            require(false, "Transfer failed.");
        }
    }

    ///
    ///GETTER FUNCTIONS
    ///

    /**
     * @notice Get the list of deployed childsVersions
     * @return _childsVersions the list of childsVersions
     */
    function getDeployedChildsVersions() external view returns (ChildVersion[] memory _childsVersions) {
        return childsVersions;
    }

    ///
    ///ADMIN FUNCTIONS
    ///

    /**
     * @notice Set the child implementation address
     * @param _child the new child implementation address
     * @dev Callable by admin
     */
    function setNewChild(address _child) external onlyAdmin {
        latestVersionId += 1;
        childsVersions.push(ChildVersion({ id: latestVersionId, deployedAddress: _child }));
    }

    /**
     * @notice Update the keeper address for the factory and all childsVersions and associated keeper job
     * @param _cronUpkeep the new keeper address
     * @dev Callable by admin
     */
    function updateCronUpkeep(address _cronUpkeep) external onlyAdmin onlyAddressInit(_cronUpkeep) {
        cronUpkeep = _cronUpkeep;
        emit CronUpkeepUpdated(cronUpkeep);

        for (uint256 i = 0; i < childs.length; i++) {
            Child memory child = childs[i];
            ICronUpkeep(cronUpkeep).addDelegator(child.deployedAddress);
            IKeeper(payable(child.deployedAddress)).setCronUpkeep(cronUpkeep);
        }
    }

    /**
     * @notice Pause the factory and all childsVersions and associated keeper job
     * @dev Callable by admin
     */
    function pauseAll() external onlyAdmin whenNotPaused {
        // pause first to ensure no more interaction with contract
        _pause();
        for (uint256 i = 0; i < childs.length; i++) {
            Child memory child = childs[i];
            IChild(payable(child.deployedAddress)).pause();
        }
    }

    /**
     * @notice Resume the factory and all childsVersions and associated keeper job
     * @dev Callable by admin
     */
    function resumeAll() external onlyAdmin whenPaused {
        // unpause last to ensure that everything is ok
        _unpause();

        for (uint256 i = 0; i < childs.length; i++) {
            Child memory child = childs[i];
            IChild(payable(child.deployedAddress)).unpause();
        }
    }

    /**
     * @notice Pause the factory
     */
    function pause() external onlyAdmin whenNotPaused {
        _pause();
    }

    /**
     * @notice Unpause the factory
     */
    function unpause() external onlyAdmin whenPaused {
        _unpause();
    }

    ///
    /// EMERGENCY
    ///

    /**
     * @notice Transfert Admin Ownership
     * @param _adminAddress the new admin address
     * @dev Callable by admin
     */
    function transferAdminOwnership(address _adminAddress) external onlyAdmin onlyAddressInit(_adminAddress) {
        transferOwnership(_adminAddress);
    }

    /**
     * @notice Allow admin to withdraw all funds of smart contract
     * @dev Callable by admin
     */
    function withdrawFunds() external onlyAdmin {
        _safeTransfert(owner(), address(this).balance);
    }

    ///
    /// FALLBACK FUNCTIONS
    ///

    /**
     * @notice  Called for empty calldata (and any value)
     */
    receive() external payable {
        emit Received(msg.sender, msg.value);
    }

    /**
     * @notice Called when no other function matches (not even the receive function). Optionally payable
     */
    fallback() external payable {
        emit Received(msg.sender, msg.value);
    }

    ///
    /// MODIFIERS
    ///

    /**
     * @notice Modifier that ensure only admin can access this function
     */
    modifier onlyAdmin() {
        require(msg.sender == owner(), "Caller is not the admin");
        _;
    }

    /**
     * @notice Modifier that ensure that address is initialised
     */
    modifier onlyAddressInit(address _toCheck) {
        require(_toCheck != address(0), "address need to be initialised");
        _;
    }

    /**
     * @notice Modifier that ensure that amount sended is child creation amount
     */
    modifier onlyChildCreationAmount() {
        require(msg.sender == owner() || msg.value >= childCreationAmount, "Only child creation amount is allowed");
        _;
    }
}
