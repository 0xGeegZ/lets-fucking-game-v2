// SPDX-License-Identifier: MIT
pragma solidity >=0.8.6;

import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import { IGame } from "../interfaces/IGame.sol";
import { ICronUpkeep } from "../interfaces/ICronUpkeep.sol";

import { Factory } from "../abstracts/Factory.sol";
import { Keeper } from "../keepers/Keeper.sol";

contract GameFactoryV2 is Factory {
    using Counters for Counters.Counter;

    uint256[] public authorizedAmounts;
    mapping(uint256 => AuthorizedAmount) public usedAuthorizedAmounts;

    ///
    ///STRUCTS
    ///

    /**
     * @notice AuthorizedAmount structure that contain all usefull data bout an authorized amount
     * @dev TODO NEXT VERSION add default Name and Image to AuthorizedAmount
     */
    struct AuthorizedAmount {
        uint256 amount;
        bool isUsed;
    }

    ///
    ///EVENTS
    ///

    /**
     * @notice Called when a game is created
     */
    event GameCreated(uint256 id, address gameAddress, uint256 implementationVersion, address creatorAddress);

    /**
     * @notice Constructor Tha initialised the factory configuration
     * @param _game the game implementation address
     * @param _cronUpkeep the keeper address
     * @param _itemCreationAmount the game creation amount
     * @param _authorizedAmounts the list of authorized amounts for game creation
     */
    constructor(
        address _game,
        address _cronUpkeep,
        uint256 _itemCreationAmount,
        uint256[] memory _authorizedAmounts
    ) onlyIfAuthorizedAmountsIsNotEmpty(_authorizedAmounts) Factory(_game, _cronUpkeep, _itemCreationAmount) {
        for (uint256 i = 0; i < _authorizedAmounts.length; i++) {
            if (!_isExistAuthorizedAmounts(_authorizedAmounts[i])) {
                authorizedAmounts.push(_authorizedAmounts[i]);
                usedAuthorizedAmounts[_authorizedAmounts[i]] = AuthorizedAmount({
                    isUsed: false,
                    amount: _authorizedAmounts[i]
                });
            }
        }
    }

    ///
    /// MAIN FUNCTIONS
    ///

    /**
     * @notice Create a new game
     * @param _maxPlayers the max players for the game
     * @param _playTimeRange the player time range
     * @param _registrationAmount the registration amount
     * @param _treasuryFee the treasury fee in percent
     * @param _creatorFee the creator fee in %
     * @param _encodedCron the encoded cron as * * * * *
     */
    function createNewGame(
        bytes32 _name,
        uint256 _maxPlayers,
        uint256 _playTimeRange,
        uint256 _registrationAmount,
        uint256 _treasuryFee,
        uint256 _creatorFee,
        string memory _encodedCron,
        IGame.Prize[] memory _prizes
    )
        external
        payable
        whenNotPaused
        onlyItemCreationAmount
        onlyAllowedRegistrationAmount(_registrationAmount)
        onlyIfNotUsedRegistrationAmounts(_registrationAmount)
        returns (address game)
    {
        address latestGameV1Address = versions[latestVersionId].deployedAddress;
        address payable newGameAddress = payable(Clones.clone(latestGameV1Address));

        usedAuthorizedAmounts[_registrationAmount].isUsed = true;
        items.push(
            Item({
                id: id.current(),
                versionId: latestVersionId,
                creator: msg.sender,
                deployedAddress: newGameAddress,
                itemCreationAmount: itemCreationAmount
            })
        );

        ICronUpkeep(cronUpkeep).addDelegator(newGameAddress);

        Keeper keeper = new Keeper(cronUpkeep, "triggerDailyCheckpoint()", _encodedCron);
        ICronUpkeep(cronUpkeep).addDelegator(address(keeper));

        // Declare structure and initialize later to avoid stack too deep exception
        IGame.Initialization memory initialization;
        initialization.creator = msg.sender;
        initialization.owner = owner();
        initialization.cronUpkeep = cronUpkeep;
        initialization.keeper = address(keeper);
        initialization.name = _name;
        initialization.version = latestVersionId;
        initialization.gameId = id.current();
        initialization.playTimeRange = _playTimeRange;
        initialization.maxPlayers = _maxPlayers;
        initialization.registrationAmount = _registrationAmount;
        initialization.treasuryFee = _treasuryFee;
        initialization.creatorFee = _creatorFee;
        initialization.encodedCron = _encodedCron;
        initialization.prizes = _prizes;

        uint256 prizepool = msg.value - itemCreationAmount;
        IGame(newGameAddress).initialize{ value: prizepool }(initialization);

        keeper.registerCronToUpkeep(newGameAddress);
        keeper.transferOwnership(newGameAddress);

        emit GameCreated(id.current(), newGameAddress, latestVersionId, msg.sender);
        id.increment();

        return newGameAddress;
    }

    ///
    ///INTERNAL FUNCTIONS
    ///

    /**
     * @notice Check if authorized amount exist
     * @param _authorizedAmount the authorized amount to check
     * @return isExist true if exist false if not
     */
    function _isExistAuthorizedAmounts(uint256 _authorizedAmount) internal view returns (bool isExist) {
        for (uint256 i = 0; i < authorizedAmounts.length; i++) {
            if (authorizedAmounts[i] == _authorizedAmount) return true;
        }
        return false;
    }

    ///
    ///GETTER FUNCTIONS
    ///

    /**
     * @notice Get the list of deployed itemsVersions
     * @return allGames the list of itemsVersions
     */
    function getDeployedGames() external view returns (Item[] memory allGames) {
        return items;
    }

    /**
     * @notice Get the list of authorized amounts
     * @return gameAuthorisedAmounts the list of authorized amounts
     */
    function getAuthorizedAmounts() external view returns (uint256[] memory gameAuthorisedAmounts) {
        return authorizedAmounts;
    }

    /**
     * @notice Get authorized amount
     * @param _authorizedAmount the authorized amount to get
     * @return gameAuthorisedAmount the authorized amount
     */
    function getAuthorizedAmount(
        uint256 _authorizedAmount
    ) external view returns (AuthorizedAmount memory gameAuthorisedAmount) {
        return usedAuthorizedAmounts[_authorizedAmount];
    }

    ///
    ///ADMIN FUNCTIONS
    ///

    /**
     * @notice Add some authorized amounts
     * @param _authorizedAmounts the list of authorized amounts to add
     * @dev Callable by admin
     */
    function addAuthorizedAmounts(uint256[] memory _authorizedAmounts) external onlyAdmin {
        for (uint256 i = 0; i < _authorizedAmounts.length; i++) {
            if (!_isExistAuthorizedAmounts(_authorizedAmounts[i])) {
                authorizedAmounts.push(_authorizedAmounts[i]);
                usedAuthorizedAmounts[_authorizedAmounts[i]] = AuthorizedAmount({
                    isUsed: false,
                    amount: _authorizedAmounts[i]
                });
            }
        }
    }

    ///
    /// MODIFIERS
    ///

    /**
     * @notice Modifier that ensure that registration amount is part of allowed registration amounts
     * @param _registrationAmount the receiver for the funds (admin or factory)
     */
    modifier onlyAllowedRegistrationAmount(uint256 _registrationAmount) {
        require(
            usedAuthorizedAmounts[_registrationAmount].amount == _registrationAmount,
            "registrationAmout is not allowed"
        );
        _;
    }

    /**
     * @notice Modifier that ensure that registration amount is part of allowed registration amounts
     * @param _registrationAmount authorized amount
     */
    modifier onlyIfNotUsedRegistrationAmounts(uint256 _registrationAmount) {
        require(
            _registrationAmount == 0 || !usedAuthorizedAmounts[_registrationAmount].isUsed,
            "registrationAmout is already used"
        );
        _;
    }

    /**
     * @notice Modifier that ensure that authorized amounts param is not empty
     * @param _authorizedAmounts list of authorized amounts
     */
    modifier onlyIfAuthorizedAmountsIsNotEmpty(uint256[] memory _authorizedAmounts) {
        require(_authorizedAmounts.length >= 1, "authorizedAmounts should be greather or equal to 1");
        _;
    }
}
