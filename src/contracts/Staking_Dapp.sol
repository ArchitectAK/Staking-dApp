// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Tether_Token.sol";
import "./Dummy_Token.sol";

contract Staking_Dapp {
    string public name = "Staking Dapp";
    address public owner;
    Dummy public dummy_token;
    Tether public tether_token;

    address[] public stakers;
    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Dummy _dummToken, Tether _tetherToken) public {
        dummy_token = _dummToken;
        tether_token = _tetherToken;
        owner = msg.sender;
    }

    function stakeTokens(uint256 _amount) public {
        require(_amount > 0, "amount can not be zero"); //if amount is zero

        tether_token.transferFrom(msg.sender, address(this), _amount); //transfer tether token

        stakingBalance[msg.sender] += _amount; //update the staking balanace

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender); // add user to staker array
        }

        isStaking[msg.sender] = true; // update staking status for the user
        hasStaked[msg.sender] = true;
    }
}
