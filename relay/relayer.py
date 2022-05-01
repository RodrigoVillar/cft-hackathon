"""
NEED TO REWRITE FILE SO THAT ALL CODE IS BASICALLY ENCAPSULATED AS FUNCTIONS
Module that acts as the relayer for NFTEscrow

List of all relevant events, divided by its associated smart contract emitter

franchise.sol (multiple):
    - NFTLocked 

escrow.sol (single):
    - NewEscrow 
    - ReleaseEscrow 
    - Refund 

SUBNET A = 0
SUBNET B = 1
"""

import secrets
import weakref
from web3 import Web3
import json, time, secret
from threading import Thread

# Node URLs
hub_url = "HTTP://127.0.0.1:7545"
subnet_a_url = "HTTP://127.0.0.1:7545"
subnet_b_url = "HTTP://127.0.0.1:7545"

# Contract Addresses
escrow_address = ""
franchise_a_address = ""
franchise_b_address = ""

# Relayer Address
relayer_address = ""

# Fetch ABI

with open("/Users/peru/Code/cft-hackathon-main/cft-hackathon/build/contracts/Escrow.json") as f:
    escrow_data = json.loads(f.read())
    f.close()

with open("/Users/peru/Code/cft-hackathon-main/cft-hackathon/build/contracts/Franchise.json") as f:
    franchise_data = json.loads(f.read())
    f.close()

escrow_abi = escrow_data["abi"]
franchise_abi = franchise_data["abi"]

escrow_bytecode = escrow_data["bytecode"]
franchise_bytecode = franchise_data["bytecode"]

# Create w3 instances
w3_hub = Web3(Web3.HTTPProvider(hub_url))
w3_subnet_a = Web3(Web3.HTTPProvider(subnet_a_url))
w3_subnet_b = Web3(Web3.HTTPProvider(subnet_b_url))

# Create contracts
# escrow_contract = w3_hub.eth.contract(address = w3_hub.toChecksumAddress(escrow_address), abi = escrow_abi)
# franchise_a_contract = w3_hub.eth.contract(address = w3_subnet_a.toChecksumAddress(franchise_a_address), abi = franchise_abi)
# franchise_b_contract = w3_subnet_b.eth.contract(address =
# w3_subnet_b.toChecksumAddress(franchise_b_address), abi = franchise_abi)
escrow_contract = w3_hub.eth.contract(abi=escrow_abi, bytecode=escrow_bytecode)
franchise_1_contract = w3_subnet_a.eth.contract(abi=franchise_abi, bytecode=franchise_bytecode)
franchise_2_contract = w3_subnet_b.eth.contract(abi=franchise_abi, bytecode=franchise_bytecode)

# INSERT RELAYER LOGIC HERE

# Overall Object: relayer listens to events
#   - Once relayer hears an event, it sends a transaction to the relevant
#     subchain

# Event filter
newEscrow_filter = escrow_contract.events.NewEscrow.createFilter(fromBlock="latest")
releaseEscrow_filter = escrow_contract.events.ReleaseEscrow.createFilter(fromBlock="latest")
refund_filter = escrow_contract.events.Refund.createFilter(fromBlock="latest")

NFTLocked_1_filter = franchise_1_contract.events.NFTLocked.createFilter(fromBlock="latest")

NFTLocked_2_filter = franchise_2_contract.events.NFTLocked.createFilter(fromBlock="latest")


def NFTLocked_executer(filter, subnet):
    """
    Function that executes in response to NFTLocked event
    """
    while True:
        for event in filter.get_new_entries():
            txID = event["args"]["txID"]
            user = event["args"]["holder"]
            transaction = {
                            "gasPrice": w3_subnet_a.eth.gas_price,
                            "chainId": 1337,
                            "nonce": w3_hub.eth.get_transaction_count(w3_subnet_a.toChecksumAddress(relayer_address))
                        }
            # Unsigned tx
            tx = escrow_contract.functions.nftLocked(txID, user).buildTransaction(transaction)
            # Signed tx
            signed_tx = w3_hub.eth.sign_transaction(tx, secret.relayer_private_key)
            # Send signed tx
            final_tx = w3_hub.eth.send_raw_transaction(signed_tx.rawTransaction)


def refund_executer(filter):
    """
    Function that executes in response to refund event
    """
    # Psuedo-code
    # Event will emit hash that will used to call executeRefund() for each
    # respective function; main hub will no longer have associated hash data in
    # storage
    while True:
        for event in filter.get_new_entries():
            txID = event["args"]["txID"]
            # Update Alice
            transaction = {
                            "gasPrice": w3_subnet_a.eth.gas_price,
                            "chainId": 1337,
                            "nonce": w3_subnet_a.eth.get_transaction_count(w3_subnet_a.toChecksumAddress(relayer_address))
                        }
            # tx_1 unsigned
            tx_1 = franchise_1_contract.functions.executeRefund(txID).buildTransaction(transaction)
            # Signed tx_1
            signed_tx_1 = w3_subnet_a.eth.sign_transaction(tx_1, secret.relayer_private_key)
            # Send signed_tx_1
            final_tx_1 = w3_subnet_a.eth.send_raw_transaction(signed_tx_1.rawTransaction)

            # Update Bob
            transaction = {
                            "gasPrice": w3_subnet_a.eth.gas_price,
                            "chainId": 1337,
                            "nonce": w3_subnet_a.eth.get_transaction_count(w3_subnet_a.toChecksumAddress(relayer_address))
                        }
            # Transaction 2 unsigned
            tx_2 = franchise_2_contract.functions.executeRefund(txID).buildTransaction(transaction)
            # Transaction 2 signed
            signed_tx_2 = w3_subnet_b.eth.sign_transaction(tx_2, secret.relayer_private_key)
            # Send signed_tx_2
            final_tx_2 = w3_subnet_b.eth.send_raw_transaction(signed_tx_2.rawTransaction)
            

