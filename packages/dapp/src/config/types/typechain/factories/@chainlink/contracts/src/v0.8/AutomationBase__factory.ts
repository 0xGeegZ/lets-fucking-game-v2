/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  AutomationBase,
  AutomationBaseInterface,
} from "../../../../../@chainlink/contracts/src/v0.8/AutomationBase";

const _abi = [
  {
    inputs: [],
    name: "OnlySimulatedBackend",
    type: "error",
  },
];

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea26469706673582212208a06c3098eaf8186f211dce5bd5eda02dda292895803aef3f0adb87ddf28aa7c64736f6c63430008100033";

type AutomationBaseConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: AutomationBaseConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class AutomationBase__factory extends ContractFactory {
  constructor(...args: AutomationBaseConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<AutomationBase> {
    return super.deploy(overrides || {}) as Promise<AutomationBase>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): AutomationBase {
    return super.attach(address) as AutomationBase;
  }
  override connect(signer: Signer): AutomationBase__factory {
    return super.connect(signer) as AutomationBase__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): AutomationBaseInterface {
    return new utils.Interface(_abi) as AutomationBaseInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): AutomationBase {
    return new Contract(address, _abi, signerOrProvider) as AutomationBase;
  }
}
