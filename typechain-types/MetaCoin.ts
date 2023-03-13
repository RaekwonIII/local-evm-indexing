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
} from "./common";

export interface MetaCoinInterface extends utils.Interface {
  functions: {
    "getBalance(address)": FunctionFragment;
    "getBalanceInEth(address)": FunctionFragment;
    "sendCoin(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "getBalance" | "getBalanceInEth" | "sendCoin"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getBalance",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceInEth",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "sendCoin",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceInEth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "sendCoin", data: BytesLike): Result;

  events: {
    "Transfer(address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface TransferEventObject {
  _from: string;
  _to: string;
  _value: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface MetaCoin extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MetaCoinInterface;

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
    getBalance(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getBalanceInEth(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    sendCoin(
      receiver: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  getBalance(
    addr: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getBalanceInEth(
    addr: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  sendCoin(
    receiver: PromiseOrValue<string>,
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    getBalance(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalanceInEth(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendCoin(
      receiver: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Transfer(address,address,uint256)"(
      _from?: PromiseOrValue<string> | null,
      _to?: PromiseOrValue<string> | null,
      _value?: null
    ): TransferEventFilter;
    Transfer(
      _from?: PromiseOrValue<string> | null,
      _to?: PromiseOrValue<string> | null,
      _value?: null
    ): TransferEventFilter;
  };

  estimateGas: {
    getBalance(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getBalanceInEth(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    sendCoin(
      receiver: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    getBalance(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getBalanceInEth(
      addr: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    sendCoin(
      receiver: PromiseOrValue<string>,
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
