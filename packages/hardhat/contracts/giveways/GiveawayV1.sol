// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

import "@openzeppelin/contracts/utils/structs/EnumerableMap.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import { IGiveaway } from "../interfaces/IGiveaway.sol";
import { ICronUpkeep } from "../interfaces/ICronUpkeep.sol";
import { IKeeper } from "../interfaces/IKeeper.sol";

import { KeeperHelpers } from "../libraries/KeeperHelpers.sol";

import { Child } from "../abstracts/Child.sol";

contract GiveawayV1 is Child, IGiveaway, ChainlinkClient, KeeperCompatibleInterface {
    using Chainlink for Chainlink.Request;
    using EnumerableMap for EnumerableMap.UintToAddressMap;
    using Counters for Counters.Counter;

    address public keeper;

    bytes32 public immutable jobId;
    uint256 private immutable fee;

    string public requestBaseURI;

    mapping(uint256 => Giveaway) public giveaways;
    EnumerableMap.UintToAddressMap private users;

    ///
    /// CONSTRUCTOR
    ///

    /**
     * @notice Initialize the link token and target oracle
     * All testnets config : https://docs.chain.link/any-api/testnet-oracles/
     */
    constructor(
        bytes32 _jobId,
        string memory _requestBaseURI,
        address _oracle,
        address _link,
        uint256 _treasuryFee,
        address[] memory _allowedTokensERC20,
        address[] memory _allowedTokensERC721
    ) Child(_allowedTokensERC20, _allowedTokensERC721) {
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
    ) external payable override {
        giveaways[epoch.current()] = Giveaway({
            name: _name,
            image: _image,
            creator: msg.sender,
            userId: _userId,
            tweetId: _tweetId,
            endTimestamp: _endTimestamp,
            retweetCount: 0,
            retweetMaxCount: _retweetMaxCount,
            isEnded: false
        });

        // Setup prizes structure
        _checkIfPrizeAmountIfNeeded(_prizes);
        _addPrizes(_prizes);

        // Limitation for current version as standard for NFT is not implemented
        require(_isChildAllPrizesStandard(), "This version only allow standard prize");

        emit GiveawayCreated(epoch.current(), _userId, _tweetId, _prizes.length);

        epoch.increment();
    }

    /**
     * @notice Function that allow user to sign up to giveaway and claim wonned giveaways
     */
    function signUp(uint256 _userId) external override {
        users.set(_userId, msg.sender);

        emit SignedUp(_userId, msg.sender);
        _requestSignUp(_userId);
    }

    /**
     * @notice Check if user has signed up
     * @param _userId - twitter user id
     */
    function hasSignedUp(uint256 _userId) external view override returns (bool) {
        return users.contains(_userId);
    }

    /**
     * @notice Check if caller has signed up
     */
    function hasSignedUp() external view override returns (bool) {
        bool found = false;
        for (uint256 idx = 0; idx < users.length(); idx++) if (users.get(idx) == msg.sender) found = true;
        return found;
    }

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
    function fulfillGiveawayWinner(
        bytes32 _requestId,
        uint256 _giveawayId,
        bytes calldata _payload
    ) public override recordChainlinkFulfillment(_requestId) {
        (uint256[] memory winnersIds, uint256[] memory winnersPositions) = abi.decode(_payload, (uint256[], uint256[]));
        giveaways[_giveawayId].isEnded = true;

        for (uint256 i = 0; i < winnersIds.length; i++) {
            (bool _found, Prize memory prize) = _getPrizeForPosition(_giveawayId, winnersPositions[i]);
            require(_found, "No prize found for winner");
            (, address winnerAddress) = users.tryGet(winnersIds[i]);
            _addWinner(_giveawayId, winnersPositions[i], winnersIds[i], winnerAddress, prize);
        }
    }

    /**
     * @notice Fulfill Sign Up request
     *
     * @param _requestId - id of the request
     * @param _userId - twitter user id
     * @param _hasSignedUp - true if  twitter userId match msg.sender address
     */
    function fulfillSignUp(
        bytes32 _requestId,
        uint256 _userId,
        bool _hasSignedUp
    ) public override recordChainlinkFulfillment(_requestId) {
        if (!_hasSignedUp) users.remove(_userId);

        address user = users.get(_userId);
        for (uint256 round = 0; round < epoch.current(); round++)
            for (uint256 idx = 0; idx < winners[round].length; idx++)
                if (winners[round][idx].userId == _userId) winners[round][idx].playerAddress = user;
    }

    /**
     * @notice Fulfill Refresh Giveaway request
     *
     * @param _requestId - id of the request
     * @param _giveawayId - id of the giveaway
     * @param _retweetCount - updated retweet count
     */
    function fulfillRefreshGiveaway(
        bytes32 _requestId,
        uint256 _giveawayId,
        uint256 _retweetCount
    ) public override recordChainlinkFulfillment(_requestId) {
        giveaways[_giveawayId].retweetCount = _retweetCount;
        if (_isGiveawayCouldEnded(giveaways[_giveawayId])) _performGiveawayWinner(_giveawayId);
    }

    ///
    /// KEEPER FUNCTIONS
    ///s
    /**
     * @notice Refresh all active giveaways retweet count
     */
    function refreshActiveGiveawayStatus() external override whenNotPaused {
        for (uint256 round = 0; round < epoch.current(); round++)
            if (!giveaways[round].isEnded) {
                _requestRefreshGiveaway(round);
                emit GiveawayRefreshed(round, block.timestamp);
            }
    }

    /**
     * @notice Launched by upkeep when condition match
     * @param _performData abi encoding of giveawayId
     */
    function performUpkeep(bytes calldata _performData) external override whenNotPaused {
        uint256 giveawayId = abi.decode(_performData, (uint256));
        _performGiveawayWinner(giveawayId);
    }

    /**
     * @notice Get the id of an eligible giveaway
     * @return _upkeepNeeded signals if upkeep is needed, performData is an abi encoding
     * @return _payload signals if upkeep is needed, performData is an abi encoding
     * of giveawayId
     */
    function checkUpkeep(
        bytes memory _calldata
    ) external view override whenNotPaused returns (bool _upkeepNeeded, bytes memory _payload) {
        _calldata; // dummy call to _calldata to avoir warning
        uint256 startIdx = block.number % epoch.current();
        bool result;
        bytes memory payload;
        (result, payload) = _checkInBatch(startIdx, epoch.current());
        if (result) return (result, payload);

        (result, payload) = _checkInBatch(0, startIdx);
        if (result) return (result, payload);

        return (false, bytes(""));
    }

    ///
    /// GETTERS FUNCTIONS
    ///

    /**
     * @notice Return URI for giveaway endpoint
     */
    function getGiveawayURI(uint256 _giveawayId) public view override returns (string memory _giveawayURI) {
        return
            string(
                abi.encodePacked(
                    requestBaseURI,
                    "/chains/",
                    block.chainid,
                    "/giveaways/",
                    _giveawayId,
                    "/winners",
                    "?prizes=",
                    prizes[_giveawayId].length,
                    "&tweetId",
                    giveaways[_giveawayId].tweetId,
                    "&retweetMaxCount",
                    giveaways[_giveawayId].retweetMaxCount
                )
            );
    }

    /**
     * @notice Return URI for giveaway endpoint
     */
    function getGiveawayRefreshURI(uint256 _giveawayId) public view override returns (string memory _giveawayURI) {
        return
            string(
                abi.encodePacked(
                    requestBaseURI,
                    "/chains/",
                    block.chainid,
                    "/giveaways/",
                    _giveawayId,
                    "/refresh",
                    "?tweetId",
                    giveaways[_giveawayId].tweetId
                )
            );
    }

    /**
     * @notice Return URI for sign up endpoint
     */
    function getSignUpURI(uint256 _userId) public view override returns (string memory _signUpURI) {
        return string(abi.encodePacked(requestBaseURI, "/users/", _userId));
    }

    /**
     * @notice Get the list of deployed giveaways
     * @return _giveaways the list of giveaways
     */
    function getGiveaways() external view override returns (Giveaway[] memory _giveaways) {
        Giveaway[] memory allGiveaways = new Giveaway[](epoch.current());
        for (uint256 idx = 0; idx < epoch.current(); idx++) allGiveaways[idx] = giveaways[idx];
        return allGiveaways;
    }

    ///
    /// ADMIN FUNCTIONS
    ///

    /**
     * @notice Setup the keeper and adding cron to upkeep
     * @param _cronUpkeep the new keeper address
     * @param _encodedCron the encodedCron
     * @dev Callable by admin
     */
    function setupKeeper(
        address _cronUpkeep,
        string memory _encodedCron
    ) external override whenPaused onlyAdmin onlyAddressInit(_cronUpkeep) {
        keeper = KeeperHelpers.createKeeper(_cronUpkeep, "refreshActiveGiveawayStatus()", _encodedCron);
        ICronUpkeep(_cronUpkeep).addDelegator(address(keeper));
        IKeeper(keeper).registerCronToUpkeep();
    }

    /**
     * @notice Pause the current giveaway and associated keeper job
     * @dev Callable by admin or creator
     */
    function pauseGiveaways() external override whenNotPaused onlyAdmin {
        _pause();
        IKeeper(keeper).pauseKeeper();
    }

    /**
     * @notice Unpause the current giveaway and associated keeper job
     * @dev Callable by admin or creator
     */
    function unpauseGiveaways() external override whenPaused onlyAdmin {
        _unpause();
        IKeeper(keeper).unpauseKeeper();
    }

    /**
     * @notice Witdraws LINK from the contract to the Owner
     * @dev only admin can call this function
     */
    function withdrawLink() external override onlyAdmin {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(owner, link.balanceOf(address(this))), "Unable to transfer");
    }

    /**
     * @notice Set requestBaseURI
     * @dev only admin can call this function
     */
    function setRequestBaseURI(string calldata _requestBaseURI) external override onlyAdmin {
        requestBaseURI = _requestBaseURI;
    }

    /**
     * @notice Add user to users list
     * @dev only admin can call this function
     */
    function addUser(uint256 _userId, address _userAddress) external override onlyAdmin {
        if (!users.contains(_userId)) users.set(_userId, _userAddress);
    }

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
    ) public override onlyAdmin {
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
        require(!giveaways[_giveawayId].isEnded, "Giveaway already ended");
    }

    /**
     * @notice Create request to get giveaway winner
     * @dev only admin can call this function
     */
    function _requestGiveawayWinner(uint256 _giveawayId) private onlyAdmin whenNotPaused returns (bytes32 _requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillGiveawayWinner.selector);
        req.add("get", getGiveawayURI(_giveawayId));
        // https://docs.chain.link/any-api/testnet-oracles/
        req.add("path", "payload");
        bytes32 requestId = sendChainlinkRequest(req, fee);
        emit GiveawayWinnerRequested(_giveawayId, requestId);
        return requestId;
    }

    /**
     * @notice Create request to sign up user
     * @dev only admin can call this function
     */
    function _requestSignUp(uint256 _userId) private onlyAdmin whenNotPaused returns (bytes32 _requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfillSignUp.selector);
        req.add("get", getSignUpURI(_userId));
        // https://docs.chain.link/any-api/testnet-oracles/
        req.add("path", "hasSignedUp");
        bytes32 requestId = sendChainlinkRequest(req, fee);
        emit SignUpRequested(_userId, requestId);
        return requestId;
    }

    /**
     * @notice Create request to refresh giveaway
     * @dev only admin can call this function
     */
    function _requestRefreshGiveaway(uint256 _giveawayId) private onlyAdmin whenNotPaused returns (bytes32 _requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfillRefreshGiveaway.selector
        );
        req.add("get", getGiveawayRefreshURI(_giveawayId));
        // https://docs.chain.link/any-api/testnet-oracles/
        req.add("path", "retweetCount");
        bytes32 requestId = sendChainlinkRequest(req, fee);
        emit GiveawayRefreshRequested(_giveawayId, requestId);
        return requestId;
    }

    /**
     * @notice Perform _requestGiveawayWinner for needed giveaway
     * @param _giveawayId the giveaway id
     */
    function _performGiveawayWinner(uint256 _giveawayId) private onlyAdmin whenNotPaused {
        _validate(_giveawayId);
        _requestRefreshGiveaway(_giveawayId);
        _requestGiveawayWinner(_giveawayId);
        emit PerformUpkeepExecuted(_giveawayId, block.timestamp);
    }

    /**
     * @notice checks the cron jobs in a given range
     * @param start the starting id to check (inclusive)
     * @param end the ending id to check (exclusive)
     * @return _upkeepNeeded signals if upkeep is needed, performData is an abi encoding
     * @return _payload signals if upkeep is needed, performData is an abi encoding
     * of the id and "next tick" of the eligible cron job
     */
    function _checkInBatch(
        uint256 start,
        uint256 end
    ) private view returns (bool _upkeepNeeded, bytes memory _payload) {
        for (uint256 idx = start; idx < end; idx++) {
            if (_isGiveawayCouldEnded(giveaways[idx])) return (true, abi.encode(idx));
        }
    }

    function _isGiveawayCouldEnded(Giveaway memory _giveaway) private view returns (bool _isCouldEnded) {
        return
            (_giveaway.retweetMaxCount != 0 && _giveaway.retweetCount >= _giveaway.retweetMaxCount) ||
            block.timestamp >= _giveaway.endTimestamp;
    }

    /**
     * @notice Add winner for given giveaway
     * @param _giveawayId giveaway id
     * @param _position position of winner
     * @param _winnerId twitter id of winner
     * @param _winnerAddress winner address
     * @param _prize prize
     * TODO NEXT VERSION : Standardize this function and pass it to child smart contract
     */
    function _addWinner(
        uint256 _giveawayId,
        uint256 _position,
        uint256 _winnerId,
        address _winnerAddress,
        Prize memory _prize
    ) private {
        uint256 treasuryRoundAmount = (_prize.amount * treasuryFee) / 10000;
        uint256 rewardAmount = _prize.amount - treasuryRoundAmount;
        winners[_giveawayId].push(
            Winner({
                epoch: _giveawayId,
                userId: _winnerId,
                playerAddress: _winnerAddress,
                amountWon: rewardAmount,
                position: _position,
                standard: _prize.standard,
                contractAddress: _prize.contractAddress,
                tokenId: _prize.tokenId,
                prizeClaimed: false
            })
        );
        emit WinnerAdded(_giveawayId, _position, _winnerId, _prize.contractAddress, _prize.amount, _prize.tokenId);
        treasuryAmount += treasuryRoundAmount;
    }
}
