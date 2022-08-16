import React, { useState, useEffect, Fragment } from "react";
import { ethers } from "ethers";
//import './App.css';
import addresses from "./addresses.js";
import abis from "./abis.js";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

import Button from "react-bootstrap/Button";

import RankCard from "./components/RankCard.js";

/* 
TODO
- Metamask integration ✔️
- Show tokens amount on site ✔️
- Show classification/level of address ✔️
- create three links that will send a user to another page
  that'll be an entry to interact with my second contract. 
  For now that page will have a button with the classification
  and a "under construction" as I'm not done with the second contract. ✔️

    - Each link corresponds to the user's(address') classification/level. 
    (ex. red class is higher than yellow and yellow is higher than green,
    thus red can access all three, yellow can access only yellow/green 
    links and green can only access green link). ✔️
- dead links at "learn more", "about", "contact us", "team", "(instragram icon)",
  "(telegram icon)", "(discord icon)", "(facebook icon)" - 
  I can create these later as they will be static/href and easy to do. ✔️

- UI as in mockup wireframe ✔️
*/
function App() {
  const [rank, setRank] = useState();
  const [balance, setBalance] = useState();
  /* const [depositValue, setDepositValue] = useState("");
  const [rankValue, setRankValue] = useState(""); */
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

  /* 
  commented out because not needed 
  
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
  }; */
  return (
    <Container fluid style={{ backgroundColor: "#a1fcd9", minHeight: "100vh" }}>
      {/* Navbar  */}
      <Row>
        <Navbar collapseOnSelect expand="md" bg="light" variant="light">
          <Container fluid>
            <img src="./logo.png" width="70" height="70" alt="logo" />
            <Navbar.Brand href="#home">
              <h3>Contracts AGREED Upon </h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="container-fluid">
                <Nav.Item className="ms-5">
                  <h5>
                    {userAddress
                      ? "Wallet: " + userAddress.substring(0, 7) + "..."
                      : ""}
                  </h5>
                </Nav.Item>
                <Nav.Item className="ms-auto">
                  <h5>{rank >= 0 ? "LVL: " + UserRank[rank] : ""}</h5>
                </Nav.Item>
                <Nav.Item className="ms-5">
                  <h5>{balance ? "AGRD: " + balance : ""}</h5>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
      {/* Main Content */}
      <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
        {/* left side */}
        <Col xs={12} md={8}>
          <Container>
            {/* Cards */}
            <Row className="flex-grow-1 justify-content-center align-items-center">
              {true /* change to these values for real scenario:
                     rank
                      ? Array(rank) 
                      
                      for testing purpose it shows all 4 possible ranks*/
                ? Array(4)
                    .fill(1)
                    .map((el, i) => {
                      return (
                        <RankCard
                          key={i}
                          rankname={UserRank[i + 1]}
                          index={i + 1}
                        />
                      );
                    })
                : ""}
            </Row>
          </Container>
        </Col>
        {/* right side */}
        <Col
          xs={6}
          md={4}
          className="d-flex flex-column justify-content-center align-items-start"
        >
          <h3>
            Learn how to convert your physical contracts into private NFTs
          </h3>
          <Button variant="light" size="lg" href="learn">
            Learn More!
          </Button>
        </Col>
      </Row>

      {/* Footer */}
      <Row>
        <Navbar bg="#a1fcd9" variant="light">
          <Container className="">
            <Nav className="container-fluid flex-wrap">
              <Nav.Link className="ms-auto" href="/about">
                About
              </Nav.Link>
              <Nav.Link href="/contact">Contact Us</Nav.Link>
              <Nav.Link href="/team">Team</Nav.Link>
              <Nav.Link href="/Instagram">Instagram</Nav.Link>
              <Nav.Link href="/Telegram">Telegram</Nav.Link>
              <Nav.Link href="/Discord">Discord</Nav.Link>
              <Nav.Link href="/Facebook">Facebook</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
}

export default App;

{
  /*  
        commented out 
        because of no use right now 

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
            */
}
