/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
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

export declare namespace IChild {
  export type PrizeStruct = {
    position: PromiseOrValue<BigNumberish>;
    amount: PromiseOrValue<BigNumberish>;
    standard: PromiseOrValue<BigNumberish>;
    contractAddress: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
  };

  export type PrizeStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber
  ] & {
    position: BigNumber;
    amount: BigNumber;
    standard: BigNumber;
    contractAddress: string;
    tokenId: BigNumber;
  };

  export type WinnerStruct = {
    roundId: PromiseOrValue<BigNumberish>;
    userId: PromiseOrValue<BigNumberish>;
    playerAddress: PromiseOrValue<string>;
    amountWon: PromiseOrValue<BigNumberish>;
    position: PromiseOrValue<BigNumberish>;
    standard: PromiseOrValue<BigNumberish>;
    contractAddress: PromiseOrValue<string>;
    tokenId: PromiseOrValue<BigNumberish>;
    prizeClaimed: PromiseOrValue<boolean>;
  };

  export type WinnerStructOutput = [
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    boolean
  ] & {
    roundId: BigNumber;
    userId: BigNumber;
    playerAddress: string;
    amountWon: BigNumber;
    position: BigNumber;
    standard: BigNumber;
    contractAddress: string;
    tokenId: BigNumber;
    prizeClaimed: boolean;
  };
}

