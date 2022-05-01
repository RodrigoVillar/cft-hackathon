import logo from './logo.svg';
import './App.css';

import React from 'react'
import { ethers } from 'ethers'

import { OnboardingButton } from './components/Onboarding';

import ContractArtifact from './contracts/Escrow.json'
import contractAddress from './contracts/escrow-address.json'

import Web3 from 'web3';
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");//something rpc endpoint
const ABI = ''; //todo
const CONTRACT_ADDRESS = ''; //todo
const escrowContract = '';//new Web3.Contract(ABI, CONTRACT_ADDRESS);

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      isConnected: false,
      contract: null,
      isInitiated: false,
      hashEvent: null,
    }

    this.onConnected = this.onConnected.bind(this)
  }


  async onConnected() {
    // Use the MetaMask wallet as ethers provider
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    // Create a JavaScript object from the Contract ABI, to interact
    // with the HelloWorld contract.
    const contract = new ethers.Contract(
      contractAddress.Contract,
      ContractArtifact.abi,
      provider.getSigner()
    )

    this.setState({
      isConnected: true,
      contract,
      isInitiated: false,
      hashEvent: null,
    })


  }

  async initiate() {
    console.log('initiating contract')
    await this.state.contract.createEscrowTX()//TODO
    this.setState({
      isConnected: this.state.isConnected,
      contract: this.state.contract,
      isInitiated: true,
      hashEvent: this.state.hashEvent,
    })
  }

  async refund() {
    console.log('initiating refund')
    await this.state.contract.refund()//TODO
  }

  async catchEvent() {
    let options = {
      filter: {
        value: [],
      },
      fromBlock: 0
    };

    escrowContract.events.NewEscrow(options, foo);
    function foo(err, contractEvent) {
      if (err) {
        console.error('idk', err);
        return;
      }
      const {
        event,
        returnValues,
        blockNumber,
      } = contractEvent;
      const { hash0 } = returnValues;
      this.setState({
        isConnected: this.state.isConnected,
        contract: this.state.contract,
        isInitiated: this.state.isInitiated,
        hashEvent: hash0,
      })
    }

  }



  render() {

    const HashComponent = <div>
      {this.state.hashEvent
        ? <p>New escrow hash: <br />&ldquo;{this.state.hashEvent}&rdquo;</p>
        : <p>No new escrow yet...</p>
      }
    </div>
    //add fallback, install things. google thing
    return (
      <div className="App">
        <h1>Cross-Subnet NFT Escrow</h1>
        <h2>NFTescrow on Avalanche with Subnets</h2>

        <OnboardingButton onConnected={this.onConnected} />

        {this.state.isConnected && !this.state.isInitiated &&
          <div>
            <h3>Click the button to initiate escrow.</h3>
            <button onClick={this.initiate()}>Initiate Escrow</button>
          </div>
        }
        {this.state.isConnected && HashComponent}
        {this.state.isConnected && this.state.isInitiated &&
          <div>
            <h4>Click to cancel escrow.</h4>
            <button onClick={this.refund()}>Refund Escrow</button>
          </div>
        }

      </div>
    )
  }
}

export default App