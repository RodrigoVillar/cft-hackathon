/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface FranchiseInterface extends ethers.utils.Interface {
  functions: {
    "executeRefund(uint256)": FunctionFragment;
    "lockNFT(uint256)": FunctionFragment;
    "recieveEscrowTX(uint256,address,address,address,uint256)": FunctionFragment;
    "releaseNFT(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "executeRefund",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "lockNFT",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "recieveEscrowTX",
    values: [BigNumberish, string, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "releaseNFT",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "executeRefund",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockNFT", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "recieveEscrowTX",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "releaseNFT", data: BytesLike): Result;

  events: {
    "EscrowTXRecieved(uint256)": EventFragment;
    "NFTLocked(uint256,address)": EventFragment;
    "RefundComplete(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "EscrowTXRecieved"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NFTLocked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RefundComplete"): EventFragment;
}

export type EscrowTXRecievedEvent = TypedEvent<
  [BigNumber] & { txID: BigNumber }
>;

export type NFTLockedEvent = TypedEvent<
  [BigNumber, string] & { txID: BigNumber; holder: string }
>;

export type RefundCompleteEvent = TypedEvent<[BigNumber] & { txID: BigNumber }>;

export class Franchise extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: FranchiseInterface;

  functions: {
    executeRefund(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    lockNFT(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    recieveEscrowTX(
      txID: BigNumberish,
      _user: string,
      _to: string,
      _nftContract: string,
      tokenID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    releaseNFT(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  executeRefund(
    txID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  lockNFT(
    txID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  recieveEscrowTX(
    txID: BigNumberish,
    _user: string,
    _to: string,
    _nftContract: string,
    tokenID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  releaseNFT(
    txID: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    executeRefund(txID: BigNumberish, overrides?: CallOverrides): Promise<void>;

    lockNFT(txID: BigNumberish, overrides?: CallOverrides): Promise<void>;

    recieveEscrowTX(
      txID: BigNumberish,
      _user: string,
      _to: string,
      _nftContract: string,
      tokenID: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    releaseNFT(txID: BigNumberish, overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "EscrowTXRecieved(uint256)"(
      txID?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { txID: BigNumber }>;

    EscrowTXRecieved(
      txID?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { txID: BigNumber }>;

    "NFTLocked(uint256,address)"(
      txID?: BigNumberish | null,
      holder?: string | null
    ): TypedEventFilter<
      [BigNumber, string],
      { txID: BigNumber; holder: string }
    >;

    NFTLocked(
      txID?: BigNumberish | null,
      holder?: string | null
    ): TypedEventFilter<
      [BigNumber, string],
      { txID: BigNumber; holder: string }
    >;

    "RefundComplete(uint256)"(
      txID?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { txID: BigNumber }>;

    RefundComplete(
      txID?: BigNumberish | null
    ): TypedEventFilter<[BigNumber], { txID: BigNumber }>;
  };

  estimateGas: {
    executeRefund(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    lockNFT(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    recieveEscrowTX(
      txID: BigNumberish,
      _user: string,
      _to: string,
      _nftContract: string,
      tokenID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    releaseNFT(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    executeRefund(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    lockNFT(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    recieveEscrowTX(
      txID: BigNumberish,
      _user: string,
      _to: string,
      _nftContract: string,
      tokenID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    releaseNFT(
      txID: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}