// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// //import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

// contract FranchiseEscrow {
//     struct Halfrow {
//         address alice;
//         address bob;
//         address nft;
//         uint256 tokenId;
//         State currentState;
//     }

//     //add in fail state
//     enum State {
//         INITIATED,
//         RECIEVED,
//         RELEASED
//     }

//     uint256 public nextHalfrow;

//     mapping(uint256 => Halfrow) public halfrows;

//     address relayer;

//     modifier _isRelayer(address _relayer) {
//         require(_relayer == relayer, "Not Relayer!");
//         _;
//     }

//     function initiate(
//         address _alice,
//         address _bob,
//         address _nft,
//         address _tokenId
//     ) external _isRelayer(msg.sender) {
//         halfrows[nextHalfrow] = Halfrow(
//             _alice,
//             _bob,
//             _nft,
//             _tokenId,
//             State.INITIATED
//         );
//         nextHalfrow++;
//     }

//     function recieve(uint256 _halfrowID) external {
//         Halfrow storage halfrow = halfrows[_halfrowID];
//         // Get nft address
//         INFT interface_nft = INFT(halfrow.nft);
//         interface_nft.safe_tranfer_from(halfrow.alice, this, halfrow.tokenId);
//     }
// }
