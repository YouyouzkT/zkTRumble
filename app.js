document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectButton');
    const statusDiv = document.getElementById('status');
    const mainContent = document.getElementById('mainContent');
    const welcomeContent = document.getElementById('welcomeContent');

    let web3;
    let contract;
    let accounts;

    // Fonction pour initialiser Web3
    async function initializeWeb3() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                accounts = await web3.eth.getAccounts();
                statusDiv.innerHTML = `<p style="color: green;">Connected to MetaMask</p>`;
                welcomeContent.style.display = 'none';
                mainContent.style.display = 'block';
                initializeContract();
            } catch (error) {
                statusDiv.innerHTML = `<p style="color: red;">Error connecting to MetaMask: ${error.message}</p>`;
            }
        } else {
            statusDiv.innerHTML = `<p style="color: red;">MetaMask is not installed. Please install it to continue.</p>`;
        }
    }

    // Fonction pour initialiser le contrat
    function initializeContract() {
        if (web3) {
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
            contract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("Contract initialized");
        } else {
            console.error("Web3 is not initialized.");
        }
    }

    // Ajouter les gestionnaires d'événements pour les pages spécifiques
    const pageFunctions = {
        'create-manage.html': () => {
            document.getElementById('createGame').addEventListener('click', async () => {
                try {
                    if (!accounts) accounts = await web3.eth.getAccounts();
                    await contract.methods.createGame().send({ from: accounts[0] });
                    alert('Game created');
                } catch (error) {
                    console.error("Error creating game:", error);
                    alert('Error: ' + error.message);
                }
            });

            document.getElementById('startRound').addEventListener('click', async () => {
                try {
                    if (!accounts) accounts = await web3.eth.getAccounts();
                    const gameId = prompt("Enter Game ID:");
                    await contract.methods.startRound(gameId).send({ from: accounts[0] });
                    alert('Round started');
                } catch (error) {
                    console.error("Error starting round:", error);
                    alert('Error: ' + error.message);
                }
            });

            document.getElementById('closeRegistration').addEventListener('click', async () => {
                try {
                    if (!accounts) accounts = await web3.eth.getAccounts();
                    const gameId = prompt("Enter Game ID:");
                    await contract.methods.closeRegistration(gameId).send({ from: accounts[0] });
                    alert('Registration closed');
                } catch (error) {
                    console.error("Error closing registration:", error);
                    alert('Error: ' + error.message);
                }
            });

            document.getElementById('registerBots').addEventListener('click', async () => {
                try {
                    if (!accounts) accounts = await web3.eth.getAccounts();
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
                try {
                    if (!accounts) accounts = await web3.eth.getAccounts();
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
                try {
                    if (!accounts) accounts = await web3.eth.getAccounts();
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
        'register.html': () => {
            document.getElementById('registerPlayer').addEventListener('click', async () => {
                try {
                    if (!accounts) accounts = await web3.eth.getAccounts();
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
    if (pageFunctions[currentPage]) {
        pageFunctions[currentPage]();
    }

    // Initialise Web3 dès que le document est prêt
    await initializeWeb3();
});
