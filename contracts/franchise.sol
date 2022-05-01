// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./vault.sol";
import "../interfaces/IERC721.sol";

/*
Smart contract that lives on each subnet. Each franchise has an associated vault
that stores the franchise's NFT (seperation of assets => better security). 
*/
contract Franchise {

    // Struct representing escrow transaction information for respective subnet
    struct LocalUserInfo {
        address user;
        address to;
        address nftContract;
        uint tokenID;
        uint isLocked;
    }

    // Address of franchise's vault
    address private immutable vault;

    // Address of relayer
    address private relayer;

    // Mapping of escrow transaction txIDs to local user information
    mapping(uint => LocalUserInfo) private localDirectory;

    // Event emitted when new escrow TX is submitted to smart contract
    event EscrowTXRecieved(uint indexed txID);

    // Event emitted when user locks their NFT
    event NFTLocked(uint indexed txID, address indexed holder);

    // Event emitted when refund is complete
    event RefundComplete(uint indexed txID);

    modifier isRelayer() {
        require(msg.sender == relayer, "You are not the relayer!");
        _;
    }

    // Constructor sets address of relayer and creates its associated vault
    constructor(address _relayer) {
        relayer = _relayer;
        Vault _vault = new Vault();
        vault = address(_vault);
    }

    // Function that recieves information from the Hub and adds it to contract storage.
    // Meant to be called by relayer
    function recieveEscrowTX(uint txID, address _user, address _to, address _nftContract, uint tokenID) public isRelayer {
        // Create LocalUserInfo struct
        LocalUserInfo memory info = LocalUserInfo(_user, _to, _nftContract, tokenID, 0);
        // Put in storage
        localDirectory[txID] = info;
        // Emit event
        emit EscrowTXRecieved(txID);
    }

    // Function meant to be called by participant of 
    function lockNFT(uint txID) public isRelayer {
        // Retrieve escrow TX from storage
        LocalUserInfo memory localTX = localDirectory[txID];
        // Check that msg.sender is part of escrow TX
        require(msg.sender == localTX.user, "You are not allowed to lock your NFT!");
        // Transfer NFT
        // Create IERC721 object
        IERC721 nftObj = IERC721(localTX.nftContract);
        // Call safe_transfer_from method
        nftObj.safeTransferFrom(msg.sender, vault, localTX.tokenID);
        // Store that NFT was transferred
        localDirectory[txID].isLocked = 1;
        // Emit event that NFT was locked
        emit NFTLocked(txID, msg.sender);
    }

    function releaseNFT(uint txID) public isRelayer {
        // Retrieve escrow TX from storage
        LocalUserInfo memory localTX = localDirectory[txID];
        // Verify that NFT is locked up
        require(localTX.isLocked != 0, "NFT has not been locked up!");
        // Tell Vault to send NFT to this smart contract
        Vault(vault).sendNFT(localTX.nftContract, localTX.tokenID);
        // Send NFT to Bob
        IERC721(localTX.nftContract).safeTransferFrom(address(this), localTX.to, localTX.tokenID);
        // Delete storage
        delete localDirectory[txID];
    }

    function executeRefund(uint txID) public isRelayer {
        // Check that escrow TX exists
        require(localDirectory[txID].user != address(0), "Escrow does not exist!");
        // Put escrow TX to memory
        LocalUserInfo memory localInfo = localDirectory[txID];
        // Get NFT from vault
        Vault(vault).sendNFT(localInfo.nftContract, localInfo.tokenID);
        // Send NFT back to original owner
        IERC721(localInfo.nftContract).safeTransferFrom(address(this), localInfo.user, localInfo.tokenID);
        // Delete storage
        delete localDirectory[txID];

        // Emit that refund was successful
        emit RefundComplete(txID);
    }

}