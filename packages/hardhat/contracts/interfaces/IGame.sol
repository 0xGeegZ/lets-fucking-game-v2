// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/utils/Address.sol";

import { IChild } from "./IChild.sol";

interface IGame is IChild {
    ///STRUCTS

    /**
     * @notice Player structure that contain all usefull data for a player
     */
    struct Player {
        address playerAddress;
        uint256 roundRangeLowerLimit;
        uint256 roundRangeUpperLimit;
        bool hasPlayedRound;
        uint256 roundCount;
        uint256 position;
        bool hasLost;
        bool isSplitOk;
    }

    /**
     * @notice Initialization structure that contain all the data that are needed to create a new game
     */
    struct Initialization {
        address owner;
        address creator;
        address cronUpkeep;
        address keeper;
        bytes32 name;
        uint256 version;
        uint256 gameId;
        uint256 playTimeRange;
        uint256 maxPlayers;
        uint256 registrationAmount;
        uint256 treasuryFee;
        uint256 creatorFee;
        string encodedCron;
        Prize[] prizes;
    }

    struct GameData {
        uint256 gameId;
        uint256 versionId;
        uint256 epoch;
        bytes32 name;
        uint256 playerAddressesCount;
        uint256 remainingPlayersCount;
        uint256 maxPlayers;
        uint256 registrationAmount;
        uint256 playTimeRange;
        uint256 treasuryFee;
        uint256 creatorFee;
        bool isPaused;
        bool isInProgress;
        address creator;
        address admin;
        string encodedCron;
    }

    struct UpdateGameData {
        bytes32 name;
        uint256 maxPlayers;
        uint256 registrationAmount;
        uint256 playTimeRange;
        uint256 treasuryFee;
        uint256 creatorFee;
        string encodedCron;
    }

    ///
    ///EVENTS
    ///

    /**
     * @notice Called when a player has registered for a game
     */
    event RegisteredForGame(address playerAddress, uint256 playersCount);
    /**
     * @notice Called when the keeper start the game
     */
    event StartedGame(uint256 timelock, uint256 playersCount);
    /**
     * @notice Called when the keeper reset the game
     */
    event ResetGame(uint256 timelock, uint256 resetId);
    /**
     * @notice Called when a player lost a game
     */
    event GameLost(uint256 epoch, address playerAddress, uint256 roundCount);
    /**
     * @notice Called when a player play a round
     */
    event PlayedRound(address playerAddress);
    /**
     * @notice Called when a player won the game
     */
    event GameWon(uint256 epoch, uint256 winnersCounter, address playerAddress, uint256 amountWon);
    /**
     * @notice Called when some player(s) split the game
     */
    event GameSplitted(uint256 epoch, uint256 remainingPlayersCount, uint256 amountWon);
    /**
     * @notice Called when a player vote to split pot
     */
    event VoteToSplitPot(uint256 epoch, address playerAddress);
    /**
     * @notice Called when TriggerDailyCheckpoint function is called
     */
    event TriggeredDailyCheckpoint(uint256 epoch, address emmiter, uint256 timestamp);

    ///
    /// INITIALISATION
    ///

    /**
     * @notice Create a new Game Implementation by cloning the base contract
     * @param _initialization the initialisation data with params as follow :
     *  @param _initialization.creator the game creator
     *  @param _initialization.owner the general admin address
     *  @param _initialization.cronUpkeep the cron upkeep address
     *  @param _initialization.name the game name
     *  @param _initialization.version the version of the game implementation
     *  @param _initialization.gameId the unique game gameId (fix)
     *  @param _initialization.playTimeRange the time range during which a player can play in hour
     *  @param _initialization.maxPlayers the maximum number of players for a game
     *  @param _initialization.registrationAmount the amount that players will need to pay to enter in the game
     *  @param _initialization.treasuryFee the treasury fee in percent
     *  @param _initialization.creatorFee creator fee in percent
     *  @param _initialization.encodedCron the cron string
     *  @param _initialization.prizes the cron string
     * @dev TODO NEXT VERSION Remove _isChildAllPrizesStandard limitation to include other prize typ
     * @dev TODO NEXT VERSION Make it only accessible to factory
     */
    function initialize(Initialization calldata _initialization) external payable;

    /**
     * @notice Function that is called by the keeper when game is ready to start
     * @dev TODO NEXT VERSION remove this function in next smart contract version
     */
    function startGame() external;

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Function that allow players to register for a game
     * @dev Creator cannot register for his own game
     */
    function registerForGame() external payable;

    /**
     * @notice Function that allow players to play for the current round
     * @dev Creator cannot play for his own game
     * @dev Callable by remaining players
     */
    function playRound() external;

