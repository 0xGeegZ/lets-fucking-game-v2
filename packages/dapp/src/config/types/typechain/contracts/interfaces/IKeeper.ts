/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface IKeeperInterface extends utils.Interface {
  functions: {
    "getCronUpkeep()": FunctionFragment;
    "getEncodedCron()": FunctionFragment;
    "getHandler()": FunctionFragment;
    "pauseKeeper()": FunctionFragment;
    "registerCronToUpkeep(address)": FunctionFragment;
    "registerCronToUpkeep()": FunctionFragment;
    "setCronUpkeep(address)": FunctionFragment;
    "setEncodedCron(string)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "unpauseKeeper()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "getCronUpkeep"
      | "getEncodedCron"
      | "getHandler"
      | "pauseKeeper"
      | "registerCronToUpkeep(address)"
      | "registerCronToUpkeep()"
      | "setCronUpkeep"
      | "setEncodedCron"
      | "transferOwnership"
      | "unpauseKeeper"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getCronUpkeep",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEncodedCron",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getHandler",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "pauseKeeper",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "registerCronToUpkeep(address)",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "registerCronToUpkeep()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "setCronUpkeep",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setEncodedCron",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "unpauseKeeper",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getCronUpkeep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEncodedCron",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getHandler", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "pauseKeeper",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerCronToUpkeep(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerCronToUpkeep()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setCronUpkeep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setEncodedCron",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unpauseKeeper",
    data: BytesLike
  ): Result;

  events: {
    "CronUpkeepRegistered(uint256,address)": EventFragment;
    "CronUpkeepUpdated(uint256,address)": EventFragment;
    "EncodedCronUpdated(uint256,string)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CronUpkeepRegistered"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CronUpkeepUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EncodedCronUpdated"): EventFragment;
}

export interface CronUpkeepRegisteredEventObject {
  jobId: BigNumber;
  cronUpkeep: string;
}
export type CronUpkeepRegisteredEvent = TypedEvent<
  [BigNumber, string],
  CronUpkeepRegisteredEventObject
>;

export type CronUpkeepRegisteredEventFilter =
  TypedEventFilter<CronUpkeepRegisteredEvent>;

export interface CronUpkeepUpdatedEventObject {
  jobId: BigNumber;
  cronUpkeep: string;
}
export type CronUpkeepUpdatedEvent = TypedEvent<
  [BigNumber, string],
  CronUpkeepUpdatedEventObject
>;

export type CronUpkeepUpdatedEventFilter =
  TypedEventFilter<CronUpkeepUpdatedEvent>;

export interface EncodedCronUpdatedEventObject {
  jobId: BigNumber;
  encodedCron: string;
}
export type EncodedCronUpdatedEvent = TypedEvent<
  [BigNumber, string],
  EncodedCronUpdatedEventObject
>;

export type EncodedCronUpdatedEventFilter =
  TypedEventFilter<EncodedCronUpdatedEvent>;

export interface IKeeper extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IKeeperInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    getCronUpkeep(
      overrides?: CallOverrides
    ): Promise<[string] & { _cronUpkeep: string }>;

    getEncodedCron(
      overrides?: CallOverrides
    ): Promise<[string] & { _encodedCron: string }>;

    getHandler(
      overrides?: CallOverrides
    ): Promise<[string] & { _handler: string }>;

    pauseKeeper(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "registerCronToUpkeep(address)"(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    "registerCronToUpkeep()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setCronUpkeep(
      _cronUpkeep: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setEncodedCron(
      _encodedCron: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unpauseKeeper(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getCronUpkeep(overrides?: CallOverrides): Promise<string>;

  getEncodedCron(overrides?: CallOverrides): Promise<string>;

  getHandler(overrides?: CallOverrides): Promise<string>;

  pauseKeeper(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "registerCronToUpkeep(address)"(
    _target: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  "registerCronToUpkeep()"(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setCronUpkeep(
    _cronUpkeep: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setEncodedCron(
    _encodedCron: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unpauseKeeper(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getCronUpkeep(overrides?: CallOverrides): Promise<string>;

    getEncodedCron(overrides?: CallOverrides): Promise<string>;

    getHandler(overrides?: CallOverrides): Promise<string>;

    pauseKeeper(overrides?: CallOverrides): Promise<void>;

    "registerCronToUpkeep(address)"(
      _target: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    "registerCronToUpkeep()"(overrides?: CallOverrides): Promise<void>;

    setCronUpkeep(
      _cronUpkeep: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    setEncodedCron(
      _encodedCron: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    unpauseKeeper(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "CronUpkeepRegistered(uint256,address)"(
      jobId?: null,
      cronUpkeep?: null
    ): CronUpkeepRegisteredEventFilter;
    CronUpkeepRegistered(
      jobId?: null,
      cronUpkeep?: null
    ): CronUpkeepRegisteredEventFilter;

    "CronUpkeepUpdated(uint256,address)"(
      jobId?: null,
      cronUpkeep?: null
    ): CronUpkeepUpdatedEventFilter;
    CronUpkeepUpdated(
      jobId?: null,
      cronUpkeep?: null
    ): CronUpkeepUpdatedEventFilter;

    "EncodedCronUpdated(uint256,string)"(
      jobId?: null,
      encodedCron?: null
    ): EncodedCronUpdatedEventFilter;
    EncodedCronUpdated(
      jobId?: null,
      encodedCron?: null
    ): EncodedCronUpdatedEventFilter;
  };

  estimateGas: {
    getCronUpkeep(overrides?: CallOverrides): Promise<BigNumber>;

    getEncodedCron(overrides?: CallOverrides): Promise<BigNumber>;

    getHandler(overrides?: CallOverrides): Promise<BigNumber>;

    pauseKeeper(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "registerCronToUpkeep(address)"(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    "registerCronToUpkeep()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setCronUpkeep(
      _cronUpkeep: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setEncodedCron(
      _encodedCron: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unpauseKeeper(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getCronUpkeep(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEncodedCron(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getHandler(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pauseKeeper(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "registerCronToUpkeep(address)"(
      _target: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    "registerCronToUpkeep()"(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setCronUpkeep(
      _cronUpkeep: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setEncodedCron(
      _encodedCron: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unpauseKeeper(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
