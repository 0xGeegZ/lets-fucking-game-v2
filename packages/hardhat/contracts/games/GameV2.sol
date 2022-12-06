// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import { IGame } from "../interfaces/IGame.sol";
import { IChild } from "../interfaces/IChild.sol";
import { ICronUpkeep } from "../interfaces/ICronUpkeep.sol";
import { IKeeper } from "../interfaces/IKeeper.sol";

import { Child } from "../abstracts/Child.sol";

contract GameV2 is Child, IGame {
    bool private _isBase;

    uint256 private randNonce;

    address public creator;

    address public keeper;

    uint256 private cronUpkeepJobId;

    uint256 public registrationAmount;

    uint256 public constant MAX_CREATOR_FEE = 500; // 5%

    uint256 public creatorFee; // treasury rate (e.g. 200 = 2%, 150 = 1.50%)
    uint256 public creatorAmount; // treasury amount that was not claimed

    uint256 public id; // id is fix and represent the fixed id for the game

    bytes32 public name;

    uint256 public version;

    uint256 public playTimeRange; // time length of a round in hours

    uint256 public maxPlayers;

    bool public isInProgress; // helps the keeper determine if a game has started or if we need to start it

    address[] public playerAddresses;
    mapping(address => Player) public players;

    ///
    /// CONSTRUCTOR AND INITIALISATION
    ///

    /**
     * @notice Constructor that define itself as base
     */
    constructor() Child() {
        _isBase = true;
    }

    /**
     * @notice Create a new Game Implementation by cloning the base contract
     * @param _initialization the initialisation data with params as follow :
     *  @param _initialization.creator the game creator
     *  @param _initialization.owner the general admin address
     *  @param _initialization.cronUpkeep the cron upkeep address
     *  @param _initialization.name the game name
     *  @param _initialization.version the version of the game implementation
     *  @param _initialization.id the unique game id (fix)
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
    function initialize(
        Initialization calldata _initialization
    )
        external
        payable
        override
        onlyIfNotBase
        onlyIfNotAlreadyInitialized
        onlyAllowedNumberOfPlayers(_initialization.maxPlayers)
        onlyAllowedPlayTimeRange(_initialization.playTimeRange)
        onlyTreasuryFee(_initialization.treasuryFee)
        onlyCreatorFee(_initialization.creatorFee)
        onlyIfPrizesParam(_initialization.prizes)
    {
        owner = _initialization.owner;
        creator = _initialization.creator;
        factory = msg.sender;
        keeper = _initialization.keeper;

        name = _initialization.name;

        randNonce = 0;

        registrationAmount = _initialization.registrationAmount;
        treasuryFee = _initialization.treasuryFee;
        creatorFee = _initialization.creatorFee;

        treasuryAmount = 0;
        creatorAmount = 0;

        id = _initialization.id;
        version = _initialization.version;

        roundId = 0;
        playTimeRange = _initialization.playTimeRange;
        maxPlayers = _initialization.maxPlayers;

        // Setup prizes structure
        _checkIfPrizeAmountIfNeeded(_initialization.prizes);
        _addPrizes(_initialization.prizes);

        // Verify Game Configuration :
        // Game can only be payable only if also standard
        // OR Game can be not payable and everything else
        require((_isGamePayable() && _isChildAllPrizesStandard()) || !_isGamePayable(), "Configuration missmatch");

        // Limitation for current version as standard for NFT is not implemented
        require(_isChildAllPrizesStandard(), "This version only allow standard prize");
    }

    /**
     * @notice Function that is called by the keeper when game is ready to start
     * @dev TODO NEXT VERSION remove this function in next smart contract version
     */
    function startGame() external override onlyAdminOrCreator whenNotPaused onlyIfFull {
        _startGame();
    }

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Function that allow players to register for a game
     * @dev Creator cannot register for his own game
     */
    function registerForGame()
        external
        payable
        override
        onlyHumans
        whenNotPaused
        onlyIfGameIsNotInProgress
        onlyIfNotFull
        onlyIfNotAlreadyEntered
        onlyRegistrationAmount
        onlyNotCreator
    {
        players[msg.sender] = Player({
            playerAddress: msg.sender,
            roundCount: 0,
            hasPlayedRound: false,
            hasLost: false,
            isSplitOk: false,
            position: playerAddresses.length + 1,
            roundRangeUpperLimit: 0,
            roundRangeLowerLimit: 0
        });
        playerAddresses.push(msg.sender);

        emit RegisteredForGame(players[msg.sender].playerAddress, playerAddresses.length);
    }

    /**
     * @notice Function that allow players to play for the current round
     * @dev Creator cannot play for his own game
     * @dev Callable by remaining players
     */
    function playRound()
        external
        override
        onlyHumans
        whenNotPaused
        onlyIfFull
        onlyIfAlreadyEntered
        onlyIfHasNotLost
        onlyIfHasNotPlayedThisRound
        onlyNotCreator
        onlyIfGameIsInProgress
    {
        Player storage player = players[msg.sender];

        //Check if attempt is in the allowed time slot
        if (block.timestamp < player.roundRangeLowerLimit || block.timestamp > player.roundRangeUpperLimit)
            _setPlayerAsHavingLost(player);
        else {
            player.hasPlayedRound = true;
            player.roundCount += 1;
            emit PlayedRound(player.playerAddress);
        }
    }

    /**
     * @notice Function that is called by the keeper based on the keeper cron
     * @dev Callable by admin or keeper
     * @dev TODO NEXT VERSION Update triggerDailyCheckpoint to make it only callable by keeper
     */
    function triggerDailyCheckpoint() external override onlyAdminOrKeeper whenNotPaused {
        if (isInProgress) {
            _refreshPlayerStatus();
            _checkIfGameEnded();
        } else if (playerAddresses.length == maxPlayers) _startGame();

        emit TriggeredDailyCheckpoint(roundId, msg.sender, block.timestamp);
    }

    /**
     * @notice Function that allow player to vote to split pot
     * @dev Only callable if less than 50% of the players remain
     * @dev Callable by remaining players
     */
    function voteToSplitPot()
        external
        override
        onlyIfGameIsInProgress
        onlyIfAlreadyEntered
        onlyIfHasNotLost
        onlyIfPlayersLowerHalfRemaining
        onlyIfGameIsSplittable
    {
        players[msg.sender].isSplitOk = true;
        emit VoteToSplitPot(roundId, players[msg.sender].playerAddress);
    }

    ///
    /// INTERNAL FUNCTIONS
    ///

    /**
     * @notice Start the game(called when all conditions are ok)
     */
    function _startGame() internal {
        for (uint256 i = 0; i < playerAddresses.length; i++) _resetRoundRange(players[playerAddresses[i]]);
        isInProgress = true;
        emit StartedGame(block.timestamp, playerAddresses.length);
    }

    /**
     * @notice Reset the game (called at the end of the current game)
     */
    function _resetGame() internal {
        isInProgress = false;
        for (uint256 i = 0; i < playerAddresses.length; i++) delete players[playerAddresses[i]];

        delete playerAddresses;

        emit ResetGame(block.timestamp, roundId);
        roundId += 1;

        // Stop game if not payable to allow creator to add prizes
        if (!_isGamePayable()) return _pauseGame();

        Prize[] storage oldPrize = prizes[roundId - 1];

        for (uint256 i = 0; i < oldPrize.length; i++) _addPrize(oldPrize[i]);
    }

    /**
     * @notice Internal function for prizes adding management
     * @param _prizes list of prize details
     */
    function _addPrizes(Prize[] memory _prizes) internal override {
        uint256 prizepool = 0;
        for (uint256 i = 0; i < _prizes.length; i++) {
            _addPrize(_prizes[i]);
            prizepool += _prizes[i].amount;
        }

        if (_isGamePayable()) {
            uint256 prizepoolVerify = registrationAmount * maxPlayers;
            require(prizepool == prizepoolVerify, "Wrong total amount to won");
        }
    }

    /**
     * @notice Check if game as ended
     * If so, it will create winners and reset the game
     */
    function _checkIfGameEnded() internal {
        uint256 remainingPlayersCount = _getRemainingPlayersCount();
        bool isPlitPot = _isAllPlayersSplitOk();

        if (remainingPlayersCount > 1 && !isPlitPot) return;

        uint256 treasuryRoundAmount = 0;
        uint256 creatorRoundAmount = 0;

        Prize[] memory _prizes = prizes[roundId];

        if (remainingPlayersCount == 1)
            // Distribute prizes over winners
            for (uint256 i = 0; i < playerAddresses.length; i++) {
                Player memory currentPlayer = players[playerAddresses[i]];

                if (!currentPlayer.hasLost) {
                    // Player is winner
                    treasuryRoundAmount = (_prizes[0].amount * treasuryFee) / 10000;
                    creatorRoundAmount = (_prizes[0].amount * creatorFee) / 10000;
                    uint256 rewardAmount = _prizes[0].amount - treasuryRoundAmount - creatorRoundAmount;

                    _addWinner(0, currentPlayer.playerAddress, rewardAmount);
                } else if (i < _prizes.length && currentPlayer.position <= _prizes[i].position) {
                    // Player has won a prize
                    treasuryRoundAmount = (_prizes[0].amount * treasuryFee) / 10000;
                    creatorRoundAmount = (_prizes[0].amount * creatorFee) / 10000;
                    uint256 rewardAmount = _prizes[0].amount - treasuryRoundAmount - creatorRoundAmount;

                    _addWinner(currentPlayer.position, currentPlayer.playerAddress, rewardAmount);
                }
            }

        if (isPlitPot) {
            // Split with remaining player
            uint256 prizepool = 0;
            for (uint256 i = 0; i < _prizes.length; i++) prizepool += _prizes[i].amount;

            treasuryRoundAmount = (prizepool * treasuryFee) / 10000;
            creatorRoundAmount = (prizepool * creatorFee) / 10000;
            uint256 rewardAmount = prizepool - treasuryRoundAmount - creatorRoundAmount;
            uint256 splittedPrize = rewardAmount / remainingPlayersCount;

            for (uint256 i = 0; i < playerAddresses.length; i++) {
                Player memory currentPlayer = players[playerAddresses[i]];
                if (!currentPlayer.hasLost && currentPlayer.isSplitOk)
                    _addWinner(1, currentPlayer.playerAddress, splittedPrize);
            }
            emit GameSplitted(roundId, remainingPlayersCount, splittedPrize);
        }

        if (remainingPlayersCount == 0)
            // Creator will take everything except the first prize that goes to the treasury
            for (uint256 i = 0; i < _prizes.length; i++) {
                treasuryRoundAmount = (_prizes[i].amount * treasuryFee) / 10000;
                creatorRoundAmount = (_prizes[i].amount * creatorFee) / 10000;

                uint256 rewardAmount = _prizes[i].amount - treasuryRoundAmount - creatorRoundAmount;

                address winnerAddress = i == 1 ? owner : creator;
                _addWinner(_prizes[i].position, winnerAddress, rewardAmount);
            }

        treasuryAmount += treasuryRoundAmount;
        creatorAmount += creatorRoundAmount;
        _resetGame();
    }

    /**
     * @notice Refresh players status for remaining players
     */
    function _refreshPlayerStatus() internal {
        // If everyone is ok to split, we wait
        if (_isAllPlayersSplitOk()) return;

        for (uint256 i = 0; i < playerAddresses.length; i++) {
            Player storage player = players[playerAddresses[i]];
            // Refresh player status to having lost if player has not played
            if (!player.hasPlayedRound && !player.hasLost) _setPlayerAsHavingLost(player);
            else {
                // Reset round limits and round status for each remaining user
                _resetRoundRange(player);
                player.hasPlayedRound = false;
            }
        }
    }

    function _addWinner(uint256 _position, address _playerAddress, uint256 _amount) internal {
        Prize memory prize = _getPrizeForPosition(roundId, _position);
        winners[roundId].push(
            Winner({
                roundId: roundId,
                position: _position,
                userId: 0,
                playerAddress: _playerAddress,
                amountWon: _amount,
                standard: prize.standard,
                contractAddress: prize.contractAddress,
                tokenId: prize.tokenId,
                prizeClaimed: false
            })
        );
        emit GameWon(roundId, winners[roundId].length, _playerAddress, _amount);
    }

    /**
     * @notice Check if msg.value have the right amount if needed
     * @param _prizes list of prize details
     */
    function _checkIfPrizeAmountIfNeeded(Prize[] memory _prizes) internal view override {
        if (_isGamePayable()) return;

        uint256 prizepool = 0;
        for (uint256 i = 0; i < _prizes.length; i++) prizepool += _prizes[i].amount;

        require(msg.value == prizepool, "Need to send prizepool amount");
    }

    /**
     * @notice Internal function to check if game is payable
     * @return isPayable set to true if game is payable
     */
    function _isGamePayable() internal view returns (bool isPayable) {
        return registrationAmount > 0;
    }

    /**
     * @notice Returns a number between 0 and 24 minus the current length of a round
     * @param _playerAddress the player address
     * @return randomNumber the generated number
     */
    function _randMod(address _playerAddress) internal returns (uint256 randomNumber) {
        // Increase nonce
        randNonce++;
        uint256 maxUpperRange = 25 - playTimeRange; // We use 25 because modulo excludes the higher limit
        uint256 randNumber = uint256(keccak256(abi.encodePacked(block.timestamp, _playerAddress, randNonce))) %
            maxUpperRange;
        return randNumber;
    }

    /**
     * @notice Reset the round range for a player
     * @param _player the player
     */
    function _resetRoundRange(Player storage _player) internal {
        uint256 newRoundLowerLimit = _randMod(_player.playerAddress);
        _player.roundRangeLowerLimit = block.timestamp + newRoundLowerLimit * 60 * 60;
        _player.roundRangeUpperLimit = _player.roundRangeLowerLimit + playTimeRange * 60 * 60;
    }

    /**
     * @notice Update looser player
     * @param _player the player
     */
    function _setPlayerAsHavingLost(Player storage _player) internal {
        _player.position = _getRemainingPlayersCount();
        _player.hasLost = true;
        _player.isSplitOk = false;

        emit GameLost(roundId, _player.playerAddress, _player.roundCount);
    }

    /**
     * @notice Check if all remaining players are ok to split pot
     * @return isSplitOk set to true if all remaining players are ok to split pot, false otherwise
     */
    function _isAllPlayersSplitOk() internal view returns (bool isSplitOk) {
        uint256 remainingPlayersSplitOkCounter = 0;
        uint256 remainingPlayersLength = _getRemainingPlayersCount();
        for (uint256 i = 0; i < playerAddresses.length; i++)
            if (players[playerAddresses[i]].isSplitOk) remainingPlayersSplitOkCounter++;

        return remainingPlayersLength != 0 && remainingPlayersSplitOkCounter == remainingPlayersLength;
    }

    /**
     * @notice Get the number of remaining players for the current game
     * @return remainingPlayersCount the number of remaining players for the current game
     */
    function _getRemainingPlayersCount() internal view returns (uint256 remainingPlayersCount) {
        uint256 remainingPlayers = 0;
        for (uint256 i = 0; i < playerAddresses.length; i++)
            if (!players[playerAddresses[i]].hasLost) remainingPlayers++;

        return remainingPlayers;
    }

    /**
     * @notice Pause the current game and associated keeper job
     * @dev Callable by admin or creator
     */

    function _pauseGame() internal whenNotPaused {
        _pause();
        IKeeper(keeper).pauseKeeper();
    }

    /**
     * @notice Unpause the current game and associated keeper job
     * @dev Callable by admin or creator
     */
    function _unpauseGame() internal whenPaused {
        _unpause();

        // Reset round limits and round status for each remaining user
        for (uint256 i = 0; i < playerAddresses.length; i++) {
            Player storage player = players[playerAddresses[i]];
            if (!player.hasLost) {
                _resetRoundRange(player);
                player.hasPlayedRound = false;
            }
        }
        IKeeper(keeper).unpauseKeeper();
    }

    ///
    /// GETTERS FUNCTIONS
    ///

    /**
     * @notice Return game informations
     * @return gameData the game status data with params as follow :
     *  gameData.creator the creator address of the game
     *  gameData.roundId the roundId of the game
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
    function getGameData() external view override returns (GameData memory gameData) {
        return
            GameData({
                id: id,
                versionId: version,
                roundId: roundId,
                name: name,
                playerAddressesCount: playerAddresses.length,
                remainingPlayersCount: _getRemainingPlayersCount(),
                maxPlayers: maxPlayers,
                registrationAmount: registrationAmount,
                playTimeRange: playTimeRange,
                treasuryFee: treasuryFee,
                creatorFee: creatorFee,
                isPaused: paused(),
                isInProgress: isInProgress,
                creator: creator,
                admin: owner,
                encodedCron: IKeeper(keeper).getEncodedCron()
            });
    }

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
    function setGameData(UpdateGameData memory _updateGameData) external override whenPaused onlyAdminOrCreator {
        if (_updateGameData.name != name) name = _updateGameData.name;
        if (_updateGameData.maxPlayers != maxPlayers) maxPlayers = _updateGameData.maxPlayers;
        if (_updateGameData.registrationAmount != registrationAmount)
            registrationAmount = _updateGameData.registrationAmount;
        if (_updateGameData.playTimeRange != playTimeRange) playTimeRange = _updateGameData.playTimeRange;
        if (_updateGameData.treasuryFee != treasuryFee) treasuryFee = _updateGameData.treasuryFee;
        if (_updateGameData.creatorFee != creatorFee) creatorFee = _updateGameData.creatorFee;
        if (
            keccak256(abi.encodePacked(_updateGameData.encodedCron)) !=
            keccak256(abi.encodePacked(IKeeper(keeper).getEncodedCron()))
        ) IKeeper(keeper).setEncodedCron(_updateGameData.encodedCron);
    }

    /**
     * @notice Return the players addresses for the current game
     * @return gamePlayerAddresses list of players addresses
     */
    function getPlayerAddresses() external view override returns (address[] memory gamePlayerAddresses) {
        return playerAddresses;
    }

    /**
     * @notice Return a player for the current game
     * @param _player the player address
     * @return gamePlayer if finded
     */
    function getPlayer(address _player) external view override returns (Player memory gamePlayer) {
        return players[_player];
    }

    /**
     * @notice Return cronUpkeep
     * @dev Callable by only by owner
     */
    function getCronUpkeep() external view returns (address _cronUpkeep) {
        return IKeeper(keeper).getCronUpkeep();
    }

    /**
     * @notice Return encodedCron
     * @dev Callable by only by owner
     */
    function getEncodedCron() external view returns (string memory _encodedCron) {
        return IKeeper(keeper).getEncodedCron();
    }

    /**
     * @notice Check if all remaining players are ok to split pot
     * @return isSplitOk set to true if all remaining players are ok to split pot, false otherwise
     */
    function isAllPlayersSplitOk() external view override returns (bool isSplitOk) {
        return _isAllPlayersSplitOk();
    }

    /**
     * @notice Check if Game is payable
     * @return isPayable set to true if game is payable, false otherwise
     */
    function isGamePayable() external view override returns (bool isPayable) {
        return _isGamePayable();
    }

    /**
     * @notice Check if Game prizes are standard
     * @return isStandard true if game prizes are standard, false otherwise
     */
    function isGameAllPrizesStandard() external view override returns (bool isStandard) {
        return _isChildAllPrizesStandard();
    }

    /**
     * @notice Get the number of remaining players for the current game
     * @return remainingPlayersCount the number of remaining players for the current game
     */
    function getRemainingPlayersCount() external view override returns (uint256 remainingPlayersCount) {
        return _getRemainingPlayersCount();
    }

    ///
    /// SETTERS FUNCTIONS
    ///

    /**
     * @notice Set the name of the game
     * @param _name the new game name
     * @dev Callable by creator
     */
    function setName(bytes32 _name) external override onlyCreator {
        name = _name;
    }

    /**
     * @notice Set the playTimeRange of the game
     * @param _playTimeRange the new game playTimeRange
     * @dev Callable by creator
     */
    function setPlayTimeRange(uint256 _playTimeRange) external override whenPaused onlyCreator {
        playTimeRange = _playTimeRange;
    }

    /**
     * @notice Set the maximum allowed players for the game
     * @param _maxPlayers the new max players limit
     * @dev Callable by admin or creator
     */
    function setMaxPlayers(
        uint256 _maxPlayers
    )
        external
        override
        whenPaused
        onlyAdminOrCreator
        onlyAllowedNumberOfPlayers(_maxPlayers)
        onlyIfGameIsNotInProgress
    {
        maxPlayers = _maxPlayers;
    }

    /**
     * @notice Set the creator fee for the game
     * @param _creatorFee the new creator fee in %
     * @dev Callable by admin or creator
     * @dev Callable when game if not in progress
     */
    function setCreatorFee(
        uint256 _creatorFee
    ) external override onlyAdminOrCreator onlyIfGameIsNotInProgress onlyCreatorFee(_creatorFee) {
        creatorFee = _creatorFee;
    }

    /**
     * @notice Set the keeper address
     * @param _cronUpkeep the new keeper address
     * @dev Callable by admin or factory
     */
    function setCronUpkeep(
        address _cronUpkeep
    ) external override whenPaused onlyAdminOrFactory onlyAddressInit(address(_cronUpkeep)) {
        ICronUpkeep(_cronUpkeep).addDelegator(address(keeper));
        IKeeper(keeper).setCronUpkeep(_cronUpkeep);
    }

    /**
     * @notice Set the encoded cron
     * @param _encodedCron the new encoded cron as * * * * *
     * @dev Callable by admin or creator
     */
    function setEncodedCron(string memory _encodedCron) external override whenPaused onlyAdminOrCreator {
        IKeeper(keeper).setEncodedCron(_encodedCron);
    }

    /**
     * @notice Allow creator to withdraw his fee
     * @dev Callable by admin
     */
    function claimCreatorFee()
        external
        override
        onlyCreator
        onlyIfClaimableAmount(creatorAmount)
        onlyIfEnoughtBalance(creatorAmount)
    {
        uint256 currentCreatorAmount = creatorAmount;
        creatorAmount = 0;
        emit CreatorFeeClaimed(currentCreatorAmount);
        _safeTransfert(creator, currentCreatorAmount);
    }

    /**
     * @notice Pause the current game and associated keeper job
     * @dev Callable by admin or creator
     */
    function pause() external override(Child, IChild) onlyAdminOrCreatorOrFactory whenNotPaused {
        _pauseGame();
    }

    /**
     * @notice Unpause the current game and associated keeper job
     * @dev Callable by admin or creator
     */
    function unpause()
        external
        override(Child, IChild)
        onlyAdminOrCreatorOrFactory
        whenPaused
        onlyIfKeeperDataInit
        onlyIfPrizesIsNotEmpty
    {
        _unpauseGame();
    }

    ///
    /// EMERGENCY
    ///

    /**
     * @notice Transfert Creator Ownership
     * @param _creator the new creator address
     * @dev Callable by creator
     */
    function transferCreatorOwnership(address _creator) external override onlyCreator onlyAddressInit(_creator) {
        emit CreatorOwnershipTransferred(creator, _creator);
        creator = _creator;
    }

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
    // fallback() external payable virtual ;

    ///
    /// MODIFIERS
    ///

    /**
     * @notice Modifier that ensure only creator can access this function
     */
    modifier onlyCreator() {
        require(msg.sender == creator, "Caller is not the creator");
        _;
    }

    /**
     * @notice Modifier that ensure only not creator can access this function
     */
    modifier onlyNotCreator() {
        require(msg.sender != creator, "Caller can't be the creator");
        _;
    }

    /**
     * @notice Modifier that ensure only admin or creator can access this function
     */
    modifier onlyAdminOrCreator() {
        require(msg.sender == creator || msg.sender == owner, "Caller is not the admin or creator");
        _;
    }

    /**
     * @notice Modifier that ensure only admin or creator or factory can access this function
     */
    modifier onlyAdminOrCreatorOrFactory() {
        require(
            msg.sender == creator || msg.sender == owner || msg.sender == address(factory),
            "Caller is not the admin or creator or factory"
        );
        _;
    }

    /**
     * @notice Modifier that ensure only admin or keeper can access this function
     */
    modifier onlyAdminOrKeeper() {
        require(
            msg.sender == address(IKeeper(keeper).getCronUpkeep()) || msg.sender == owner,
            "Caller is not the admin or keeper"
        );
        _;
    }

    /**
     * @notice Modifier that ensure only keeper can access this function
     */
    modifier onlyKeeper() {
        require(msg.sender == address(IKeeper(keeper).getCronUpkeep()), "Caller is not the keeper");
        _;
    }

    /**
     * @notice Modifier that ensure that keeper data are initialised
     */
    modifier onlyIfKeeperDataInit() {
        require(address(IKeeper(keeper).getCronUpkeep()) != address(0), "Keeper need to be initialised");
        require(bytes(IKeeper(keeper).getEncodedCron()).length != 0, "Keeper cron need to be initialised");
        _;
    }

    /**
     * @notice Modifier that ensure that game is not full
     */
    modifier onlyIfNotFull() {
        require(playerAddresses.length < maxPlayers, "This game is full");
        _;
    }

    /**
     * @notice Modifier that ensure that game is full
     */
    modifier onlyIfFull() {
        require(playerAddresses.length == maxPlayers, "This game is not full");
        _;
    }

    /**
     * @notice Modifier that ensure that player not already entered in the game
     */
    modifier onlyIfNotAlreadyEntered() {
        require(players[msg.sender].playerAddress == address(0), "Player already entered in this game");
        _;
    }

    /**
     * @notice Modifier that ensure that player already entered in the game
     */
    modifier onlyIfAlreadyEntered() {
        require(players[msg.sender].playerAddress != address(0), "Player has not entered in this game");
        _;
    }

    /**
     * @notice Modifier that ensure that player has not lost
     */
    modifier onlyIfHasNotLost() {
        require(!players[msg.sender].hasLost, "Player has already lost");
        _;
    }

    /**
     * @notice Modifier that ensure that player has not already played this round
     */
    modifier onlyIfHasNotPlayedThisRound() {
        require(!players[msg.sender].hasPlayedRound, "Player has already played in this round");
        _;
    }

    /**
     * @notice Modifier that ensure that there is less than 50% of remaining players
     */
    modifier onlyIfPlayersLowerHalfRemaining() {
        uint256 remainingPlayersLength = _getRemainingPlayersCount();
        require(
            remainingPlayersLength <= maxPlayers / 2,
            "Remaining players must be less or equal than half of started players"
        );
        _;
    }

    /**
     * @notice Modifier that ensure that the game is in progress
     */
    modifier onlyIfGameIsInProgress() {
        require(isInProgress, "Game is not in progress");
        _;
    }

    /**
     * @notice Modifier that ensure that the game is not in progress
     */
    modifier onlyIfGameIsNotInProgress() {
        require(!isInProgress, "Game is already in progress");
        _;
    }

    /**
     * @notice Modifier that ensure that amount sended is registration amount
     */
    modifier onlyRegistrationAmount() {
        require(msg.value == registrationAmount, "Only registration amount is allowed");
        _;
    }

    /**
     * @notice Modifier that ensure that there is less than 50% of remaining players
     */
    modifier onlyIfPlayerWon() {
        uint256 remainingPlayersLength = _getRemainingPlayersCount();
        require(
            remainingPlayersLength <= maxPlayers / 2,
            "Remaining players must be less or equal than half of started players"
        );
        _;
    }

    /**
     * @notice Modifier that ensure that we can't initialize the implementation contract
     */
    modifier onlyIfNotBase() {
        require(!_isBase, "The implementation contract can't be initialized");
        _;
    }

    /**
     * @notice Modifier that ensure that we can't initialize a cloned contract twice
     */
    modifier onlyIfNotAlreadyInitialized() {
        require(creator == address(0), "Contract already initialized");
        _;
    }

    /**
     * @notice Modifier that ensure that max players is in allowed range
     */
    modifier onlyAllowedNumberOfPlayers(uint256 _maxPlayers) {
        require(_maxPlayers > 1, "maxPlayers should be bigger than or equal to 2");
        require(_maxPlayers <= 100, "maxPlayers should not be bigger than 100");
        _;
    }

    /**
     * @notice Modifier that ensure that play time range is in allowed range
     */
    modifier onlyAllowedPlayTimeRange(uint256 _playTimeRange) {
        require(_playTimeRange > 0, "playTimeRange should be bigger than 0");
        require(_playTimeRange < 9, "playTimeRange should not be bigger than 8");
        _;
    }

    /**
     * @notice Modifier that ensure that creator fee are not too high
     */
    modifier onlyCreatorFee(uint256 _creatorFee) {
        require(_creatorFee <= MAX_CREATOR_FEE, "Creator fee too high");
        _;
    }

    /**
     * @notice Modifier that ensure that game is payable
     */
    modifier onlyIfGameIsPayable() {
        require(_isGamePayable(), "Game is not payable");
        _;
    }

    /**
     * @notice Modifier that ensure that game is not payable
     */
    modifier onlyIfGameIsNotPayable() {
        require(!_isGamePayable(), "Game is payable");
        _;
    }

    /**
     * @notice Modifier that ensure that game is splittable
     */
    modifier onlyIfGameIsSplittable() {
        require(_isChildAllPrizesStandard(), "Game is not splittable");
        _;
    }
}
