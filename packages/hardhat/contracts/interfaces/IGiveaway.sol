// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";
import { IChild } from "./IChild.sol";

interface IGiveaway is IChild {
    /// STRUCTS
    struct Giveaway {
        string name;
        string image;
        address creator;
        uint256 userId;
        uint256 tweetId;
        uint256 endTimestamp;
        // will be refreshed periodically with upkeep
        uint256 retweetCount;
        // should be zero if no retweetMaxCount
        uint256 retweetMaxCount;
        bool isEnded;
    }

    /// EVENTS
    /**
     * @notice Called when a new giveaway is created
     */
    event GiveawayCreated(uint256 epoch, uint256 userId, uint256 tweetId, uint256 prizesLength);
    /**
     * @notice Called when a winner is added
     */
    event WinnerAdded(
        uint256 giveawayId,
        uint256 position,
        uint256 winnerId,
        address contractAddress,
        uint256 amount,
        uint256 tokenId
    );
    /**
     * @notice Called when a giveaway is refreshed
     */
    event GiveawayRefreshed(uint256 indexed giveawayId, uint256 timestamp);
    /**
     * @notice Called when a request to draw winners is made
     */
    event GiveawayWinnerRequested(uint256 indexed giveawayId, bytes32 indexed requestId);
    /**
     * @notice Called when a request to sign up is made
     */
    event SignUpRequested(uint256 indexed userId, bytes32 indexed requestId);
    /**
     * @notice Called when a request to refresh a giveaway is made
     */
    event GiveawayRefreshRequested(uint256 indexed userId, bytes32 indexed requestId);
    /**
     * @notice Called when perform upkeep is executed
     */
    event PerformUpkeepExecuted(uint256 indexed giveawayId, uint256 timestamp);
    /**
     * @notice Called when a user signed up
     */
    event SignedUp(uint256 indexed userId, address userAddress);

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Function that create a new giveway
     */
    function createGiveaway(
        string calldata _name,
        string calldata _image,
        uint256 _userId,
        uint256 _tweetId,
        uint256 _endTimestamp,
        uint256 _retweetMaxCount,
        Prize[] memory _prizes
    ) external payable;

    /**
     * @notice Function that allow user to sign up to giveaway and claim wonned giveaways
     */
    function signUp(uint256 _userId) external;

    /**
     * @notice Check if user has signed up
     * @param _userId - twitter user id
     */
    function hasSignedUp(uint256 _userId) external view returns (bool);

    /**
     * @notice Check if caller has signed up
     */
    function hasSignedUp() external view returns (bool);

    ///
    /// CHAINLINK RESPONSES
    ///

    /**
     * @notice Fulfill Giveaway Winner request
     *
     * @param _requestId - id of the request
     * @param _giveawayId - id of the giveaway
     * @param _payload - payload that represent list of winners with positions
     */
    function fulfillGiveawayWinner(bytes32 _requestId, uint256 _giveawayId, bytes calldata _payload) external;

    /**
     * @notice Fulfill Sign Up request
     *
     * @param _requestId - id of the request
     * @param _userId - twitter user id
     * @param _hasSignedUp - true if  twitter userId match msg.sender address
     */
    function fulfillSignUp(bytes32 _requestId, uint256 _userId, bool _hasSignedUp) external;

    /**
     * @notice Fulfill Refresh Giveaway request
     *
     * @param _requestId - id of the request
     * @param _giveawayId - id of the giveaway
     * @param _retweetCount - updated retweet count
     */
    function fulfillRefreshGiveaway(bytes32 _requestId, uint256 _giveawayId, uint256 _retweetCount) external;

    ///
    /// KEEPER FUNCTIONS
    ///s
    /**
     * @notice Refresh all active giveaways retweet count
     */
    function refreshActiveGiveawayStatus() external;

    ///
    /// GETTERS FUNCTIONS
    ///

    /**
     * @notice Return URI for giveaway endpoint
     */
    function getGiveawayURI(uint256 _giveawayId) external view returns (string memory _giveawayURI);

    /**
     * @notice Return URI for giveaway endpoint
     */
    function getGiveawayRefreshURI(uint256 _giveawayId) external view returns (string memory _giveawayURI);

    /**
     * @notice Return URI for sign up endpoint
     */
    function getSignUpURI(uint256 _userId) external view returns (string memory _signUpURI);

    /**
     * @notice Get the list of deployed giveaways
     * @return _giveaways the list of giveaways
     */
    function getGiveaways() external view returns (Giveaway[] memory _giveaways);

    ///
    /// ADMIN FUNCTIONS
    ///

    /**
     * @notice Setup the keeper and adding cron to upkeep
     * @param _cronUpkeep the new keeper address
     * @param _encodedCron the encodedCron
     * @dev Callable by admin
     */
    function setupKeeper(address _cronUpkeep, string memory _encodedCron) external;

    /**
     * @notice Pause the current giveaway and associated keeper job
     * @dev Callable by admin or creator
     */

    function pauseGiveaways() external;

    /**
     * @notice Unpause the current giveaway and associated keeper job
     * @dev Callable by admin or creator
     */
    function unpauseGiveaways() external;

    /**
     * @notice Witdraws LINK from the contract to the Owner
     * @dev only admin can call this function
     */
    function withdrawLink() external;

    /**
     * @notice Set requestBaseURI
     * @dev only admin can call this function
     */
    function setRequestBaseURI(string calldata _requestBaseURI) external;

    /**
     * @notice Add user to users list
     * @dev only admin can call this function
     */
    function addUser(uint256 _userId, address _userAddress) external;

    /**
     * @notice Call this method if no response is received within 5 minutes
     * @param _requestId The ID that was generated for the request to cancel
     * @param _payment The payment specified for the request to cancel
     * @param _callbackFunctionId The bytes4 callback function ID specified for
     * the request to cancel
     * @param _expiration The expiration generated for the request to cancel
     * @dev only admin can call this function
     */
    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) external;
}
