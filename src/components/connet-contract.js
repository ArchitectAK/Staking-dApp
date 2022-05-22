import React, { useEffect, useState } from "react";
import AKToken from '.src/build/AKToken'
import RewardToken from '.src/build/RewardToken'
import StakingDapp from '.src/build/StakingDapp'

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

    const AKTokenData = AKToken.networks[networkId];

    if(AKTokenData){
      setAKToken(new web3.eth.Contract(TetherToken.abi, AKTokenData.address));
      let tetherTokenBalance = await akToken.methods.balance(account).call();
      setAKTokenBalance(tetherTokenBalance.toString())
    }
    
    const RewardTokenData = RewardToken.networks[networkId];

    if(RewardTokenData){
      setRewardToken(new web3.eth.Contract(DummyToken.abi, RewardTokenData.address));
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

  const stateTokens = (amount) => {

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