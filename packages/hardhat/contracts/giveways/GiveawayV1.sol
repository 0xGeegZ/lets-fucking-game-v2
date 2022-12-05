// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

import { Child } from "../abstracts/Child.sol";

import "hardhat/console.sol";

// EXAMPLE ChainlinkClient contract https://github.com/smartcontractkit/Chainlinked/blob/master/contracts/MyContract.sol
// EXAMPLE https://github.com/taijusanagi/chainlink-aa-paymaster-wallet/blob/main/packages/contracts/contracts/ChainlinkStripePaymaster.sol
// EXAMPLE https://github.com/charifmews/tweet.win/blob/main/contracts/GiveAwayTweet.sol

// TODO Mock contract for test : https://blog.chain.link/testing-chainlink-smart-contracts/
// TODO see test implementation to mock contract : https://github.com/smartcontractkit/hardhat-starter-kit/blob/5bce50fc0989d7b786ecc9af224567731f6cb23e/test/unit/APIConsumer_unit_test.js#L31

contract GiveawayV1 is Child, ChainlinkClient, KeeperCompatibleInterface {
    using Chainlink for Chainlink.Request;

    bytes32 public immutable jobId;
    uint256 private immutable fee;

    string public requestBaseURI;

    struct Giveaway {
        string name;
        string image;
        address creator;
        uint256 userId;
        uint256 tweetId;
        uint256 endTimestamp;
        uint256 retweetCount;
        uint256 retweetMaxCount;
    }

    mapping(uint256 => Giveaway) public giveaways;
    mapping(uint256 => address) public users;

    /**
     * @notice Called when the keeper start the game
     */
    event GiveawayStarted(uint256 roundId, uint256 userId, uint256 tweetId, uint256 prizesLength);
    /**
     * @notice Called when a player won the game
     */
    event WinnerAdded(uint256 giveawayId, uint256 position, uint256 winnerId, uint256 amount);
    /**
     * @notice Called when a player won the game
     */
    event GiveawayWinnerRequested(uint256 indexed giveawayId, bytes32 indexed requestId);

    /**
     * @notice Called when a player won the game
     */
    event SignUpRequested(uint256 indexed userId, bytes32 indexed requestId);

    /**
     * @notice Called when a player won the game
     */
    event PerformUpkeepExecuted(uint256 indexed giveawayId, uint256 timestamp);
    /**
     * @notice Called when a player won the game
     */
    event SignedUp(uint256 indexed userId, address userAddress);

    ///
    /// CONSTRUCTOR
    ///

    /**
     * @notice Initialize the link token and target oracle
     * // All testnets config : https://docs.chain.link/any-api/testnet-oracles/
     * Goerli Testnet details:
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0xCC79157eb46F5624204f47AB42b3906cAA40eaB7 (Chainlink DevRel)
     * jobId: 7223acbd01654282865b678924126013
     * Mumbai Testnet details :
     * Link Token: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB
     * Oracle: 0x816BA5612d744B01c36b0517B32b4FcCb9747009
     * jobId: 72bd0768b5c84706a548061c75c35ecc
     */
    constructor(
        bytes32 _jobId,
        string memory _requestBaseURI,
        address _oracle,
        address _link,
        uint256 _treasuryFee
    ) Child() {
        setChainlinkToken(_link);
        setChainlinkOracle(_oracle);
        jobId = _jobId;
        // 0,1 * 10**18 (Varies by network and job)
        fee = (1 * LINK_DIVISIBILITY) / 10;

        treasuryFee = _treasuryFee;
        requestBaseURI = _requestBaseURI;
        owner = msg.sender;
    }

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Function that allow players to register for a game
     * @dev Creator cannot register for his own game
     */
    function createGiveaway(
        string calldata _name,
        string calldata _image,
        uint256 _userId,
        uint256 _tweetId,
        uint256 _endTimestamp,
        uint256 _retweetMaxCount,
        Prize[] memory _prizes
    ) external payable {
        console.log("createGiveaway for round %s and prizes %s", roundId, _prizes.length);
        giveaways[roundId] = Giveaway({
            name: _name,
            image: _image,
            creator: msg.sender,
            userId: _userId,
            tweetId: _tweetId,
            endTimestamp: _endTimestamp,
            retweetCount: 0,
            retweetMaxCount: _retweetMaxCount
        });
        // Setup prizes structure
        _checkIfPrizeAmountIfNeeded(_prizes);
        _addPrizes(_prizes);

        // Limitation for current version as standard for NFT is not implemented
        require(_isChildAllPrizesStandard(), "This version only allow standard prize");

        emit GiveawayStarted(roundId, _userId, _tweetId, _prizes.length);

        roundId += 1;
    }

    /**
     * @notice Function that allow players to register for a game
     * @dev Creator cannot register for his own game
     */
    function signUp(uint256 _userId) external {
        console.log("Sign up for user %s and address %s", _userId, msg.sender);
        users[_userId] = msg.sender;
        emit SignedUp(_userId, msg.sender);
        _requestSignUp(_userId);
    }

    /**
     * @notice Function that allow players to register for a game
     * @dev Creator cannot register for his own game
     */
    function isSignedUp(uint256 _userId) external view returns (bool) {
        return users[_userId] != address(0);
    }

    ///
    /// CHAINLINK RESPONSES
    ///

    /**
     * @notice Receives the response in the form of winner and giveaway
     *
     * @param _requestId - id of the request
     * @param _giveawayId - winner address
     * @param _payload - giveaway id
     */
    function fulfillGiveaway(
        bytes32 _requestId,
        uint256 _giveawayId,
        bytes calldata _payload
    ) public recordChainlinkFulfillment(_requestId) {
        (uint256[] memory winnersIds, uint256[] memory winnersPositions) = abi.decode(_payload, (uint256[], uint256[]));
        console.log("fulfillGiveaway winnersIds %s winnersPositions %s", winnersIds.length, winnersPositions.length);

        for (uint256 i = 0; i < winnersIds.length; i++) {
            Prize memory prize = getPrizeForPosition(_giveawayId, winnersPositions[i]);
            address winnerAddress = users[winnersIds[i]] != address(0) ? users[winnersIds[i]] : address(0);
            _addWinner(_giveawayId, winnersPositions[i], winnersIds[i], winnerAddress, prize.amount);
        }
    }

    /**
     * @notice Receives the response in the form of winner and giveaway
     *
     * @param _requestId - id of the request
     * @param _userId - user id
     * @param _isValidate - giveaway id
     */
    function fulfillSignUp(
        bytes32 _requestId,
        uint256 _userId,
        bool _isValidate
    ) public recordChainlinkFulfillment(_requestId) {
        console.log("fulfillSignUp %s _userId %s _isValidate %s", _userId, _isValidate);

        if (!_isValidate) delete users[_userId];
        for (uint256 round = 0; round < roundId; round++)
            for (uint256 idx = 0; idx < winners[round].length; idx++)
                if (winners[round][idx].userId == _userId) winners[round][idx].playerAddress = users[_userId];
    }

    ///
    /// KEEPER FUNCTIONS
    ///
    /**
     * @notice Executes the cron job with id encoded in performData
     * @param _performData abi encoding of cron job ID and the cron job's next run-at datetime
     */
    function performUpkeep(bytes calldata _performData) external override whenNotPaused {
        uint256 giveawayId = abi.decode(_performData, (uint256));
        console.log("performUpkeep giveawayId %s", giveawayId);
        _validate(giveawayId);
        _requestGiveawayWinner(giveawayId);
        emit PerformUpkeepExecuted(giveawayId, block.timestamp);
    }

    /**
     * @notice Get the id of an eligible cron job
     * @return _upkeepNeeded signals if upkeep is needed, performData is an abi encoding
     * @return _payload signals if upkeep is needed, performData is an abi encoding
     * of the id and "next tick" of the eligible cron job
     */
    function checkUpkeep(
        bytes memory _calldata
    ) external view override whenNotPaused returns (bool _upkeepNeeded, bytes memory _payload) {
        uint256 startIdx = block.number % roundId;
        bool result;
        bytes memory payload;
        (result, payload) = _checkInRange(startIdx, roundId);
        if (result) return (result, payload);

        (result, payload) = _checkInRange(0, startIdx);
        if (result) return (result, payload);

        return (false, bytes(""));
    }

    ///
    /// GETTERS FUNCTIONS
    ///

    /**
     * @notice Function that is called by the keeper when game is ready to start
     */
    function getGiveawayURI(uint256 _giveawayId) public view returns (string memory _giveawayURI) {
        console.log("getGiveawayURI requestBaseURI %s _giveawayId %s", requestBaseURI, _giveawayId);
        string memory baseURI = string(abi.encodePacked(requestBaseURI, "giveaway/"));
        string memory baseGiveawayURI = string(abi.encodePacked(baseURI, Strings.toString(_giveawayId)));
        string memory paramsURI = string(abi.encodePacked("?prizes=", Strings.toString(prizes[_giveawayId].length)));
        return string(abi.encodePacked(baseGiveawayURI, paramsURI));
    }

    /**
     * @notice Function that is called by the keeper when game is ready to start
     */
    function getSignUpURI(uint256 _userId) public view returns (string memory _signUpURI) {
        console.log("getSignUpURI requestBaseURI %s _userId %s", requestBaseURI, _userId);
        string memory baseURI = string(abi.encodePacked(requestBaseURI, "user/"));
        return string(abi.encodePacked(baseURI, Strings.toString(_userId)));
    }

    ///
    /// ADMIN FUNCTIONS
    ///
    /**
     * @notice Witdraws LINK from the contract to the Owner
     */
    function withdrawLink() external onlyAdmin {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(owner, link.balanceOf(address(this))), "Unable to transfer");
    }

    /**
     * @notice Call this method if no response is received within 5 minutes
     * @param _requestId The ID that was generated for the request to cancel
     * @param _payment The payment specified for the request to cancel
     * @param _callbackFunctionId The bytes4 callback function ID specified for
     * the request to cancel
     * @param _expiration The expiration generated for the request to cancel
     */
    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) public onlyAdmin {
        cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
    }

    ///
    /// INTERNAL FUNCTIONS
    ///

    /**
     * @notice validates the input to performUpkeep
     * @param _giveawayId the id of the cron job
     */
    function _validate(uint256 _giveawayId) private view {
        require(winners[_giveawayId].length == 0, "Giveaway winners already requesteds");
    }

    /**
     * @notice Function that will set a winner for a giveaway
     * @dev Creator cannot register for his own game
     */
    function _requestGiveawayWinner(uint256 _giveawayId) private onlyAdmin returns (bytes32 _requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillGiveaway.selector);
        req.add("get", getGiveawayURI(_giveawayId));
        // https://docs.chain.link/any-api/testnet-oracles/
        req.add("path", "payload");
        bytes32 requestId = sendChainlinkRequest(req, fee);
        emit GiveawayWinnerRequested(_giveawayId, requestId);
        return requestId;
    }

    /**
     * @notice Function that will set a winner for a giveaway
     * @dev Creator cannot register for his own game
     */
    function _requestSignUp(uint256 _userId) private onlyAdmin returns (bytes32 _requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillSignUp.selector);
        req.add("get", getSignUpURI(_userId));
        // https://docs.chain.link/any-api/testnet-oracles/
        req.add("path", "isValidate");
        bytes32 requestId = sendChainlinkRequest(req, fee);
        emit SignUpRequested(_userId, requestId);
        return requestId;
    }

    /**
     * @notice checks the cron jobs in a given range
     * @param start the starting id to check (inclusive)
     * @param end the ending id to check (exclusive)
     * @return _upkeepNeeded signals if upkeep is needed, performData is an abi encoding
     * @return _payload signals if upkeep is needed, performData is an abi encoding
     * of the id and "next tick" of the eligible cron job
     */
    function _checkInRange(
        uint256 start,
        uint256 end
    ) private view returns (bool _upkeepNeeded, bytes memory _payload) {
        for (uint256 idx = start; idx < end; idx++) {
            if (
                giveaways[idx].retweetCount >= giveaways[idx].retweetMaxCount ||
                block.timestamp >= giveaways[idx].endTimestamp
            ) return (true, abi.encode(idx));
        }
    }

    /**
     * @notice Refresh players status for remaining players
     */
    function getPrizeForPosition(uint256 _giveawayId, uint256 _position) private view returns (Prize memory _prize) {
        for (uint256 idx = 0; idx < prizes[_giveawayId].length; idx++) {
            if (prizes[_giveawayId][idx].position == _position) return prizes[_giveawayId][idx];
        }
    }

    /**
     * @notice Add winner
     */
    function _addWinner(
        uint256 _giveawayId,
        uint256 _position,
        uint256 _winnerId,
        address _winnerAddress,
        uint256 _amount
    ) private {
        winners[_giveawayId].push(
            Winner({
                roundId: _giveawayId,
                position: _position,
                userId: _winnerId,
                playerAddress: _winnerAddress,
                amountWon: _amount,
                prizeClaimed: false
            })
        );
        emit WinnerAdded(_giveawayId, _position, _winnerId, _amount);
    }
}
