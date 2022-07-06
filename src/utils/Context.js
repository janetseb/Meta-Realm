import React,{useEffect, useState, useContext} from 'react'
import Web3 from 'web3'


import NFTMarketplace from '../abi/NFTMarketplace.json';


const AppContext = React.createContext()

function  ContextProvider(props) {

    const [test, settest] = useState("0")



    // ***** DATAHOLDERS START ******
    const[unSoldLand,setunSoldLand] = useState({
            unSoldLand : [],
        })

    const[myNFTTokens,setmyNFTTokens] = useState({
            myNFTTokens : [],
        })

    const[AllNftTokens,setAllNftTokens] = useState({
          AllNftTokens : [],
      })
    // ***** DATAHOLDERS END ******


    // ********** METAMASK SECTION START **********
    const [address , setAddress ] = useState();
    // used to store the current metamask address

    const [isConnectedToWallet , setIsConnectedToWallet ] = useState(false);
    // used to store the status if the website is connected to metamask or not 
    // using this iw the website is not connected we cant prompt it to connect to metamask

    const [inputData , setInputData ] = useState("");
    
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
    async function LoadBlockChain()
    {
        // connects to the local evelopment environment
        const ConnectToMetaMask = async () => {
            
            // This function is used to check if metamask is connected or not 

            if (window.ethereum) 
            {
                // the function enters here if metamask is installed
                console.log("metamask is present ")
                await window.ethereum.send('eth_requestAccounts');
                window.web3 = new Web3(window.ethereum);

                // console.log(window.web3);
                const acc = await web3.eth.getAccounts();

                console.log(acc)
                // The address is then stored 
                setAddress(acc)

                // In this case, the await window.ethereum.send('eth_requestAccounts') function calls the pop-up UI dialogue that asks the user’s permission to connect the dApp to MetaMask.

                setIsConnectedToWallet(true);
                // if we connect to the wallet successfully we set isConnectedToWallet to true


                // This function returns true if metamask is installed
                return true;
            }
            else{
                // the function enters here if metamask is not installed
                console.log("metamask is not installed")
            }

            // This function returns false if metamask is not installed

            return false;
        }

        await  ConnectToMetaMask()

    }



  const getBalance = async () => {
    
    if(!isConnectedToWallet)
    {
      // If wallet is not connected we enter here 
      console.log("Please connect to wallet ");
      return 0;
    }

    console.log("address : " , address);
    

    // prints the balance of the connected address
    const balanceFrom = web3.utils.fromWei(
       await web3.eth.getBalance( address[0] ),
       'ether'
    );

    console.log("balance is :" ,  balanceFrom )
    return balanceFrom;
  };

// ********** METAMASK SECTION END **********










// ********** SMART CONTRACT SECTION START **********

const ConnectSmartContract = async () =>{
    // This function is used to connect to the smart contract 
    if(!isConnectedToWallet)
    {
      // If wallet is not connected we enter here 
      console.log("Please connect to wallet ");
      return;
    }


    // These below lines are used to fetch the address of our smart contract
    // The address is present inside the NFTMarketplace.json 

    const networkId = await web3.eth.net.getId()
    console.log( "networkId :  " , networkId );
    const networkData = NFTMarketplace.networks[networkId];
    console.log( "network Data :  " , networkData);

    if(networkData)
    {
      var smartContractAddress = networkData.address;
      console.log( "network address :  " , smartContractAddress);
      
      // the below line is used to connect to the NFTMarketplace , 
      // ie , our smart contract
      const TestContract =  new web3.eth.Contract( NFTMarketplace.abi , smartContractAddress );

      console.log(TestContract);

      return TestContract;
    }
    else{
      console.log("not found");
    }

  

  }




  const smartContract_createNewLand = async ( tokenURI, landName, lat, lon, price ) =>{

    const TestContract = await ConnectSmartContract();
    // above line connect to the smart contract
    //  ConnectSmartContract() is a function we have written to connect with our smart contract 
    
    const dataBack = await TestContract.methods.CreateLandToken(tokenURI, landName, lat, lon, price).send({from: address[0]
        , value: ' 1000000000000000000' //1 ether
      });

    // The above lines are used to write data to smart contract 
    // to send data to the smart contract we use .send() function
    // Data back will be the reply from the smart contract

    // This runs the TestContract and stores the return value to dataBack variable 
    console.log("dataBack : " , dataBack );

  }

  // this function fetches all of the NFT items and store it in databack
  const smartcontract_fetchAllNFTtokens = async() =>{
    const TestContract = await ConnectSmartContract();
    // above line connect to the smart contract
    //  ConnectSmartContract() is a function we have written to connect with our smart contract 
    // const dataBack = await TestContract.methods.getTokenDetails(2).call();
    const dataBack = await TestContract.methods.fetchAllTokens().call();
    
    setAllNftTokens({
        ...AllNftTokens,
        AllNftTokens:dataBack
    })

    console.log("context: fetchall tokens : " , dataBack );

    return dataBack;

  }


  // this function fetches unsold items and store it in databack
  const smartcontract_fetchUnsoldMarketItems = async() =>{
    const TestContract = await ConnectSmartContract();
    // above line connect to the smart contract
    //  ConnectSmartContract() is a function we have written to connect with our smart contract 
    // const dataBack = await TestContract.methods.getTokenDetails(2).call();
    const dataBack = await TestContract.methods.fetchMarketItems().call();
    
    setunSoldLand({
        ...unSoldLand,
        unSoldLand:dataBack
    })

    console.log( "context: unsold items :" , dataBack )

    return dataBack;

  }

  




    // this function fetches the current users NFT items and store it in databack
    const smartcontract_fetchMyNFTtokens = async() =>{
        const TestContract = await ConnectSmartContract();
        // above line connect to the smart contract
        //  ConnectSmartContract() is a function we have written to connect with our smart contract 
        // const dataBack = await TestContract.methods.getTokenDetails(2).call();
        const dataBack = await TestContract.methods.fetchMyNFTs(address[0]).call();
        
        
        setmyNFTTokens({
            ...myNFTTokens,
            myNFTTokens:dataBack
        })
    
        console.log( "context: mynft items :" , dataBack )
    
        return dataBack;
    
      }

      

      




  //   used to buy land using land id and token price
  const smartcontract_BuyLand = async (tokenId, price) =>{
    const TestContract = await ConnectSmartContract();
    // above line connect to the smart contract
    //  ConnectSmartContract() is a function we have written to connect with our smart contract 
    // const dataBack = await TestContract.methods.getTokenDetails(2).call();
    const dataBack = await TestContract.methods.BuyLandToken(tokenId).send({from: address[0]
        , value: price*10**18 //price in ether to pay
      });
  }


  //   used to buy land using land id and token price
  const smartcontract_SellYourLand = async (tokenId, price) =>{
    const TestContract = await ConnectSmartContract();
    // above line connect to the smart contract
    //  ConnectSmartContract() is a function we have written to connect with our smart contract 
    // const dataBack = await TestContract.methods.getTokenDetails(2).call();
    const dataBack = await TestContract.methods.SellYourLandToken(tokenId, price).send({from: address[0]
        , value: 1*10**18 //price in ether to pay
      });
  }


  //   used to buy land using land id and token price
  const smartcontract_getTokenDetails = async (tokenId) =>{
    const TestContract = await ConnectSmartContract();
    // above line connect to the smart contract
    //  ConnectSmartContract() is a function we have written to connect with our smart contract 
    // const dataBack = await TestContract.methods.getTokenDetails(2).call();
    const dataBack = await TestContract.methods.getTokenDetails(tokenId).call();
    // console.log(dataBack);
  }

  // this function fetches all of the NFT items and store it in databack
  const smartcontract_fetchOwnerOfMetaverse = async() =>{
    const TestContract = await ConnectSmartContract();
    // above line connect to the smart contract
    //  ConnectSmartContract() is a function we have written to connect with our smart contract 
    // const dataBack = await TestContract.methods.getTokenDetails(2).call();
    const dataBack = await TestContract.methods.getOwnerOfMeta().call();
    
    console.log("context: owner of metaverse : " , dataBack );

    return dataBack;

  }

  // ********** SMART CONTRACT SECTION END **********









return (
    <AppContext.Provider value={{
        ...unSoldLand,
        ...myNFTTokens,
        ...AllNftTokens,
        test:test,
        address:address,
        
        LoadBlockChain:LoadBlockChain,
        getBalance:getBalance,

        ConnectSmartContract:ConnectSmartContract,
        smartContract_createNewLand:smartContract_createNewLand,

        smartcontract_fetchUnsoldMarketItems:smartcontract_fetchUnsoldMarketItems,
        
        smartcontract_BuyLand:smartcontract_BuyLand,
        smartcontract_fetchMyNFTtokens:smartcontract_fetchMyNFTtokens,

        smartcontract_SellYourLand:smartcontract_SellYourLand,
        smartcontract_getTokenDetails:smartcontract_getTokenDetails,

        smartcontract_fetchAllNFTtokens:smartcontract_fetchAllNFTtokens,
        smartcontract_fetchOwnerOfMetaverse:smartcontract_fetchOwnerOfMetaverse

    }}>
        {props.children}
    </AppContext.Provider>
)
}


// const ContextConsumer = AppContext.Consumer;
const ContextConsumer =AppContext  ;
export {ContextConsumer,ContextProvider}
