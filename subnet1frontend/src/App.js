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
      permission: false,
      index: null,
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
      permission: false,
      index: this.state.index,
    })


  }

  async lockNFT() {
    console.log('initiating contract')
    await this.state.contract.lockNFT(this.state.index)
  }

  async setIndex(num) {
    this.setState({
      isConnected: this.state.isConnected,
      contract: this.state.contract,
      permission: this.state.permission,
      index: num,
    })
  }

  async setPermissions() {
    //TODO
    this.setState({
      isConnected: true,
      contract: this.state.contract,
      permission: true,
      index: this.state.index,
    })
  }

  render() {

    return (
      <div className="App">
        <h1>Cross-Subnet NFT Escrow</h1>
        <h2>Subnet 1</h2>

        <OnboardingButton onConnected={this.onConnected} />

        {this.state.isConnected && !this.state.permission &&
          <div>
            <h3>Give escrow permission for your NFT.</h3>
            <button onClick={this.setPermissions()}>Set Permission</button>
          </div>
        }
        {this.state.isConnected && this.state.permission &&
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>Enter the escrow index:
                <input
                  type="number"
                  onChange={(e) => this.setIndex(e.target.value)}
                />
              </label>
              <input type="submit" />
            </form>
            <h3>Lock your NFT with the escrow.</h3>
            <button onClick={this.lockNFT()}>Lock NFT</button>
          </div>
        }
      </div>
    )
  }
}

export default App