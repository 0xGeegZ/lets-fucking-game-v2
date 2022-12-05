// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";

import { Child } from "../abstracts/Child.sol";

import "hardhat/console.sol";

contract GivewayV1 is Child, ChainlinkClient, KeeperCompatibleInterface {
    bytes32 public name;

    bytes32 public immutable jobId;
    string public requestBaseURI;
    uint256 private immutable fee;

    // address private immutable oracle;
    // address public linkAddress;

    // TODO add stop constraints list
    // Composed of :
    //  - a timestamp for the end
    //  - a retweet count limit (0 if no limit)
    //  - a list of prizes
    //  - a list of winners

    struct Giveaway {
        address token;
        uint256 prize;
    }

    mapping(string => Giveaway) public s_giveaways;

    ///
    /// CONSTRUCTOR
    ///

    /**
     * @notice Constructor that define itself as base
     */
    constructor(
        bytes32 _name,
        bytes32 _jobId,
        string memory _requestBaseURI,
        address _oracle,
        address _link,
        uint256 _treasuryFee
    ) Child() {
        setChainlinkToken(_link);
        setChainlinkOracle(_oracle);
        name = _name;
        jobId = _jobId;
        requestBaseURI = _requestBaseURI;
        // oracle = _oracle;
        // linkAddress = _linkAddress;
        treasuryFee = _treasuryFee;
        fee = (1 * LINK_DIVISIBILITY) / 10; // 0,1 * 10**18 (Varies by network and job)

        owner = msg.sender;
    }

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Function that allow players to register for a game
     * @dev Creator cannot register for his own game
     */
    function createGiveway() external payable {}

    /**
     * @notice Function that allow players to register for a game
     * @dev Creator cannot register for his own game
     */
    function requestGivewayWinner() external payable {}

    // TODO https://github.com/taijusanagi/chainlink-aa-paymaster-wallet/blob/main/packages/contracts/contracts/ChainlinkStripePaymaster.sol
    // TODO https://github.com/charifmews/tweet.win/blob/main/contracts/GiveAwayTweet.sol

    ///
    /// KEEPER FUNCTIONS
    ///
    /**
     * @notice Executes the cron job with id encoded in performData
     * @param _performData abi encoding of cron job ID and the cron job's next run-at datetime
     */
    function performUpkeep(bytes calldata _performData) external override whenNotPaused {}

    /**
     * @notice Get the id of an eligible cron job
     * @return upkeepNeeded signals if upkeep is needed, performData is an abi encoding
     * of the id and "next tick" of the eligible cron job
     */
    function checkUpkeep(bytes memory _calldata) external view override whenNotPaused returns (bool, bytes memory) {}

    ///
    /// GETTERS FUNCTIONS
    ///

    /**
     * @notice Function that is called by the keeper when game is ready to start
     */
    function getRequestURI(string memory _givewayId) public view returns (string memory) {
        return string(abi.encodePacked(requestBaseURI, _givewayId));
    }
}
