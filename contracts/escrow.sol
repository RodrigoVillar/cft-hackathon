// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
Smart contract to be stored on NFTEScrow Subnet. Users can create an escrow
transaction using createEscrowTX(). Additionally, users can call refund() to
cancel an escrow transaction and getEscrow() to get information about an escrow
TX on a subnet. All other functions can be accessed only by relayers.
*/
contract Escrow {

    // Struct representing user information on subnet
    struct UserInfo {
        address user;
        address nftContract;
        uint tokenID;
        int subnet;
    }

    // Struct represent an escrow transaction
    // orderOne and orderTwo represent the user information of an escrow
    // transaction on each subnet. isReady1 and isReady2 are booleans representing
    // whether a user has fulfilled their obligations for an escrow transaction
    // (i.e. locking their NFTs)
    struct EscrowTX {
        UserInfo orderOne;
        UserInfo orderTwo;
        bool isReady1;
        bool isReady2;
    }

    // Address of relayer
    address private relayer;

    // Maps Escrow TX index to actual Escrow TX info
    mapping(uint => EscrowTX) private escrowDirectory;

    // Event to be emitted when new escrow tx is initiated
    event NewEscrow(uint indexed txID);

    // Event to be emitted when both NFTs are locked up
    event ReleaseEscrow(uint indexed txID);

    // Event to be emitted when either Alice or Bob wish to cancel the trade
    event Refund(uint indexed txID);

    // Relayer that only allows for relayer to call function
    modifier isRelayer() {
        require(msg.sender == relayer, "You are not the relayer!");
        _;
    }

    // Mapped to a unique escrow transaction. nonce is incremented after each
    // time it is mapped to an escrow transaction
    uint private nonce;

    // When initialized, contract sets _relayer as address of relayer
    constructor(address _relayer) {
        relayer = _relayer;
    }

    // Function that creates an escrowTX
    function createEscrowTX(address _nftContract1, uint _tokenID1, int _subnetID1, address _user2, address _nftContract2, uint _tokenID2, int _subnet2) public {
        require(_subnetID1 != _subnet2, "NFTEscrow only supports inter-subnet transactions!");
        UserInfo memory userInfo1 = UserInfo(msg.sender, _nftContract1, _tokenID1, _subnetID1);
        UserInfo memory userInfo2 = UserInfo(_user2, _nftContract2, _tokenID2, _subnet2);

        EscrowTX memory newEscrow = EscrowTX(userInfo1, userInfo2, false, false);

        escrowDirectory[nonce] = newEscrow;
        emit NewEscrow(nonce);
        nonce++;
    }

    // Function that changes contract state to account for when a user has
    // successfully locked their NFT
    function nftLocked(uint txID, address _user) public isRelayer {
        EscrowTX memory localEscrow = escrowDirectory[txID];
        require(localEscrow.orderOne.user == _user || localEscrow.orderTwo.user == _user, "Address not involved in Escrow TX!");
        if (localEscrow.orderOne.user == _user) {
            require(localEscrow.isReady1 == false, "NFT is already locked up!");
            escrowDirectory[txID].isReady1 = true;
        } else {
            require(localEscrow.isReady2 == false, "NFT is already locked up!");
            escrowDirectory[txID].isReady2 = true;
        }

        if (escrowDirectory[txID].isReady1 && escrowDirectory[txID].isReady2) {
            emit ReleaseEscrow(txID);
            delete escrowDirectory[txID];
        }
    }

    // Function that when called, cancels an escrow transaction. This function
    // is meant to be called by one of two users of a transactions. Each users
    // respective NFT is released from their respective vaults and returned to
    // their original owners
    function refund(uint txID) public {
        // Check that escrow TX exists
        require(escrowDirectory[txID].orderOne.user != address(0), "Invalid Hash!");
        // Emit event
        emit Refund(txID); 
        // Delete storage
        delete escrowDirectory[txID];
    }

    // Function that returns values of an escrow transaction. In particular, getEscrow 
    // returns all values related to _orderNum. As an example, if getEscrow(43, 0)
    // is called, then getEscrow returns Alice's UserInfo struct along with her
    // associated isReady boolean. Returns default values if transaction ID is invalid
    function getEscrow(uint txID, int _orderNum) public returns(address, address, uint, int, bool) {
        // Retrieve escrow TX from memory
        EscrowTX memory _localEscrow = escrowDirectory[txID];
        if (_orderNum == 0) {
            // Return Alice's Info
            return (_localEscrow.orderOne.user, _localEscrow.orderOne.nftContract, _localEscrow.orderOne.tokenID, _localEscrow.orderOne.subnet, _localEscrow.isReady1);

        } else {
            // Return Bob's Info
            return (_localEscrow.orderTwo.user, _localEscrow.orderTwo.nftContract, _localEscrow.orderTwo.tokenID, _localEscrow.orderTwo.subnet, _localEscrow.isReady2);
        }
    }


}