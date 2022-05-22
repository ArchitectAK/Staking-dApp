// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./AKToken.sol";
import "./RewardToken.sol";

contract Staking_Dapp {
    string public name = "Staking Dapp";
    address public owner;
    RewardToken public rewardToken;
    AKToken public akToken;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RewardToken _rewardToken, AKToken _akToken) public {
        rewardToken = _rewardToken;
        akToken = _akToken;
        owner = msg.sender;
    }

    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "amount can not be zero"); //if amount is zero

        akToken.transferFrom(msg.sender, address(this), _amount); //transfer tether token

        stakingBalance[msg.sender] += _amount; //update the staking balanace

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender); // add user to staker array
        }

        isStaking[msg.sender] = true; // update staking status for the user
        hasStaked[msg.sender] = true;
    }

    function unstakeToken() public {
        uint256 balance = stakingBalance[msg.sender]; //fetch balance of staker
        require(balance > 0, "staking balance is zero"); // check if balance is zero
        akToken.transfer(msg.sender, balance); //transfer back tehter token to use

        stakingBalance[msg.sender] = 0; // set staking balance to zero
        isStaking[msg.sender] = false; // update the staking status
    }

    function issueDummy() public {
        require(msg.sender == owner, "caller must be the owner"); // check if owner is access

        for (uint256 i = 0; i < stakers.length; i++) {
            address recipient = stakers[i]; // recipient
            uint256 balance = stakingBalance[recipient]; // balance for recipient
            if (balance > 0) {
                rewardToken.transfer(recipient, balance); // trnasfer dummy token to recipient
            }
        }
    }
}
