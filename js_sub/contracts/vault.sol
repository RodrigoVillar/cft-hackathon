// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./IERC721.sol";

/*
Smart contract responsible for storing NFTs. Although NFTs could be stored in 
each subnet's respective Franchise.sol, NFTs being stored in a separate vault
contract would increase security.
*/

contract Vault {

    // Address of the owner of the vault (in this case, franchise.sol)
    address private owner;

    // Constructor sets msg.sender as the owner of the vault
    constructor() {
        owner = msg.sender;
    }
    
    // When callede, giveNFT gives NFT A to the owner of the vault
    function sendNFT(address nftContract, uint tokenID) public {
        // Send NFT to Owner
        IERC721(nftContract).safeTransferFrom(address(this), owner, tokenID);
    }

}