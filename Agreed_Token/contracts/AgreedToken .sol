// Nothing to see here
pragma solidity >=0.5.16 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract AgreedToken is ERC20 {
    constructor(uint256 initialSupply) public ERC20("AgreedToken", "AGREE"){
        _mint(msg.sender, initialSupply);
  }
}
