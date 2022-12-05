// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import { ICronUpkeep } from "../interfaces/ICronUpkeep.sol";
import { IKeeper } from "../interfaces/IKeeper.sol";
import { IChild } from "../interfaces/IChild.sol";

import "hardhat/console.sol";

abstract contract Child is IChild, ReentrancyGuard, Pausable {
    using Address for address;

    uint256 public roundId; // roundId gets incremented every time the child restarts

    address public owner;
    address public factory;

    uint256 public constant MAX_TREASURY_FEE = 1000; // 10%

    uint256 public treasuryFee; // treasury rate (e.g. 200 = 2%, 150 = 1.50%)
    uint256 public treasuryAmount; // treasury amount that was not claimed

    mapping(uint256 => Winner[]) winners;
    mapping(uint256 => Prize[]) prizes;

    ///
    /// CONSTRUCTOR AND INITIALISATION
    ///

    /**
     * @notice Constructor
     */
    constructor() {}

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Function that is called by a winner to claim his prize
     * @dev TODO NEXT VERSION Update claim process according to prize type
     */
    function claimPrize(uint256 _roundId) external override onlyIfRoundId(_roundId) {
        console.log("claimPrize");
        for (uint256 i = 0; i < winners[_roundId].length; i++)
            if (winners[_roundId][i].playerAddress == msg.sender) {
                require(!winners[_roundId][i].prizeClaimed, "Prize for this round already claimed");
                require(address(this).balance >= winners[_roundId][i].amountWon, "Not enough funds in contract");

                winners[_roundId][i].prizeClaimed = true;
                console.log("claimPrize OK");
                emit ChildPrizeClaimed(msg.sender, _roundId, winners[_roundId][i].amountWon);
                _safeTransfert(msg.sender, winners[_roundId][i].amountWon);
                return;
            }

        console.log("claimPrize KO");

        require(false, "Player did not win this round");
    }

    /**
     * @notice Prizes adding management
     * @dev Callable by admin or creator
     * @dev TODO NEXT VERSION add a taxe for creator in case of free childs
     *      Need to store the factory childCreationAmount in this contract on initialisation
     * @dev TODO NEXT VERSION Remove _isChildAllPrizesStandard limitation to include other prize typ
     */
    function addPrizes(
        Prize[] memory _prizes
    ) external payable override onlyAdmin whenPaused onlyIfPrizesParam(_prizes) onlyIfPrizeAmountIfNeeded(_prizes) {
        _addPrizes(_prizes);
        // Limitation for current version as standard for NFT is not implemented
        require(_isChildAllPrizesStandard(), "This version only allow standard prize");
    }

    ///
    /// INTERNAL FUNCTIONS
    ///

    /**
     * @notice Internal function for prizes adding management
     * @param _prizes list of prize details
     */
    function _addPrizes(Prize[] memory _prizes) internal virtual {
        uint256 prizepool = 0;
        for (uint256 i = 0; i < _prizes.length; i++) {
            _addPrize(_prizes[i]);
            prizepool += _prizes[i].amount;
        }
    }

    /**
     * @notice Internal function to add a Prize
     * @param _prize the prize to add
     */
    function _addPrize(Prize memory _prize) internal {
        prizes[roundId].push(_prize);
        emit PrizeAdded(
            roundId,
            _prize.position,
            _prize.amount,
            _prize.standard,
            _prize.contractAddress,
            _prize.tokenId
        );
    }

    /**
     * @notice Internal function to check if all childs are of type standard
     * @return isStandard set to true if all childs are of type standard
     */
    function _isChildAllPrizesStandard() internal view returns (bool isStandard) {
        for (uint256 i = 0; i < prizes[roundId].length; i++) if (prizes[roundId][i].standard != 0) return false;
        return true;
    }

    /**
     * @notice Check if msg.value have the right amount if needed
     * @param _prizes list of prize details
     */
    function _checkIfPrizeAmountIfNeeded(Prize[] memory _prizes) internal view virtual {
        uint256 prizepool = 0;
        for (uint256 i = 0; i < _prizes.length; i++) prizepool += _prizes[i].amount;

        require(msg.value == prizepool, "Need to send prizepool amount");
    }

    /**
     * @notice Transfert funds
     * @param _receiver the receiver address
     * @param _amount the amount to transfert
     * @dev TODO NEXT VERSION use SafeERC20 library from OpenZeppelin
     */
    function _safeTransfert(address _receiver, uint256 _amount) internal onlyIfEnoughtBalance(_amount) {
        (bool success, ) = _receiver.call{ value: _amount }("");

        if (!success) {
            emit FailedTransfer(_receiver, _amount);
            require(false, "Transfer failed.");
        }
    }

    ///
    /// GETTERS FUNCTIONS
    ///
    /**
     * @notice Return the winners for a round id
     * @param _roundId the round id
     * @return childWinners list of Winner
     */
    function getWinners(
        uint256 _roundId
    ) external view override onlyIfRoundId(_roundId) returns (Winner[] memory childWinners) {
        return winners[_roundId];
    }

    /**
     * @notice Return the winners for a round id
     * @param _roundId the round id
     * @return childPrizes list of Prize
     */
    function getPrizes(
        uint256 _roundId
    ) external view override onlyIfRoundId(_roundId) returns (Prize[] memory childPrizes) {
        return prizes[_roundId];
    }

    ///
    /// SETTERS FUNCTIONS
    ///

    ///
    /// ADMIN FUNCTIONS
    ///

    /**
     * @notice Withdraw Treasury fee
     * @dev Callable by admin
     */
    function claimTreasuryFee()
        external
        override
        onlyAdmin
        onlyIfClaimableAmount(treasuryAmount)
        onlyIfEnoughtBalance(treasuryAmount)
    {
        uint256 currentTreasuryAmount = treasuryAmount;
        treasuryAmount = 0;
        emit TreasuryFeeClaimed(currentTreasuryAmount);
        _safeTransfert(owner, currentTreasuryAmount);
    }

    /**
     * @notice Set the treasury fee for the child
     * @param _treasuryFee the new treasury fee in %
     * @dev Callable by admin
     * @dev Callable when child if not in progress
     */
    function setTreasuryFee(uint256 _treasuryFee) external override onlyAdmin onlyTreasuryFee(_treasuryFee) {
        treasuryFee = _treasuryFee;
    }

    /**
     * @notice Pause the current game and associated keeper job
     * @dev Callable by admin or creator
     */
    function pause() external virtual override {
        _pause();
    }

    /**
     * @notice Unpause the current game and associated keeper job
     * @dev Callable by admin or creator
     */
    function unpause() external virtual override {
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
    function transferAdminOwnership(address _adminAddress) external override onlyAdmin onlyAddressInit(_adminAddress) {
        emit AdminOwnershipTransferred(owner, _adminAddress);
        owner = _adminAddress;
    }

    /**
     * @notice Transfert Factory Ownership
     * @param _factory the new factory address
     * @dev Callable by factory
     */
    function transferFactoryOwnership(
        address _factory
    ) external override onlyAdminOrFactory onlyAddressInit(address(_factory)) {
        emit FactoryOwnershipTransferred(address(factory), address(_factory));
        factory = _factory;
    }

    /**
     * @notice Allow admin to withdraw all funds of smart contract
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawFunds(address _receiver) external override onlyAdminOrFactory {
        _safeTransfert(_receiver, address(this).balance);
    }

    ///
    /// FALLBACK FUNCTIONS
    ///

    // /**
    //  * @notice Called for empty calldata (and any value)
    //  */
    // receive() external payable virtual;

    // /**
    //  * @notice Called when no other function matches (not even the receive function). Optionally payable
    //  */
    // fallback() external payable virtual;

    ///
    /// MODIFIERS
    ///

    /**
     * @notice Modifier that ensure only admin can access this function
     */
    modifier onlyAdmin() {
        require(msg.sender == owner, "Caller is not the admin");
        _;
    }

    /**
     * @notice Modifier that ensure only factory can access this function
     */
    modifier onlyFactory() {
        require(msg.sender == address(factory), "Caller is not the factory");
        _;
    }

    /**
     * @notice Modifier that ensure only admin or factory can access this function
     */
    modifier onlyAdminOrFactory() {
        require(msg.sender == address(factory) || msg.sender == owner, "Caller is not the admin or factory");
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
     * @notice Modifier that ensure that caller is not a smart contract
     */
    modifier onlyHumans() {
        uint256 size;
        address addr = msg.sender;
        assembly {
            size := extcodesize(addr)
        }
        require(size == 0, "No contract allowed");
        _;
    }

    /**
     * @notice Modifier that ensure that roundId exist
     */
    modifier onlyIfRoundId(uint256 _roundId) {
        require(_roundId <= roundId, "This round does not exist");
        _;
    }

    /**
     * @notice Modifier that ensure that treasury fee are not too high
     */
    modifier onlyIfClaimableAmount(uint256 _amount) {
        require(_amount > 0, "Nothing to claim");
        _;
    }

    /**
     * @notice Modifier that ensure that treasury fee are not too high
     */
    modifier onlyIfEnoughtBalance(uint256 _amount) {
        require(address(this).balance >= _amount, "Not enough in contract balance");
        _;
    }

    /**
     * @notice Modifier that ensure that treasury fee are not too high
     */
    modifier onlyTreasuryFee(uint256 _treasuryFee) {
        require(_treasuryFee <= MAX_TREASURY_FEE, "Treasury fee too high");
        _;
    }

    /**
     * @notice Modifier that ensure that prize details param is not empty
     * @param _prizes list of prize details
     */
    modifier onlyIfPrizesParam(Prize[] memory _prizes) {
        require(_prizes.length > 0, "Prizes should be greather or equal to 1");
        for (uint256 i = 0; i < _prizes.length; i++) require(_prizes[i].position == i + 1, "Prize list is not ordered");
        _;
    }

    /**
     * @notice Modifier that ensure thatmsg.value have the right amount if needed
     * @param _prizes list of prize details
     */
    modifier onlyIfPrizeAmountIfNeeded(Prize[] memory _prizes) {
        _checkIfPrizeAmountIfNeeded(_prizes);
        _;
    }

    /**
     * @notice Modifier that ensure that prize details is not empty
     */
    modifier onlyIfPrizesIsNotEmpty() {
        require(prizes[roundId].length > 0, "Prizes should be greather or equal to 1");
        _;
    }
}