    /**
     * @notice Function that is called by the keeper based on the keeper cron
     * @dev Callable by admin or keeper
     * @dev TODO NEXT VERSION Update triggerDailyCheckpoint to make it only callable by keeper
     */
    function triggerDailyCheckpoint() external;

    /**
     * @notice Function that allow player to vote to split pot
     * @dev Only callable if less than 50% of the players remain
     * @dev Callable by remaining players
     */
    function voteToSplitPot() external;

    ///
    /// GETTERS FUNCTIONS
    ///

    /**
     * @notice Return game informations
     * @return gameData the game status data with params as follow :
     *  gameData.creator the creator address of the game
     *  gameData.epoch the epoch of the game
     *  gameData.name the name of the game
     *  gameData.playerAddressesCount the number of registered players
     *  gameData.maxPlayers the maximum players of the game
     *  gameData.registrationAmount the registration amount of the game
     *  gameData.playTimeRange the player time range of the game
     *  gameData.treasuryFee the treasury fee of the game
     *  gameData.creatorFee the creator fee of the game
     *  gameData.isPaused a boolean set to true if game is paused
     *  gameData.isInProgress a boolean set to true if game is in progress
     */
    function getGameData() external view returns (GameData memory gameData);

    /**
     * @notice Return game informations
     * @dev Callable by admin or creator
     * @param _updateGameData the game data to update
     *  _updateGameData.name the name of the game
     *  _updateGameData.maxPlayers the maximum players of the game
     *  _updateGameData.registrationAmount the registration amount of the game
     *  _updateGameData.playTimeRange the player time range of the game
     *  _updateGameData.treasuryFee the treasury fee of the game
     *  _updateGameData.creatorFee the creator fee of the game
     *  _updateGameData.encodedCron the encoded cron of the game
     */
    function setGameData(UpdateGameData memory _updateGameData) external;

    /**
     * @notice Return the players addresses for the current game
     * @return gamePlayerAddresses list of players addresses
     */
    function getPlayerAddresses() external view returns (address[] memory gamePlayerAddresses);

    /**
     * @notice Return a player for the current game
     * @param _player the player address
     * @return gamePlayer if finded
     */
    function getPlayer(address _player) external view returns (Player memory gamePlayer);

    /**
     * @notice Check if all remaining players are ok to split pot
     * @return isSplitOk set to true if all remaining players are ok to split pot, false otherwise
     */
    function isAllPlayersSplitOk() external view returns (bool isSplitOk);

    /**
     * @notice Check if Game is payable
     * @return isPayable set to true if game is payable, false otherwise
     */
    function isGamePayable() external view returns (bool isPayable);

    /**
     * @notice Check if Game prizes are standard
     * @return isStandard true if game prizes are standard, false otherwise
     */
    function isGameAllPrizesStandard() external view returns (bool isStandard);

    /**
     * @notice Get the number of remaining players for the current game
     * @return remainingPlayersCount the number of remaining players for the current game
     */
    function getRemainingPlayersCount() external view returns (uint256 remainingPlayersCount);

    ///
    /// SETTERS FUNCTIONS
    ///

    /**
     * @notice Set the name of the game
     * @param _name the new game name
     * @dev Callable by creator
     */
    function setName(bytes32 _name) external;

    /**
     * @notice Set the playTimeRange of the game
     * @param _playTimeRange the new game playTimeRange
     * @dev Callable by creator
     */
    function setPlayTimeRange(uint256 _playTimeRange) external;

    /**
     * @notice Set the maximum allowed players for the game
     * @param _maxPlayers the new max players limit
     * @dev Callable by admin or creator
     */
    function setMaxPlayers(uint256 _maxPlayers) external;

    /**
     * @notice Set the creator fee for the game
     * @param _creatorFee the new creator fee in %
     * @dev Callable by admin or creator
     * @dev Callable when game if not in progress
     */
    function setCreatorFee(uint256 _creatorFee) external;

    /**
     * @notice Set the keeper address
     * @param _cronUpkeep the new keeper address
     * @dev Callable by admin or factory
     */
    function setCronUpkeep(address _cronUpkeep) external;

    /**
     * @notice Set the encoded cron
     * @param _encodedCron the new encoded cron as * * * * *
     * @dev Callable by admin or creator
     */
    function setEncodedCron(string memory _encodedCron) external;

    /**
     * @notice Allow creator to withdraw his fee
     * @dev Callable by admin
     */
    function claimCreatorFee() external;

    ///
    /// EMERGENCY
    ///

    /**
     * @notice Transfert Creator Ownership
     * @param _creator the new creator address
     * @dev Callable by creator
     */
    function transferCreatorOwnership(address _creator) external;
}
