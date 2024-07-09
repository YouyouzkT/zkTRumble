document.addEventListener('DOMContentLoaded', () => {
    console.log("Document loaded");

    const connectButton = document.getElementById('connectButton');
    const statusDiv = document.getElementById('status');
    const mainContent = document.getElementById('mainContent');
    const welcomeContent = document.getElementById('welcomeContent');

    let web3;
    let contract;

    async function initializeContract() {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("Contract initialized");
        } else {
            console.error("MetaMask is not installed.");
        }
    }

    if (connectButton) {
        connectButton.addEventListener('click', async () => {
            console.log("Connect button clicked");
            if (typeof window.ethereum !== 'undefined') {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    statusDiv.innerHTML = `<p style="color: green;">Connected to MetaMask</p>`;
                    welcomeContent.style.display = 'none';
                    mainContent.style.display = 'block';
                    console.log("Connected to MetaMask");
                    initializeContract();
                } catch (error) {
                    statusDiv.innerHTML = `<p style="color: red;">Error connecting to MetaMask: ${error.message}</p>`;
                    console.error("Error connecting to MetaMask:", error);
                }
            } else {
                statusDiv.innerHTML = `<p style="color: red;">MetaMask is not installed. Please install it to continue.</p>`;
                console.error("MetaMask is not installed");
            }
        });
    }

    const createManageButton = document.getElementById('createManageButton');
    if (createManageButton) {
        createManageButton.addEventListener('click', () => {
            console.log("Create and Manage button clicked");
            window.location.href = 'create-manage.html';
        });
    }

    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            console.log("Register button clicked");
            window.location.href = 'register.html';
        });
    }

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

    const pageFunctions = {
        'create-manage.html': async () => {
            await initializeContract();
            document.getElementById('createGame').addEventListener('click', async () => {
                console.log("Create Game button clicked");
                try {
                    const accounts = await web3.eth.getAccounts();
                    console.log("Accounts:", accounts); // Ajout pour debug
                    await contract.methods.createGame().send({ from: accounts[0] });
                    alert('Game created');
                } catch (error) {
                    console.error("Error creating game:", error);
                    alert('Error: ' + error.message);
                }
            });

            document.getElementById('startRound').addEventListener('click', async () => {
                console.log("Start Round button clicked");
                try {
                    const accounts = await web3.eth.getAccounts();
                    console.log("Accounts:", accounts); // Ajout pour debug
                    const gameId = prompt("Enter Game ID:");
                    await contract.methods.startRound(gameId).send({ from: accounts[0] });
                    alert('Round started');
                } catch (error) {
                    console.error("Error starting round:", error);
                    alert('Error: ' + error.message);
                }
            });

            document.getElementById('closeRegistration').addEventListener('click', async () => {
                console.log("Close Registration button clicked");
                try {
                    const accounts = await web3.eth.getAccounts();
                    console.log("Accounts:", accounts); // Ajout pour debug
                    const gameId = prompt("Enter Game ID:");
                    await contract.methods.closeRegistration(gameId).send({ from: accounts[0] });
                    alert('Registration closed');
                } catch (error) {
                    console.error("Error closing registration:", error);
                    alert('Error: ' + error.message);
                }
            });

            document.getElementById('registerBots').addEventListener('click', async () => {
                console.log("Register Bots button clicked");
                try {
                    const accounts = await web3.eth.getAccounts();
                    console.log("Accounts:", accounts); // Ajout pour debug
                    const gameId = prompt("Enter Game ID:");
                    const numBots = prompt("Enter number of bots:");
                    await contract.methods.registerBots(gameId, numBots).send({ from: accounts[0] });
                    alert('Bots registered');
                } catch (error) {
                    console.error("Error registering bots:", error);
                    alert('Error: ' + error.message);
                }
            });

            document.getElementById('registerMultiplePlayers').addEventListener('click', async () => {
                console.log("Register Multiple Players button clicked");
                try {
                    const accounts = await web3.eth.getAccounts();
                    console.log("Accounts:", accounts); // Ajout pour debug
                    const gameId = prompt("Enter Game ID:");
                    const pseudos = prompt("Enter player pseudos (comma separated):");
                    await contract.methods.registerMultiplePlayers(gameId, pseudos).send({ from: accounts[0] });
                    alert('Multiple players registered');
                } catch (error) {
                    console.error("Error registering multiple players:", error);
                    alert('Error: ' + error.message);
                }
            });

            document.getElementById('setEliminationRange').addEventListener('click', async () => {
                console.log("Set Elimination Range button clicked");
                try {
                    const accounts = await web3.eth.getAccounts();
                    console.log("Accounts:", accounts); // Ajout pour debug
                    const gameId = prompt("Enter Game ID:");
                    const minEliminationCount = prompt("Enter minimum elimination count:");
                    const maxEliminationCount = prompt("Enter maximum elimination count:");
                    await contract.methods.setEliminationRange(gameId, minEliminationCount, maxEliminationCount).send({ from: accounts[0] });
                    alert('Elimination range set');
                } catch (error) {
                    console.error("Error setting elimination range:", error);
                    alert('Error: ' + error.message);
                }
            });
        },
        'register.html': async () => {
            await initializeContract();
            document.getElementById('registerPlayer').addEventListener('click', async () => {
                console.log("Register Player button clicked");
                try {
                    const accounts = await web3.eth.getAccounts();
                    console.log("Accounts:", accounts); // Ajout pour debug
                    const gameId = prompt("Enter Game ID:");
                    const pseudo = prompt("Enter player pseudo:");
                    await contract.methods.registerPlayer(gameId, pseudo).send({ from: accounts[0] });
                    alert('Player registered');
                } catch (error) {
                    console.error("Error registering player:", error);
                    alert('Error: ' + error.message);
                }
            });
        }
    };

    const currentPage = window.location.pathname.split('/').pop();
    console.log("Current page:", currentPage);
    if (pageFunctions[currentPage]) {
        pageFunctions[currentPage]();
    } else {
        console.log("No specific functions for this page");
    }
});
