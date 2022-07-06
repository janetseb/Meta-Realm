import React, { useEffect } from 'react'

import NavbarMeta from '../components/NavbarMeta'

import Web3 from 'web3'

import { useState , useContext} from 'react';
import NFTMarketplace from '../abi/NFTMarketplace.json';

import {ContextConsumer} from '../utils/Context'

import { Form, Button, input } from 'react-bootstrap';

import { createBrowserHistory as history} from 'history';

const Home = ()=> {

  const [windowDimenion, detectHW] = useState({
    winWidth: window.innerWidth,
    winHeight: window.innerHeight,
  })

  const detectSize = () => {
    detectHW({
      winWidth: window.innerWidth,
      winHeight: window.innerHeight,
    })
  }

  useEffect(() => {
    window.addEventListener('resize', detectSize)

    return () => {
      window.removeEventListener('resize', detectSize)
    }
  }, [windowDimenion])






  const contextValues = useContext(ContextConsumer);
  

  const [ walletBalance , setWalletBalance ] = useState(0);
  //used to store the wallet balance


  // the below function calls loadvlockchain function from context 
  const LoadBlockChain = async () =>{
    await contextValues.LoadBlockChain()
    setisBlockchainLoaded(true)
    // if it is loaded we set setisBlockchainLoaded to true
  }
  
  const fetchWalletBalance =async () =>{    
    if(!contextValues.isConnectedToWallet){
      await contextValues.LoadBlockChain()
    }
    const _walletbalance = await contextValues.getBalance();
    setWalletBalance(_walletbalance)
    console.log("balance : ", _walletbalance)
  }

  const [isBlockchainLoaded , setisBlockchainLoaded] = useState(false) ;

  
  // First we load the chain using the below useeffect
  // if it is loaded successfullly then we set isBlockchainLoaded to true 
  useEffect( ()=>{
      LoadBlockChain()
  },[])

  
  // second useeffect is used to fetch the user balance   
  useEffect( ()=>{
      if(isBlockchainLoaded){
        // if blockchain is loaded then we fetch the balance 
          fetchWalletBalance()
      }
      
  },[ isBlockchainLoaded ])





  return (
    <div>
        <NavbarMeta/>
        
        <video className='videoTag' autoPlay loop muted style={{width:windowDimenion.winWidth , position:'absolute'}}  >
          <source src={"https://cdn.dribbble.com/users/59138/screenshots/7875537/downloads/environment_6.mp4"} type='video/mp4' />
        </video>

        <div style={{position:'absolute'}} >
          <Button style={{alignItems:'center' , textAlign:'center' , marginLeft:windowDimenion.winWidth /2.2, marginTop:'20%' , backgroundColor:"rgba(214, 48, 60, 0.47)" , border:'none' , borderRadius:20 }} 
            onClick={()=>{
              window.open("/Meta", "_self");
              }} >
              <img src={require("../assets/arrow-right.png")} />
              <br/>
              <h1>Go To </h1>
              <h1>Meta-Realm</h1>
          </Button>
        </div>

        
    </div>
  )
}

export default Home


 // "scripts": {
  //   "start": "react-scripts start",
  //   "build": "react-scripts build",
  //   "test": "react-scripts test",
  //   "eject": "react-scripts eject"
  // },