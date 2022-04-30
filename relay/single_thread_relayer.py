from web3 import Web3
import json

# URL of subnet node to connect to
subnet_provider = ""
# Address of escrow contract
escrow_address = 0

# Create Web3 Instance
w3 = Web3(Web3.HTTPProvider(subnet_provider))

# Grab Escrow ABI
with open("../build/contracts/escrow.json") as f:
    escrow_build = json.loads(f)
# Select just ABI
escrow_abi = escrow_build["abi"]
# Create smart contract object
escrow_contract = w3.eth.contract(address = w3.toChecksumAddress(escrow_address), abi = escrow_abi)



