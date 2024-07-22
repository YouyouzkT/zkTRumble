document.addEventListener('DOMContentLoaded', () => {
    if (typeof Web3 === 'undefined') {
        alert('Web3 is not defined. Please make sure you have included the Web3 library.');
        return;
    }

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
    let connectedAccount;
    let listenersInitialized = false; // Ajout du drapeau pour éviter l'initialisation multiple

    // Liste pour suivre les événements déjà ajoutés
    const eventCache = new Set();

    // Initialize contract function
    function initializeContract() {
        if (contract && listenersInitialized) {
            console.log('Contract and listeners already initialized.');
            return;
        }
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log('Contract initialized:', contract);

        if (!listenersInitialized) {
            // Écouter les événements de round
            contract.events.PlayerEliminated({
                filter: {},
                fromBlock: 'latest'
            }, function(error, event) {
                if (error) {
                    console.error('Error fetching PlayerEliminated events:', error);
                } else {
                    console.log('PlayerEliminated event:', event); // Debug log
                    if (!eventCache.has(event.id)) {
                        eventCache.add(event.id);
                        event.returnValues.eventType = 'PlayerEliminated';
                        handleRoundEvents([event.returnValues]);
                    }
                }
            });

            contract.events.WinnerDeclared({
                filter: {},
                fromBlock: 'latest'
            }, function(error, event) {
                if (error) {
                    console.error('Error fetching WinnerDeclared events:', error);
                } else {
                    console.log('WinnerDeclared event:', event); // Debug log
                    if (!eventCache.has(event.id)) {
                        eventCache.add(event.id);
                        event.returnValues.eventType = 'WinnerDeclared';
                        handleRoundEvents([event.returnValues]);
                    }
                }
            });

            listenersInitialized = true;
        }
    }

    // Function to handle round events
    function handleRoundEvents(events) {
        const liveEventsDiv = document.getElementById('liveEvents');
        if (!liveEventsDiv) {
            console.error('liveEventsDiv not found');
            return;
        }
        console.log('Handling round events:', events);
        events.forEach(event => {
            const eventText = document.createElement('p');
            if (event.eventType === 'PlayerEliminated') {
                eventText.textContent = `${event.pseudo} a été éliminé`;
            } else if (event.eventType === 'WinnerDeclared') {
                eventText.textContent = `Le gagnant est ${event.winner}`;
            }
            liveEventsDiv.appendChild(eventText);
            console.log('Event appended to liveEvents:', eventText.textContent);
        });
    }

    // Function to connect using MetaMask
    async function connectMetaMask() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                connectedAccount = accounts[0];
                statusDiv.innerHTML = `<p style="color: green;">Connected to MetaMask: ${connectedAccount}</p>`;
                initializeContract();
            } catch (error) {
                statusDiv.innerHTML = `<p style="color: red;">Error connecting to MetaMask: ${error.message}</p>`;
            }
        } else {
            statusDiv.innerHTML = `<p style="color: red;">MetaMask is not installed. Please install it to continue.</p>`;
        }
    }

    // Function to connect using WalletConnect
    async function connectWalletConnect() {
        const provider = new WalletConnectProvider.default({
            infuraId: "YOUR_INFURA_ID" // Remplacez par votre ID de projet Infura
        });

        try {
            await provider.enable();
            web3 = new Web3(provider);
            const accounts = await web3.eth.getAccounts();
            connectedAccount = accounts[0];
            statusDiv.innerHTML = `<p style="color: green;">Connected to WalletConnect: ${connectedAccount}</p>`;
            initializeContract();
        } catch (error) {
            statusDiv.innerHTML = `<p style="color: red;">Error connecting to WalletConnect: ${error.message}</p>`;
        }
    }

    function getGameId() {
        const gameId = gameIdInput?.value;
        if (!gameId) {
            alert('Please enter a Game ID');
            throw new Error('Game ID is required');
        }
        return gameId;
    }

    function navigate(page) {
        localStorage.setItem('connectedAccount', connectedAccount);
        window.location.href = page;
    }

    // Reconnect to wallet if already connected
    window.addEventListener('load', () => {
        connectedAccount = localStorage.getItem('connectedAccount');
        if (connectedAccount) {
            web3 = new Web3(window.ethereum || provider);
            statusDiv.innerHTML = `<p style="color: green;">Connected: ${connectedAccount}</p>`;
            initializeContract();
        }
    });

    // Event listeners for navigation buttons
    document.getElementById('connectMetaMask')?.addEventListener('click', connectMetaMask);
    document.getElementById('connectWalletConnect')?.addEventListener('click', connectWalletConnect);
    document.getElementById('navigateRegister')?.addEventListener('click', () => navigate('register.html'));
    document.getElementById('navigateCreate')?.addEventListener('click', () => navigate('create.html'));
    document.getElementById('navigateManage')?.addEventListener('click', () => navigate('manage.html'));
    document.getElementById('navigateHome')?.addEventListener('click', () => navigate('index.html'));

    // Other existing event listeners for contract interactions...
    document.getElementById('createGame')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            await contract.methods.createGame().send({ from: accounts[0] });
            alert('Game created');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('registerPlayer')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const pseudo = prompt("Enter player pseudo:");
            await contract.methods.registerPlayer(gameId, pseudo).send({ from: accounts[0] });
            alert('Player registered');
        } catch (error) {
            alert('Error
