"""
Module that acts as the relayer for NFTEscrow

List of all possible events, divided by its associated smart contract emitter

franchise.sol:
    - EscrowTXRecieved
    - NFTLocked
    - RefundComplete

escrow.sol:
    - NewEscrow
    - ReleaseEscrow
    - Refund
"""

from web3 import Web3
import json

# Node URLs
hub_url = ""
subnet_a_url = ""
subnet_b_url = ""

# Contract Addresses
escrow_address = ""
franchise_a_address = ""
franchise_b_address = ""

# Fetch ABI

with open("/Users/peru/Code/cft-hackathon-main/cft-hackathon/build/contracts/Escrow.json") as f:
    escrow_data = json.loads(f.read())
    f.close()

with open("/Users/peru/Code/cft-hackathon-main/cft-hackathon/build/contracts/Franchise.json") as f:
    franchise_data = json.loads(f.read())
    f.close()

escrow_abi = escrow_data["abi"]
franchise_abi = franchise_data["abi"]

# Create w3 instances
w3_hub = Web3(Web3.HTTPProvider(hub_url))
w3_subnet_a = Web3(Web3.HTTPProvider(subnet_a_url))
w3_subnet_b = Web3(Web3.HTTPProvider(subnet_b_url))

# Create contracts
escrow_contract = w3_hub.eth.contract(address = w3_hub.toChecksumAddress(escrow_address), abi = escrow_abi)
franchise_a_contract = w3_hub.eth.contract(address = w3_subnet_a.toChecksumAddress(franchise_a_address), abi = franchise_abi)
franchise_b_contract = w3_subnet_b.eth.contract(address = w3_subnet_b.toChecksumAddress(franchise_b_address), abi = franchise_abi)

# INSERT RELAYER LOGIC HERE
