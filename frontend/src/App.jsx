import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config";

function App() {

  const [walletAddress, setWalletAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [donations, setDonations] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [usageAmount, setUsageAmount] = useState("");
  const [fundUsages, setFundUsages] = useState([]);

  async function connectWallet() {

    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    setWalletAddress(accounts[0]);
  }

  async function loadDonations() {

    try {

      if (!window.ethereum) return;

      const provider = new ethers.BrowserProvider(window.ethereum);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const data = await contract.getDonations();

      setDonations(data);

    } catch (error) {
      console.error(error);
    }
  }

  async function loadFundUsages() {

  try {

    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

    const data = await contract.getFundUsages();

    setFundUsages(data);

  } catch (error) {
    console.error(error);
  }
}

  async function donate() {

    try {

      if (!window.ethereum) {
        alert("MetaMask not detected");
        return;
      }

      if (!amount) {
        alert("Enter donation amount");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const tx = await contract.donate({
        value: ethers.parseEther(amount),
      });

      setStatus("Transaction pending...");

      await tx.wait();

      setStatus(`Donation successful!
Transaction Hash: ${tx.hash}`);

      setAmount("");

      await loadDonations();

    } catch (error) {

      console.error(error);

      setStatus("Transaction failed");
    }
  }

  async function recordFundUsage() {

  try {

    if (!window.ethereum) {
      alert("MetaMask not detected");
      return;
    }

    if (!purpose || !usageAmount) {
      alert("Fill all fields");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);

    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const tx = await contract.recordFundUsage(
      purpose,
      ethers.parseEther(usageAmount)
    );

    setStatus("Recording fund usage...");

    await tx.wait();

    setStatus(`Fund usage recorded!
Transaction Hash: ${tx.hash}`);

    setPurpose("");
    setUsageAmount("");

    await loadFundUsages();

  } catch (error) {

    console.error(error);

    setStatus("Failed to record fund usage");
  }
}

  useEffect(() => {
    loadDonations();
    loadFundUsages();
  }, []);

  return (
    <div style={{
      padding: "40px",
      fontFamily: "Arial",
      maxWidth: "800px",
      margin: "auto"
    }}>

      <h1>GiveBlock</h1>

      <button onClick={connectWallet}>
        Connect MetaMask
      </button>

      <p>
        Wallet: {walletAddress || "Not connected"}
      </p>

      <hr />

      <h2>Donate</h2>

      <input
        type="text"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{
          padding: "10px",
          width: "200px"
        }}
      />

    

      <br /><br />

      <button onClick={donate}>
        Donate
      </button>

    <hr />

<h2>Record Fund Usage</h2>

<input
  type="text"
  placeholder="Purpose"
  value={purpose}
  onChange={(e) => setPurpose(e.target.value)}
  style={{
    padding: "10px",
    width: "300px",
    marginBottom: "10px"
  }}
/>

<br />

<input
  type="text"
  placeholder="Amount in ETH"
  value={usageAmount}
  onChange={(e) => setUsageAmount(e.target.value)}
  style={{
    padding: "10px",
    width: "300px"
  }}
/>

<br /><br />

<button onClick={recordFundUsage}>
  Record Fund Usage
</button>

      <p>{status}</p>

      <hr />

      <h2>Donation Records</h2>

      {donations.length === 0 && (
        <p>No donations yet</p>
      )}

      {donations.map((donation, index) => (

        <div
          key={index}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >

          <p>
            <strong>Donor:</strong>
            {" "}
            {donation.donor}
          </p>

          <p>
            <strong>Amount:</strong>
            {" "}
            {ethers.formatEther(donation.amount)} ETH
          </p>

          <p>
            <strong>Timestamp:</strong>
            {" "}
            {new Date(
              Number(donation.timestamp) * 1000
            ).toLocaleString()}
          </p>

        </div>
      ))}

      <hr />

<h2>Fund Usage Records</h2>

{fundUsages.length === 0 && (
  <p>No fund usage records yet</p>
)}

{fundUsages.map((usage, index) => (

  <div
    key={index}
    style={{
      border: "1px solid gray",
      padding: "15px",
      marginBottom: "10px",
      borderRadius: "8px"
    }}
  >

    <p>
      <strong>Purpose:</strong>
      {" "}
      {usage.purpose}
    </p>

    <p>
      <strong>Amount:</strong>
      {" "}
      {ethers.formatEther(usage.amount)} ETH
    </p>

    <p>
      <strong>Timestamp:</strong>
      {" "}
      {new Date(
        Number(usage.timestamp) * 1000
      ).toLocaleString()}
    </p>

  </div>
))}

    </div>
  );
}

export default App;
