// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LockerRoomDAO.sol";

contract DAOFactory {
    event DAOCreated(address daoAddress, string teamName, string metadataURI);

    struct TeamDAO {
        address dao;
        string teamName;
        string metadataURI;
    }

    TeamDAO[] public teamDAOs;

    function createTeamDAO(
        string memory teamName,
        string memory metadataURI,
        address passToken,
        address treasury
    ) external {
        LockerRoomDAO dao = new LockerRoomDAO(passToken, treasury);
        teamDAOs.push(TeamDAO(address(dao), teamName, metadataURI));
        emit DAOCreated(address(dao), teamName, metadataURI);
    }

    // Optional: get all created DAOs
    function getAllDAOs() external view returns (TeamDAO[] memory) {
        return teamDAOs;
    }
}
