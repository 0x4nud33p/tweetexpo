// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/DaoAccessPass.sol";
import "../src/LockerRoomDAO.sol";
import "../src/Treasury.sol";

contract LockerRoomDAOTest is Test {
    LockerRoomDAO dao;
    DaoAccessPass pass;
    Treasury treasury;

    address alice = address(0x1);
    address bob = address(0x2);

    function setUp() public {
        pass = new DaoAccessPass();
        treasury = new Treasury();
        dao = new LockerRoomDAO(address(pass), address(treasury));

        pass.setDAOContract(address(dao));
        treasury.transferOwnership(address(dao));

        vm.deal(alice, 10 ether);
        vm.deal(bob, 10 ether);
    }

    function testProposalLifecycle() public {
        vm.startPrank(alice);
        pass.mintPass{value: 5 ether}("ipfs://nft-metadata");
        dao.createProposal{value: 1 ether}("Title", "Desc", 2 ether);
        dao.vote(0, true);
        vm.warp(block.timestamp + 4 days);
        dao.executeProposal(0);
        vm.stopPrank();
    }
}
