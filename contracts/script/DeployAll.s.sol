// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/DaoAccessPass.sol";
import "../src/LockerRoomDAO.sol";
import "../src/Treasury.sol";

contract DeployAll is Script {
    function run() external {
        vm.startBroadcast();

        DaoAccessPass pass = new DaoAccessPass();
        Treasury treasury = new Treasury();
        LockerRoomDAO dao = new LockerRoomDAO(address(pass), address(treasury));

        pass.setDAOContract(address(dao));
        treasury.transferOwnership(address(dao));

        vm.stopBroadcast();
    }
}
