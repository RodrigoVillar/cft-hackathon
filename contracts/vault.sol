// SPDX-License-Identifier: MIT
import "../interfaces/IERC721.sol";

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
    function giveNFT(address nftContract, int tokenID) {
        // Instantiate ERC721 contract
        IERC721 nftObject = IERC721(nftContract);
        // Send NFT to Owner
        nftObject.safe_tranfer_from(address(this), owner, tokenID);
    }

}