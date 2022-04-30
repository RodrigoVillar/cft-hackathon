import logo from './logo.svg';
import './App.css';

import React from 'react'
import { ethers } from 'ethers'

import { OnboardingButton } from './components/Onboarding';

import ContractArtifact from './contracts/Escrow.json'
import contractAddress from './contracts/escrow-address.json'


class App extends React.Component {
  constructor() {
    super()

    this.state = {
      isConnected: false,
      contract: null,
    }

    this.onConnected = this.onConnected.bind(this)
  }

  componentWillUnmount() {

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
    })


  }

  async doSomething() {
  }

  render() {


    return (
      <div className="App">
        <h1>Cross-Subnet NFT Escrow</h1>
        <h2>NFTescrow on Avalanche with Subnets</h2>

        <OnboardingButton onConnected={this.onConnected} />

        {this.state.isConnected}
      </div>
    )
  }
}

export default App