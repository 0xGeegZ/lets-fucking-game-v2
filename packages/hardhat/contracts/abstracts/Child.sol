// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import { ICronUpkeep } from "../interfaces/ICronUpkeep.sol";
import { IKeeper } from "../interfaces/IKeeper.sol";
import { IChild } from "../interfaces/IChild.sol";

import { TokenHelpers } from "../libraries/TokenHelpers.sol";

abstract contract Child is IChild, ReentrancyGuard, Pausable {
    using Address for address;
    using Counters for Counters.Counter;

    Counters.Counter public epoch;

    address public owner;
    address public factory;

    uint256 public constant MAX_TREASURY_FEE = 1000; // 10%

    uint256 public treasuryFee; // treasury rate (e.g. 200 = 2%, 150 = 1.50%)
    uint256 public treasuryAmount; // treasury amount that was not claimed

    address[] public allowedTokensERC20;
    address[] public allowedTokensERC721;

    mapping(uint256 => Winner[]) winners;
    mapping(uint256 => Prize[]) prizes;

    ///
    /// CONSTRUCTOR AND INITIALISATION
    ///

    /**
     * @notice Constructor
     * @param _allowedTokensERC20 list of allowed ERC20 tokens
     * @param _allowedTokensERC721 list of allowed ERC721 tokens
     */
    constructor(address[] memory _allowedTokensERC20, address[] memory _allowedTokensERC721) {
        allowedTokensERC20 = _allowedTokensERC20;
        allowedTokensERC721 = _allowedTokensERC721;
    }

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Prizes adding management
     * @dev Callable by admin or creator
     * @dev TODO NEXT VERSION add a tax for creator in case of free childs
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

    /**
     * @notice Function that is called by a winner to claim his prize
     * @param _epoch the epoch to the game to claim
     * @dev TODO NEXT VERSION Update claim process according to prize type
     */
    function claimPrize(uint256 _epoch) external override onlyIfEpoch(_epoch) {
        for (uint256 i = 0; i < winners[_epoch].length; i++)
            if (winners[_epoch][i].playerAddress == msg.sender) {
                require(!winners[_epoch][i].prizeClaimed, "Prize for this round already claimed");
                require(address(this).balance >= winners[_epoch][i].amountWon, "Not enough funds in contract");

                winners[_epoch][i].prizeClaimed = true;
                emit ChildPrizeClaimed(msg.sender, _epoch, winners[_epoch][i].amountWon);

                if (winners[_epoch][i].standard == 0)
                    TokenHelpers.safeTransfert(winners[_epoch][i].playerAddress, winners[_epoch][i].amountWon);
                else if (winners[_epoch][i].standard == 1)
                    TokenHelpers.transfertERC20(
                        winners[_epoch][i].contractAddress,
                        address(this),
                        winners[_epoch][i].playerAddress,
                        winners[_epoch][i].amountWon
                    );
                else if (winners[_epoch][i].standard == 2)
                    TokenHelpers.transfertERC721(
                        winners[_epoch][i].contractAddress,
                        address(this),
                        winners[_epoch][i].playerAddress,
                        winners[_epoch][i].tokenId
                    );
                else require(false, "Prize type not supported");

                return;
            }
        require(false, "Player did not win this round");
    }

    ///
    /// INTERNAL FUNCTIONS
    ///

    /**
     * @notice Internal function for prizes adding management
     * @param _prizes list of prize details
     */
    function _addPrizes(Prize[] memory _prizes) internal virtual {
        for (uint256 i = 0; i < _prizes.length; i++) {
            _addPrize(_prizes[i]);
        }
    }

    /**
     * @notice Internal function to add a Prize
     * @param _prize the prize to add
     */
    function _addPrize(Prize memory _prize) internal {
        if (_prize.standard == 1)
            TokenHelpers.transfertERC20(_prize.contractAddress, msg.sender, address(this), _prize.amount);
        else if (_prize.standard == 2)
            TokenHelpers.transfertERC721(_prize.contractAddress, msg.sender, address(this), _prize.tokenId);

        prizes[epoch.current()].push(_prize);
        emit PrizeAdded(
            epoch.current(),
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
     * @dev only available for native token, token or NFT
     */
    function _isChildAllPrizesStandard() internal view returns (bool isStandard) {
        for (uint256 i = 0; i < prizes[epoch.current()].length; i++)
            if (
                prizes[epoch.current()][i].standard != 0 &&
                prizes[epoch.current()][i].standard != 1 &&
                prizes[epoch.current()][i].standard != 2
            ) return false;
        return true;
    }

    /**
     * @notice Check if msg.value have the right amount if needed
     * @param _prizes list of prize details
     */
    function _checkIfPrizeAmountIfNeeded(Prize[] memory _prizes) internal view virtual {
        uint256 prizepool = 0;
        for (uint256 i = 0; i < _prizes.length; i++) if (_prizes[i].standard == 0) prizepool += _prizes[i].amount;

        require(msg.value == prizepool, "Need to send prizepool amount");
    }

    /**
     * @notice get prize for given giveaway and current position
     * @param _epoch round id
     * @param _position position of prize
     */
    function _getPrizeForPosition(
        uint256 _epoch,
        uint256 _position
    ) internal view returns (bool _found, Prize memory _prize) {
        for (uint256 idx = 0; idx < prizes[_epoch].length; idx++) {
            if (prizes[_epoch][idx].position == _position) return (true, prizes[_epoch][idx]);
        }
        Prize memory defaultPrize;
        return (false, defaultPrize);
    }

    /**
     * @notice Check if token already exist in allowed ERC20 tokens
     * @param _allowedToken the authorized amount to check
     * @return isExist true if exist false if not
     */
    function _isExistAllowedERC20(address _allowedToken) internal view returns (bool isExist, uint256 index) {
        for (uint256 i = 0; i < allowedTokensERC20.length; i++)
            if (allowedTokensERC20[i] == _allowedToken) return (true, i);
        return (false, 0);
    }

    /**
     * @notice Check if token already exist in allowed ERC721 tokens
     * @param _allowedToken the authorized amount to check
     * @return isExist true if exist false if not
     */
    function _isExistAllowedERC721(address _allowedToken) internal view returns (bool isExist, uint256 index) {
        for (uint256 i = 0; i < allowedTokensERC721.length; i++)
            if (allowedTokensERC721[i] == _allowedToken) return (true, i);
        return (false, 0);
    }

    ///
    /// GETTERS FUNCTIONS
    ///
    /**
     * @notice Return the winners for a round id
     * @param _epoch the round id
     * @return childWinners list of Winner
     */
    function getWinners(
        uint256 _epoch
    ) external view override onlyIfEpoch(_epoch) returns (Winner[] memory childWinners) {
        return winners[_epoch];
    }

    /**
     * @notice Return the winners for a round id
     * @param _epoch the round id
     * @return childPrizes list of Prize
     */
    function getPrizes(uint256 _epoch) external view override onlyIfEpoch(_epoch) returns (Prize[] memory childPrizes) {
        return prizes[_epoch];
    }

    ///
    /// SETTERS FUNCTIONS
    ///

    /**
     * @notice Set the treasury fee for the child
     * @param _treasuryFee the new treasury fee in %
     * @dev Callable by admin
     * @dev Callable when child if not in progress
     */
    function setTreasuryFee(uint256 _treasuryFee) external override onlyAdmin onlyTreasuryFee(_treasuryFee) {
        treasuryFee = _treasuryFee;
    }

    ///
    /// ADMIN FUNCTIONS
    ///

    /**
     * @notice Add a token to allowed ERC20
     * @param _token the new token address
     * @dev Callable by admin
     */
    function addTokenERC20(address _token) external override onlyAdmin onlyAddressInit(_token) {
        (bool isExist, ) = _isExistAllowedERC20(_token);
        if (!isExist) allowedTokensERC20.push(_token);
    }

    /**
     * @notice Remove a token to allowed ERC20
     * @param _token the token address to remove
     * @dev Callable by admin
     */
    function removeTokenERC20(address _token) external override onlyAdmin onlyAddressInit(_token) {
        (bool isExist, uint256 index) = _isExistAllowedERC20(_token);
        if (isExist) delete allowedTokensERC20[index];
    }

    /**
     * @notice Add a token to allowed ERC721
     * @param _token the new token address
     * @dev Callable by admin
     */
    function addTokenERC721(address _token) external override onlyAdmin onlyAddressInit(_token) {
        (bool isExist, ) = _isExistAllowedERC721(_token);
        if (!isExist) allowedTokensERC721.push(_token);
    }

    /**
     * @notice Remove a token to allowed ERC721
     * @param _token the token address to remove
     * @dev Callable by admin
     */
    function removeTokenERC721(address _token) external override onlyAdmin onlyAddressInit(_token) {
        (bool isExist, uint256 index) = _isExistAllowedERC721(_token);
        if (isExist) delete allowedTokensERC721[index];
    }

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
        TokenHelpers.safeTransfert(owner, currentTreasuryAmount);
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
     *  This will transfert all funds for ERC20 & ERC721 and Native token at the end
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawFunds(address _receiver) external override onlyAdminOrFactory {
        for (uint256 i = 0; i < allowedTokensERC20.length; i++)
            if (TokenHelpers.getERC20Balance(allowedTokensERC20[i], address(this)) > 0)
                withdrawERC20(allowedTokensERC20[i], _receiver);

        for (uint256 i = 0; i < allowedTokensERC721.length; i++) {
            uint[] memory tokenIdsERC721 = TokenHelpers.getERC721TokenIds(allowedTokensERC721[i], address(this));
            for (uint256 j = 0; j < tokenIdsERC721.length; j++)
                withdrawERC721(allowedTokensERC721[i], tokenIdsERC721[j], _receiver);
        }

        withdrawNative(_receiver);
    }

    /**
     * @notice Allow admin to withdraw Native from smart contract
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawNative(address _receiver) public override onlyAdminOrFactory {
        TokenHelpers.safeTransfert(_receiver, address(this).balance);
    }

    /**
     * @notice Allow admin to withdraw ERC20 from smart contract
     * @param _contractAddress the contract address
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawERC20(address _contractAddress, address _receiver) public override onlyAdminOrFactory {
        TokenHelpers.transfertERC20(
            _contractAddress,
            address(this),
            _receiver,
            TokenHelpers.getERC20Balance(_contractAddress, address(this))
        );
    }

    /**
     * @notice Allow admin to withdraw ERC721 from smart contract
     * @param _contractAddress the contract address
     * @param _tokenId the token id
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawERC721(
        address _contractAddress,
        uint256 _tokenId,
        address _receiver
    ) public override onlyAdminOrFactory {
        TokenHelpers.transfertERC721(_contractAddress, address(this), _receiver, _tokenId);
    }

    ///
    /// FALLBACK FUNCTIONS
    ///

    /**
     * @notice Called for empty calldata (and any value)
     */
    // receive() external payable virtual;

    /**
     * @notice Called when no other function matches (not even the receive function). Optionally payable
     */
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
     * @notice Modifier that ensure that epoch exist
     */
    modifier onlyIfEpoch(uint256 _epoch) {
        require(_epoch <= epoch.current(), "This round does not exist");
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
        require(prizes[epoch.current()].length > 0, "Prizes should be greather or equal to 1");
        _;
    }
}
