// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/*
Smart contract to be stored on NFTEScrow Subnet
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
    event NewEscrow(uint indexed escrowHash);

    // Event to be emitted when both NFTs are locked up
    event ReleaseEscrow(uint indexed escrowHash);

    // Event to be emitted when either Alice or Bob wish to cancel the trade
    event Refund(uint indexed escrowHash);

    modifier isRelayer() {
        require(msg.sender == relayer, "You are not the relayer!");
        _;
    }

    // Incremented each time a new transaction is made. Source of transaction ID
    uint private nonce;
    // When initialized, contract sets argument as address of relayer
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

    /*
    Function to call if either Alice or Bob want to call of the transaction
    */
    function refund(uint txID) public {
        // Check that escrow TX exists
        require(escrowDirectory[txID].orderOne.user != address(0), "Invalid Hash!");
        // Emit event
        emit Refund(txID); 
        // Delete storage
        delete escrowDirectory[txID];
    }

    // Function that returns values of an escrow transaction. In particular, getEscrow 
    // returns all values related to _orderNum. As an example, if getEscrow(0x4, 0)
    // is called, then getEscrow returns Alice's UserInfo struct along with her
    // associated isReady boolean. Returns default values if hash is invalid
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