import { createWalletClient, createPublicClient, custom, parseEther, defineChain , formatEther} from "https://esm.sh/viem";
import { contractAddress, coffeeAbi } from "./constants-js.js";



console.log("Script loaded!");


const connectBtn = document.querySelector("#connectButton");
const fundButton = document.querySelector("#fundButton");
const ethButtonInput = document.querySelector("#ethAmount");
const balanceBtn = document.querySelector("#balanceButton")
const withdrawBtn = document.querySelector("#withdrawButton");

let walletClient;
let publicClient;

async function connect() {
    console.log("Connect clicked!");
    if (typeof window.ethereum !== "undefined") {
        console.log("Metamask is available!");

        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });

        await walletClient.requestAddresses(); // This will prompt Metamask
        connectBtn.innerHTML = "Connected!";
    } else {
        console.log("No wallet detected.");
        connectBtn.innerHTML = "Please install MetaMask!";
    }
}

async function fund() {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });

        const [connectedAcc] = await walletClient.requestAddresses();
        const ethAmt = ethButtonInput.value;


        const currentChain = await getCurrentChain(walletClient);
        console.log("Wallet connected, Account:", connectedAcc);

        publicClient = createPublicClient({
            transport: custom(window.ethereum), 
        });

        const simulation = await publicClient.simulateContract({
            address: contractAddress,
            abi: coffeeAbi,
            functionName: "fund",
            account: connectedAcc,
            chain: currentChain,
            value: parseEther(ethAmt),
        });

        const hash = await walletClient.writeContract(simulation.request);
        console.log("Transaction sent! Hash:", hash);
    }
}

async function getCurrentChain(client) {
    const chainId = await client.getChainId();
    const currentChain = defineChain({
        id: chainId,
        name: "Custom Chain",
        nativeCurrency: {
            name: "Ether",
            symbol: "ETH",
            decimals: 18,
        },
        rpcUrls: {
            default: {
                http: ["http://localhost:8545"],
            },
        },
    });
    return currentChain;
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const publicClient = createPublicClient({
            transport: custom(window.ethereum) // Talk to MetaMask
        });

        try {
            const balance = await publicClient.getBalance({
                address: contractAddress
            });

            const formattedBalance = formatEther(balance); // Convert from Wei to ETH

            console.log(`Contract Balance: ${formattedBalance} ETH`);
        } catch (error) {
            console.error("Error getting balance:", error);
        }
    } else {
        console.log("Please install MetaMask!");
    }
}

async function withdraw() {
    if (typeof window.ethereum !== "undefined") {
        walletClient = createWalletClient({
            transport: custom(window.ethereum),
        });

        const [connectedAcc] = await walletClient.requestAddresses();
        const currentChain = await getCurrentChain(walletClient);

        publicClient = createPublicClient({
            transport: custom(window.ethereum),
        });

        try {
            const simulation = await publicClient.simulateContract({
                address: contractAddress,
                abi: coffeeAbi,
                functionName: "withdraw",
                account: connectedAcc,
                chain: currentChain,
            });

            const hash = await walletClient.writeContract(simulation.request);
            console.log("Withdrawal transaction sent. Hash:", hash);
        } catch (error) {
            console.error("Error during withdrawal:", error);
        }
    } else {
        console.log("Please install MetaMask!");
    }
}



connectBtn.onclick = connect;
fundButton.onclick = fund;
balanceBtn.onclick = getBalance;
withdrawBtn.onclick = withdraw;
