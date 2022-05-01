/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Escrow, EscrowInterface } from "../Escrow";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_relayer",
        type: "address",
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
        internalType: "uint256",
        name: "txID",
        type: "uint256",
      },
    ],
    name: "NewEscrow",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "txID",
        type: "uint256",
      },
    ],
    name: "Refund",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "txID",
        type: "uint256",
      },
    ],
    name: "ReleaseEscrow",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nftContract1",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenID1",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "_subnetID1",
        type: "int256",
      },
      {
        internalType: "address",
        name: "_user2",
        type: "address",
      },
      {
        internalType: "address",
        name: "_nftContract2",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_tokenID2",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "_subnet2",
        type: "int256",
      },
    ],
    name: "createEscrowTX",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "txID",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "_orderNum",
        type: "int256",
      },
    ],
    name: "getEscrow",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "int256",
        name: "",
        type: "int256",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "txID",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "nftLocked",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "txID",
        type: "uint256",
      },
    ],
    name: "refund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040516200154838038062001548833981810160405281019062000037919062000095565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550506200010f565b6000815190506200008f81620000f5565b92915050565b600060208284031215620000a857600080fd5b6000620000b8848285016200007e565b91505092915050565b6000620000ce82620000d5565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6200010081620000c1565b81146200010c57600080fd5b50565b611429806200011f6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063278ecde114610051578063515d1ca91461006d578063e168d0d414610089578063eadbe8d3146100bd575b600080fd5b61006b60048036038101906100669190610f3b565b6100d9565b005b61008760048036038101906100829190610e9d565b6102ba565b005b6100a3600480360381019061009e9190610fa0565b6105d0565b6040516100b49594939291906110c7565b60405180910390f35b6100d760048036038101906100d29190610f64565b610858565b005b600073ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060000160000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161415610182576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101799061111a565b60405180910390fd5b807f2e1897b0591d764356194f7a795238a87c1987c7a877568e50d829d547c92b9760405160405180910390a2600160008281526020019081526020016000206000808201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560028201600090556003820160009055505060048201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556002820160009055600382016000905550506008820160006101000a81549060ff02191690556008820160016101000a81549060ff0219169055505050565b808514156102fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102f49061117a565b60405180910390fd5b600060405180608001604052803373ffffffffffffffffffffffffffffffffffffffff1681526020018973ffffffffffffffffffffffffffffffffffffffff168152602001888152602001878152509050600060405180608001604052808773ffffffffffffffffffffffffffffffffffffffff1681526020018673ffffffffffffffffffffffffffffffffffffffff168152602001858152602001848152509050600060405180608001604052808481526020018381526020016000151581526020016000151581525090508060016000600254815260200190815260200160002060008201518160000160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002015560608201518160030155505060208201518160040160008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506040820151816002015560608201518160030155505060408201518160080160006101000a81548160ff02191690831515021790555060608201518160080160016101000a81548160ff0219169083151502179055509050506002547f9a8ac8cb6871d849e35036199bf1c868f80b286d981dfab86f0b94ed3613735d60405160405180910390a2600260008154809291906105bf9061121d565b919050555050505050505050505050565b60008060008060008060016000898152602001908152602001600020604051806080016040529081600082016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815250508152602001600482016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152505081526020016008820160009054906101000a900460ff161515151581526020016008820160019054906101000a900460ff16151515158152505090506000871415610819578060000151600001518160000151602001518260000151604001518360000151606001518460400151955095509550955095505061084e565b806020015160000151816020015160200151826020015160400151836020015160600151846060015195509550955095509550505b9295509295909350565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146108e6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108dd9061119a565b60405180910390fd5b600060016000848152602001908152602001600020604051806080016040529081600082016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001600282015481526020016003820154815250508152602001600482016040518060800160405290816000820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016001820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020016002820154815260200160038201548152505081526020016008820160009054906101000a900460ff161515151581526020016008820160019054906101000a900460ff16151515158152505090508173ffffffffffffffffffffffffffffffffffffffff1681600001516000015173ffffffffffffffffffffffffffffffffffffffff161480610b5b57508173ffffffffffffffffffffffffffffffffffffffff1681602001516000015173ffffffffffffffffffffffffffffffffffffffff16145b610b9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b919061113a565b60405180910390fd5b8173ffffffffffffffffffffffffffffffffffffffff1681600001516000015173ffffffffffffffffffffffffffffffffffffffff161415610c5457600015158160400151151514610c21576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c189061115a565b60405180910390fd5b600180600085815260200190815260200160002060080160006101000a81548160ff021916908315150217905550610cce565b600015158160600151151514610c9f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c969061115a565b60405180910390fd5b600180600085815260200190815260200160002060080160016101000a81548160ff0219169083151502179055505b6001600084815260200190815260200160002060080160009054906101000a900460ff168015610d1e57506001600084815260200190815260200160002060080160019054906101000a900460ff165b15610e5957827f5cec55481a9f081a80728e657943e7c348667ec21a5b4e37fcbcae1290fa47e660405160405180910390a2600160008481526020019081526020016000206000808201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff021916905560028201600090556003820160009055505060048201600080820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556001820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff02191690556002820160009055600382016000905550506008820160006101000a81549060ff02191690556008820160016101000a81549060ff021916905550505b505050565b600081359050610e6d816113ae565b92915050565b600081359050610e82816113c5565b92915050565b600081359050610e97816113dc565b92915050565b600080600080600080600060e0888a031215610eb857600080fd5b6000610ec68a828b01610e5e565b9750506020610ed78a828b01610e88565b9650506040610ee88a828b01610e73565b9550506060610ef98a828b01610e5e565b9450506080610f0a8a828b01610e5e565b93505060a0610f1b8a828b01610e88565b92505060c0610f2c8a828b01610e73565b91505092959891949750929550565b600060208284031215610f4d57600080fd5b6000610f5b84828501610e88565b91505092915050565b60008060408385031215610f7757600080fd5b6000610f8585828601610e88565b9250506020610f9685828601610e5e565b9150509250929050565b60008060408385031215610fb357600080fd5b6000610fc185828601610e88565b9250506020610fd285828601610e73565b9150509250929050565b610fe5816111cb565b82525050565b610ff4816111dd565b82525050565b611003816111e9565b82525050565b6000611016600d836111ba565b915061102182611295565b602082019050919050565b60006110396022836111ba565b9150611044826112be565b604082019050919050565b600061105c6019836111ba565b91506110678261130d565b602082019050919050565b600061107f6032836111ba565b915061108a82611336565b604082019050919050565b60006110a26018836111ba565b91506110ad82611385565b602082019050919050565b6110c181611213565b82525050565b600060a0820190506110dc6000830188610fdc565b6110e96020830187610fdc565b6110f660408301866110b8565b6111036060830185610ffa565b6111106080830184610feb565b9695505050505050565b6000602082019050818103600083015261113381611009565b9050919050565b600060208201905081810360008301526111538161102c565b9050919050565b600060208201905081810360008301526111738161104f565b9050919050565b6000602082019050818103600083015261119381611072565b9050919050565b600060208201905081810360008301526111b381611095565b9050919050565b600082825260208201905092915050565b60006111d6826111f3565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061122882611213565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561125b5761125a611266565b5b600182019050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f496e76616c696420486173682100000000000000000000000000000000000000600082015250565b7f41646472657373206e6f7420696e766f6c76656420696e20457363726f77205460008201527f5821000000000000000000000000000000000000000000000000000000000000602082015250565b7f4e465420697320616c7265616479206c6f636b65642075702100000000000000600082015250565b7f4e4654457363726f77206f6e6c7920737570706f72747320696e7465722d737560008201527f626e6574207472616e73616374696f6e73210000000000000000000000000000602082015250565b7f596f7520617265206e6f74207468652072656c61796572210000000000000000600082015250565b6113b7816111cb565b81146113c257600080fd5b50565b6113ce816111e9565b81146113d957600080fd5b50565b6113e581611213565b81146113f057600080fd5b5056fea264697066735822122007e8e45fca3f1b80bb573b4252bdc3dbabe46a2b2d2f23fee621ec832644ae8d64736f6c63430008040033";

export class Escrow__factory extends ContractFactory {
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
    _relayer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Escrow> {
    return super.deploy(_relayer, overrides || {}) as Promise<Escrow>;
  }
  getDeployTransaction(
    _relayer: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_relayer, overrides || {});
  }
  attach(address: string): Escrow {
    return super.attach(address) as Escrow;
  }
  connect(signer: Signer): Escrow__factory {
    return super.connect(signer) as Escrow__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EscrowInterface {
    return new utils.Interface(_abi) as EscrowInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Escrow {
    return new Contract(address, _abi, signerOrProvider) as Escrow;
  }
}
