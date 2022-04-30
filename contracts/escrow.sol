// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

//import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract NFTescrow {
    enum Ready_One {
        ALICE,
        BOB,
        NULL
    }

    enum State {
        INITIATED,
        READY_ONE,
        READY_SWAP,
        COMPLETE
    }

    struct Escrow {
        address alice;
        address bob;
        address aliceNFT;
        address bobNFT;
        string aliceSubnet;
        string bobSubnet;
        State currentState;
        Ready_One readyOne;
    }

    uint256 public nextEscrow;

    mapping(uint256 => Escrow) public escrows;

    address relayer;

    modifier _isRelayer(address _relayer) {
        require(_relayer == relayer, "Not Relayer!");
        _;
    }

    function initiate(
        address _alice,
        address _bob,
        address _aliceNFT,
        address _bobNFT,
        string memory _alicesubnet,
        string memory _bobSubnet
    ) external _isRelayer(msg.sender) {
        escrows[nextEscrow] = Escrow(
            _alice,
            _bob,
            _aliceNFT,
            _bobNFT,
            _alicesubnet,
            _bobSubnet,
            State.INITIATED,
            Ready_One.NULL
        );
        nextEscrow++;
    }

    function ready(address _person, uint256 _escrowID)
        external
        _isRelayer(msg.sender)
    {
        Escrow storage escrow = escrows[_escrowID];
        if (escrow.currentState == State.INITIATED) {
            escrow.currentState = State.READY_ONE;
            if (_person == escrow.alice) {
                escrow.readyOne = Ready_One.ALICE;
            } else if (_person == escrow.bob) {
                escrow.readyOne = Ready_One.BOB;
            }
        } else if (escrow.currentState == State.READY_ONE) {
            escrow.currentState = State.READY_SWAP;
        }
    }

    function swapDone(uint256 _escrowID) external _isRelayer(msg.sender) {
        Escrow storage escrow = escrows[_escrowID];
        require(escrow.currentState == State.READY_SWAP);
        escrow.currentState = State.COMPLETE;
    }
}
