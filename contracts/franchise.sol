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
        int tokenID;
    }

    // Address of franchise's vault
    address private immutable vault;

    // Address of relayer
    address private relayer;

    // Mapping of escrow transaction hashes to local user information
    mapping(bytes32 => LocalUserInfo) private localDirectory;

    // Event emitted when new escrow TX is submitted to smart contract
    event EscrowTXRecieved(bytes32 indexed hsh);

    // Event emitted when user locks their NFT
    event NFTLocked(bytes32 indexed hsh, address indexed holder);

    // Constructor sets address of relayer and creates its associated vault
    constructor(address _relayer) {
        relayer = _relayer;
        address _vault = new Vault();
        vault = _vault;
    }

    // Function that recieves information from the Hub and adds it to contract storage.
    // Meant to be called by relayer
    function recieveEscrowTX(bytes32 _hash, address _user, address _to, address _nftContract, int tokenID) public {
        // Verify that relayer is calling the function
        require(msg.sender == relayer, "You are not the relayer!");
        // Create LocalUserInfo struct
        LocalUserInfo info = LocalUserInfo(_user, _to, _nftContract, tokenID);
        // Put in storage
        localDirectory[_hash] = info;
        // Emit event
        emit EscrowTXRecieved(_hash);
    }

    // Function meant to be called by participant of 
    function lockNFT(bytes32 _hash) public {
        // Retrieve escrow tx from storage
        LocalUserInfo localTX = localDirectory[_hash]
        // Check that msg.sender is part of escrow TX
        require(msg.sender == localTX.user, "You are not allowed to lock your NFT!");
        // Transfer NFT
        // Create IERC721 object
        IERC721 nftObj = IERC721(localTX.nftContract);
        // Call safe_transfer_from method
        nftObj.safe_transfer_from(msg.sender, vault, localTX.tokenID);
        // Emit event that NFT was locked
        emit NFTLocked(_hash, msg.sender);
    }

    function releaseNFT(bytes32 _hash) public {

    }

}