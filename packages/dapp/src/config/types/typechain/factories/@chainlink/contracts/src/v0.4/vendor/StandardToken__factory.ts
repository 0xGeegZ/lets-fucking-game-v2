/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../../common";
import type {
  StandardToken,
  StandardTokenInterface,
} from "../../../../../../@chainlink/contracts/src/v0.4/vendor/StandardToken";

const _abi = [
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        name: "",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_from",
        type: "address",
      },
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseApproval",
    outputs: [
      {
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
      {
        name: "_value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      {
        name: "_spender",
        type: "address",
      },
      {
        name: "_addedValue",
        type: "uint256",
      },
    ],
    name: "increaseApproval",
    outputs: [
      {
        name: "success",
        type: "bool",
      },
    ],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address",
      },
      {
        name: "_spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        name: "remaining",
        type: "uint256",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
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
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506105e4806100206000396000f3006080604052600436106100745763ffffffff60e060020a600035041663095ea7b3811461007957806318160ddd146100b157806323b872dd146100d8578063661884631461010257806370a0823114610126578063a9059cbb14610147578063d73dd6231461016b578063dd62ed3e1461018f575b600080fd5b34801561008557600080fd5b5061009d600160a060020a03600435166024356101b6565b604080519115158252519081900360200190f35b3480156100bd57600080fd5b506100c661020a565b60408051918252519081900360200190f35b3480156100e457600080fd5b5061009d600160a060020a0360043581169060243516604435610210565b34801561010e57600080fd5b5061009d600160a060020a036004351660243561030a565b34801561013257600080fd5b506100c6600160a060020a03600435166103e8565b34801561015357600080fd5b5061009d600160a060020a0360043516602435610403565b34801561017757600080fd5b5061009d600160a060020a03600435166024356104a1565b34801561019b57600080fd5b506100c6600160a060020a0360043581169060243516610528565b336000818152600260209081526040808320600160a060020a03871680855290835281842086905581518681529151939490939092600080516020610599833981519152928290030190a350600192915050565b60005481565b600160a060020a03831660008181526002602090815260408083203384528252808320549383526001909152812054909190610252908463ffffffff61055316565b600160a060020a038087166000908152600160205260408082209390935590861681522054610287908463ffffffff61056516565b600160a060020a0385166000908152600160205260409020556102b0818463ffffffff61055316565b600160a060020a0380871660008181526002602090815260408083203384528252918290209490945580518781529051928816939192600080516020610579833981519152929181900390910190a3506001949350505050565b336000908152600260209081526040808320600160a060020a03861684529091528120548083111561035f57336000908152600260209081526040808320600160a060020a0388168452909152812055610394565b61036f818463ffffffff61055316565b336000908152600260209081526040808320600160a060020a03891684529091529020555b336000818152600260209081526040808320600160a060020a038916808552908352928190205481519081529051929392600080516020610599833981519152929181900390910190a35060019392505050565b600160a060020a031660009081526001602052604090205490565b33600090815260016020526040812054610423908363ffffffff61055316565b3360009081526001602052604080822092909255600160a060020a03851681522054610455908363ffffffff61056516565b600160a060020a0384166000818152600160209081526040918290209390935580518581529051919233926000805160206105798339815191529281900390910190a350600192915050565b336000908152600260209081526040808320600160a060020a03861684529091528120546104d5908363ffffffff61056516565b336000818152600260209081526040808320600160a060020a038916808552908352928190208590558051948552519193600080516020610599833981519152929081900390910190a350600192915050565b600160a060020a03918216600090815260026020908152604080832093909416825291909152205490565b60008282111561055f57fe5b50900390565b8181018281101561057257fe5b929150505600ddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925a165627a7a72305820e429133a0459b8f86260f9407ddbdaedc36c025979c4bd875eef8f996f504abd0029";

type StandardTokenConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: StandardTokenConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class StandardToken__factory extends ContractFactory {
  constructor(...args: StandardTokenConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<StandardToken> {
    return super.deploy(overrides || {}) as Promise<StandardToken>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): StandardToken {
    return super.attach(address) as StandardToken;
  }
  override connect(signer: Signer): StandardToken__factory {
    return super.connect(signer) as StandardToken__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): StandardTokenInterface {
    return new utils.Interface(_abi) as StandardTokenInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): StandardToken {
    return new Contract(address, _abi, signerOrProvider) as StandardToken;
  }
}
