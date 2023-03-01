// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";

interface IChild {
    ///STRUCTS

    /**
     * @notice Winner structure that contain all usefull data for a winner
     */
    struct Winner {
        uint256 epoch;
        uint256 userId;
        address playerAddress;
        uint256 amountWon;
        uint256 position;
        uint256 standard;
        address contractAddress;
        uint256 tokenId;
        bool prizeClaimed;
    }

    /**
     * @notice PrizeStandard ENUM
     */
    enum PrizeStandard {
        STANDARD,
        ERC20,
        ERC721
    }

    /**
     * @notice Prize structure that contain a list of prizes for the current epoch
     */
    struct Prize {
        uint256 position;
        uint256 amount;
        /*
         * This will return a single integer between 0 and 5.
         * The numbers represent different ‘states’ a name is currently in.
         * 0 - NATIVE
         * 1 - ERC20
         * 2 - ERC721
         */
        uint256 standard;
        address contractAddress;
        uint256 tokenId;
    }

    ///
    ///EVENTS
    ///

    /**
     * @notice Called when a prize is added
     */
    event PrizeAdded(
        uint256 epoch,
        uint256 position,
        uint256 amount,
        uint256 standard,
        address contractAddress,
        uint256 tokenId
    );
    /**
     * @notice Called when a player have claimed his prize
     */
    event GamePrizeClaimed(address claimer, uint256 epoch, uint256 amountClaimed);
    /**
     * @notice Called when a methode transferCreatorOwnership is called
     */
    event CreatorOwnershipTransferred(address oldCreator, address newCreator);
    /**
     * @notice Called when a methode transferAdminOwnership is called
     */
    event AdminOwnershipTransferred(address oldAdmin, address newAdmin);
    /**
     * @notice Called when a methode transferFactoryOwnership is called
     */
    event FactoryOwnershipTransferred(address oldFactory, address newFactory);
    /**
     * @notice Called when the contract have receive funds via receive() or fallback() function
     */
    event Received(address sender, uint256 amount);
    /**
     * @notice Called when a player have claimed his prize
     */
    event ChildPrizeClaimed(address claimer, uint256 epoch, uint256 amountClaimed);
    /**
     * @notice Called when the treasury fee are claimed
     */
    event TreasuryFeeClaimed(uint256 amount);
    /**
     * @notice Called when the treasury fee are claimed by factory
     */
    event TreasuryFeeClaimedByFactory(uint256 amount);
    /**
     * @notice Called when the creator fee are claimed
     */
    event CreatorFeeClaimed(uint256 amount);
    /**
     * @notice Called when the creator or admin update encodedCron
     */
    event EncodedCronUpdated(uint256 jobId, string encodedCron);
    /**
     * @notice Called when the factory or admin update cronUpkeep
     */
    event CronUpkeepUpdated(uint256 jobId, address cronUpkeep);

    /**
     * @notice Function that is called by a winner to claim his prize
     * @dev TODO NEXT VERSION Update claim process according to prize type
     */
    function claimPrize(uint256 _epoch) external;

    /**
     * @notice Prizes adding management
     * @dev Callable by admin or creator
     * @dev TODO NEXT VERSION add a taxe for creator in case of free childs
     *      Need to store the factory childCreationAmount in this contract on initialisation
     * @dev TODO NEXT VERSION Remove _isChildAllPrizesStandard limitation to include other prize typ
     */
    function addPrizes(Prize[] memory _prizes) external payable;

    ///
    /// GETTERS FUNCTIONS
    ///
    /**
     * @notice Return the winners for a round id
     * @param _epoch the round id
     * @return childWinners list of Winner
     */
    function getWinners(uint256 _epoch) external view returns (Winner[] memory childWinners);

    /**
     * @notice Return the winners for a round id
     * @param _epoch the round id
     * @return childPrizes list of Prize
     */
    function getPrizes(uint256 _epoch) external view returns (Prize[] memory childPrizes);

    ///
    /// SETTERS FUNCTIONS
    ///

    ///
    /// ADMIN FUNCTIONS
    ///

    /**
     * @notice Add a token to allowed ERC20
     * @param _token the new token address
     * @dev Callable by admin
     */
    function addTokenERC20(address _token) external;

    /**
     * @notice Remove a token to allowed ERC20
     * @param _token the token address to remove
     * @dev Callable by admin
     */
    function removeTokenERC20(address _token) external;

    /**
     * @notice Add a token to allowed ERC721
     * @param _token the new token address
     * @dev Callable by admin
     */
    function addTokenERC721(address _token) external;

    /**
     * @notice Remove a token to allowed ERC721
     * @param _token the token address to remove
     * @dev Callable by admin
     */
    function removeTokenERC721(address _token) external;

    /**
     * @notice Withdraw Treasury fee
     * @dev Callable by admin
     */
    function claimTreasuryFee() external;

    /**
     * @notice Set the treasury fee for the child
     * @param _treasuryFee the new treasury fee in %
     * @dev Callable by admin
     * @dev Callable when child if not in progress
     */
    function setTreasuryFee(uint256 _treasuryFee) external;

    /**
     * @notice Pause the current game and associated keeper job
     * @dev Callable by admin or creator
     */
    function pause() external;

    /**
     * @notice Unpause the current game and associated keeper job
     * @dev Callable by admin or creator
     */
    function unpause() external;

    ///
    /// EMERGENCY
    ///

    /**
     * @notice Transfert Admin Ownership
     * @param _adminAddress the new admin address
     * @dev Callable by admin
     */
    function transferAdminOwnership(address _adminAddress) external;

    /**
     * @notice Transfert Factory Ownership
     * @param _factory the new factory address
     * @dev Callable by factory
     */
    function transferFactoryOwnership(address _factory) external;

    /**
     * @notice Allow admin to withdraw all funds of smart contract
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawFunds(address _receiver) external;

    /**
     * @notice Allow admin to withdraw Native from smart contract
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawNative(address _receiver) external;

    /**
     * @notice Allow admin to withdraw ERC20 from smart contract
     * @param _contractAddress the contract address
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawERC20(address _contractAddress, address _receiver) external;

    /**
     * @notice Allow admin to withdraw ERC721 from smart contract
     * @param _contractAddress the contract address
     * @param _tokenId the token id
     * @param _receiver the receiver for the funds (admin or factory)
     * @dev Callable by admin or factory
     */
    function withdrawERC721(address _contractAddress, uint256 _tokenId, address _receiver) external;

    ///
    /// FALLBACK FUNCTIONS
    ///

    // /**
    //  * @notice Called for empty calldata (and any value)
    //  */
    // receive() external payable;

    // /**
    //  * @notice Called when no other function matches (not even the receive function). Optionally payable
    //  */
    // fallback() external payable;
}
