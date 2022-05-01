import logo from './logo.svg';
import './App.css';

import React from 'react'
import { ethers } from 'ethers'

import { OnboardingButton } from './components/Onboarding';

import ContractArtifact from './contracts/Franchise.json'
import contractAddress from './contracts/franchise-address.json'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      isConnected: false,
      contract: null,
      isInitiated: false
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
    })


  }

  async lockNFT() {//TODO
    console.log('initiating contract')
    await this.state.contract.lockNFT()

  }

  async setPermissions() {
    //TODO
  }

  render() {

    return (
      <div className="App">
        <h1>Cross-Subnet NFT Escrow</h1>
        <h2>Subnet 1</h2>

        <OnboardingButton onConnected={this.onConnected} />

        {this.state.isConnected &&
          <div>
            <h3>Give escrow permission for your NFT.</h3>
            <button onClick={this.setPermissions()}>Set Permission</button>
            <h3>Lock your NFT with the escrow.</h3>
            <button onClick={this.lockNFT}>Lock NFT</button>
          </div>
        }
      </div>
    )
  }
}

export default App