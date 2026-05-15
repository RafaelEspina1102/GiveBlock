# GiveBlock

GiveBlock: Blockchain-Based Transparent Charity Fund Management System” aims to demonstrate how blockchain technology can be used to track and record charity donations and fund usage in a transparent and verifiable manner.

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
