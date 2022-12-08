/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC721,
  ERC721Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC721/ERC721";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
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
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "approved",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
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
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "getApproved",
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
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
    inputs: [],
    name: "name",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "ownerOf",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
    inputs: [],
    name: "symbol",
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
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "tokenURI",
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
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620015073803806200150783398101604081905262000034916200011f565b600062000042838262000218565b50600162000051828262000218565b505050620002e4565b634e487b7160e01b600052604160045260246000fd5b600082601f8301126200008257600080fd5b81516001600160401b03808211156200009f576200009f6200005a565b604051601f8301601f19908116603f01168101908282118183101715620000ca57620000ca6200005a565b81604052838152602092508683858801011115620000e757600080fd5b600091505b838210156200010b5785820183015181830184015290820190620000ec565b600093810190920192909252949350505050565b600080604083850312156200013357600080fd5b82516001600160401b03808211156200014b57600080fd5b620001598683870162000070565b935060208501519150808211156200017057600080fd5b506200017f8582860162000070565b9150509250929050565b600181811c908216806200019e57607f821691505b602082108103620001bf57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200021357600081815260208120601f850160051c81016020861015620001ee5750805b601f850160051c820191505b818110156200020f57828155600101620001fa565b5050505b505050565b81516001600160401b038111156200023457620002346200005a565b6200024c8162000245845462000189565b84620001c5565b602080601f8311600181146200028457600084156200026b5750858301515b600019600386901b1c1916600185901b1785556200020f565b600085815260208120601f198616915b82811015620002b55788860151825594840194600190910190840162000294565b5085821015620002d45787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b61121380620002f46000396000f3fe608060405234801561001057600080fd5b50600436106100df5760003560e01c80636352211e1161008c578063a22cb46511610066578063a22cb465146101c3578063b88d4fde146101d6578063c87b56dd146101e9578063e985e9c5146101fc57600080fd5b80636352211e1461018757806370a082311461019a57806395d89b41146101bb57600080fd5b8063095ea7b3116100bd578063095ea7b31461014c57806323b872dd1461016157806342842e0e1461017457600080fd5b806301ffc9a7146100e457806306fdde031461010c578063081812fc14610121575b600080fd5b6100f76100f2366004610ddb565b610238565b60405190151581526020015b60405180910390f35b61011461028a565b6040516101039190610e48565b61013461012f366004610e5b565b61031c565b6040516001600160a01b039091168152602001610103565b61015f61015a366004610e90565b610343565b005b61015f61016f366004610eba565b61047b565b61015f610182366004610eba565b6104f3565b610134610195366004610e5b565b61050e565b6101ad6101a8366004610ef6565b610573565b604051908152602001610103565b6101146105f9565b61015f6101d1366004610f11565b610608565b61015f6101e4366004610f63565b610617565b6101146101f7366004610e5b565b610696565b6100f761020a36600461103f565b6001600160a01b03918216600090815260056020908152604080832093909416825291909152205460ff1690565b60006001600160e01b031982166380ac58cd60e01b148061026957506001600160e01b03198216635b5e139f60e01b145b8061028457506301ffc9a760e01b6001600160e01b03198316145b92915050565b60606000805461029990611072565b80601f01602080910402602001604051908101604052809291908181526020018280546102c590611072565b80156103125780601f106102e757610100808354040283529160200191610312565b820191906000526020600020905b8154815290600101906020018083116102f557829003601f168201915b5050505050905090565b60006103278261070a565b506000908152600460205260409020546001600160a01b031690565b600061034e8261050e565b9050806001600160a01b0316836001600160a01b0316036103c05760405162461bcd60e51b815260206004820152602160248201527f4552433732313a20617070726f76616c20746f2063757272656e74206f776e656044820152603960f91b60648201526084015b60405180910390fd5b336001600160a01b03821614806103fa57506001600160a01b038116600090815260056020908152604080832033845290915290205460ff165b61046c5760405162461bcd60e51b815260206004820152603e60248201527f4552433732313a20617070726f76652063616c6c6572206973206e6f7420746f60448201527f6b656e206f776e6572206e6f7220617070726f76656420666f7220616c6c000060648201526084016103b7565b6104768383610771565b505050565b61048533826107ec565b6104e85760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016103b7565b61047683838361086b565b61047683838360405180602001604052806000815250610617565b6000818152600260205260408120546001600160a01b0316806102845760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016103b7565b60006001600160a01b0382166105dd5760405162461bcd60e51b815260206004820152602960248201527f4552433732313a2061646472657373207a65726f206973206e6f7420612076616044820152683634b21037bbb732b960b91b60648201526084016103b7565b506001600160a01b031660009081526003602052604090205490565b60606001805461029990611072565b610613338383610a14565b5050565b61062133836107ec565b6106845760405162461bcd60e51b815260206004820152602e60248201527f4552433732313a2063616c6c6572206973206e6f7420746f6b656e206f776e6560448201526d1c881b9bdc88185c1c1c9bdd995960921b60648201526084016103b7565b61069084848484610ae2565b50505050565b60606106a18261070a565b60006106b860408051602081019091526000815290565b905060008151116106d85760405180602001604052806000815250610703565b806106e284610b60565b6040516020016106f39291906110ac565b6040516020818303038152906040525b9392505050565b6000818152600260205260409020546001600160a01b031661076e5760405162461bcd60e51b815260206004820152601860248201527f4552433732313a20696e76616c696420746f6b656e204944000000000000000060448201526064016103b7565b50565b6000818152600460205260409020805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b03841690811790915581906107b38261050e565b6001600160a01b03167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560405160405180910390a45050565b6000806107f88361050e565b9050806001600160a01b0316846001600160a01b0316148061083f57506001600160a01b0380821660009081526005602090815260408083209388168352929052205460ff165b806108635750836001600160a01b03166108588461031c565b6001600160a01b0316145b949350505050565b826001600160a01b031661087e8261050e565b6001600160a01b0316146108e25760405162461bcd60e51b815260206004820152602560248201527f4552433732313a207472616e736665722066726f6d20696e636f72726563742060448201526437bbb732b960d91b60648201526084016103b7565b6001600160a01b0382166109445760405162461bcd60e51b8152602060048201526024808201527f4552433732313a207472616e7366657220746f20746865207a65726f206164646044820152637265737360e01b60648201526084016103b7565b61094f600082610771565b6001600160a01b03831660009081526003602052604081208054600192906109789084906110f1565b90915550506001600160a01b03821660009081526003602052604081208054600192906109a6908490611104565b9091555050600081815260026020526040808220805473ffffffffffffffffffffffffffffffffffffffff19166001600160a01b0386811691821790925591518493918716917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef91a4505050565b816001600160a01b0316836001600160a01b031603610a755760405162461bcd60e51b815260206004820152601960248201527f4552433732313a20617070726f766520746f2063616c6c65720000000000000060448201526064016103b7565b6001600160a01b03838116600081815260056020908152604080832094871680845294825291829020805460ff191686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b610aed84848461086b565b610af984848484610c79565b6106905760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016103b7565b606081600003610b875750506040805180820190915260018152600360fc1b602082015290565b8160005b8115610bb15780610b9b81611117565b9150610baa9050600a83611146565b9150610b8b565b60008167ffffffffffffffff811115610bcc57610bcc610f4d565b6040519080825280601f01601f191660200182016040528015610bf6576020820181803683370190505b5090505b841561086357610c0b6001836110f1565b9150610c18600a8661115a565b610c23906030611104565b60f81b818381518110610c3857610c3861116e565b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350610c72600a86611146565b9450610bfa565b60006001600160a01b0384163b15610dba57604051630a85bd0160e11b81526001600160a01b0385169063150b7a0290610cbd903390899088908890600401611184565b6020604051808303816000875af1925050508015610cf8575060408051601f3d908101601f19168201909252610cf5918101906111c0565b60015b610da0573d808015610d26576040519150601f19603f3d011682016040523d82523d6000602084013e610d2b565b606091505b508051600003610d985760405162461bcd60e51b815260206004820152603260248201527f4552433732313a207472616e7366657220746f206e6f6e20455243373231526560448201527131b2b4bb32b91034b6b83632b6b2b73a32b960711b60648201526084016103b7565b805181602001fd5b6001600160e01b031916630a85bd0160e11b149050610863565b506001949350505050565b6001600160e01b03198116811461076e57600080fd5b600060208284031215610ded57600080fd5b813561070381610dc5565b60005b83811015610e13578181015183820152602001610dfb565b50506000910152565b60008151808452610e34816020860160208601610df8565b601f01601f19169290920160200192915050565b6020815260006107036020830184610e1c565b600060208284031215610e6d57600080fd5b5035919050565b80356001600160a01b0381168114610e8b57600080fd5b919050565b60008060408385031215610ea357600080fd5b610eac83610e74565b946020939093013593505050565b600080600060608486031215610ecf57600080fd5b610ed884610e74565b9250610ee660208501610e74565b9150604084013590509250925092565b600060208284031215610f0857600080fd5b61070382610e74565b60008060408385031215610f2457600080fd5b610f2d83610e74565b915060208301358015158114610f4257600080fd5b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b60008060008060808587031215610f7957600080fd5b610f8285610e74565b9350610f9060208601610e74565b925060408501359150606085013567ffffffffffffffff80821115610fb457600080fd5b818701915087601f830112610fc857600080fd5b813581811115610fda57610fda610f4d565b604051601f8201601f19908116603f0116810190838211818310171561100257611002610f4d565b816040528281528a602084870101111561101b57600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806040838503121561105257600080fd5b61105b83610e74565b915061106960208401610e74565b90509250929050565b600181811c9082168061108657607f821691505b6020821081036110a657634e487b7160e01b600052602260045260246000fd5b50919050565b600083516110be818460208801610df8565b8351908301906110d2818360208801610df8565b01949350505050565b634e487b7160e01b600052601160045260246000fd5b81810381811115610284576102846110db565b80820180821115610284576102846110db565b600060018201611129576111296110db565b5060010190565b634e487b7160e01b600052601260045260246000fd5b60008261115557611155611130565b500490565b60008261116957611169611130565b500690565b634e487b7160e01b600052603260045260246000fd5b60006001600160a01b038087168352808616602084015250836040830152608060608301526111b66080830184610e1c565b9695505050505050565b6000602082840312156111d257600080fd5b815161070381610dc556fea2646970667358221220fc08ebb592b992482a1cf123e3604bceccbb16a644fedd71b3e0eb76c7dd2cdf64736f6c63430008100033";

type ERC721ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC721ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC721__factory extends ContractFactory {
  constructor(...args: ERC721ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC721> {
    return super.deploy(name_, symbol_, overrides || {}) as Promise<ERC721>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(name_, symbol_, overrides || {});
  }
  override attach(address: string): ERC721 {
    return super.attach(address) as ERC721;
  }
  override connect(signer: Signer): ERC721__factory {
    return super.connect(signer) as ERC721__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC721Interface {
    return new utils.Interface(_abi) as ERC721Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC721 {
    return new Contract(address, _abi, signerOrProvider) as ERC721;
  }
}
