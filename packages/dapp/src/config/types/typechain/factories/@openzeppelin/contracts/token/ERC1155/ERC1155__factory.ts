/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ERC1155,
  ERC1155Interface,
} from "../../../../../@openzeppelin/contracts/token/ERC1155/ERC1155";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "uri_",
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
        name: "account",
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
        name: "operator",
        type: "address",
      },
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
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
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
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
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
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
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
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
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
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
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
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "uri",
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
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620019a7380380620019a783398101604081905262000034916200006e565b6200003f8162000046565b506200029e565b6002620000548282620001d2565b5050565b634e487b7160e01b600052604160045260246000fd5b600060208083850312156200008257600080fd5b82516001600160401b03808211156200009a57600080fd5b818501915085601f830112620000af57600080fd5b815181811115620000c457620000c462000058565b604051601f8201601f19908116603f01168101908382118183101715620000ef57620000ef62000058565b8160405282815288868487010111156200010857600080fd5b600093505b828410156200012c57848401860151818501870152928501926200010d565b600086848301015280965050505050505092915050565b600181811c908216806200015857607f821691505b6020821081036200017957634e487b7160e01b600052602260045260246000fd5b50919050565b601f821115620001cd57600081815260208120601f850160051c81016020861015620001a85750805b601f850160051c820191505b81811015620001c957828155600101620001b4565b5050505b505050565b81516001600160401b03811115620001ee57620001ee62000058565b6200020681620001ff845462000143565b846200017f565b602080601f8311600181146200023e5760008415620002255750858301515b600019600386901b1c1916600185901b178555620001c9565b600085815260208120601f198616915b828110156200026f578886015182559484019460019091019084016200024e565b50858210156200028e5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b6116f980620002ae6000396000f3fe608060405234801561001057600080fd5b50600436106100875760003560e01c80634e1273f41161005b5780634e1273f41461010a578063a22cb4651461012a578063e985e9c51461013d578063f242432a1461017957600080fd5b8062fdd58e1461008c57806301ffc9a7146100b25780630e89341c146100d55780632eb2c2d6146100f5575b600080fd5b61009f61009a366004610f8e565b61018c565b6040519081526020015b60405180910390f35b6100c56100c0366004610fe9565b610238565b60405190151581526020016100a9565b6100e86100e336600461100d565b61031b565b6040516100a9919061106c565b6101086101033660046111cb565b6103af565b005b61011d610118366004611275565b610451565b6040516100a9919061137b565b61010861013836600461138e565b61058f565b6100c561014b3660046113ca565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205460ff1690565b6101086101873660046113fd565b61059e565b60006001600160a01b03831661020f5760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201527f616c6964206f776e65720000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b506000818152602081815260408083206001600160a01b03861684529091529020545b92915050565b60007fffffffff0000000000000000000000000000000000000000000000000000000082167fd9b67a260000000000000000000000000000000000000000000000000000000014806102cb57507fffffffff0000000000000000000000000000000000000000000000000000000082167f0e89341c00000000000000000000000000000000000000000000000000000000145b8061023257507f01ffc9a7000000000000000000000000000000000000000000000000000000007fffffffff00000000000000000000000000000000000000000000000000000000831614610232565b60606002805461032a90611462565b80601f016020809104026020016040519081016040528092919081815260200182805461035690611462565b80156103a35780601f10610378576101008083540402835291602001916103a3565b820191906000526020600020905b81548152906001019060200180831161038657829003601f168201915b50505050509050919050565b6001600160a01b0385163314806103cb57506103cb853361014b565b61043d5760405162461bcd60e51b815260206004820152602f60248201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60448201527f6572206e6f7220617070726f76656400000000000000000000000000000000006064820152608401610206565b61044a8585858585610639565b5050505050565b606081518351146104ca5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e67746860448201527f206d69736d6174636800000000000000000000000000000000000000000000006064820152608401610206565b6000835167ffffffffffffffff8111156104e6576104e661107f565b60405190808252806020026020018201604052801561050f578160200160208202803683370190505b50905060005b84518110156105875761055a8582815181106105335761053361149c565b602002602001015185838151811061054d5761054d61149c565b602002602001015161018c565b82828151811061056c5761056c61149c565b6020908102919091010152610580816114c8565b9050610515565b509392505050565b61059a3383836108d7565b5050565b6001600160a01b0385163314806105ba57506105ba853361014b565b61062c5760405162461bcd60e51b815260206004820152602f60248201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60448201527f6572206e6f7220617070726f76656400000000000000000000000000000000006064820152608401610206565b61044a85858585856109e9565b81518351146106b05760405162461bcd60e51b815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060448201527f6d69736d617463680000000000000000000000000000000000000000000000006064820152608401610206565b6001600160a01b03841661072c5760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610206565b3360005b845181101561086957600085828151811061074d5761074d61149c565b60200260200101519050600085838151811061076b5761076b61149c565b602090810291909101810151600084815280835260408082206001600160a01b038e1683529093529190912054909150818110156108115760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201527f72207472616e73666572000000000000000000000000000000000000000000006064820152608401610206565b6000838152602081815260408083206001600160a01b038e8116855292528083208585039055908b1682528120805484929061084e908490611500565b9250508190555050505080610862906114c8565b9050610730565b50846001600160a01b0316866001600160a01b0316826001600160a01b03167f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb87876040516108b9929190611513565b60405180910390a46108cf818787878787610bbf565b505050505050565b816001600160a01b0316836001600160a01b03160361095e5760405162461bcd60e51b815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c2073746174757360448201527f20666f722073656c6600000000000000000000000000000000000000000000006064820152608401610206565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001686151590811790915591519182527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31910160405180910390a3505050565b6001600160a01b038416610a655760405162461bcd60e51b815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152608401610206565b336000610a7185610dcc565b90506000610a7e85610dcc565b90506000868152602081815260408083206001600160a01b038c16845290915290205485811015610b175760405162461bcd60e51b815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201527f72207472616e73666572000000000000000000000000000000000000000000006064820152608401610206565b6000878152602081815260408083206001600160a01b038d8116855292528083208985039055908a16825281208054889290610b54908490611500565b909155505060408051888152602081018890526001600160a01b03808b16928c821692918816917fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62910160405180910390a4610bb4848a8a8a8a8a610e17565b505050505050505050565b6001600160a01b0384163b156108cf576040517fbc197c810000000000000000000000000000000000000000000000000000000081526001600160a01b0385169063bc197c8190610c1c9089908990889088908890600401611541565b6020604051808303816000875af1925050508015610c57575060408051601f3d908101601f19168201909252610c549181019061159f565b60015b610d0c57610c636115bc565b806308c379a003610c9c5750610c776115d8565b80610c825750610c9e565b8060405162461bcd60e51b8152600401610206919061106c565b505b60405162461bcd60e51b815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e204552433131353560448201527f526563656976657220696d706c656d656e7465720000000000000000000000006064820152608401610206565b7fffffffff0000000000000000000000000000000000000000000000000000000081167fbc197c810000000000000000000000000000000000000000000000000000000014610dc35760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608401610206565b50505050505050565b60408051600180825281830190925260609160009190602080830190803683370190505090508281600081518110610e0657610e0661149c565b602090810291909101015292915050565b6001600160a01b0384163b156108cf576040517ff23a6e610000000000000000000000000000000000000000000000000000000081526001600160a01b0385169063f23a6e6190610e749089908990889088908890600401611680565b6020604051808303816000875af1925050508015610eaf575060408051601f3d908101601f19168201909252610eac9181019061159f565b60015b610ebb57610c636115bc565b7fffffffff0000000000000000000000000000000000000000000000000000000081167ff23a6e610000000000000000000000000000000000000000000000000000000014610dc35760405162461bcd60e51b815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608401610206565b80356001600160a01b0381168114610f8957600080fd5b919050565b60008060408385031215610fa157600080fd5b610faa83610f72565b946020939093013593505050565b7fffffffff0000000000000000000000000000000000000000000000000000000081168114610fe657600080fd5b50565b600060208284031215610ffb57600080fd5b813561100681610fb8565b9392505050565b60006020828403121561101f57600080fd5b5035919050565b6000815180845260005b8181101561104c57602081850181015186830182015201611030565b506000602082860101526020601f19601f83011685010191505092915050565b6020815260006110066020830184611026565b634e487b7160e01b600052604160045260246000fd5b601f19601f830116810181811067ffffffffffffffff821117156110bb576110bb61107f565b6040525050565b600067ffffffffffffffff8211156110dc576110dc61107f565b5060051b60200190565b600082601f8301126110f757600080fd5b81356020611104826110c2565b6040516111118282611095565b83815260059390931b850182019282810191508684111561113157600080fd5b8286015b8481101561114c5780358352918301918301611135565b509695505050505050565b600082601f83011261116857600080fd5b813567ffffffffffffffff8111156111825761118261107f565b6040516111996020601f19601f8501160182611095565b8181528460208386010111156111ae57600080fd5b816020850160208301376000918101602001919091529392505050565b600080600080600060a086880312156111e357600080fd5b6111ec86610f72565b94506111fa60208701610f72565b9350604086013567ffffffffffffffff8082111561121757600080fd5b61122389838a016110e6565b9450606088013591508082111561123957600080fd5b61124589838a016110e6565b9350608088013591508082111561125b57600080fd5b5061126888828901611157565b9150509295509295909350565b6000806040838503121561128857600080fd5b823567ffffffffffffffff808211156112a057600080fd5b818501915085601f8301126112b457600080fd5b813560206112c1826110c2565b6040516112ce8282611095565b83815260059390931b85018201928281019150898411156112ee57600080fd5b948201945b838610156113135761130486610f72565b825294820194908201906112f3565b9650508601359250508082111561132957600080fd5b50611336858286016110e6565b9150509250929050565b600081518084526020808501945080840160005b8381101561137057815187529582019590820190600101611354565b509495945050505050565b6020815260006110066020830184611340565b600080604083850312156113a157600080fd5b6113aa83610f72565b9150602083013580151581146113bf57600080fd5b809150509250929050565b600080604083850312156113dd57600080fd5b6113e683610f72565b91506113f460208401610f72565b90509250929050565b600080600080600060a0868803121561141557600080fd5b61141e86610f72565b945061142c60208701610f72565b93506040860135925060608601359150608086013567ffffffffffffffff81111561145657600080fd5b61126888828901611157565b600181811c9082168061147657607f821691505b60208210810361149657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b60007fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82036114f9576114f96114b2565b5060010190565b80820180821115610232576102326114b2565b6040815260006115266040830185611340565b82810360208401526115388185611340565b95945050505050565b60006001600160a01b03808816835280871660208401525060a0604083015261156d60a0830186611340565b828103606084015261157f8186611340565b905082810360808401526115938185611026565b98975050505050505050565b6000602082840312156115b157600080fd5b815161100681610fb8565b600060033d11156115d55760046000803e5060005160e01c5b90565b600060443d10156115e65790565b6040517ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc803d016004833e81513d67ffffffffffffffff816024840111818411171561163457505050505090565b828501915081518181111561164c5750505050505090565b843d87010160208285010111156116665750505050505090565b61167560208286010187611095565b509095945050505050565b60006001600160a01b03808816835280871660208401525084604083015283606083015260a060808301526116b860a0830184611026565b97965050505050505056fea2646970667358221220536c45ab80bf88e2f3e8551ed78c712e2c602d4ae4c27849c7e24f0d9690a7a564736f6c63430008100033";

type ERC1155ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC1155ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC1155__factory extends ContractFactory {
  constructor(...args: ERC1155ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    uri_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC1155> {
    return super.deploy(uri_, overrides || {}) as Promise<ERC1155>;
  }
  override getDeployTransaction(
    uri_: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(uri_, overrides || {});
  }
  override attach(address: string): ERC1155 {
    return super.attach(address) as ERC1155;
  }
  override connect(signer: Signer): ERC1155__factory {
    return super.connect(signer) as ERC1155__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC1155Interface {
    return new utils.Interface(_abi) as ERC1155Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ERC1155 {
    return new Contract(address, _abi, signerOrProvider) as ERC1155;
  }
}
