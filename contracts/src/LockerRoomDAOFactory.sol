// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LockerRoomDAO.sol";

event DAOCreated(address daoAddress, string teamName, string metadataURI);

struct TeamDAO {
    address dao;
    string teamName;
    string metadataURI;
}

TeamDAO[] public teamDAOs;

function createTeamDAO(string memory teamName, string memory metadataURI) external {
    LockerRoomDAO dao = new LockerRoomDAO(...);
    teamDAOs.push(TeamDAO(address(dao), teamName, metadataURI));
    emit DAOCreated(address(dao), teamName, metadataURI);
}
