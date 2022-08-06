import React, { useState, useEffect, Fragment } from 'react';
import logo from './logo.svg';
import { ethers } from "ethers";
//import './App.css';

function App() {
    const[rank, setRank] = useState('');
    const[depositValue, setDepositValue] = useState('');
    const[rankValue, setRankValue] = useState('');

    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer...
    const signer = provider.getSigner()

    // MetaMask requires requesting permission to connect users accounts
    useEffect(() => {
      const connectWallet = async () => {
        await provider.send("eth_requestAccounts", []);}
      connectWallet()
      .catch(console.error);
    })



    const handleDeposit = (e) => {
      setDepositValue(e.target.value);
    }

    const handleRank = (e) => {
      setRankValue(e.target.value)
    }

    const handleDepositSubmit = (e) => {
      e.preventDefault();
      console.log(handleDeposit);
    }

    const handleRankSubmit = (e) => {
      e.preventDefault();
      console.log(handleRank);
    }
  return (
    //--- Selection Bar,Show level, amount of AGRD
    <Fragment>
    <div class="container">
      <div class="container">
        <div class="row">
          <div class="col">
            AREA FOR BUTTONS
          </div>
          <div class="col-md-auto">
            Your Tier: null //static for now
          </div>
          <div class="col col-lg-2">
            Your Balance: 0 //static for now
          </div>

          <div class="col col-lg-2">
          <form onSubmit={handleDepositSubmit}>
              <div class="form-group">
                <input type="number" class="form-control" placeholder="0" onChange={handleDeposit} value={depositValue} />
              </div>
              <button type="submit" class="btn btn-success">Deposit</button>
          </form>
          <form onSubmit={handleRankSubmit}>
              <div class="form-group">
                <input type="number" class="form-control" placeholder="0" onChange={handleRank}  value={rankValue} />
              </div>
              <button type="submit" class="btn btn-primary">Get Rank</button>
          </form>
          </div>
        </div>
      </div>
    </div>



    <div class="container">
        <p> Fill with some sort of website introduction once completed - or a template</p><p></p><p></p>
    </div>



    <div class="container">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            Diamond
          </div>
          <div class="col-sm">
            Platinum
          </div>
          <div class="col-sm">
            Gold
          </div>
          <div class="col-sm">
            Silver
          </div>
        </div>
      </div>
    </div>
    </Fragment>
  );
}

export default App;
