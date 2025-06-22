// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DaoAccessPass is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    uint256 public mintPrice = 5 ether; // 5 CHZ
    address public daoContract;

    constructor() ERC721("LockerRoom DAO Pass", "LRDAO") Ownable(msg.sender) {}

    modifier onlyDAO() {
        require(msg.sender == daoContract, "Not DAO");
        _;
    }

    function setDAOContract(address _dao) external onlyOwner {
        daoContract = _dao;
    }

    function mintPass(string calldata _uri) external payable {
        require(msg.value == mintPrice, "Incorrect CHZ amount");

        _safeMint(msg.sender, nextTokenId);
        _setTokenURI(nextTokenId, _uri);
        nextTokenId++;
    }

    function ownerOfPass(uint256 _tokenId) external view returns (address) {
        return ownerOf(_tokenId);
    }
}