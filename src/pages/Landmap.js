import React, { useState,useContext,useEffect } from 'react'

import NavbarMeta from '../components/NavbarMeta'


import 'bootstrap/dist/css/bootstrap.min.css';  
import {Container ,Row, Col, Modal, Button, Tooltip,OverlayTrigger, Card , Form} from 'react-bootstrap';  

import {ContextConsumer} from '../utils/Context'
import { allowedNodeEnvironmentFlags } from 'process';

const Landmap = () => {


  const contextValues = useContext(ContextConsumer);
  

  // ********** BLOCKCHAIN SECTION START **********

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

  const fetchAllNftTokens =async () =>{
    await contextValues.smartcontract_fetchAllNFTtokens()
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
          ConnectSmartContract()
          fetchAllNftTokens()
          findIsOwner()
      }
      
  },[ isBlockchainLoaded ])

// ********** BLOCKCHAIN SECTION END **********








  const r="red";

  const g="green"; //grass
  const p="#5ee65a"; //plot

  const b="blue"; //buildings
  const w="white"; //buildings

  const rd ="black" // road

  const matrix = [ 
    [g,g,g,g,p,g,g,g,g,p, 0 ,p,p,p,p,p,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,p,g,g,g,g,p, 0 ,p,p,p,p,p,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,p,g,g,g,g,p, 0 ,p,p,p,p,p,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [p,p,p,p,p,p,p,p,p,p, 0 ,p,p,p,p,p,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [0,0,0,0,0,0,0,0,0,0, 0 ,p,p,p,p,p,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,g,g,g,g,g,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,p,p,p,p,p,p,p,p,p,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,p,g,g,g,g,g,g,g,p,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,p,g,g,g,g,g,g,g,p,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [0,0,0,0,0,0,0,0,0,0, 0 ,g,p,g,g,g,g,g,g,g,p,g,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,p,g,g,g,g,g,g,g,p,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,p,g,g,g,g,g,g,g,p,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,p,g,g,g,g,g,g,g,p,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,p,g,g,g,g,g,g,g,p,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [g,g,g,g,g,g,g,g,g,g, 0 ,g,p,p,p,p,p,p,p,p,p,g,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0, 0 ,g,g,g,g,g,g,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [b,b,b,b,0,g,g,g,g,g, 0 ,0,0,0,0,0,0,0,0,0,0,0,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [b,b,b,b,0,g,g,g,g,g, 0 ,g,g,g,g,g,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [b,b,b,b,0,g,g,g,g,g, 0 ,g,g,g,g,g,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [b,b,b,b,0,g,g,g,g,g, 0 ,g,g,g,g,g,0,g,g,g,g,g,0,0,0,0,0,0,0,0,0,0,0,0,0,0,],
    [0,0,0,0,0,0,0,0,0,0, 0 ,g,g,g,g,g,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [p,p,p,p,p,p,p,p,p,p, 0 ,g,g,g,g,g,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [p,p,p,p,p,p,p,p,p,p, 0 ,g,g,g,g,g,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [p,p,p,p,p,p,p,p,p,p, 0 ,g,g,g,g,g,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
    [p,p,p,p,p,p,p,p,p,p, 0 ,g,g,g,g,g,0,g,g,g,g,g,0,g,g,g,g,g,g,g,0,g,g,g,g,g,],
  ];

  

  return (
    
    <div>
      <NavbarMeta/>

      <h1 style={{ textAlign:'center' }} >Land Map</h1>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', }} >
        <MapElement isOwner={isOwner} style={{backgroundColor:'black'}} matrix={matrix}/>
      </div>
      
    </div>
  )
}




const MapElement= ({matrix,isOwner}) =>{
  const pixelsize=30;
  const [showModel, setshowModel]=useState(false);
  const [lat, setLat]= useState(0);
  const [lon, setLon]= useState(0);

  

  return(

    <div style={{flexDirection:'column',backgroundColor:'black'}} >
      {
        matrix.map((row, rowIndex) =>{
          return(
            <div key={rowIndex} className="d-flex align-items-start bd-highlight " style={{ height: `${pixelsize}px` , width: `${pixelsize*row.length}px` }}>
              {
                row.map((pixel,colIndex)=>{
                  // console.log("row : ", pixel)
                  
                  const _land_details = FetchLandDetails( rowIndex,colIndex )
                  // console.log("_land_details : ", _land_details)
                  
                  return(
                    <>  
                      <OverlayTrigger
                        placement="right"
                        delay={{ show: 250, hide: 200 }}
                        overlay={
                          // ()=>{
                                        // var landDetails = FetchLandName( colIndex,rowIndex ) 
                                        // console.log(landDetails)
                                        // return(
                                                <Tooltip id="button-tooltip">
                                                  {rowIndex} : {colIndex}  <br/>
                                                  {FetchLandName( rowIndex, colIndex )}
                                                </Tooltip>
                                              // )
                                      // }
                              } 
                          > 

                    {_land_details?<div 
                            onClick={()=>{ setLat(colIndex); setLon(rowIndex); setshowModel(true) ;console.log("land : " , rowIndex, "," , colIndex ) }} 
                            key={colIndex} 
                            style={{border: '1px solid red', backgroundColor:pixel , width:pixelsize, height:pixelsize }} 
                            className=" bd-highlight col-example"/>
                            :
                            <div 
                            onClick={()=>{ setLat(colIndex); setLon(rowIndex); setshowModel(true) ;console.log("land : " , rowIndex, "," , colIndex ) }} key={colIndex} 
                            style={{border: '1px solid black', backgroundColor:pixel , width:pixelsize, height:pixelsize }} 
                            className=" bd-highlight col-example"/>
                            }
                      </OverlayTrigger>
                    </>
                  )
                  
                })
              }
            </div>
          )
        })
        
      }

      {/* this is the overlay that shows when we click the land  */}
      <OverlayCard isOwner={isOwner} show={showModel} lat={lat} lon={lon} onHide={() => setshowModel(false)} />
      {/* this is the overlay that shows when we click the land  */}
      {/* the `show` variable is used to show the overlay when only it is active  */}

  </div>
  )
}






function OverlayCard(props) {
  const _data = FetchLandDetails(props.lon, props.lat);
  const contextValues = useContext(ContextConsumer);
  
  
  return (
    
    <>
    {/* if data is present then show the Modal*/}
    {/* ****************VIEW FOR NORMAL USERS START*************** */}
    {_data&&
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {_data.landName}
          </Modal.Title>
        </Modal.Header>

        {_data.uri&&<Card.Img variant="top" style={{width:500, align:'center'  }} src={_data.uri} />  }
        <Modal.Body>
          <h4>{_data.tokenId}</h4>
          {!_data.sold&&<h4>Price : {_data.price} ETH</h4>}
          {_data.sold&&<p>owner : {_data.owner}</p>}
          {!_data.sold&&<p>seller : {_data.seller}</p>}
          <p>lat : {props.lat}</p>
          <p>lon : {props.lon}</p>
          {/* <>{_data}</> */}
        </Modal.Body>

        <Modal.Footer>
          {!_data.sold&&<Button onClick={()=>{BuyThisLand(contextValues , _data.tokenId, _data.price)}}>Buy</Button>}
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    }
    {/* ****************VIEW FOR NORMAL USERS END*************** */}



    {/* ****************SALE OPTION IF OWNER START*************** */}
    {/* else we check is it the owner if yes we show him an option to put the land on sale  */}
    {
      !_data&&props.isOwner&&
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            create land
          </Modal.Title>
        </Modal.Header>

        {/* <Card.Img variant="top" style={{width:500, align:'center'  }} src={"https://static.remove.bg/remove-bg-web/913b22608288cd03cc357799d0d4594e2d1c6b41/assets/start_remove-c851bdf8d3127a24e2d137a55b1b427378cd17385b01aec6e59d5d4b5f39d2ec.png"} />   */}
        <Modal.Body>
          <CreateNewLandComponent lat={props.lat} lon={props.lon} />
        </Modal.Body>

        <Modal.Footer>
          {/* <Button onClick={()=>{
                                  contextValues.smartContract_createNewLand("tokenURI2", "landName2", "2", "2", "40")
                               }}> Create Land </Button> */}

          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    }
    {/* ****************SALE OPTION IF OWNER END*************** */}

    </>

  );
}


const CreateNewLandComponent =({lat,lon}) =>{
  const contextValues = useContext(ContextConsumer);

  const [landName, setLandName ] = useState("");
  const [landURI, setLandURI ] = useState("");
  const [landPrice, setLandPrice ] = useState("");
  // const [landPrice, setLandPrice ] = useState("");

  return(
    <>
    <Form>
      <h1>Create Land For Sale </h1>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Land name</Form.Label>
        <Form.Control value={landName} type="landName" placeholder="Enter land Name" onChange={(event)=>{ setLandName(event.target.value)}} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Land URI</Form.Label>
        <Form.Control value={landURI} type="Landuri" placeholder="Enter URI" onChange={(event)=>{ setLandURI(event.target.value)}}  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Price</Form.Label>
        <Form.Control value={landPrice} type="landprice" placeholder="Enter Price" onChange={(event)=>{ setLandPrice(event.target.value)}}  />
      </Form.Group>

      <p>latitude : {lat}</p>
      <p>longitude : {lon}</p>


      {/* <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Latitude</Form.Label>
        <Form.Control type="email" placeholder="Enter Latitude" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Longitude</Form.Label>
        <Form.Control type="email" placeholder="Enter Longitude" />
      </Form.Group> */}
      



      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>

    </Form>

    <Button variant="primary" onClick={()=>{
      contextValues.smartContract_createNewLand(landURI, landName, lat, lon, landPrice)
    }} >
    Submit
    </Button>

    </>
  )
}





const BuyThisLand = (contextValues, tokenID, Price) =>{
  contextValues.smartcontract_BuyLand(tokenID, Price)
}


const FetchLandName =  ( y,x ) =>{
  // console.log("lat lon : " , x,y)
  // used to fetch details of the land using its lat and lon 
  // return {"data":"data"}

  const contextValues = useContext(ContextConsumer);
  var _data;


  //For Kallloor stadium 
  if(x>=6&&x<=16 )
  {
    if(y>=11&&y<=21)
    {
      _data="Kalloor Stadium";
      return _data
    }
  }
  //For Kallloor stadium 
  else{
    // if it is not kalloor stadium enters here 

    // fetches all NFTs from smartcontract and put it in a loop
    contextValues.AllNftTokens.forEach(element => {
      // element holds each nfts during the loop 

      // if lat and lon equals x and y then we store the name of that land in _data variable 
      // else is not stored
      if((x==element.lat) && (y==element.lon) ){
        // console.log("this is it : " , element )
        _data = element.landName;
      }
      else{
        
      }
    });
    
    // console.log(_data)
    // atlast the _data is returned , 
    return _data;

    
  }
  
}


const FetchLandDetails =  ( y,x ) =>{
  // console.log("lat lon : " , x,y)
  // used to fetch details of the land using its lat and lon 
  // return {"data":"data"}

  const contextValues = useContext(ContextConsumer);
  var _data;


  //For Kallloor stadium 
  if(y>=6&&y<=16 )
  {
    if(x>=11&&x<=21)
    {
      _data="Kalloor Stadium";
      // console.log("FetchLandDetails : _data : " , {"landName":_data})
      return {"landName":_data};
    }
  }
  //For Kallloor stadium 
  else{
    // if it is not kalloor stadium enters here 

    // fetches all NFTs from smartcontract and put it in a loop
    contextValues.AllNftTokens.forEach(element => {
      // element holds each nfts during the loop 

      // if lat and lon equals x and y then we store the name of that land in _data variable 
      // else is not stored
      if((x==element.lat) && (y==element.lon) ){
        // console.log("this is it : " , element )
        _data = element;
      }
      else{
        
      }
    });
    
    // console.log(_data)
    // atlast the _data is returned , 
    return _data;

    
  }
  
}



export default Landmap

