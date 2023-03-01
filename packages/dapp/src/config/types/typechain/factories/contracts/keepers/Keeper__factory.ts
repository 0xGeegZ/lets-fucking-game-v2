/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  Keeper,
  KeeperInterface,
} from "../../../contracts/keepers/Keeper";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_cronUpkeep",
        type: "address",
      },
      {
        internalType: "string",
        name: "_handler",
        type: "string",
      },
      {
        internalType: "string",
        name: "_encodedCron",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    name: "CronUpkeepRegistered",
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
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "cronUpkeep",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "encodedCron",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCronUpkeep",
    outputs: [
      {
        internalType: "address",
        name: "_cronUpkeep",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEncodedCron",
    outputs: [
      {
        internalType: "string",
        name: "_encodedCron",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getHandler",
    outputs: [
      {
        internalType: "string",
        name: "_handler",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "handler",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pauseKeeper",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_target",
        type: "address",
      },
    ],
    name: "registerCronToUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registerCronToUpkeep",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
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
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpauseKeeper",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620013d4380380620013d483398101604081905262000034916200024e565b6200003f33620000a1565b6000805460ff60a01b19169055805162000061906003906020840190620000f1565b50815162000077906004906020850190620000f1565b5050600280546001600160a01b0319166001600160a01b039390931692909217909155506200032b565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b828054620000ff90620002d8565b90600052602060002090601f0160209004810192826200012357600085556200016e565b82601f106200013e57805160ff19168380011785556200016e565b828001600101855582156200016e579182015b828111156200016e57825182559160200191906001019062000151565b506200017c92915062000180565b5090565b5b808211156200017c576000815560010162000181565b600082601f830112620001a957600080fd5b81516001600160401b0380821115620001c657620001c662000315565b604051601f8301601f19908116603f01168101908282118183101715620001f157620001f162000315565b816040528381526020925086838588010111156200020e57600080fd5b600091505b8382101562000232578582018301518183018401529082019062000213565b83821115620002445760008385830101525b9695505050505050565b6000806000606084860312156200026457600080fd5b83516001600160a01b03811681146200027c57600080fd5b60208501519093506001600160401b03808211156200029a57600080fd5b620002a88783880162000197565b93506040860151915080821115620002bf57600080fd5b50620002ce8682870162000197565b9150509250925092565b600181811c90821680620002ed57607f821691505b602082108114156200030f57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fd5b611099806200033b6000396000f3fe608060405234801561001057600080fd5b50600436106100d05760003560e01c806312e028fd146100d55780634acb33a0146100f357806350055e9d14610113578063558e44141461012857806358cc0333146101305780635c975abb1461013857806364be073b14610150578063715018a61461015857806388f9eab4146101605780638da5cb5b146101735780639b798e5c1461017b5780639be6110014610183578063a0dd526f1461018b578063c80916d41461019e578063f2fde38b146101a6578063ff2caa08146101b9575b600080fd5b6100dd6101c1565b6040516100ea9190610ea6565b60405180910390f35b600254610106906001600160a01b031681565b6040516100ea9190610e52565b610126610121366004610bff565b61025b565b005b6100dd6102a7565b610126610335565b610140610387565b60405190151581526020016100ea565b610106610397565b6101266103b1565b61012661016e366004610caa565b6103c5565b6101066103d9565b6101266103e8565b6100dd610467565b610126610199366004610bff565b61047e565b6100dd6104ee565b6101266101b4366004610bff565b6104fb565b610126610576565b60606101cb610623565b600480546101d890610ff2565b80601f016020809104026020016040519081016040528092919081815260200182805461020490610ff2565b80156102515780601f1061022657610100808354040283529160200191610251565b820191906000526020600020905b81548152906001019060200180831161023457829003601f168201915b5050505050905090565b610263610623565b61026c81610682565b6001546002546040516000805160206110448339815191529261029c9290916001600160a01b0390911690610f33565b60405180910390a150565b600380546102b490610ff2565b80601f01602080910402602001604051908101604052809291908181526020018280546102e090610ff2565b801561032d5780601f106103025761010080835404028352916020019161032d565b820191906000526020600020905b81548152906001019060200180831161031057829003601f168201915b505050505081565b61033d610623565b61034d6103486103d9565b610682565b6001546002546040516000805160206110448339815191529261037d9290916001600160a01b0390911690610f33565b60405180910390a1565b600054600160a01b900460ff1690565b60006103a1610623565b506002546001600160a01b031690565b6103b9610623565b6103c3600061090c565b565b6103cd610623565b6103d68161095c565b50565b6000546001600160a01b031690565b6103f06109dd565b6103f8610a25565b60025460015460405163ea87605b60e01b81526001600160a01b039092169163ea87605b9161042d9160040190815260200190565b600060405180830381600087803b15801561044757600080fd5b505af115801561045b573d6000803e3d6000fd5b50506103e76001555050565b6060610471610623565b600380546101d890610ff2565b610486610623565b600280546001600160a01b0319166001600160a01b0383161790556104ac6103486103d9565b6001546002546040517f967edc169058f4cc6ee1336d975d194ac04b9eef04cab44cab8a6104ded9aab89261029c9290916001600160a01b0390911690610f33565b600480546102b490610ff2565b610503610623565b6001600160a01b03811661056d5760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084015b60405180910390fd5b6103d68161090c565b61057e610a75565b6002546001600160a01b03166105d65760405162461bcd60e51b815260206004820152601d60248201527f4b6565706572206e65656420746f20626520696e697469616c697365640000006044820152606401610564565b600380546105e390610ff2565b151590506106035760405162461bcd60e51b815260040161056490610ef1565b6103e76001541461061057565b610618610ac0565b6103c36103486103d9565b3361062c6103d9565b6001600160a01b0316146103c35760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152606401610564565b61068a610623565b6002546040805163448ae98b60e01b815290516000926001600160a01b03169163448ae98b916004808301926020929190829003018186803b1580156106cf57600080fd5b505afa1580156106e3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107079190610d24565b9050806001819055506107cb6040518060400160405280600f81526020016e454e434f4445442043524f4e20257360881b8152506003805461074890610ff2565b80601f016020809104026020016040519081016040528092919081815260200182805461077490610ff2565b80156107c15780601f10610796576101008083540402835291602001916107c1565b820191906000526020600020905b8154815290600101906020018083116107a457829003601f168201915b5050505050610afc565b60405163e04b976960e01b815260009073__$2a5f91f3b8d172a11a2b02e40add8b4c78$__9063e04b97699061080690600390600401610ede565b60006040518083038186803b15801561081e57600080fd5b505af4158015610832573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261085a9190810190610c2f565b60025460408051600480825260248201928390529394506001600160a01b03909216926380fc37b3928792909161089091610de0565b60408051918290039091206020830180516001600160e01b03166001600160e01b0319928316179052905160e085901b90911681526108d59291908690600401610e66565b600060405180830381600087803b1580156108ef57600080fd5b505af1158015610903573d6000803e3d6000fd5b50505050505050565b600080546001600160a01b038381166001600160a01b0319831681178455604051919092169283917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e09190a35050565b610964610a75565b61096c610623565b805161098a5760405162461bcd60e51b815260040161056490610ef1565b805161099d906003906020840190610b66565b506109a96103486103d9565b7f99e95fbe7400e59e10d99096b3cbff90483a22a02d077e8e2f1a7b027cf00487600154600360405161029c929190610f4a565b6109e5610387565b156103c35760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b6044820152606401610564565b610a2d6109dd565b6000805460ff60a01b1916600160a01b1790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610a683390565b60405161037d9190610e52565b610a7d610387565b6103c35760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b6044820152606401610564565b610ac8610a75565b6000805460ff60a01b191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa33610a68565b610b418282604051602401610b12929190610eb9565b60408051601f198184030181529190526020810180516001600160e01b0316634b5c427760e01b179052610b45565b5050565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b828054610b7290610ff2565b90600052602060002090601f016020900481019282610b945760008555610bda565b82601f10610bad57805160ff1916838001178555610bda565b82800160010185558215610bda579182015b82811115610bda578251825591602001919060010190610bbf565b50610be6929150610bea565b5090565b5b80821115610be65760008155600101610beb565b600060208284031215610c1157600080fd5b81356001600160a01b0381168114610c2857600080fd5b9392505050565b600060208284031215610c4157600080fd5b81516001600160401b03811115610c5757600080fd5b8201601f81018413610c6857600080fd5b8051610c7b610c7682610f9b565b610f6b565b818152856020838501011115610c9057600080fd5b610ca1826020830160208601610fc2565b95945050505050565b600060208284031215610cbc57600080fd5b81356001600160401b03811115610cd257600080fd5b8201601f81018413610ce357600080fd5b8035610cf1610c7682610f9b565b818152856020838501011115610d0657600080fd5b81602084016020830137600091810160200191909152949350505050565b600060208284031215610d3657600080fd5b5051919050565b60008151808452610d55816020860160208601610fc2565b601f01601f19169290920160200192915050565b60008154610d7681610ff2565b808552602060018381168015610d935760018114610da757610dd5565b60ff19851688840152604088019550610dd5565b866000528260002060005b85811015610dcd5781548a8201860152908301908401610db2565b890184019650505b505050505092915050565b6000808354610dee81610ff2565b60018281168015610e065760018114610e1757610e46565b60ff19841687528287019450610e46565b8760005260208060002060005b85811015610e3d5781548a820152908401908201610e24565b50505082870194505b50929695505050505050565b6001600160a01b0391909116815260200190565b6001600160a01b0384168152606060208201819052600090610e8a90830185610d3d565b8281036040840152610e9c8185610d3d565b9695505050505050565b602081526000610c286020830184610d3d565b604081526000610ecc6040830185610d3d565b8281036020840152610ca18185610d3d565b602081526000610c286020830184610d69565b60208082526022908201527f4b65657065722063726f6e206e65656420746f20626520696e697469616c6973604082015261195960f21b606082015260800190565b9182526001600160a01b0316602082015260400190565b828152604060208201526000610f636040830184610d69565b949350505050565b604051601f8201601f191681016001600160401b0381118282101715610f9357610f9361102d565b604052919050565b60006001600160401b03821115610fb457610fb461102d565b50601f01601f191660200190565b60005b83811015610fdd578181015183820152602001610fc5565b83811115610fec576000848401525b50505050565b600181811c9082168061100657607f821691505b6020821081141561102757634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052604160045260246000fdfe8c854ed724454b96374a0bb77a40779bdb1a2e30599d0c87b37a3dcd9ef45636a26469706673582212206c154da6b2967c51bf534d4bec0386b562914576128b7866344ac929ecd4254d64736f6c63430008060033";

type KeeperConstructorParams =
  | [linkLibraryAddresses: KeeperLibraryAddresses, signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: KeeperConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => {
  return (
    typeof xs[0] === "string" ||
    (Array.isArray as (arg: any) => arg is readonly any[])(xs[0]) ||
    "_isInterface" in xs[0]
  );
};

export class Keeper__factory extends ContractFactory {
  constructor(...args: KeeperConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      const [linkLibraryAddresses, signer] = args;
      super(_abi, Keeper__factory.linkBytecode(linkLibraryAddresses), signer);
    }
  }

  static linkBytecode(linkLibraryAddresses: KeeperLibraryAddresses): string {
    let linkedBytecode = _bytecode;

    linkedBytecode = linkedBytecode.replace(
      new RegExp("__\\$2a5f91f3b8d172a11a2b02e40add8b4c78\\$__", "g"),
      linkLibraryAddresses[
        "@chainlink/contracts/src/v0.8/libraries/external/Cron.sol:Cron"
      ]
        .replace(/^0x/, "")
        .toLowerCase()
    );

    return linkedBytecode;
  }

  override deploy(
    _cronUpkeep: PromiseOrValue<string>,
    _handler: PromiseOrValue<string>,
    _encodedCron: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Keeper> {
    return super.deploy(
      _cronUpkeep,
      _handler,
      _encodedCron,
      overrides || {}
    ) as Promise<Keeper>;
  }
  override getDeployTransaction(
    _cronUpkeep: PromiseOrValue<string>,
    _handler: PromiseOrValue<string>,
    _encodedCron: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _cronUpkeep,
      _handler,
      _encodedCron,
      overrides || {}
    );
  }
  override attach(address: string): Keeper {
    return super.attach(address) as Keeper;
  }
  override connect(signer: Signer): Keeper__factory {
    return super.connect(signer) as Keeper__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): KeeperInterface {
    return new utils.Interface(_abi) as KeeperInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Keeper {
    return new Contract(address, _abi, signerOrProvider) as Keeper;
  }
}

export interface KeeperLibraryAddresses {
  ["@chainlink/contracts/src/v0.8/libraries/external/Cron.sol:Cron"]: string;
}
