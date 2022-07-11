import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import { ethers } from "ethers";
//import './App.css';

function App() {
  return (
    //--- Selection Bar,Show level, amount of AGRD,
    <div class="container">
      <div class="container">
        <div class="row">
          <div class="col">
            <AREA FOR BUTTONS>
          </div>
          <div class="col-md-auto">
            Your Tier: null //static for now
          </div>
          <div class="col col-lg-2">
            Your Balance: 0 //static for now
          </div>
          <div class="col col-lg-2">
          <form>
              <div class="form-group">
                <input type="number" class="form-control" placeholder="0" onChange= value="test" />
              </div>
              <button type="submit" class="btn btn-success">Deposit</button>
          </form>
          <form>
              <div class="form-group">
                <input type="number" class="form-control" placeholder="0" value="test" />
              </div>
              <button type="submit" class="btn btn-primary">Deposit</button>
          </form>
          </div>
        </div>
      </div>
    </div>

    //--- Introduction
    <div class="container">
        <!-- Content here -->
        <p> Fill with some sort of website introduction once completed - or a template</p><p></p><p></p>
    </div>

    //---second part of page

    <div class="container">
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <h3> Diamond </h3>
            <p>
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
  );
}

export default App;
