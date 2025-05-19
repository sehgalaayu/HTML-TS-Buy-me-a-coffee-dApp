# ☕ Buy Me a Coffee dApp

A decentralized application (dApp) built with **JavaScript**, **Viem**, and **Ethereum**, allowing users to fund your wallet with ETH as a friendly way to "buy you a coffee.

---

## 🔗 Features

- 🔐 Connect with MetaMask
- 💸 Fund the contract with ETH
- 📊 View contract balance
- 🏦 Withdraw funds (owner-only)
- 🛠 Uses **Viem** for smart contract interactions

---

## 🚀 Tech Stack

- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Blockchain Interaction**: [Viem](https://viem.sh)
- **Wallet**: MetaMask
- **Smart Contract**: Solidity (FundMe-style contract)

---

## 📁 File Structure

```

📦 buy-me-a-coffee-dapp
├── index.html             # UI layout
├── style.css              # App styling
├── index-js.js            # Main frontend logic
├── constants-js.js        # Exports contract address and ABI
├── fundme-anvil.json      # Optional: Output from Forge/Hardhat for local setup

````

---

## 🧠 Prerequisites

- MetaMask installed and connected to your browser
- A local Ethereum node (like Anvil or Hardhat node) OR deployed contract
- Contract ABI and address properly exported in `constants-js.js`

---

## ⚙️ Setup & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/sehgalaayu/buy-me-a-coffee-dapp.git
   cd buy-me-a-coffee-dapp


2. **Start a local server**

3. **Use Your Contract Info**

   * If using Foundry/Hardhat locally, copy ABI and contract address from `fundme-anvil.json`
   * Then update `constants-js.js` like this:

     ```js
     export const contractAddress = "YOUR_DEPLOYED_ADDRESS";
     export const coffeeAbi = YOUR_ABI_FROM_JSON;
     ```

4. **Launch the App**
   Open `http://localhost:5500` or your relevant port.

---

## 🔧 Available Functions

* **Connect with Wallet** — Prompts MetaMask connection
* **Buy Coffee** — Sends ETH to the contract using `fund()`
* **Get Balance** — Logs the current balance in ETH
* **Withdraw** — Owner-only function to withdraw ETH

---

## 🛡 Security Notes

* Ensure your contract checks ownership on `withdraw()`
* Do not expose private keys
* Test thoroughly on testnets before deploying to mainnet


## 📝 License

MIT License — feel free to use and modify for your own coffee dApps ☕.

---

## 🙌 Acknowledgments

* [Viem](https://viem.sh)
* [MetaMask](https://metamask.io)
* [Foundry](https://book.getfoundry.sh/) / Hardhat for contract development


