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
    const filterButton = document.getElementById('filterButton');

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
let eventCache = new Set();  // Pour stocker les identifiants des événements déjà traités
let displayedEvents = new Map();  // Pour suivre les événements déjà affichés et leurs phrases
let currentGameId = null;    // Identifiant du jeu actuel

const eliminationPhrases = [
    "{pseudo} a été éliminé !",
    "Oh non, {pseudo} n'a pas survécu !",
    "Fin du jeu pour {pseudo}.",
    "{pseudo} a mordu la poussière.",
    "C'est terminé pour {pseudo}."
];

const winnerPhrases = [
    "Le gagnant est {pseudo} !",
    "Félicitations à {pseudo}, le vainqueur !",
    "{pseudo} a triomphé de tous les autres.",
    "{pseudo} est le dernier en vie et remporte la victoire !",
    "Bravo à {pseudo} pour cette victoire éclatante !"
];

function getRandomPhrase(phrases, pseudo) {
    const phrase = phrases[Math.floor(Math.random() * phrases.length)];
    return phrase.replace("{pseudo}", pseudo);
}

function initializeContract() {
    if (contract && listenersInitialized) {
        console.log('Contract and listeners already initialized.');
        return;
    }
    contract = new web3.eth.Contract(contractABI, contractAddress);
    console.log('Contract initialized:', contract);

    if (!listenersInitialized) {
        contract.events.PlayerEliminated({
            filter: {},
            fromBlock: 'latest'
        }, function(error, event) {
            if (error) {
                console.error('Error fetching PlayerEliminated events:', error);
            } else {
                handleEvent(event, 'PlayerEliminated');
            }
        });

        contract.events.WinnerDeclared({
            filter: {},
            fromBlock: 'latest'
        }, function(error, event) {
            if (error) {
                console.error('Error fetching WinnerDeclared events:', error);
            } else {
                handleEvent(event, 'WinnerDeclared');
            }
        });

        listenersInitialized = true;
    }
}

function handleEvent(event, eventType) {
    let uniqueEventId = `${event.transactionHash}-${event.logIndex}`;
    if (!eventCache.has(uniqueEventId)) {
        eventCache.add(uniqueEventId);
        let phrase;
        if (eventType === 'PlayerEliminated') {
            phrase = getRandomPhrase(eliminationPhrases, event.returnValues.pseudo);
        } else if (eventType === 'WinnerDeclared') {
            phrase = getRandomPhrase(winnerPhrases, event.returnValues.pseudo);
        }
        displayedEvents.set(uniqueEventId, { phrase, eventType });
        if (event.returnValues.gameId === currentGameId) {
            addNewEventToDisplay(); // Ajouter les nouveaux événements
        }
    }
}

// Fonction pour ajouter les nouveaux événements à l'affichage
function addNewEventToDisplay() {
    const liveEventsDiv = document.getElementById('liveEvents');
    if (!liveEventsDiv) {
        console.error('liveEventsDiv not found');
        return;
    }

    // Trier les événements en mettant les winners à la fin
    const sortedEvents = Array.from(displayedEvents.entries()).sort((a, b) => {
        if (a[1].eventType === 'WinnerDeclared') return 1;
        if (b[1].eventType === 'WinnerDeclared') return -1;
        return 0;
    });

    // Afficher les événements triés, tout en évitant de dupliquer ceux déjà affichés
    sortedEvents.forEach(([uniqueEventId, { phrase, eventType }], index) => {
        if (!liveEventsDiv.querySelector(`[data-id="${uniqueEventId}"]`)) {
            const eventText = document.createElement('p');
            eventText.textContent = phrase;
            eventText.setAttribute('data-id', uniqueEventId); // Marquer cet événement pour éviter les duplications
            liveEventsDiv.appendChild(eventText);
        }
    });
}

// Event listener for filter button
if (filterButton) {
    filterButton.addEventListener('click', () => {
        currentGameId = gameIdInput.value;
        if (!currentGameId) {
            alert('Please enter a Game ID');
            return;
        }

        // Afficher les événements pour le `gameId` sélectionné
        addNewEventToDisplay();
    });
} else {
    console.error('filterButton not found in the DOM.');
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
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('registerMultiplePlayers')?.addEventListener('click', async () => {
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

    document.getElementById('registerBots')?.addEventListener('click', async () => {
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

    document.getElementById('setEliminationRange')?.addEventListener('click', async () => {
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

    document.getElementById('startRound')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            await contract.methods.startRound(gameId).send({ from: accounts[0] });
            alert('Round started');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('closeRegistration')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            await contract.methods.closeRegistration(gameId).send({ from: accounts[0] });
            alert('Registration closed');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('gameCount')?.addEventListener('click', async () => {
        try {
            const count = await contract.methods.gameCount().call();
            outputContent.innerHTML = `<p>Game Count: ${count}</p>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('getWinner')?.addEventListener('click', async () => {
        try {
            const gameId = getGameId();
            const winner = await contract.methods.getWinner(gameId).call();
            outputContent.innerHTML = `<p>Winner: ${winner}</p>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('getRegisteredPlayers')?.addEventListener('click', async () => {
        try {
            const gameId = getGameId();
            const players = await contract.methods.getRegisteredPlayers(gameId).call();
            outputContent.innerHTML = `<p>Registered Players: ${players}</p>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('getEliminatedPlayers')?.addEventListener('click', async () => {
        try {
            const gameId = getGameId();
            const players = await contract.methods.getEliminatedPlayers(gameId).call();
            outputContent.innerHTML = `<p>Eliminated Players: ${players}</p>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('games')?.addEventListener('click', async () => {
        try {
            const gameId = getGameId();
            const gameInfo = await contract.methods.games(gameId).call();

            const filteredGameInfo = {};
            for (let key in gameInfo) {
                if (isNaN(key)) {
                    filteredGameInfo[key] = gameInfo[key];
                }
            }

            outputContent.innerHTML = `<pre>${JSON.stringify(filteredGameInfo, null, 2)}</pre>`;
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
});
