// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IPass {
    function balanceOf(address) external view returns (uint256);
}

interface ITreasury {
    function transferFunds(address to, uint256 amount) external;
}

contract LockerRoomDAO is Ownable {
    struct Proposal {
        string title;
        string description;
        uint256 amount;
        address proposer;
        uint256 deadline;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
    }

    uint256 public proposalFee = 1 ether; // 1 CHZ
    uint256 public votingPeriod = 3 days;

    uint256 public proposalCount;
    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;

    IPass public pass;
    ITreasury public treasury;

    event ProposalCreated(uint256 id, address proposer);
    event Voted(uint256 proposalId, address voter, bool support);
    event Executed(uint256 proposalId);

    constructor(address _pass, address _treasury) {
        pass = IPass(_pass);
        treasury = ITreasury(_treasury);
    }

    function createProposal(string calldata _title, string calldata _desc, uint256 _amount) external payable {
        require(msg.value == proposalFee, "Pay fee");
        require(pass.balanceOf(msg.sender) > 0, "Not a DAO member");

        proposals[proposalCount] = Proposal({
            title: _title,
            description: _desc,
            amount: _amount,
            proposer: msg.sender,
            deadline: block.timestamp + votingPeriod,
            votesFor: 0,
            votesAgainst: 0,
            executed: false
        });

        emit ProposalCreated(proposalCount, msg.sender);
        proposalCount++;
    }

    function vote(uint256 _id, bool _support) external {
        Proposal storage prop = proposals[_id];
        require(block.timestamp <= prop.deadline, "Voting ended");
        require(pass.balanceOf(msg.sender) > 0, "Not a DAO member");
        require(!hasVoted[_id][msg.sender], "Already voted");

        hasVoted[_id][msg.sender] = true;

        if (_support) prop.votesFor++;
        else prop.votesAgainst++;

        emit Voted(_id, msg.sender, _support);
    }

    function executeProposal(uint256 _id) external {
        Proposal storage prop = proposals[_id];
        require(block.timestamp > prop.deadline, "Too early");
        require(!prop.executed, "Already executed");

        if (prop.votesFor > prop.votesAgainst) {
            treasury.transferFunds(prop.proposer, prop.amount);
        }

        prop.executed = true;
        emit Executed(_id);
    }
}
