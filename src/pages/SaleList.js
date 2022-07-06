
import React, { useState } from 'react'
import { useEffect, useContext } from 'react'

import NavbarMeta from '../components/NavbarMeta'

import {ContextConsumer} from '../utils/Context'


import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Card, Col, Button} from 'react-bootstrap';  


const SaleList = () => {

  const contextValues = useContext(ContextConsumer);

  const [ walletBalance , setWalletBalance ] = useState(0);

  // below function loads blovkvhain using the function in context
  const LoadBlockChain = async () =>{
    await contextValues.LoadBlockChain()
    setisBlockchainLoaded(true)
  }
  
  // this function fetches wallet balance 
  const fetchWalletBalance =async () =>{    
    if(!contextValues.isConnectedToWallet){
      await contextValues.LoadBlockChain()
    }
    const _walletbalance = await contextValues.getBalance();

    // this will set the walletbalance 
    setWalletBalance(_walletbalance)
    console.log("balance : ", _walletbalance)
  }

  const fetchUnsoldItems = async () =>{
    const _data_back = await contextValues.smartcontract_fetchUnsoldMarketItems();
    console.log("unsold items : ", _data_back)
  }


  const [isBlockchainLoaded , setisBlockchainLoaded] = useState(false) ;

  
  useEffect( ()=>{
      LoadBlockChain()
  },[])

  
  
  useEffect( ()=>{
      if(isBlockchainLoaded){
          fetchWalletBalance()
          fetchUnsoldItems()
      }
      
  },[ isBlockchainLoaded ])






  return (

    <div>
      <NavbarMeta/>
      <h2 style={{textAlign:'center'}} >unsold land</h2>
        <div style={{marginLeft: 0}} >
            <div class="container"  >
                    
                {
                  contextValues.unSoldLand&&contextValues.unSoldLand.map((item, index)=>{
                      return(
                        <ItemsCard key={index} item={item} />
                      )
                    })
                }

            </div>
        </div>
    </div>
  )
}


const ItemsCard=({item})=>{

  const contextValues = useContext(ContextConsumer);
  // function is used to buy a listed land with its token id and price 
  const BuyThisLand = (tokenID, Price) =>{
    contextValues.smartcontract_BuyLand(tokenID, Price)
  }

  // box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  
  return(
    
      <Col md="9" style={{ marginTop:20 , boxShadow: " 0px 20px 30px -10px  rgb(38, 57, 77) " }} >  
        <Card  >  
        <Card.Img variant="top" src={item.uri} />  
        <Card.Body>  
          <Card.Title>{item.landName}</Card.Title>  
          <Card.Text>  
          <p>Price : {item.price} ETH</p>
          {/* <p>owner : {item.owner}</p> */}
          <p>seller : {item.seller}</p>
          <p>lat : {item.lat}</p>
          <p>lon : {item.lon}</p>
          </Card.Text>  
          <Button variant="primary" onClick={()=>{BuyThisLand(item.tokenId,item.price)}} > Buy</Button>  
        </Card.Body>  
      </Card>  
    </Col>  

  )
}

export default SaleList
