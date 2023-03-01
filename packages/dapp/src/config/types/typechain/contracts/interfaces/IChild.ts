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
    epoch: PromiseOrValue<BigNumberish>;
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
    epoch: BigNumber;
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

export interface IChildInterface extends utils.Interface {
  functions: {
    "addPrizes((uint256,uint256,uint256,address,uint256)[])": FunctionFragment;
    "addTokenERC20(address)": FunctionFragment;
    "addTokenERC721(address)": FunctionFragment;
    "claimPrize(uint256)": FunctionFragment;
    "claimTreasuryFee()": FunctionFragment;
    "getPrizes(uint256)": FunctionFragment;
    "getWinners(uint256)": FunctionFragment;
    "pause()": FunctionFragment;
    "removeTokenERC20(address)": FunctionFragment;
    "removeTokenERC721(address)": FunctionFragment;
    "setTreasuryFee(uint256)": FunctionFragment;
    "transferAdminOwnership(address)": FunctionFragment;
    "transferFactoryOwnership(address)": FunctionFragment;
    "unpause()": FunctionFragment;
    "withdrawERC20(address,address)": FunctionFragment;
    "withdrawERC721(address,uint256,address)": FunctionFragment;
    "withdrawFunds(address)": FunctionFragment;
    "withdrawNative(address)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addPrizes"
      | "addTokenERC20"
      | "addTokenERC721"
      | "claimPrize"
      | "claimTreasuryFee"
      | "getPrizes"
      | "getWinners"
      | "pause"
      | "removeTokenERC20"
      | "removeTokenERC721"
      | "setTreasuryFee"
      | "transferAdminOwnership"
      | "transferFactoryOwnership"
      | "unpause"
      | "withdrawERC20"
      | "withdrawERC721"
      | "withdrawFunds"
      | "withdrawNative"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addPrizes",
    values: [IChild.PrizeStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addTokenERC20",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "addTokenERC721",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimPrize",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "claimTreasuryFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getPrizes",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getWinners",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "pause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "removeTokenERC20",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeTokenERC721",
    values: [PromiseOrValue<string>]
  ): string;
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
  encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawERC20",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawERC721",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawNative",
    values: [PromiseOrValue<string>]
  ): string;

  decodeFunctionResult(functionFragment: "addPrizes", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addTokenERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addTokenERC721",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "claimPrize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "claimTreasuryFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getPrizes", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "getWinners", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "removeTokenERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeTokenERC721",
    data: BytesLike
  ): Result;
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
  decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC20",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawERC721",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawNative",
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
    "GamePrizeClaimed(address,uint256,uint256)": EventFragment;
    "PrizeAdded(uint256,uint256,uint256,uint256,address,uint256)": EventFragment;
    "Received(address,uint256)": EventFragment;
    "TreasuryFeeClaimed(uint256)": EventFragment;
    "TreasuryFeeClaimedByFactory(uint256)": EventFragment;
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
  getEvent(nameOrSignatureOrTopic: "GamePrizeClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "PrizeAdded"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Received"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TreasuryFeeClaimed"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "TreasuryFeeClaimedByFactory"
  ): EventFragment;
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
  epoch: BigNumber;
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

export interface GamePrizeClaimedEventObject {
  claimer: string;
  epoch: BigNumber;
  amountClaimed: BigNumber;
}
export type GamePrizeClaimedEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  GamePrizeClaimedEventObject
>;

export type GamePrizeClaimedEventFilter =
  TypedEventFilter<GamePrizeClaimedEvent>;

export interface PrizeAddedEventObject {
  epoch: BigNumber;
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

export interface IChild extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: IChildInterface;

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
    addPrizes(
      _prizes: IChild.PrizeStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addTokenERC20(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addTokenERC721(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimPrize(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    claimTreasuryFee(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getPrizes(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [IChild.PrizeStructOutput[]] & { childPrizes: IChild.PrizeStructOutput[] }
    >;

    getWinners(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [IChild.WinnerStructOutput[]] & {
        childWinners: IChild.WinnerStructOutput[];
      }
    >;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeTokenERC20(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    removeTokenERC721(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

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

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawERC20(
      _contractAddress: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawERC721(
      _contractAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFunds(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawNative(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addPrizes(
    _prizes: IChild.PrizeStruct[],
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addTokenERC20(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addTokenERC721(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimPrize(
    _epoch: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  claimTreasuryFee(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getPrizes(
    _epoch: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IChild.PrizeStructOutput[]>;

  getWinners(
    _epoch: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<IChild.WinnerStructOutput[]>;

  pause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeTokenERC20(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  removeTokenERC721(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

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

  unpause(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawERC20(
    _contractAddress: PromiseOrValue<string>,
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawERC721(
    _contractAddress: PromiseOrValue<string>,
    _tokenId: PromiseOrValue<BigNumberish>,
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFunds(
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawNative(
    _receiver: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addPrizes(
      _prizes: IChild.PrizeStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    addTokenERC20(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    addTokenERC721(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimPrize(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    claimTreasuryFee(overrides?: CallOverrides): Promise<void>;

    getPrizes(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IChild.PrizeStructOutput[]>;

    getWinners(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<IChild.WinnerStructOutput[]>;

    pause(overrides?: CallOverrides): Promise<void>;

    removeTokenERC20(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    removeTokenERC721(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

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

    unpause(overrides?: CallOverrides): Promise<void>;

    withdrawERC20(
      _contractAddress: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawERC721(
      _contractAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawFunds(
      _receiver: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdrawNative(
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
      epoch?: null,
      amountClaimed?: null
    ): ChildPrizeClaimedEventFilter;
    ChildPrizeClaimed(
      claimer?: null,
      epoch?: null,
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

    "GamePrizeClaimed(address,uint256,uint256)"(
      claimer?: null,
      epoch?: null,
      amountClaimed?: null
    ): GamePrizeClaimedEventFilter;
    GamePrizeClaimed(
      claimer?: null,
      epoch?: null,
      amountClaimed?: null
    ): GamePrizeClaimedEventFilter;

    "PrizeAdded(uint256,uint256,uint256,uint256,address,uint256)"(
      epoch?: null,
      position?: null,
      amount?: null,
      standard?: null,
      contractAddress?: null,
      tokenId?: null
    ): PrizeAddedEventFilter;
    PrizeAdded(
      epoch?: null,
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
  };

  estimateGas: {
    addPrizes(
      _prizes: IChild.PrizeStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addTokenERC20(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addTokenERC721(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimPrize(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    claimTreasuryFee(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getPrizes(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWinners(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeTokenERC20(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    removeTokenERC721(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

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

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawERC20(
      _contractAddress: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawERC721(
      _contractAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFunds(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawNative(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addPrizes(
      _prizes: IChild.PrizeStruct[],
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addTokenERC20(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addTokenERC721(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimPrize(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    claimTreasuryFee(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getPrizes(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWinners(
      _epoch: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    pause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeTokenERC20(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    removeTokenERC721(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

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

    unpause(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawERC20(
      _contractAddress: PromiseOrValue<string>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawERC721(
      _contractAddress: PromiseOrValue<string>,
      _tokenId: PromiseOrValue<BigNumberish>,
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFunds(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawNative(
      _receiver: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
