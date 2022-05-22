import React, { useEffect, useState } from "react";
import TetherToken from './src./build/TetherToken'
import DummyToken from './src./build/DummyToken'
import StakingDapp from './src./build/StakingDapp'

const ConnectContracts = () => {
  const [account, setAccount] = useState(null);
  const [akToken, setAKToken] = useState(null);
  const [akTokenBalance, setAKTokenBalance] = useState('');

  const [rewardToken, setRewardToken] = useState(null);
  const [rewardTokenBalance, setRewardTokenBalance] = useState('');
  
  const [stakingDapp, setStakingDapp] = useState('');
  const [stakingDappBalance, setStakingDappBalance] = useState('');

  const loadBlockchainData = () => {
    const web3 = window.web3;
    const accountsFromGanache = await web3.eth.getAccount();
    setAccount(accountsFromGanache[0]);

    const networkId = await web3.eth.net.getId();

    const TetherTokenData = TetherToken.networks[networkId];

    if(TetherTokenData){
      setAKToken(new web3.eth.Contract(TetherToken.abi, TetherTokenData.address));
      let tetherTokenBalance = await akToken.methods.balance(account).call();
      setAKTokenBalance(tetherTokenBalance.toString())
    }
    
    const DummyTokenData = DummyToken.networks[networkId];

    if(DummyTokenData){
      setRewardToken(new web3.eth.Contract(DummyToken.abi, DummyTokenData.address));
      let dummyTokenBalance = await rewardToken.methods.balance(account).call();
      setRewardTokenBalance(dummyTokenBalance.toString())
    }

    const StakingDappData = StakingDapp.networks[networkId];

    if(StakingDappData){
      setStakingDapp(new web3.eth.Contract(StakingDapp.abi, StakingDappData.address));
      let stakingBalance = await stakingDapp.methods.stakingBalance(account).call();
      setStakingDappBalance(stakingBalance.toString())
    }
  }

  // connect to web3
  const loadWeb3 = () =>{
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable();
    }
    else if (window.web3){
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert("Non-ethereum browser, try using metamask")
    }
  }

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  return (
    <div></div>
  )
}

export default ConnectContracts;