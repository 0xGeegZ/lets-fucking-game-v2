/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IGame,
  IGameInterface,
} from "../../../contracts/interfaces/IGame";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminOwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountClaimed",
        type: "uint256",
      },
    ],
    name: "ChildPrizeClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CreatorFeeClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldCreator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newCreator",
        type: "address",
      },
    ],
    name: "CreatorOwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "cronUpkeep",
        type: "address",
      },
    ],
    name: "CronUpkeepUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "jobId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "encodedCron",
        type: "string",
      },
    ],
    name: "EncodedCronUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "oldFactory",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newFactory",
        type: "address",
      },
    ],
    name: "FactoryOwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "roundCount",
        type: "uint256",
      },
    ],
    name: "GameLost",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "claimer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountClaimed",
        type: "uint256",
      },
    ],
    name: "GamePrizeClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "remainingPlayersCount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountWon",
        type: "uint256",
      },
    ],
    name: "GameSplitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "winnersCounter",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountWon",
        type: "uint256",
      },
    ],
    name: "GameWon",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
    ],
    name: "PlayedRound",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "position",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "standard",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "contractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "PrizeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Received",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "playersCount",
        type: "uint256",
      },
    ],
    name: "RegisteredForGame",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timelock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "resetId",
        type: "uint256",
      },
    ],
    name: "ResetGame",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "timelock",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "playersCount",
        type: "uint256",
      },
    ],
    name: "StartedGame",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TreasuryFeeClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TreasuryFeeClaimedByFactory",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "emmiter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "TriggeredDailyCheckpoint",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "epoch",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "playerAddress",
        type: "address",
      },
    ],
    name: "VoteToSplitPot",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "position",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "standard",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct IChild.Prize[]",
        name: "_prizes",
        type: "tuple[]",
      },
    ],
    name: "addPrizes",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "addTokenERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "addTokenERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimCreatorFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
    ],
    name: "claimPrize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimTreasuryFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getGameData",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "versionId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "epoch",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "playerAddressesCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "remainingPlayersCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPlayers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "registrationAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "playTimeRange",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "treasuryFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "creatorFee",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isPaused",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isInProgress",
            type: "bool",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "admin",
            type: "address",
          },
          {
            internalType: "string",
            name: "encodedCron",
            type: "string",
          },
        ],
        internalType: "struct IGame.GameData",
        name: "gameData",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_player",
        type: "address",
      },
    ],
    name: "getPlayer",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "playerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "roundRangeLowerLimit",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "roundRangeUpperLimit",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasPlayedRound",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "roundCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "position",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "hasLost",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isSplitOk",
            type: "bool",
          },
        ],
        internalType: "struct IGame.Player",
        name: "gamePlayer",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayerAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "gamePlayerAddresses",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
    ],
    name: "getPrizes",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "position",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "standard",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        internalType: "struct IChild.Prize[]",
        name: "childPrizes",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRemainingPlayersCount",
    outputs: [
      {
        internalType: "uint256",
        name: "remainingPlayersCount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_epoch",
        type: "uint256",
      },
    ],
    name: "getWinners",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "epoch",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "userId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "playerAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amountWon",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "position",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "standard",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "contractAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "prizeClaimed",
            type: "bool",
          },
        ],
        internalType: "struct IChild.Winner[]",
        name: "childWinners",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "address",
            name: "creator",
            type: "address",
          },
          {
            internalType: "address",
            name: "cronUpkeep",
            type: "address",
          },
          {
            internalType: "address",
            name: "keeper",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "version",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "playTimeRange",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "maxPlayers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "registrationAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "treasuryFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "creatorFee",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "encodedCron",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "position",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "standard",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "contractAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
              },
            ],
            internalType: "struct IChild.Prize[]",
            name: "prizes",
            type: "tuple[]",
          },
        ],
        internalType: "struct IGame.Initialization",
        name: "_initialization",
        type: "tuple",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "isAllPlayersSplitOk",
    outputs: [
      {
        internalType: "bool",
        name: "isSplitOk",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isGameAllPrizesStandard",
    outputs: [
      {
        internalType: "bool",
        name: "isStandard",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isGamePayable",
    outputs: [
      {
        internalType: "bool",
        name: "isPayable",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "playRound",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registerForGame",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "removeTokenERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    name: "removeTokenERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_creatorFee",
        type: "uint256",
      },
    ],
    name: "setCreatorFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_cronUpkeep",
        type: "address",
      },
    ],
    name: "setCronUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_encodedCron",
        type: "string",
      },
    ],
    name: "setEncodedCron",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes32",
            name: "name",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "maxPlayers",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "registrationAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "playTimeRange",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "treasuryFee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "creatorFee",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "encodedCron",
            type: "string",
          },
        ],
        internalType: "struct IGame.UpdateGameData",
        name: "_updateGameData",
        type: "tuple",
      },
    ],
    name: "setGameData",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_maxPlayers",
        type: "uint256",
      },
    ],
    name: "setMaxPlayers",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_name",
        type: "bytes32",
      },
    ],
    name: "setName",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_playTimeRange",
        type: "uint256",
      },
    ],
    name: "setPlayTimeRange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_treasuryFee",
        type: "uint256",
      },
    ],
    name: "setTreasuryFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "startGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_adminAddress",
        type: "address",
      },
    ],
    name: "transferAdminOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_creator",
        type: "address",
      },
    ],
    name: "transferCreatorOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
    ],
    name: "transferFactoryOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "triggerDailyCheckpoint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "voteToSplitPot",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "withdrawERC20",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contractAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "withdrawERC721",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "withdrawFunds",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_receiver",
        type: "address",
      },
    ],
    name: "withdrawNative",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class IGame__factory {
  static readonly abi = _abi;
  static createInterface(): IGameInterface {
    return new utils.Interface(_abi) as IGameInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IGame {
    return new Contract(address, _abi, signerOrProvider) as IGame;
  }
}
