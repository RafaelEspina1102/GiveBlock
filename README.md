# GiveBlock

GiveBlock: Blockchain-Based Transparent Charity Fund Management System” aims to demonstrate how blockchain technology can be used to track and record charity donations and fund usage in a transparent and verifiable manner.

## Metamask
Install Metamask for the application to work | https://metamask.io/

Add new network manually (settings)
```bash
| Setting         | Value                                          |
| --------------- | ---------------------------------------------- |
| Network Name    | Hardhat Local                                  |
| RPC URL         | http://127.0.0.1:8545                          |
| Chain ID        | 31337                                          |
| Currency Symbol | ETH                                            |
```
Import private key given by ```npx hardhat node```
```bash
  Account #0: 0x...
  Private Key: 0x...
```
Account #0 is the only admin account. Using Account #1-19 is a normal user

## Deployment

for both Frontend and Blockchain folder
```bash
  npm install
```

To deploy Frontend
```bash
  npm run dev
```

To deploy Blockchain

First
```bash
  npx hardhat node
```
Then
```bash
npx hardhat run scripts/deploy.js --network localhost
```
Replace  address given by deploy  in frontend/src/config.js
```bash
export const CONTRACT_ADDRESS = "REPLACE_ADDRESS_FROM_DEPLOY";
```
Replace contract ABI in frontend/src/config.js

Using ABI from blockchain/artifacts/contracts/GiveBlock.sol/GiveBlock.json
```bash
export const CONTRACT_ABI = [ {ABI} ]
```

To deploy backend
```bash
  go run main.go
```
