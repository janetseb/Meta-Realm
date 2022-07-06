# 1.
to start the project first create react app by using 

```
npx create-react-app metaverse
```

# 2. 
Open the app directory (metaverse)

# 3. 
Run npx truffle init 

this will create the below folders/files :

* `contracts` folder in the current directory , which holds the smartcontracts

* `migration` used for deployment porposses

* `truffle-config.js` used to configure truffle , which is used to deploy the contracts to the blockchain network . 

* create NFTMarketplace.sol file in the contracts folder and write your smartcontract. 

* then npm install openzeplin using the command : 
```js 
npm install @openzeppelin/contracts
```

* Open the migrations folder and create a file named `2_NFTMarketplace_migration.js`

* Run `npx truffle compile ` to compile the smartcontracts

* Run `npx truffle migrate -reset ` to deploy the smartcontract

* after this there will be a folder called biild . Open that folder and copy `NFTMarketplace.json` and paste it inside `src/abi` folder

# 4.  REACT 

now install web3 library in react using 

```js
npm install web3
```

```js
 npm install react-router-dom@6 --save   
```

```js
npm i --save react-bootstrap
```

```js
npm i @restart/ui
```