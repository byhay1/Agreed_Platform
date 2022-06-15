// SPDX-License-Identifier: MIT

pragma solidity ^0.5.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AgreedToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("Agreed", "AGRD"){
        _mint(msg.sender, initialSupply);
  }
}