def releaseEscrow_executer(filter):
    """
    Function that executes in response to releaseEscrow event
    """
    # Pseudo-code
    # Event will emit hash that will be used to access storage of partner
    # subnets, main hub will no longer has associated hash data in storage
    while True:
        for event in filter.get_new_entries():
            txID = event["args"]["txID"]
            # Update Alice
            # Transaction 1 metadata
            transaction = {
                            "gasPrice": w3_subnet_a.eth.gas_price,
                            "chainId": 1337,
                            "nonce": w3_subnet_a.eth.get_transaction_count(w3_subnet_a.toChecksumAddress(relayer_address))
                        }
            # Create tx_1 unsigned
            tx_1 = franchise_1_contract.functions.releaseNFT(txID).buildTransaction(transaction)
            # Transaction 1 signed
            signed_tx_1 = w3_subnet_a.eth.sign_transaction(tx_1, secret.relayer_private_key)
            final_tx_1 = w3_subnet_a.eth.send_raw_transaction(signed_tx_1.rawTransaction)

            # Update Bob
            # Transaction 2 metadata
            transaction = {
                            "gasPrice": w3_subnet_b.eth.gas_price,
                            "chainId": 1337,
                            "nonce": w3_subnet_b.eth.get_transaction_count(w3_subnet_b.toChecksumAddress(relayer_address))
                        }
            # Create tx_2 unsigned
            tx_2 = franchise_2_contract.functions.releaseNFT(txID).buildTransaction(transaction)
            # Signed tx_2
            signed_tx_2 = w3_subnet_b.eth.sign_transaction(tx_2, secret.relayer_private_key)
            # Send signed tx_2
            final_tx_2 = w3_subnet_b.eth.send_raw_transaction(signed_tx_2.rawTransaction)


def newEscrow_executer(filter):
    """
    Function that executes after newEscrow event is emitted
    """
    while True:
        for event in filter.get_new_entries():
            # Pseudo-code
            # Extract hash from event
            txID = event["args"]["txID"]
            # Call Escrow smart contract and retreive relevant data
            # Assumption that data_1, data_2 are arrays
            data_1 = escrow_contract.functions.getEscrow(txID, 0).call()
            data_2 = escrow_contract.functions.getEscrow(txID, 1).call()
            # Call relevant franchises and update state

            # Transaction 1 metadata
            transaction = {
                            "gasPrice": w3_subnet_a.eth.gas_price,
                            "chainId": 1337,
                            "nonce": w3_subnet_a.eth.get_transaction_count(w3_subnet_a.toChecksumAddress(relayer_address))
                        }
            # Transaction 1 unsigned
            tx_1 = franchise_1_contract.functions.recieveEscrowTX(txID, data_1[0], data_2[0], data_1[1], data_1[2]).buildTransaction(transaction)
            # Transaction 1 signed
            signed_tx_1 = w3_subnet_a.eth.sign_transaction(tx_1, secret.relayer_private_key)
            # Send signed_tx_1
            final_tx_1 = w3_subnet_a.eth.send_raw_transaction(signed_tx_1.rawTransaction)

            # Transaction 2 metadata
            transaction = {
                            "gasPrice": w3_subnet_b.eth.gas_price,
                            "chainId": 1337,
                            "nonce": w3_subnet_b.eth.get_transaction_count(w3_subnet_b.toChecksumAddress(relayer_address))
                        }

            # Transaction 2 unsigned
            tx_2 = franchise_2_contract.functions.recieveEscrowTX(txID, data_2[0], data_1[0], data_2[1], data_2[2]).buildTransaction(transaction)
            # Transaction 2 signed
            signed_tx_2 = w3_subnet_b.eth.sign_transaction(tx_2, secret.relayer_private_key)
            # Send signed_tx_2
            final_tx_2 = w3_subnet_b.eth.send_raw_transaction(signed_tx_2.rawTransaction)
    

def main():
    """
    Function that when called, starts relayer program
    """
    # Create 9 Threads that run indefinitely
    
    # Threads to listen to Hub Subnet
    newEscrow_worker = Thread(target=newEscrow_executer, args=(newEscrow_filter,))
    releaseEscrow_worker = Thread(target=releaseEscrow_executer, args=(releaseEscrow_filter,))
    refund_worker = Thread(target=refund_executer, args=(refund_filter,))

    # Threads to listen to Subnet A
    nftLocked_0_worker = Thread(target=NFTLocked_executer, args=(NFTLocked_1_filter,))

    # Threads to listen to Subnet B
    nftLocked_1_worker = Thread(target=NFTLocked_executer, args=(NFTLocked_2_filter,))

    newEscrow_worker.start()
    releaseEscrow_worker.start()
    refund_worker.start()

    nftLocked_0_worker.start()
    nftLocked_1_worker.start()


# UNCOMMENT LINES BELOW WHEN READY TO USE RELAYER
# if __name__ == "__main__":
#     main()