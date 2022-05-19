// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Tether {
    string public name = "AK Tether token";
    string public symbol = "AKT";
    uint256 public totalsupply = 1000000000000000000000000;
    uint256 public decimal = 18;

    event Transfer(address indexed _form, address indexed _to, uint256 _value);
    event Approe(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public balance;
    mapping(address => mapping (address=> uint256)) public allowance;

    constructor() public {
        balance[msg.sender] = totalsupply;
    }

    function transfer(address _to, uint256 _value) public returns(bool success){
        require(balance[msg.sender] >= _value);
        balance[msg.sender] -= _value;
        balance[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns(bool success){
        allowance[msg.sender][_spender] = _value;
        emit Approe(msg.sender, _spender, _value);
        return true;
    }

}
