// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract VotingSystem {
    struct Choice {
        string name;
        uint256 voteCount;
    }

    struct VotingContest {
        string title;
        string description;
        Choice[] choices;
        mapping(address => bool) hasVoted;
        bool isActive;
    }

    VotingContest[] public contests;

    function createContest(string memory _title, string memory _description, string[] memory _choices) public {
        VotingContest storage newContest = contests.push();
        newContest.title = _title;
        newContest.description = _description;
        newContest.isActive = true;
        for (uint i = 0; i < _choices.length; i++) {
            newContest.choices.push(Choice({ name: _choices[i], voteCount: 0 }));
        }
    }

    function vote(uint _contestIndex, uint _choiceIndex) public {
        VotingContest storage contest = contests[_contestIndex];
        require(contest.isActive, "Contest is not active.");
        require(!contest.hasVoted[msg.sender], "You have already voted.");
        contest.choices[_choiceIndex].voteCount += 1;
        contest.hasVoted[msg.sender] = true;
    }

    function endContest(uint _contestIndex) public {
        VotingContest storage contest = contests[_contestIndex];
        contest.isActive = false;
    }

    function getContestsCount() public view returns (uint) {
        return contests.length;
    }

    function getChoices(uint _contestIndex) public view returns (string[] memory, uint[] memory) {
        VotingContest storage contest = contests[_contestIndex];
        uint length = contest.choices.length;
        string[] memory names = new string[](length);
        uint[] memory votes = new uint[](length);
        for (uint i = 0; i < length; i++) {
            names[i] = contest.choices[i].name;
            votes[i] = contest.choices[i].voteCount;
        }
        return (names, votes);
    }

    function hasVoted(uint _contestIndex, address _voter) public view returns (bool) {
        return contests[_contestIndex].hasVoted[_voter];
    }

    function isContestActive(uint _contestIndex) public view returns (bool) {
        return contests[_contestIndex].isActive;
    }
}
