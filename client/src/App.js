import React, { useState, useEffect, Fragment } from "react";
import { ethers } from "ethers";
//import './App.css';
import addresses from "./addresses.js";
import abis from "./abis.js";

/* 
TODO
- Metamask integration ✔️
- Show tokens amount on site ✔️
- Show classification/level of address ✔️
- create three links that will send a user to another page
  that'll be an entry to interact with my second contract. 
  For now that page will have a button with the classification
  and a "under construction" as I'm not done with the second contract. 

    - Each link corresponds to the user's(address') classification/level. 
    (ex. red class is higher than yellow and yellow is higher than green,
    thus red can access all three, yellow can access only yellow/green 
    links and green can only access green link).
- dead links at "learn more", "about", "contact us", "team", "(instragram icon)",
  "(telegram icon)", "(discord icon)", "(facebook icon)" - 
  I can create these later as they will be static/href and easy to do. 

*/
function App() {
  const [rank, setRank] = useState();
  const [balance, setBalance] = useState();
  const [depositValue, setDepositValue] = useState("");
  const [rankValue, setRankValue] = useState("");
  const [userAddress, setUserAddress] = useState();

  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // The MetaMask plugin also allows signing transactions to
  // send ether and pay to change state within the blockchain.
  // For this, you need the account signer...
  const signer = provider.getSigner();

  // contract instance creation
  const ContractAddress = addresses.testnetContract;

  const ContractABI = abis.testnetAbi;

  const contract = new ethers.Contract(ContractAddress, ContractABI, signer);

  // MetaMask requires requesting permission to connect users accounts

  useEffect(() => {
    const connectWallet = async () => {
      await provider.send("eth_requestAccounts", []).then((res) => {
        // Return the address of the wallet
        console.log(res);
        setUserAddress(res[0]);
      });
    };
    connectWallet().catch(console.error);
  }, []);

  useEffect(() => {
    if (!userAddress) return;
    console.log("inside userAddress UseEffect ");
    const callContract = async () => {
      await contract.balanceOf(userAddress).then((res) => {
        setBalance(parseInt(res) / 10 ** 18);
      });
      await contract.getRank(userAddress).then((res) => {
        setRank(parseInt(res));
      });
    };
    callContract().catch(console.error);
  }, [userAddress]);

  const UserRank = ["None", "Silver", "Gold", "Platinum", "Diamond"];

  const handleDeposit = (e) => {
    setDepositValue(e.target.value);
  };

  const handleRank = (e) => {
    setRankValue(e.target.value);
  };

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    console.log(depositValue);
  };

  const handleRankSubmit = (e) => {
    e.preventDefault();
    console.log(rankValue);
  };
  return (
    //--- Selection Bar,Show level, amount of AGRD
    <Fragment>
      <div class="container">
        <div class="container">
          <div class="row">
            <div class="col">AREA FOR BUTTONS</div>
            <div>{userAddress ? userAddress : ""}</div>
            <div class="col-md-auto">
              Your Tier: {rank ? UserRank[rank] : "None"}
            </div>
            <div class="col col-lg-2">
              Your Balance: {balance ? balance : ""}
            </div>

            <div class="col col-lg-2">
              <form onSubmit={handleDepositSubmit}>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    onChange={handleDeposit}
                    value={depositValue}
                  />
                </div>
                <button type="submit" class="btn btn-success">
                  Deposit
                </button>
              </form>
              <form onSubmit={handleRankSubmit}>
                <div class="form-group">
                  <input
                    type="number"
                    class="form-control"
                    placeholder="0"
                    onChange={handleRank}
                    value={rankValue}
                  />
                </div>
                <button type="submit" class="btn btn-primary">
                  Get Rank
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <p>
          {" "}
          Fill with some sort of website introduction once completed - or a
          template
        </p>
        <p></p>
        <p></p>
      </div>

      <div class="container">
        <div class="container">
          <div class="row">
            <p> Links to the other pages based on Rank</p>
            {rank
              ? Array(rank)
                  .fill(1)
                  .map((el, i) => {
                    return (
                      <div key={i} class="col-sm">
                        <a href="/">{UserRank[i + 1]}</a>
                      </div>
                    );
                  })
              : ""}
          </div>
        </div>
      </div>

      <div class="container">
        <div class="container">
          <div class="row">
            <p> Links </p>
            <div class="col-sm">
              <a href="/">Learn More</a>
            </div>
            <div class="col-sm">
              <a href="/">About</a>
            </div>
            <div class="col-sm">
              <a href="/">Contact US</a>
            </div>
            <div class="col-sm">
              <a href="/">Team</a>
            </div>
          </div>

          <div class="row">
            <p> Socials </p>
            <div class="col-sm">
              <a href="/">Instagram</a>
            </div>
            <div class="col-sm">
              <a href="/">Telegram</a>
            </div>
            <div class="col-sm">
              <a href="/">Discord</a>
            </div>
            <div class="col-sm">
              <a href="/">Facebook</a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
