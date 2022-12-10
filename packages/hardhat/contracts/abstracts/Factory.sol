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

    Counters.Counter public id;

    uint256 public itemCreationAmount;

    uint256 public latestVersionId;

    Version[] public versions;

    Item[] public items;

    address public cronUpkeep;

    ///
    ///STRUCTS
    ///

    /**
     * @notice Item structure that contain all usefull data for a item
     */
    struct Item {
        uint256 id;
        uint256 versionId;
        address creator;
        address deployedAddress;
        uint256 itemCreationAmount;
    }

    /**
     * @notice Version structure that contain all usefull data for a item Implementation version
     */
    struct Version {
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
     * @param _item the item implementation address
     * @param _cronUpkeep the keeper address
     * @param _itemCreationAmount the item creation amount
     */
    constructor(
        address _item,
        address _cronUpkeep,
        uint256 _itemCreationAmount
    ) onlyAddressInit(_item) onlyAddressInit(_cronUpkeep) {
        cronUpkeep = _cronUpkeep;
        itemCreationAmount = _itemCreationAmount;
        versions.push(Version({ id: latestVersionId, deployedAddress: _item }));
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
     * @notice Get the list of deployed versions
     * @return _itemsVersions the list of versions
     */
    function getDeployedChildsVersions() external view returns (Version[] memory _itemsVersions) {
        return versions;
    }

    ///
    ///ADMIN FUNCTIONS
    ///

    /**
     * @notice Set the version id and using given address as defaut address for current version
     * @param _item the new item implementation address
     * @dev Callable by admin
     */
    function setNewVersion(address _item) external onlyAdmin {
        latestVersionId += 1;
        versions.push(Version({ id: latestVersionId, deployedAddress: _item }));
    }

    /**
     * @notice Update the keeper address for the factory and all versions and associated keeper job
     * @param _cronUpkeep the new keeper address
     * @dev Callable by admin
     */
    function updateCronUpkeep(address _cronUpkeep) external onlyAdmin onlyAddressInit(_cronUpkeep) {
        cronUpkeep = _cronUpkeep;
        emit CronUpkeepUpdated(cronUpkeep);

        for (uint256 i = 0; i < items.length; i++) {
            Item memory item = items[i];
            ICronUpkeep(cronUpkeep).addDelegator(item.deployedAddress);
            IKeeper(payable(item.deployedAddress)).setCronUpkeep(cronUpkeep);
        }
    }

    /**
     * @notice Pause the factory and all versions and associated keeper job
     * @dev Callable by admin
     */
    function pauseAll() external onlyAdmin whenNotPaused {
        // pause first to ensure no more interaction with contract
        _pause();
        for (uint256 i = 0; i < items.length; i++) {
            Item memory item = items[i];
            IChild(payable(item.deployedAddress)).pause();
        }
    }

    /**
     * @notice Resume the factory and all versions and associated keeper job
     * @dev Callable by admin
     */
    function resumeAll() external onlyAdmin whenPaused {
        // unpause last to ensure that everything is ok
        _unpause();

        for (uint256 i = 0; i < items.length; i++) {
            Item memory item = items[i];
            IChild(payable(item.deployedAddress)).unpause();
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
     * @notice Modifier that ensure that amount sended is item creation amount
     */
    modifier onlyItemCreationAmount() {
        require(msg.sender == owner() || msg.value >= itemCreationAmount, "Only item creation amount is allowed");
        _;
    }
}
