import React, { useState } from 'react'
import { useEffect, useContext } from 'react'

import NavbarMeta from '../components/NavbarMeta'

import {ContextConsumer} from '../utils/Context'
// Form

import { Form, Button, input } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Card, Col} from 'react-bootstrap';  

const Profile = () => {
  
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

  const ConnectSmartContract = async()=>{
    await contextValues.ConnectSmartContract()
  }

  const fetchMyNftTokens =async () =>{
    await contextValues.smartcontract_fetchMyNFTtokens()
  }

  const findIsOwner =async () =>{
    const _owner = await contextValues.smartcontract_fetchOwnerOfMetaverse();
    if(_owner==contextValues.address[0]){
      console.log(" THE OWNER IS HERE BOYS!");
      setIsOwner(true)
    }
  }

  const [isBlockchainLoaded , setisBlockchainLoaded] = useState(false) ;
  const [isOwner , setIsOwner] = useState(false) ;

  
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
          ConnectSmartContract()
          fetchMyNftTokens()
          findIsOwner()
      }
      
  },[ isBlockchainLoaded ])



  return (
    
    <div>
      <NavbarMeta/>
      {/* <button style={{width:120,height:80}} onClick={async()=>{await ConnectSmartContract();}} > connect to smartcontract </button> */}

      {/* <Container> */}

        <div  style={{textAlign:'center'}} >
          <h1>My Account</h1>
          <p>Address : {contextValues.address}</p>
          <p>Balance : {walletBalance}</p>
        </div>
        
      {/* </Container> */}
      
      

      <MyLandTokensList/>
      <div style={{flexDirection: 'row' , marginTop:'50px' }}>
        <Button style={{marginLeft: '45%'}} onClick={()=>{fetchMyNftTokens()}} >refresh My NFT Tokens</Button>
      </div>
      

      {/* <FindOwnerOfToken/>  */} 
    </div>
  )
}


const MyLandTokensList =() =>{
  const contextValues = useContext(ContextConsumer);
  
  
  return(
    
    <div >
      <h2  style={{textAlign:'center'}} >My NFT land Tokens</h2>
      <div style={{marginLeft: 0}} >
          <div class="container"  >
                
            {
              contextValues.myNFTTokens&&contextValues.myNFTTokens.map((item, index)=>{

                console.log("item : ", item)

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

  console.log("here")

  const contextValues = useContext(ContextConsumer);
  // function is used to buy a listed land with its token id and price 
  // const BuyThisLand = (tokenID, Price) =>{
  //   contextValues.smartcontract_BuyLand(tokenID, Price)
  // }

  const [newPrice, setNewPrice] = useState(item.price);




  return(
      <Col md="12"  style={{ marginTop:20 }} >    
        <Card style={{marginLeft:40, boxShadow: " 0px 20px 30px -10px  rgb(38, 57, 77) "  }} >  
        <Card.Img variant="top" src={item.uri} />  
        <Card.Body>  
          <Card.Title>{item.landName}</Card.Title>  
          <Card.Text>  
          <p>Price : {item.price} ETH</p>
          {/* <p>owner : {item.owner}</p> */}
          {/* <p>seller : {item.seller}</p> */}
          <p>lat : {item.lat}</p>
          <p>lon : {item.lon}</p>
          </Card.Text>  
          <input type="field" value={newPrice} onChange={(value)=>{setNewPrice(value.target.value)}}/>

          <Button variant="primary" onClick={()=>{
              // console.log("price : ", newPrice )
              contextValues.smartcontract_SellYourLand(item.tokenId, newPrice)
            }} > Sell</Button>  
        </Card.Body>  
      </Card>  
    </Col>  
  )
}





const FindOwnerOfToken = ({}) => {
  const contextValues = useContext(ContextConsumer);

  const [tokenID, setTokenID] = useState("");

  const fetchOwnership = async (tokenID) =>{
    await  contextValues.smartcontract_getTokenDetails(tokenID)
  }

  return(
    <div style={{ alignItems:'center' , textAlign:'center', marginTop:"50px" }} >
      <h1>OWNER OF </h1>
      <p>This section can be used to find the owner of a token , enter the id of the token to fetch its details</p>
      <p>token : {1}</p>
      <input type="field" value={tokenID} onChange={(value)=>{setTokenID(value.target.value)}}/>
      <p>owner : {1}</p>
      <Button onClick={()=>{fetchOwnership(tokenID)}} >get details </Button>

    </div>
  )
}



export default Profile
