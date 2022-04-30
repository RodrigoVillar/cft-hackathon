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

    // Event to be emitted when either Alice or Bob wish to cancel the trade
    event Refund(bytes32 indexed escrowHash);

    modifier isRelayer() {
        require(msg.sender == relayer, "You are not the relayer!");
        _;
    }

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
        bytes32 hash = keccak256(abi.encode(newEscrow, block.number));

        require(escrowDirectory[hash].orderOne.user == address(0), "EscrowTX already exists!"); 

        escrowDirectory[hash] = newEscrow;
        emit NewEscrow(hash);
    }

    function nftLocked(bytes32 _hash, address _user) public isRelayer {
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

    /*
    Function to call if either Alice or Bob want to call of the transaction
    */
    function refund(bytes32 _hash) public {
        // Check that escrow TX exists
        require(escrowDirectory[_hash].orderOne.user != address(0), "Invalid Hash!");
        // Emit event
        emit Refund(_hash); 
        // Delete storage
        delete escrowDirectory[_hash];
    }

    // Function that returns values of an escrow transaction. In particular, getEscrow 
    // returns all values related to _orderNum. As an example, if getEscrow(0x4, 0)
    // is called, then getEscrow returns Alice's UserInfo struct along with her
    // associated isReady boolean. Returns default values if hash is invalid
    function getEscrow(bytes32 _hash, int _orderNum) public returns(address, address, uint, int, bool) {
        // Retrieve escrow TX from memory
        EscrowTX memory _localEscrow = escrowDirectory[_hash];
        if (_orderNum == 0) {
            // Return Alice's Info
            return (_localEscrow.orderOne.user, _localEscrow.orderOne.nftContract, _localEscrow.orderOne.tokenID, _localEscrow.orderOne.subnet, _localEscrow.isReady1);

        } else {
            // Return Bob's Info
            return (_localEscrow.orderTwo.user, _localEscrow.orderTwo.nftContract, _localEscrow.orderTwo.tokenID, _localEscrow.orderTwo.subnet, _localEscrow.isReady2);
        }
    }


}