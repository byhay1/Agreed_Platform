/**

*/

//const { expect } = require["chai"];
//const { ethers } = require["hardhat"];

describe("GetRank", function() {
  it("Should return rank of the user", async function () {
    const GetRank = await ethers.getContractFactory("GetRank");
    const ranker = await GetRank.deploy();
    await ranker.deployed();

    expect(await ranker.rank()).to.equal(4);

    const setRankerTx = await ranker.setRanker(3);

    //wait until the transaction is mined
    await setRankerTx.wait();

    expect(await ranker.rank()).to.equal(3);
    });
  });
