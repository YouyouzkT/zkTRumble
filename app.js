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
    let listenersInitialized = false;

    const eventCache = new Set();
    let roundEvents = [];
    let currentGameId = null;
    let alivePlayers = [];

    const eliminationPhrases = [
        "{pseudo} a été éliminé par {pseudoalivefighter} !",
        "Oh non, {pseudo} n'a pas survécu à l'attaque de {pseudoalivefighter} !",
        "{pseudoalivefighter} a mis fin au parcours de {pseudo}.",
        "{pseudo} a été battu par {pseudoalivefighter} avec une grande maîtrise.",
        "C'est terminé pour {pseudo}, qui a été éliminé par {pseudoalivefighter}."
    ];

    const winnerPhrases = [
        "Le gagnant est {pseudo} !",
        "Félicitations à {pseudo}, le vainqueur !",
        "{pseudo} a triomphé de tous les autres.",
        "{pseudo} est le dernier en vie et remporte la victoire !",
        "Bravo à {pseudo} pour cette victoire éclatante !"
    ];

    function getRandomPhrase(phrases, pseudo, pseudoalivefighter = "") {
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        return phrase.replace("{pseudo}", pseudo).replace("{pseudoalivefighter}", pseudoalivefighter);
    }

    function getRandomAlivePlayer() {
        if (alivePlayers.length > 0) {
            return alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        }
        return "un autre joueur"; // Default value if no players are alive
    }

    async function updateAlivePlayers() {
        try {
            if (currentGameId) {
                alivePlayers = await contract.methods.getRegisteredPlayers(currentGameId).call();
            }
        } catch (error) {
            console.error('Error fetching alive players:', error);
        }
    }

    async function displayRoundEvents() {
        const liveEventsDiv = document.getElementById('liveEvents');
        if (!liveEventsDiv) {
            console.error('liveEventsDiv not found');
            return;
        }

        await updateAlivePlayers(); // Mettre à jour la liste des joueurs vivants

        const sortedEvents = roundEvents.sort((a, b) => {
            if (a.eventType === 'WinnerDeclared') return 1;
            if (b.eventType === 'WinnerDeclared') return -1;
            return 0;
        });

        sortedEvents.forEach(event => {
            if (!eventCache.has(event.id)) {
                eventCache.add(event.id);
                const eventText = document.createElement('p');
                if (event.eventType === 'PlayerEliminated') {
                    const randomAlivePlayer = getRandomAlivePlayer();
                    eventText.textContent = getRandomPhrase(eliminationPhrases, event.pseudo, randomAlivePlayer);
                } else if (event.eventType === 'WinnerDeclared') {
                    eventText.textContent = getRandomPhrase(winnerPhrases, event.pseudo);
                }
                liveEventsDiv.appendChild(eventText);
                console.log('Event appended to liveEvents:', eventText.textContent);
            }
        });
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
                    console.log('PlayerEliminated event received:', event);
                    if (!eventCache.has(event.id)) {
                        eventCache.add(event.id);
                        event.returnValues.eventType = 'PlayerEliminated';
                        roundEvents.push(event.returnValues);
 console.log('Updated roundEvents:', roundEvents);
                        displayRoundEvents();
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
                console.log('WinnerDeclared event received:', event);
                if (!eventCache.has(event.id)) {
                    eventCache.add(event.id);
                    event.returnValues.eventType = 'WinnerDeclared';
                    roundEvents.push(event.returnValues);
                    console.log('Updated roundEvents:', roundEvents);
                    displayRoundEvents();
                }
            }
        });

            listenersInitialized = true;
        }
    }

    if (filterButton) {
        filterButton.addEventListener('click', () => {
            currentGameId = gameIdInput.value;
            if (!currentGameId) {
                alert('Please enter a Game ID');
                return;
            }
            roundEvents = []; // Clear previous events
            eventCache.clear(); // Clear cache to allow reprocessing of events
            displayRoundEvents(); // Clear display
        });
    } else {
        console.error('filterButton not found in the DOM.');
    }

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

    async function connectWalletConnect() {
        const provider = new WalletConnectProvider.default({
            infuraId: "YOUR_INFURA_ID"
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

    window.addEventListener('load', () => {
        connectedAccount = localStorage.getItem('connectedAccount');
        if (connectedAccount) {
            web3 = new Web3(window.ethereum || provider);
            statusDiv.innerHTML = `<p style="color: green;">Connected: ${connectedAccount}</p>`;
            initializeContract();
        }
    });

    document.getElementById('connectMetaMask')?.addEventListener('click', connectMetaMask);
    document.getElementById('connectWalletConnect')?.addEventListener('click', connectWalletConnect);
    document.getElementById('navigateRegister')?.addEventListener('click', () => navigate('register.html'));
    document.getElementById('navigateCreate')?.addEventListener('click', () => navigate('create.html'));
    document.getElementById('navigateManage')?.addEventListener('click', () => navigate('manage.html'));
    document.getElementById('navigateHome')?.addEventListener('click', () => navigate('index.html'));

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
