import React, { useState, useEffect } from 'react';
import './App.css';
import Web3 from 'web3';
import WalletConnectProvider from '@walletconnect/web3-provider';

function App() {
  const [web3, setWeb3] = useState(null);
  const [status, setStatus] = useState('');
  const [output, setOutput] = useState('');
  const [contract, setContract] = useState(null);
  const [gameId, setGameId] = useState('');

  const contractAddress = "0x6f19096082Dc30f51189336c66927fb182eAD715";
  const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "pseudo",
          "type": "string"
        }
      ],
      "name": "BotRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        }
      ],
      "name": "closeRegistration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "createGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "minEliminationCount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "maxEliminationCount",
          "type": "uint256"
        }
      ],
      "name": "EliminationRangeSet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        }
      ],
      "name": "GameCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "pseudo",
          "type": "string"
        }
      ],
      "name": "PlayerEliminated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "pseudo",
          "type": "string"
        }
      ],
      "name": "PlayerRegistered",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_numBots",
          "type": "uint256"
        }
      ],
      "name": "registerBots",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "pseudos",
          "type": "string"
        }
      ],
      "name": "registerMultiplePlayers",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "_pseudo",
          "type": "string"
        }
      ],
      "name": "registerPlayer",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_minEliminationCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_maxEliminationCount",
          "type": "uint256"
        }
      ],
      "name": "setEliminationRange",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        }
      ],
      "name": "startRound",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "pseudo",
          "type": "string"
        }
      ],
      "name": "WinnerDeclared",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "gameCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "games",
      "outputs": [
        {
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "isRegistrationOpen",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "isGameActive",
          "type": "bool"
        },
        {
          "internalType": "string",
          "name": "winner",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "minEliminationCount",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "maxEliminationCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        }
      ],
      "name": "getEliminatedPlayers",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        }
      ],
      "name": "getRegisteredPlayers",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "gameId",
          "type": "uint256"
        }
      ],
      "name": "getWinner",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

  useEffect(() => {
    if (window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    } else {
      const provider = new WalletConnectProvider({
        infuraId: "INFURA_PROJECT_ID" // Replace with your Infura project ID
      });
      setWeb3(new Web3(provider));
    }
  }, []);

  const initializeContract = (web3Instance) => {
    const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
    setContract(contractInstance);
  };

  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        setStatus('Connected to MetaMask');
        initializeContract(web3);
      } catch (error) {
        setStatus(`Error connecting to MetaMask: ${error.message}`);
      }
    } else {
      setStatus('MetaMask is not installed. Please install it to continue.');
    }
  };

  const connectWalletConnect = async () => {
    const provider = new WalletConnectProvider({
      infuraId: "INFURA_PROJECT_ID" // Replace with your Infura project ID
    });

    try {
      await provider.enable();
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);
      setStatus('Connected to WalletConnect');
      initializeContract(web3Instance);
    } catch (error) {
      setStatus(`Error connecting to WalletConnect: ${error.message}`);
    }
  };

  const handleInputChange = (event) => {
    setGameId(event.target.value);
  };

  const createGame = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.createGame().send({ from: accounts[0] });
      alert('Game created');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const registerPlayer = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const pseudo = prompt("Enter player pseudo:");
      await contract.methods.registerPlayer(gameId, pseudo).send({ from: accounts[0] });
      alert('Player registered');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const registerMultiplePlayers = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const pseudos = prompt("Enter player pseudos (comma separated):");
      await contract.methods.registerMultiplePlayers(gameId, pseudos).send({ from: accounts[0] });
      alert('Multiple players registered');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const registerBots = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const numBots = prompt("Enter number of bots:");
      await contract.methods.registerBots(gameId, numBots).send({ from: accounts[0] });
      alert('Bots registered');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const setEliminationRange = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      const minEliminationCount = prompt("Enter minimum elimination count:");
      const maxEliminationCount = prompt("Enter maximum elimination count:");
      await contract.methods.setEliminationRange(gameId, minEliminationCount, maxEliminationCount).send({ from: accounts[0] });
      alert('Elimination range set');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const startRound = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.startRound(gameId).send({ from: accounts[0] });
      alert('Round started');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const closeRegistration = async () => {
    try {
      const accounts = await web3.eth.getAccounts();
      await contract.methods.closeRegistration(gameId).send({ from: accounts[0] });
      alert('Registration closed');
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const getGameCount = async () => {
    try {
      const count = await contract.methods.gameCount().call();
      setOutput(`Game Count: ${count}`);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const getWinner = async () => {
    try {
      const winner = await contract.methods.getWinner(gameId).call();
      setOutput(`Winner: ${winner}`);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const getRegisteredPlayers = async () => {
    try {
      const players = await contract.methods.getRegisteredPlayers(gameId).call();
      setOutput(`Registered Players: ${players}`);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const getEliminatedPlayers = async () => {
    try {
      const players = await contract.methods.getEliminatedPlayers(gameId).call();
      setOutput(`Eliminated Players: ${players}`);
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>zkTRumble 3.0 OnChain</h1>
        <p>Rumble Fight 3.0 OnChain For Full Transparency</p>
      </header>
      <div className="content">
        <h2>Connect your EVM wallet to RUMBLE!!!</h2>
        <p>Connect using your MetaMask or WalletConnect</p>
        <button onClick={connectMetaMask} className="btn">Connect MetaMask</button>
        <button onClick={connectWalletConnect} className="btn">Connect WalletConnect</button>
        <div id="status">{status}</div>

        <div className="function-buttons">
          <h2>Register for a Rumble</h2>
          <button onClick={registerPlayer} className="btn">Register Yourself</button>
        </div>

        <form id="gameForm">
          <label className="input-label" htmlFor="gameIdInput">Game ID:</label>
          <input type="number" id="gameIdInput" className="input-field" placeholder="Enter Game ID" value={gameId} onChange={handleInputChange} required />
        </form>

        <div className="function-buttons">
          <h2>Create your RUMBLE</h2>
          <button onClick={createGame} className="btn">Create Game ID</button>
          <button onClick={getGameCount} className="btn">Last GameID</button>
        </div>

        <div className="function-buttons">
          <h2>Manage your RUMBLE</h2>
          <button onClick={startRound} className="btn">Start Round</button>
          <button onClick={closeRegistration} className="btn">Close Registration</button>
          <button onClick={registerBots} className="btn">Add Bots</button>
          <button onClick={registerMultiplePlayers} className="btn">Add Players List</button>
          <button onClick={setEliminationRange} className="btn">Set Elimination Per Round</button>
        </div>

        <div className="output">
          <h2>Consult Stat</h2>
          <button onClick={getWinner} className="btn">Winner</button>
          <button onClick={getRegisteredPlayers} className="btn">ALIVE Fighters</button>
          <button onClick={getEliminatedPlayers} className="btn">DEAD Fighters</button>
          <div id="outputContent">{output}</div>
        </div>

        <h2>Explore More</h2>
        <ul>
          <li><a href="https://quantumledgerportal.com/smart-contract-explorer">Smart Contract Explorer</a></li>
          <li><a href="https://quantumledgerportal.com/developer-tools">Developer Tools</a></li>
          <li><a href="https://quantumledgerportal.com/marketplace">Marketplace</a></li>
          <li><a href="https://quantumledgerportal.com/community-forum">Community Forum</a></li>
        </ul>
      </div>

      <footer>
        <p>&copy; 2023 GameDApp. All rights reserved.</p>
        <p><a href="https://quantumledgerportal.com/privacy-policy">Privacy Policy</a> | <a href="https://quantumledgerportal.com/terms">Terms of Service</a></p>
      </footer>
    </div>
  );
}

export default App;

