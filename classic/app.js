document.addEventListener('DOMContentLoaded', () => {
    const connectMetaMaskButton = document.getElementById('connectMetaMask');
    const connectWalletConnectButton = document.getElementById('connectWalletConnect');
    const statusDiv = document.getElementById('status');
    const outputContent = document.getElementById('outputContent');
    const gameIdInput = document.getElementById('gameIdInput');

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

    let web3;
    let contract;

    // Function to connect using MetaMask
    connectMetaMaskButton.addEventListener('click', async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                statusDiv.innerHTML = `<p style="color: green;">Connected to MetaMask</p>`;
                initializeContract();
            } catch (error) {
                statusDiv.innerHTML = `<p style="color: red;">Error connecting to MetaMask: ${error.message}</p>`;
            }
        } else {
            statusDiv.innerHTML = `<p style="color: red;">MetaMask is not installed. Please install it to continue.</p>`;
        }
    });

    // Function to connect using WalletConnect
    connectWalletConnectButton.addEventListener('click', async () => {
        const provider = new WalletConnectProvider.default({
            infuraId: "INFURA_PROJECT_ID" // Replace with your Infura project ID
        });

        try {
            await provider.enable();
            web3 = new Web3(provider);
            statusDiv.innerHTML = `<p style="color: green;">Connected to WalletConnect</p>`;
            initializeContract();
        } catch (error) {
            statusDiv.innerHTML = `<p style="color: red;">Error connecting to WalletConnect: ${error.message}</p>`;
        }
    });

    function initializeContract() {
        contract = new web3.eth.Contract(contractABI, contractAddress);
    }

    function getGameId() {
        const gameId = gameIdInput.value;
        if (!gameId) {
            alert('Please enter a Game ID');
            throw new Error('Game ID is required');
        }
        return gameId;
    }

    document.getElementById('createGame').addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.createGame().send({ from: accounts[0] });
            alert('Game created');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('registerPlayer').addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const pseudo = prompt("Enter player pseudo:");
            await contract.methods.registerPlayer(gameId, pseudo).send({ from: accounts[0] });
            alert('Player registered');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('registerMultiplePlayers').addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const pseudos = prompt("Enter player pseudos (comma separated):");
            await contract.methods.registerMultiplePlayers(gameId, pseudos).send({ from: accounts[0] });
            alert('Multiple players registered');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('registerBots').addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const numBots = prompt("Enter number of bots:");
            await contract.methods.registerBots(gameId, numBots).send({ from: accounts[0] });
            alert('Bots registered');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('setEliminationRange').addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const minEliminationCount = prompt("Enter minimum elimination count:");
            const maxEliminationCount = prompt("Enter maximum elimination count:");
            await contract.methods.setEliminationRange(gameId, minEliminationCount, maxEliminationCount).send({ from: accounts[0] });
            alert('Elimination range set');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('startRound').addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            await contract.methods.startRound(gameId).send({ from: accounts[0] });
            alert('Round started');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('closeRegistration').addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            await contract.methods.closeRegistration(gameId).send({ from: accounts[0] });
            alert('Registration closed');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('gameCount').addEventListener('click', async () => {
        try {
            const count = await contract.methods.gameCount().call();
            outputContent.innerHTML = `<p>Game Count: ${count}</p>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('getWinner').addEventListener('click', async () => {
        try {
            const gameId = getGameId();
            const winner = await contract.methods.getWinner(gameId).call();
            outputContent.innerHTML = `<p>Winner: ${winner}</p>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('getRegisteredPlayers').addEventListener('click', async () => {
        try {
            const gameId = getGameId();
            const players = await contract.methods.getRegisteredPlayers(gameId).call();
            outputContent.innerHTML = `<p>Registered Players: ${players}</p>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('getEliminatedPlayers').addEventListener('click', async () => {
        try {
            const gameId = getGameId();
            const players = await contract.methods.getEliminatedPlayers(gameId).call();
            outputContent.innerHTML = `<p>Eliminated Players: ${players}</p>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
