import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import TetherToken from './src/build/Tether_Token.json'
import DummyToken from './src/build/Dummy_Token.json'
import StakingDapp from './src/build/Staking_Dapp.json'
import { Component } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
