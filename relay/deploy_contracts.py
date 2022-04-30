"""
File that deploys smart contracts for NFTEscrow
"""

from web3 import Web3
import json
import secret

import web3

# Node URLs
hub_url = "HTTP://127.0.0.1:7545"
subnet_a_url = "HTTP://127.0.0.1:7545"
subnet_b_url = "HTTP://127.0.0.1:7545"

# w3 instances
w3_hub = Web3(Web3.HTTPProvider(hub_url))
w3_subnet_a = Web3(Web3.HTTPProvider(subnet_a_url))
w3_subnet_b = Web3(Web3.HTTPProvider(subnet_b_url))

alice_public = "0x83E3bc233927eB15Fe54e9E0575C8C2513019849"

# Index 8
relayer_address = "0xc7e2854aa1E0F486F1aabB9e39DAe0e8E321E70b"

# Grab Escrow ABI
with open("/Users/peru/Code/cft-hackathon-main/cft-hackathon/build/contracts/Escrow.json") as f:
    escrow_build = json.loads(f.read())
    f.close()
# Select just ABI
escrow_abi = escrow_build["abi"]
# Select just bytecode
escrow_bytecode = escrow_build["bytecode"]

# Grab Franchise ABI
with open("/Users/peru/Code/cft-hackathon-main/cft-hackathon/build/contracts/Franchise.json") as f:
    franchise_build = json.loads(f.read())
    f.close()

# Select just ABI
franchise_api = franchise_build["abi"]
# Select just bytecode
franchise_bytecode = franchise_build["bytecode"]

# Create contract objects
escrow_contract = w3_hub.eth.contract(abi=escrow_abi, bytecode=escrow_bytecode)
franchise_1_contract = w3_subnet_a.eth.contract(abi=franchise_api, bytecode=franchise_bytecode)
franchise_2_contract = w3_subnet_b.eth.contract(abi=franchise_api, bytecode=franchise_bytecode)

# Set up information for tx's
transaction = {
    "gasPrice": w3_hub.eth.gas_price,
    "chainId": 1337,
    "nonce": w3_hub.eth.get_transaction_count(w3_hub.toChecksumAddress(alice_public))
}

# Deploy contracts
tx = escrow_contract.constructor(w3_hub.toChecksumAddress(relayer_address)).buildTransaction(transaction)

# Sign transaction
signed_tx = w3_hub.eth.account.signTransaction(tx, private_key=secret.alice_private_key)

# Send transaction to blockchain
final_tx = w3_hub.eth.send_raw_transaction(signed_tx.rawTransaction)