export interface ChildInterface extends utils.Interface {
  functions: {
    "MAX_TREASURY_FEE()": FunctionFragment;
    "addPrizes((uint256,uint256,uint256,address,uint256)[])": FunctionFragment;
    "claimPrize(uint256)": FunctionFragment;
    "claimTreasuryFee()": FunctionFragment;
    "factory()": FunctionFragment;
    "getPrizes(uint256)": FunctionFragment;
    "getWinners(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "pause()": FunctionFragment;
    "paused()": FunctionFragment;
    "roundId()": FunctionFragment;
    "setTreasuryFee(uint256)": FunctionFragment;
    "transferAdminOwnership(address)": FunctionFragment;
    "transferFactoryOwnership(address)": FunctionFragment;
    "treasuryAmount()": FunctionFragment;
    "treasuryFee()": FunctionFragment;
    "unpause()": FunctionFragment;
    "withdrawFunds(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "MAX_TREASURY_FEE"
      | "addPrizes"
      | "claimPrize"
      | "claimTreasuryFee"
      | "factory"
      | "getPrizes"
      | "getWinners"
      | "owner"
      | "pause"
      | "paused"
      | "roundId"
      | "setTreasuryFee"
      | "transferAdminOwnership"
      | "transferFactoryOwnership"
      | "treasuryAmount"
      | "treasuryFee"
      | "unpause"
      | "withdrawFunds"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "MAX_TREASURY_FEE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "addPrizes",
    values: [IChild.PrizeStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "claimPrize",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimTreasuryFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "factory", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPrizes",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getWinners",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(functionFragment: "paused", values?: undefined): string;
  encodeFunctionData(functionFragment: "roundId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "setTreasuryFee",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferAdminOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFactoryOwnership",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "treasuryAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "treasuryFee",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(
    functionFragment: "MAX_TREASURY_FEE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "addPrizes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "claimPrize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimTreasuryFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "factory", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getPrizes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getWinners", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "roundId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setTreasuryFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferAdminOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFactoryOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "treasuryAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "treasuryFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;

  events: {
    "AdminOwnershipTransferred(address,address)": EventFragment;
    "ChildPrizeClaimed(address,uint256,uint256)": EventFragment;
    "CreatorFeeClaimed(uint256)": EventFragment;
    "CreatorOwnershipTransferred(address,address)": EventFragment;
    "CronUpkeepUpdated(uint256,address)": EventFragment;
    "EncodedCronUpdated(uint256,string)": EventFragment;
    "FactoryOwnershipTransferred(address,address)": EventFragment;
    "FailedTransfer(address,uint256)": EventFragment;
    "GamePrizeClaimed(address,uint256,uint256)": EventFragment;
    "Paused(address)": EventFragment;
    "PrizeAdded(uint256,uint256,uint256,uint256,address,uint256)": EventFragment;
    "Received(address,uint256)": EventFragment;
    "TreasuryFeeClaimed(uint256)": EventFragment;
    "TreasuryFeeClaimedByFactory(uint256)": EventFragment;
    "Unpaused(address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AdminOwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ChildPrizeClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreatorFeeClaimed"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "CreatorOwnershipTransferred"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CronUpkeepUpdated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "EncodedCronUpdated"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "FactoryOwnershipTransferred"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FailedTransfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "GamePrizeClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PrizeAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Received"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TreasuryFeeClaimed"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "TreasuryFeeClaimedByFactory"
  ): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}

export interface AdminOwnershipTransferredEventObject {
  oldAdmin: string;
  newAdmin: string;
}
export type AdminOwnershipTransferredEvent = TypedEvent<
  [string, string],
  AdminOwnershipTransferredEventObject
>;

export type AdminOwnershipTransferredEventFilter =
  TypedEventFilter<AdminOwnershipTransferredEvent>;

export interface ChildPrizeClaimedEventObject {
  claimer: string;
  roundId: BigNumber;
  amountClaimed: BigNumber;
}
export type ChildPrizeClaimedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  ChildPrizeClaimedEventObject
>;

export type ChildPrizeClaimedEventFilter =
  TypedEventFilter<ChildPrizeClaimedEvent>;

export interface CreatorFeeClaimedEventObject {
  amount: BigNumber;
}
export type CreatorFeeClaimedEvent = TypedEvent<
  [BigNumber],
  CreatorFeeClaimedEventObject
>;

export type CreatorFeeClaimedEventFilter =
  TypedEventFilter<CreatorFeeClaimedEvent>;

export interface CreatorOwnershipTransferredEventObject {
  oldCreator: string;
  newCreator: string;
}
export type CreatorOwnershipTransferredEvent = TypedEvent<
  [string, string],
  CreatorOwnershipTransferredEventObject
>;

export type CreatorOwnershipTransferredEventFilter =
  TypedEventFilter<CreatorOwnershipTransferredEvent>;

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

export interface FactoryOwnershipTransferredEventObject {
  oldFactory: string;
  newFactory: string;
}
export type FactoryOwnershipTransferredEvent = TypedEvent<
  [string, string],
  FactoryOwnershipTransferredEventObject
>;

export type FactoryOwnershipTransferredEventFilter =
  TypedEventFilter<FactoryOwnershipTransferredEvent>;

export interface FailedTransferEventObject {
  receiver: string;
  amount: BigNumber;
}
export type FailedTransferEvent = TypedEvent<
  [string, BigNumber],
  FailedTransferEventObject
>;

export type FailedTransferEventFilter = TypedEventFilter<FailedTransferEvent>;

export interface GamePrizeClaimedEventObject {
  claimer: string;
  roundId: BigNumber;
  amountClaimed: BigNumber;
}
export type GamePrizeClaimedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  GamePrizeClaimedEventObject
>;

export type GamePrizeClaimedEventFilter =
  TypedEventFilter<GamePrizeClaimedEvent>;

export interface PausedEventObject {
  account: string;
}
export type PausedEvent = TypedEvent<[string], PausedEventObject>;

export type PausedEventFilter = TypedEventFilter<PausedEvent>;

export interface PrizeAddedEventObject {
  roundId: BigNumber;
  position: BigNumber;
  amount: BigNumber;
  standard: BigNumber;
  contractAddress: string;
  tokenId: BigNumber;
}
export type PrizeAddedEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, BigNumber, string, BigNumber],
  PrizeAddedEventObject
>;

export type PrizeAddedEventFilter = TypedEventFilter<PrizeAddedEvent>;

export interface ReceivedEventObject {
  sender: string;
  amount: BigNumber;
}
export type ReceivedEvent = TypedEvent<
  [string, BigNumber],
  ReceivedEventObject
>;

export type ReceivedEventFilter = TypedEventFilter<ReceivedEvent>;

export interface TreasuryFeeClaimedEventObject {
  amount: BigNumber;
}
export type TreasuryFeeClaimedEvent = TypedEvent<
  [BigNumber],
  TreasuryFeeClaimedEventObject
>;

export type TreasuryFeeClaimedEventFilter =
  TypedEventFilter<TreasuryFeeClaimedEvent>;

export interface TreasuryFeeClaimedByFactoryEventObject {
  amount: BigNumber;
}
export type TreasuryFeeClaimedByFactoryEvent = TypedEvent<
  [BigNumber],
  TreasuryFeeClaimedByFactoryEventObject
>;

export type TreasuryFeeClaimedByFactoryEventFilter =
  TypedEventFilter<TreasuryFeeClaimedByFactoryEvent>;

export interface UnpausedEventObject {
  account: string;
}
export type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;

export type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;

export interface Child extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ChildInterface;

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
    MAX_TREASURY_FEE(overrides?: CallOverrides): Promise<[BigNumber]>;

    addPrizes(
      _prizes: IChild.PrizeStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimPrize(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimTreasuryFee(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    factory(overrides?: CallOverrides): Promise<[string]>;

    getPrizes(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [IChild.PrizeStructOutput[]] & { childPrizes: IChild.PrizeStructOutput[] }
    >;

    getWinners(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [IChild.WinnerStructOutput[]] & {
        childWinners: IChild.WinnerStructOutput[];
      }
    >;

    owner(overrides?: CallOverrides): Promise<[string]>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    paused(overrides?: CallOverrides): Promise<[boolean]>;

    roundId(overrides?: CallOverrides): Promise<[BigNumber]>;

    setTreasuryFee(
      _treasuryFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferAdminOwnership(
      _adminAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    transferFactoryOwnership(
      _factory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    treasuryAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    treasuryFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFunds(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  MAX_TREASURY_FEE(overrides?: CallOverrides): Promise<BigNumber>;

  addPrizes(
    _prizes: IChild.PrizeStruct[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimPrize(
    _roundId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimTreasuryFee(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  factory(overrides?: CallOverrides): Promise<string>;

  getPrizes(
    _roundId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IChild.PrizeStructOutput[]>;

  getWinners(
    _roundId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IChild.WinnerStructOutput[]>;

  owner(overrides?: CallOverrides): Promise<string>;

  pause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  paused(overrides?: CallOverrides): Promise<boolean>;

  roundId(overrides?: CallOverrides): Promise<BigNumber>;

  setTreasuryFee(
    _treasuryFee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferAdminOwnership(
    _adminAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  transferFactoryOwnership(
    _factory: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  treasuryAmount(overrides?: CallOverrides): Promise<BigNumber>;

  treasuryFee(overrides?: CallOverrides): Promise<BigNumber>;

  unpause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFunds(
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    MAX_TREASURY_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    addPrizes(
      _prizes: IChild.PrizeStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    claimPrize(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimTreasuryFee(overrides?: CallOverrides): Promise<void>;

    factory(overrides?: CallOverrides): Promise<string>;

    getPrizes(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IChild.PrizeStructOutput[]>;

    getWinners(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IChild.WinnerStructOutput[]>;

    owner(overrides?: CallOverrides): Promise<string>;

    pause(overrides?: CallOverrides): Promise<void>;

    paused(overrides?: CallOverrides): Promise<boolean>;

    roundId(overrides?: CallOverrides): Promise<BigNumber>;

    setTreasuryFee(
      _treasuryFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferAdminOwnership(
      _adminAddress: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    transferFactoryOwnership(
      _factory: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    treasuryAmount(overrides?: CallOverrides): Promise<BigNumber>;

    treasuryFee(overrides?: CallOverrides): Promise<BigNumber>;

    unpause(overrides?: CallOverrides): Promise<void>;

    withdrawFunds(
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AdminOwnershipTransferred(address,address)"(
      oldAdmin?: null,
      newAdmin?: null
    ): AdminOwnershipTransferredEventFilter;
    AdminOwnershipTransferred(
      oldAdmin?: null,
      newAdmin?: null
    ): AdminOwnershipTransferredEventFilter;

    "ChildPrizeClaimed(address,uint256,uint256)"(
      claimer?: null,
      roundId?: null,
      amountClaimed?: null
    ): ChildPrizeClaimedEventFilter;
    ChildPrizeClaimed(
      claimer?: null,
      roundId?: null,
      amountClaimed?: null
    ): ChildPrizeClaimedEventFilter;

    "CreatorFeeClaimed(uint256)"(amount?: null): CreatorFeeClaimedEventFilter;
    CreatorFeeClaimed(amount?: null): CreatorFeeClaimedEventFilter;

    "CreatorOwnershipTransferred(address,address)"(
      oldCreator?: null,
      newCreator?: null
    ): CreatorOwnershipTransferredEventFilter;
    CreatorOwnershipTransferred(
      oldCreator?: null,
      newCreator?: null
    ): CreatorOwnershipTransferredEventFilter;

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

    "FactoryOwnershipTransferred(address,address)"(
      oldFactory?: null,
      newFactory?: null
    ): FactoryOwnershipTransferredEventFilter;
    FactoryOwnershipTransferred(
      oldFactory?: null,
      newFactory?: null
    ): FactoryOwnershipTransferredEventFilter;

    "FailedTransfer(address,uint256)"(
      receiver?: null,
      amount?: null
    ): FailedTransferEventFilter;
    FailedTransfer(receiver?: null, amount?: null): FailedTransferEventFilter;

    "GamePrizeClaimed(address,uint256,uint256)"(
      claimer?: null,
      roundId?: null,
      amountClaimed?: null
    ): GamePrizeClaimedEventFilter;
    GamePrizeClaimed(
      claimer?: null,
      roundId?: null,
      amountClaimed?: null
    ): GamePrizeClaimedEventFilter;

    "Paused(address)"(account?: null): PausedEventFilter;
    Paused(account?: null): PausedEventFilter;

    "PrizeAdded(uint256,uint256,uint256,uint256,address,uint256)"(
      roundId?: null,
      position?: null,
      amount?: null,
      standard?: null,
      contractAddress?: null,
      tokenId?: null
    ): PrizeAddedEventFilter;
    PrizeAdded(
      roundId?: null,
      position?: null,
      amount?: null,
      standard?: null,
      contractAddress?: null,
      tokenId?: null
    ): PrizeAddedEventFilter;

    "Received(address,uint256)"(
      sender?: null,
      amount?: null
    ): ReceivedEventFilter;
    Received(sender?: null, amount?: null): ReceivedEventFilter;

    "TreasuryFeeClaimed(uint256)"(amount?: null): TreasuryFeeClaimedEventFilter;
    TreasuryFeeClaimed(amount?: null): TreasuryFeeClaimedEventFilter;

    "TreasuryFeeClaimedByFactory(uint256)"(
      amount?: null
    ): TreasuryFeeClaimedByFactoryEventFilter;
    TreasuryFeeClaimedByFactory(
      amount?: null
    ): TreasuryFeeClaimedByFactoryEventFilter;

    "Unpaused(address)"(account?: null): UnpausedEventFilter;
    Unpaused(account?: null): UnpausedEventFilter;
  };

  estimateGas: {
    MAX_TREASURY_FEE(overrides?: CallOverrides): Promise<BigNumber>;

    addPrizes(
      _prizes: IChild.PrizeStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimPrize(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimTreasuryFee(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    factory(overrides?: CallOverrides): Promise<BigNumber>;

    getPrizes(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWinners(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    paused(overrides?: CallOverrides): Promise<BigNumber>;

    roundId(overrides?: CallOverrides): Promise<BigNumber>;

    setTreasuryFee(
      _treasuryFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferAdminOwnership(
      _adminAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    transferFactoryOwnership(
      _factory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    treasuryAmount(overrides?: CallOverrides): Promise<BigNumber>;

    treasuryFee(overrides?: CallOverrides): Promise<BigNumber>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFunds(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    MAX_TREASURY_FEE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    addPrizes(
      _prizes: IChild.PrizeStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimPrize(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimTreasuryFee(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    factory(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPrizes(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWinners(
      _roundId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    roundId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setTreasuryFee(
      _treasuryFee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferAdminOwnership(
      _adminAddress: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    transferFactoryOwnership(
      _factory: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    treasuryAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    treasuryFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFunds(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
