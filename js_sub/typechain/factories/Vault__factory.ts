/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Vault, VaultInterface } from "../Vault";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenID",
        type: "uint256",
      },
    ],
    name: "sendNFT",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555061023a806100606000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c8063d67262e514610030575b600080fd5b61004a60048036038101906100459190610109565b61004c565b005b8173ffffffffffffffffffffffffffffffffffffffff166342842e0e3060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff16846040518463ffffffff1660e01b81526004016100a993929190610163565b600060405180830381600087803b1580156100c357600080fd5b505af11580156100d7573d6000803e3d6000fd5b505050505050565b6000813590506100ee816101d6565b92915050565b600081359050610103816101ed565b92915050565b6000806040838503121561011c57600080fd5b600061012a858286016100df565b925050602061013b858286016100f4565b9150509250929050565b61014e8161019a565b82525050565b61015d816101cc565b82525050565b60006060820190506101786000830186610145565b6101856020830185610145565b6101926040830184610154565b949350505050565b60006101a5826101ac565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b6101df8161019a565b81146101ea57600080fd5b50565b6101f6816101cc565b811461020157600080fd5b5056fea26469706673582212200f95034236d4dd0fc4cbb61e1cfea6a28d7976675e8bee62b1b88d24c65b3d0264736f6c63430008040033";

export class Vault__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Vault> {
    return super.deploy(overrides || {}) as Promise<Vault>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Vault {
    return super.attach(address) as Vault;
  }
  connect(signer: Signer): Vault__factory {
    return super.connect(signer) as Vault__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): VaultInterface {
    return new utils.Interface(_abi) as VaultInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Vault {
    return new Contract(address, _abi, signerOrProvider) as Vault;
  }
}
