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

    const contractAddress = "0x436511Fca4662d3c5DdD2208905b2C2ad55d7b13";
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
    let playerListUpdated = false; // Indicateur de mise à jour de la liste

    const eventPhrases = {
        'PlayerEliminated': [
            "{pseudo} just got forked out of the chain.",
            "The blockchain has pruned {pseudo}'s blocks.",
            "{pseudo} ran out of gas and is out of the game.",
            "A double spend attack took down {pseudo}.",
            "{pseudo} failed to reach consensus and is eliminated.",
            "The network dropped {pseudo} from the nodes.",
            "{pseudo} has been slashed from the validator set.",
            "Smart contract breach! {pseudo} is no more.",
            "{pseudo} got rugged and is out.",
            "A hard fork ejected {pseudo} from the chain.",
            "{pseudo} lost the key and is eliminated.",
            "The mempool rejected {pseudo}.",
            "{pseudo}'s transaction failed and they are out.",
            "Consensus rules out {pseudo} from the game.",
            "{pseudo} has been orphaned from the chain.",
            "A bug in the code took out {pseudo}.",
            "{pseudo}'s block reward just halved out of existence.",
            "No confirmation for {pseudo}, they are out.",
            "{pseudo} got slashed and burned.",
            "The chain reorganized and lost {pseudo}.",
            "{pseudo}'s hash power wasn't enough.",
            "Network congestion dropped {pseudo}.",
            "{pseudo} hit a 51% attack and is out.",
            "The oracle betrayed {pseudo}.",
            "{pseudo} faced a Sybil attack and lost.",
            "A DDoS attack removed {pseudo} from the game.",
            "{pseudo} missed the block and is out.",
            "The consensus algorithm rejected {pseudo}.",
            "{pseudo} got dumped from the pool.",
            "Too many forks! {pseudo} is out.",
            "{pseudo} faced a reorg and lost.",
            "An off-chain error eliminated {pseudo}.",
            "The validator slashed {pseudo}.",
            "{pseudo} couldn't stake enough and is out.",
            "Failed to verify! {pseudo} is eliminated.",
            "{pseudo} encountered a double spend and is out.",
            "The chain split and lost {pseudo}.",
            "An invalid transaction took out {pseudo}.",
            "{pseudo} faced a gas limit and lost.",
            "The mainnet rejected {pseudo}.",
            "{pseudo}'s transaction was reverted.",
            "The chain forked away from {pseudo}.",
            "{pseudo}'s transaction pool ran dry.",
            "Consensus split and dropped {pseudo}.",
            "A protocol upgrade ousted {pseudo}."
        ],
        'WinnerDeclared': [
            "{pseudo} has reached consensus and claimed victory!",
            "The final block belongs to {pseudo}!",
            "{pseudo} mined the winning block!",
            "The chain celebrates {pseudo} as the ultimate winner!",
            "{pseudo} has validated their way to victory!",
            "Block reward goes to {pseudo}! Champion!",
            "{pseudo} outperformed all nodes to win!",
            "Consensus achieved! {pseudo} is the winner!",
            "The blockchain bows to {pseudo}, the victor!",
            "{pseudo} staked their claim on victory!",
            "The network confirms {pseudo} as the winner!",
            "{pseudo} has written their name on the blockchain of winners!",
            "{pseudo} mined through all challenges to win!",
            "The final confirmation: {pseudo} is the winner!",
            "{pseudo} holds the private key to victory!",
            "Smart contract declares {pseudo} the winner!",
            "{pseudo} achieved the ultimate transaction: Victory!",
            "Proof of work? More like proof of {pseudo}'s victory!",
            "The ledger shows {pseudo} as the champion!",
            "{pseudo}'s block is the last standing, making them the winner!"
        ]
    };

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
                    console.log('PlayerEliminated event:', event);
                    if (!eventCache.has(event.id)) {
                        eventCache.add(event.id);
                        event.returnValues.eventType = 'PlayerEliminated';
                        if (currentGameId && event.returnValues.gameId === currentGameId) {
                            roundEvents.push(event.returnValues);
                            displayRoundEvents();
                        }
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
                    console.log('WinnerDeclared event:', event);
                    if (!eventCache.has(event.id)) {
                        eventCache.add(event.id);
                        event.returnValues.eventType = 'WinnerDeclared';
                        if (currentGameId && event.returnValues.gameId === currentGameId) {
                            roundEvents.push(event.returnValues);
                            displayRoundEvents();
                        }
                    }
                }
            });

            listenersInitialized = true;
        }
    }

    function sortRoundEvents() {
        roundEvents.sort((a, b) => {
            if (a.eventType === 'WinnerDeclared') return 1;
            if (b.eventType === 'WinnerDeclared') return -1;
            return 0;
        });
    }

    function displayRoundEvents() {
        const liveEventsDiv = document.getElementById('liveEvents');
        if (!liveEventsDiv) {
            console.error('liveEventsDiv not found');
            return;
        }

        sortRoundEvents(); // Assurer le tri avant l'affichage

        // Display sorted events
        roundEvents.forEach(event => {
            if (!event.rendered) {
                const eventText = document.createElement('p');
                const phrases = eventPhrases[event.eventType];
                const phrase = phrases[Math.floor(Math.random() * phrases.length)];
                eventText.textContent = phrase.replace("{pseudo}", event.pseudo);

                // Appliquer une couleur verte pour le gagnant
                if (event.eventType === 'WinnerDeclared') {
                    eventText.style.color = 'green';
                    eventText.style.fontWeight = 'bold'; // Optionnel : mettre en gras pour plus de visibilité
                }

                liveEventsDiv.appendChild(eventText);
                event.rendered = true; // Marquer comme affiché
                console.log('Event appended to liveEvents:', eventText.textContent);

                // Mettre à jour la liste des joueurs morts
                if (event.eventType === 'PlayerEliminated') {
                    updateDeadPlayerList(currentGameId);
                }
            }
        });

        // Mettre à jour la liste des joueurs enregistrés à la fin de chaque round
        if (currentGameId && !playerListUpdated) {
            updatePlayerList(currentGameId);
            playerListUpdated = true; // Marquer comme mis à jour
        }
    }

    function updatePlayerList(gameId) {
        const playerList = document.getElementById('players');
        if (!playerList) {
            console.error('playerList element not found');
            return;
        }

        playerList.innerHTML = '';

        contract.methods.getRegisteredPlayers(gameId).call()
            .then(players => {
                const sortedPlayers = [...players].sort((a, b) => a.localeCompare(b)); // Créer une copie et trier les joueurs par ordre alphabétique
                sortedPlayers.forEach(player => {
                    const li = document.createElement('li');
                    li.textContent = player;
                    playerList.appendChild(li);
                    console.log(`Added player: ${player}`);
                });
                playerListUpdated = false; // Réinitialiser l'indicateur après mise à jour
            })
            .catch(error => {
                console.error('Error fetching registered players:', error);
            });
    }

    function updateDeadPlayerList(gameId) {
        const deadPlayerList = document.getElementById('deadPlayers');
        if (!deadPlayerList) {
            console.error('deadPlayerList element not found');
            return;
        }

        deadPlayerList.innerHTML = '';

        contract.methods.getEliminatedPlayers(gameId).call()
            .then(players => {
                const sortedPlayers = [...players].sort((a, b) => a.localeCompare(b)); // Créer une copie et trier les joueurs par ordre alphabétique
                sortedPlayers.forEach(player => {
                    const li = document.createElement('li');
                    li.textContent = player;
                    deadPlayerList.appendChild(li);
                    console.log(`Added dead player: ${player}`);
                });
            })
            .catch(error => {
                console.error('Error fetching eliminated players:', error);
            });
    }

    if (filterButton) {
        filterButton.addEventListener('click', () => {
            currentGameId = gameIdInput.value;
            if (!currentGameId) {
                alert('Please enter a Game ID');
                return;
            }
            roundEvents = []; // Clear previous events
            displayRoundEvents(); // Clear display
            if (!playerListUpdated) {
                updatePlayerList(currentGameId); // Update player list
                updateDeadPlayerList(currentGameId); // Update dead player list
                playerListUpdated = true; // Marquer comme mis à jour
            }
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
document.getElementById('navigatelive')?.addEventListener('click', () => navigate('live.html'));

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
