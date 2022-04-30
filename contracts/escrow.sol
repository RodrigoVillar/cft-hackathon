// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// //import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

// contract NFTescrow {
//     enum Ready_One {
//         ALICE,
//         BOB,
//         NULL
//     }

//     enum State {
//         INITIATED,
//         READY_ONE,
//         READY_SWAP,
//         COMPLETE
//     }

//     struct Escrow {
//         address alice;
//         address bob;
//         address aliceNFT;
//         address bobNFT;
//         string aliceSubnet;
//         string bobSubnet;
//         State currentState;
//         Ready_One readyOne;
//     }

//     uint256 public nextEscrow;

//     mapping(uint256 => Escrow) public escrows;

//     address relayer;

//     modifier _isRelayer(address _relayer) {
//         require(_relayer == relayer, "Not Relayer!");
//         _;
//     }

//     function initiate(
//         address _alice,
//         address _bob,
//         address _aliceNFT,
//         address _bobNFT,
//         string memory _alicesubnet,
//         string memory _bobSubnet
//     ) external _isRelayer(msg.sender) {
//         escrows[nextEscrow] = Escrow(
//             _alice,
//             _bob,
//             _aliceNFT,
//             _bobNFT,
//             _alicesubnet,
//             _bobSubnet,
//             State.INITIATED,
//             Ready_One.NULL
//         );
//         nextEscrow++;
//     }

//     function ready(address _person, uint256 _escrowID)
//         external
//         _isRelayer(msg.sender)
//     {
//         Escrow storage escrow = escrows[_escrowID];
//         if (escrow.currentState == State.INITIATED) {
//             escrow.currentState = State.READY_ONE;
//             if (_person == escrow.alice) {
//                 escrow.readyOne = Ready_One.ALICE;
//             } else if (_person == escrow.bob) {
//                 escrow.readyOne = Ready_One.BOB;
//             }
//         } else if (escrow.currentState == State.READY_ONE) {
//             escrow.currentState = State.READY_SWAP;
//         }
//     }

//     function swapDone(uint256 _escrowID) external _isRelayer(msg.sender) {
//         Escrow storage escrow = escrows[_escrowID];
//         require(escrow.currentState == State.READY_SWAP);
//         escrow.currentState = State.COMPLETE;
//     }
// }

/*
Smart contract to be stored on NFTEScrow Subnet
*/
contract Escrow {

    // Struct representing user information on subnet
    struct UserInfo {
        address user;
        address nftContract;
        int tokenID;
        int subnet;
    }

    // Struct 
    struct EscrowTX {
        UserInfo orderOne;
        UserInfo orderTwo;
        bool isReady1;
        bool isReady2;
    }

    // Address of relayer
    address private relayer;

    // Maps Escrow TX hashes to actual Escrow TX info
    mapping(bytes32 => EscrowTX) private escrowDirectory;

    // Event to be emitted when new escrow tx is initiated
    event NewEscrow(bytes32 indexed escrowHash);

    // Event to be emitted when both NFTs are locked up
    event ReleaseEscrow(bytes32 indexed escrowHash);

    // When initialized, contract sets argument as address of relayer
    constructor(address _relayer) {
        relayer = _relayer;
    }

    // Function that creates an escrowTX
    function createEscrowTX(address _nftContract1, int _tokenID1, int _subnetID1, address _user2, address _nftContract2, int _tokenID2, int _subnet2) public {
        UserInfo memory userInfo1 = UserInfo(msg.sender, _nftContract1, _tokenID1, _subnetID1);
        UserInfo memory userInfo2 = UserInfo(_user2, _nftContract2, _tokenID2, _subnet2);

        EscrowTX memory newEscrow = EscrowTX(userInfo1, userInfo2, false, false);
        bytes32 hash = keccak256(abi.encode(newEscrow), block.number);

        require(escrowDirectory[hash].orderOne.user == address(0), "EscrowTX already exists!"); 

        escrowDirectory[hash] = newEscrow;
        emit NewEscrow(hash);
    }

    function nftLocked(bytes32 _hash, address _user) public {
        EscrowTX memory localEscrow = escrowDirectory[_hash];
        require(localEscrow.orderOne.user == _user || localEscrow.orderTwo.user == _user, "Address not involved in Escrow TX!");
        if (localEscrow.orderOne.user == _user) {
            require(localEscrow.isReady1 == false, "NFT is already locked up!");
            escrowDirectory[_hash].isReady1 = true;
        } else {
            require(localEscrow.isReady2 == false, "NFT is already locked up!");
            escrowDirectory[_hash].isReady2 = true;
        }

        if (escrowDirectory[_hash].isReady1 && escrowDirectory[_hash].isReady2) {
            emit ReleaseEscrow(_hash);
            delete escrowDirectory[_hash];
        }
    }


}