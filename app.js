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
    const startRoundButton = document.getElementById('startRoundButton');
    const contractAddress = "0xc93C30bB2863F0257f789A950BBd4ce9655C6367";
    const contractABI = [
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "gameId",
                    "type": "uint256"
                },
                {
                    "internalType": "address[]",
                    "name": "_addresses",
                    "type": "address[]"
                }
            ],
            "name": "addToWhitelist",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
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
            "inputs": [
                {
                    "internalType": "bool",
                    "name": "_isPrivate",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "_password",
                    "type": "string"
                },
                {
                    "internalType": "address[]",
                    "name": "_whitelist",
                    "type": "address[]"
                }
            ],
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
                },
                {
                    "internalType": "string",
                    "name": "_password",
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
                    "internalType": "bool",
                    "name": "isPrivate",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "password",
                    "type": "string"
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
            "name": "getGameInfo",
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
                    "internalType": "bool",
                    "name": "isPrivate",
                    "type": "bool"
                },
                {
                    "internalType": "string",
                    "name": "hasPassword",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "hasWhitelist",
                    "type": "string"
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
            "name": "getRegisteredAddresses",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
            "name": "getWhitelist",
            "outputs": [
                {
                    "internalType": "address[]",
                    "name": "",
                    "type": "address[]"
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
    let playerListUpdated = false;
    let deadPlayerListUpdated = false;

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
            }, function (error, event) {
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
            }, function (error, event) {
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

    function typewriterEffect(element, html, speed = 50) {
        let i = 0;
        function type() {
            if (i < html.length) {
                // Ajoutez du contenu HTML progressivement
                element.innerHTML = html.substring(0, i + 1);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    function displayRoundEvents() {
        const liveEventsDiv = document.getElementById('liveEvents');
        if (!liveEventsDiv) {
            console.error('liveEventsDiv not found');
            return;
        }

        sortRoundEvents(); // Assurer le tri avant l'affichage

        // Display sorted events
        roundEvents.forEach((event, index) => {
            if (!event.rendered) {
                const eventText = document.createElement('p');
                const phrases = eventPhrases[event.eventType];
                const phrase = phrases[Math.floor(Math.random() * phrases.length)];
                let formattedText = phrase.replace("{pseudo}", event.pseudo);

                // Appliquer une couleur verte pour le gagnant
                if (event.eventType === 'WinnerDeclared') {
                    eventText.style.color = 'green';
                    eventText.style.fontWeight = 'bold'; // Optionnel : mettre en gras pour plus de visibilité
                }

                // Appliquer le formatage pour les joueurs éliminés
                if (event.eventType === 'PlayerEliminated') {
                    formattedText = phrase.replace("{pseudo}", `<span class="event-eliminated">${event.pseudo}</span>`);
                }

                liveEventsDiv.appendChild(eventText);
                typewriterEffect(eventText, formattedText); // Appel de la fonction avec du HTML
                event.rendered = true; // Marquer comme affiché
                console.log('Event appended to liveEvents:', formattedText);
            }
        });

        // Mettre à jour la liste des joueurs enregistrés à la fin de chaque round
        if (currentGameId && !playerListUpdated) {
            updatePlayerList(currentGameId);
            playerListUpdated = true; // Marquer comme mis à jour
        }

        // Mettre à jour la liste des joueurs morts à la fin de chaque round
        if (currentGameId && !deadPlayerListUpdated) {
            updateDeadPlayerList(currentGameId);
            deadPlayerListUpdated = true; // Marquer comme mis à jour
        }
    }

    function updatePlayerList(gameId) {
        const playerList = document.getElementById('players');
        const playerNumber = document.getElementById('playersNumber');

        if (!playerList) {
            console.error('playerList element not found');
            return;
        }

        playerList.innerHTML = '';

        contract.methods.getRegisteredPlayers(gameId).call()
            .then(players => {
                const sortedPlayers = [...players].sort((a, b) => a.localeCompare(b)); // Créer une copie et trier les joueurs par ordre alphabétique
                playerNumber.innerText = 'Alive Fighters (' + sortedPlayers.length + ')';
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
        const deadPlayerNumber = document.getElementById('deadPlayersNumber');

        if (!deadPlayerList) {
            console.error('deadPlayerList element not found');
            return;
        }

        deadPlayerList.innerHTML = '';

        contract.methods.getEliminatedPlayers(gameId).call()
            .then(players => {
                const sortedPlayers = [...players].sort((a, b) => a.localeCompare(b)); // Créer une copie et trier les joueurs par ordre alphabétique
                deadPlayerNumber.innerText = 'Dead Fighters (' + sortedPlayers.length + ')';
                sortedPlayers.forEach(player => {
                    const li = document.createElement('li');
                    li.textContent = player;
                    li.style.textDecoration = 'line-through'; // Appliquer le style rayé
                    deadPlayerList.appendChild(li);
                    console.log(`Added dead player: ${player}`);
                });
                deadPlayerListUpdated = false; // Réinitialiser l'indicateur après mise à jour
            })
            .catch(error => {
                console.error('Error fetching eliminated players:', error);
            });
    }

    if (filterButton) {
        filterButton.addEventListener('click', async () => {
            currentGameId = gameIdInput.value;
            if (!currentGameId) {
                alert('Please enter a Game ID');
                return;
            }

            const gameInfo = await contract.methods.games(currentGameId).call();
            const accounts = await web3.eth.getAccounts();

            if (gameInfo.owner !== accounts[0]) {
                startRoundButton.classList.add('disabled'); // Ajoute la classe 'disabled' pour griser le bouton
                // Ajoute une infobulle personnalisée
                let tooltip = startRoundButton.querySelector('.tooltip');
                if (!tooltip) {
                    tooltip = document.createElement('div');
                    tooltip.className = 'tooltip';
                    tooltip.textContent = 'You are not the owner of this GameID';
                    startRoundButton.appendChild(tooltip);
                }
            } else {
                startRoundButton.classList.remove('disabled'); // Retire la classe 'disabled' si le wallet est correct

                // Supprime l'infobulle si le bouton est actif
                const tooltip = startRoundButton.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            }

            roundEvents = []; // Clear previous events
            displayRoundEvents(); // Clear display

            if (!playerListUpdated) {
                updatePlayerList(currentGameId); // Update player list
                playerListUpdated = true; // Marquer comme mis à jour
            }
            if (!deadPlayerListUpdated) {
                updateDeadPlayerList(currentGameId); // Update dead player list
                deadPlayerListUpdated = true; // Marquer comme mis à jour
            }
        });
    }

    else {
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
            const isPrivate = document.getElementById('isPrivate').checked;
            const password = document.getElementById('password').value || "";
            const whitelist = document.getElementById('whitelist').value.split(',').map(addr => addr.trim()).filter(addr => addr !== "");
    
            // Vérification que l'utilisateur n'essaie pas de créer un jeu privé avec à la fois un mot de passe et une whitelist
            if (isPrivate && password.length > 0 && whitelist.length > 0) {
                alert("Error: You cannot use both a password and a whitelist for a private game. Please choose one.");
                return;
            }
    
            // Appel de la fonction createGame du contrat avec les paramètres appropriés
            await contract.methods.createGame(isPrivate, password, whitelist).send({ from: accounts[0] });
    
            // Récupérer le dernier gameId et remplir le champ gameIdInput
            const gameId = await contract.methods.gameCount().call();
            document.getElementById('gameIdInput').value = gameId;
    
            alert(`Game ID ${gameId} created. Don't forget to set elimination range and close registration before starting a round`);
    
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
    

    document.getElementById('registerPlayer')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const accountAddress = accounts[0];
    
            // Call the contract to get game info
            const gameInfo = await contract.methods.getGameInfo(gameId).call();
    
            // Check if registration is open
            if (!gameInfo.isRegistrationOpen) {
                alert("Registration is already closed for this game.");
                return; // Stop if registration is closed
            }
    
            let password = '';
    
            // Check if the game is private
            if (gameInfo.isPrivate) {
                if (gameInfo.hasPassword === "NO") {
                    const whitelist = await contract.methods.getWhitelist(gameId).call();
                    if (!whitelist.includes(accountAddress)) {
                        alert("You are not whitelisted for this game.");
                        return; // Stop if the user is not on the whitelist
                    }
                } else if (gameInfo.hasPassword === "YES") {
                    password = prompt("Enter the game password:");
                }
            }
    
            // Check if the address is already registered
            const registeredAddresses = await contract.methods.getRegisteredAddresses(gameId).call();
            if (registeredAddresses.includes(accountAddress)) {
                alert("A fighter is already registered with this address.");
                return; // Stop if the address is already registered
            }
    
            // Ask for the pseudo only if the above steps pass
            const pseudo = prompt("Enter your pseudo:");
    
            // Check if the pseudo is already taken
            const registeredPlayers = await contract.methods.getRegisteredPlayers(gameId).call();
            if (registeredPlayers.includes(pseudo)) {
                alert(`The pseudo "${pseudo}" is already taken. Please choose another.`);
                return; // Stop if the pseudo is already taken
            }
    
            // Send the transaction to register the player
            await contract.methods.registerPlayer(gameId, pseudo, password).send({ from: accounts[0] });
            alert('Welcome fighter, you are registered');
        } catch (error) {
            // Handle specific errors
            if (error.message.includes("Incorrect password")) {
                alert("Wrong password, try again!");
            } else if (error.message.includes("Address already registered")) {
                alert("A fighter is already registered with this address.");
            } else if (error.message.includes("Pseudo already taken")) {
                alert("Pseudo already taken");
            } else {
                alert('An error occurred during registration. Please try again.');
            }
            console.error("Error during registration:", error);
        }
    });
    
    
    
    
    

    document.getElementById('registerMultiplePlayers')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const gameInfo = await contract.methods.games(gameId).call();
    
            // Vérifier si la GameID existe
            if (gameInfo.owner === '0x0000000000000000000000000000000000000000') {
                alert("Erreur : This GameID doesn't exist.");
                return;
            }
    
            // Vérifier si l'utilisateur est le propriétaire de la GameID
            if (gameInfo.owner !== accounts[0]) {
                alert("You are not the owner of the GameID");
                return;
            }
    
            // Vérifier si la game est déjà fermée
            if (!gameInfo.isRegistrationOpen) {
                alert("Erreur : Game is already active.");
                return;
            }
    
            const pseudos = prompt("Enter player pseudos (comma separated, e.g., pseudo1, pseudo2, pseudo3):");
            if (pseudos) {
                const pseudosArray = pseudos.split(',').map(pseudo => pseudo.trim());
    
                // Appeler la fonction pour obtenir les pseudos déjà enregistrés
                const registeredPlayers = await contract.methods.getRegisteredPlayers(gameId).call();
    
                // Vérifier l'unicité des pseudos en frontend
                for (let pseudo of pseudosArray) {
                    if (registeredPlayers.includes(pseudo)) {
                        alert(`Le pseudo "${pseudo}" est déjà pris. Veuillez choisir un autre pseudo.`);
                        return; // Arrêter si un pseudo est déjà pris
                    }
                }
    
                // Si tous les pseudos sont uniques, envoyer la transaction
                await contract.methods.registerMultiplePlayers(gameId, pseudos).send({ from: accounts[0] });
                alert('Multiple players registered');
            } else {
                alert('No pseudos entered');
            }
        } catch (error) {
            alert('Error: ' + error.message);
            console.error("Error during registration:", error);
        }
    });
    
    

    document.getElementById('addToWhitelist')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
    
            // Récupération des informations de la partie
            const gameInfo = await contract.methods.games(gameId).call();
    
            // Vérification si la partie est publique
            if (!gameInfo.isPrivate) {
                alert('Error: This GameID is Public. You cannot add addresses to the whitelist.');
                return;
            }
    
            // Vérification si la partie est protégée par mot de passe
            if (gameInfo.password && gameInfo.password !== "") {
                alert('Error: This private GameID is using a password. You cannot add addresses to the whitelist.');
                return;
            }
    
            // Si la validation est passée, on continue avec l'ajout à la whitelist
            const addresses = prompt("Enter addresses to whitelist (comma separated):").split(',').map(addr => addr.trim()).filter(addr => addr !== "");
    
            await contract.methods.addToWhitelist(gameId, addresses).send({ from: accounts[0] });
            alert('Addresses added to whitelist');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
    

    document.getElementById('setEliminationRange')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const gameInfo = await contract.methods.games(gameId).call();

            // Vérifier si la GameID existe
            if (gameInfo.owner === '0x0000000000000000000000000000000000000000') {
                alert("Erreur : This GameID doesn't exist.");
                return;
            }
            // Vérifier si l'utilisateur est le propriétaire de la GameID
            if (gameInfo.owner !== accounts[0]) {
                alert("You are not the owner of the GameID");
                return;
            }
            // Vérifier si la game est déjà fermée
            if (!gameInfo.isRegistrationOpen) {
                alert("Erreur : Game already closed.");
                return;
            }
            const minEliminationCount = prompt("Enter minimum elimination per round:");
            const maxEliminationCount = prompt("Enter maximum elimination per round:");
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
            const gameInfo = await contract.methods.games(gameId).call();

            // Vérifier si la GameID existe
            if (gameInfo.owner === '0x0000000000000000000000000000000000000000') {
                alert("Erreur : This GameID doesn't exist.");
                return;
            }
            // Vérifier si la partie est déjà terminée
            if (gameInfo.winner && gameInfo.winner !== '') {
                alert(`Game already finished, winner is ${gameInfo.winner}`);
                return;
            }

            // Vérifier si l'utilisateur est le propriétaire de la GameID
            if (gameInfo.owner !== accounts[0]) {
                alert("You are not the owner of the GameID");
                return;
            }

            // Vérifier si les éliminations par round ont été définies
            if (gameInfo.minEliminationCount === '0' || gameInfo.maxEliminationCount === '0') {
                alert("You must set up elimination per round first");
                return;
            }

            // Vérifier si l'inscription est fermée
            if (gameInfo.isRegistrationOpen) {
                alert("You must close registration first");
                return;
            }

            await contract.methods.startRound(gameId).send({ from: accounts[0] });
            alert('Round started');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    document.getElementById('startRoundButton')?.addEventListener('click', async () => {
        try {
            const accounts = await web3.eth.getAccounts();
            const gameId = getGameId();
            const gameInfo = await contract.methods.games(gameId).call();

            // Vérifier si la GameID existe
            if (gameInfo.owner === '0x0000000000000000000000000000000000000000') {
                alert("Erreur : This GameID doesn't exist.");
                return;
            }

            // Vérifier si la partie est déjà terminée
            if (gameInfo.winner && gameInfo.winner !== '') {
                alert(`Game already finished, winner is ${gameInfo.winner}`);
                return;
            }
            // Vérifier si l'utilisateur est le propriétaire de la GameID
            if (gameInfo.owner !== accounts[0]) {
                alert("You are not the owner of the GameID");
                return;
            }

            // Vérifier si les éliminations par round ont été définies
            if (gameInfo.minEliminationCount === '0' || gameInfo.maxEliminationCount === '0') {
                alert("You must set up elimination per round first");
                return;
            }

            // Vérifier si l'inscription est fermée
            if (gameInfo.isRegistrationOpen) {
                alert("You must close registration first");
                return;
            }
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
            const gameInfo = await contract.methods.games(gameId).call();

            // Vérifier si la GameID existe
            if (gameInfo.owner === '0x0000000000000000000000000000000000000000') {
                alert("Erreur : This GameID doesn't exist.");
                return;
            }
            // Vérifier si l'utilisateur est le propriétaire de la GameID
            if (gameInfo.owner !== accounts[0]) {
                alert("You are not the owner of the GameID");
                return;
            }
            // Vérifier si la game est déjà fermée
            if (!gameInfo.isRegistrationOpen) {
                alert("Erreur : Game is already active.");
                return;
            }

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

    document.getElementById('getWhitelist')?.addEventListener('click', async () => {
        try {
            const gameId = getGameId();
    
            // Appel de la fonction getWhitelist du smart contract
            const whitelist = await contract.methods.getWhitelist(gameId).call();
    
            if (whitelist.length === 0) {
                outputContent.innerHTML = `<p>No addresses are in the whitelist for this GameID.</p>`;
            } else {
                outputContent.innerHTML = `<p>Whitelist Addresses:</p><ul>${whitelist.map(addr => `<li>${addr}</li>`).join('')}</ul>`;
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });
    document.getElementById('getRegisteredAddresses')?.addEventListener('click', async () => {
        try {
            const gameId = getGameId();  // Assure-toi que getGameId() est bien défini et retourne l'ID du jeu
            const registeredAddresses = await contract.methods.getRegisteredAddresses(gameId).call();
    
            const outputContainer = document.getElementById('outputContent');
    
            // Effacer le contenu précédent
            outputContainer.innerHTML = '';
    
            if (registeredAddresses.length === 0) {
                outputContainer.innerHTML = "<p>No registered addresses found.</p>";
            } else {
                let addressesList = "<h4>Registered Addresses:</h4><ul>";
                registeredAddresses.forEach(address => {
                    addressesList += `<li>${address}</li>`;
                });
                addressesList += "</ul>";
                outputContainer.innerHTML = addressesList;
            }
        } catch (error) {
            console.error("Error retrieving registered addresses:", error);
            document.getElementById('outputContent').innerHTML = '<p>Failed to retrieve registered addresses.</p>';
        }
    });
    
    
    document.getElementById('games')?.addEventListener('click', async () => {
        try {
            const gameId = getGameId();
            const gameInfo = await contract.methods.getGameInfo(gameId).call();

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

    document.getElementById('main-header')?.addEventListener('click', async () => {
        navigate('index.html');
    });

    // Ajout de l'événement pour le bouton "Visit Faucet"
    const faucetButton = document.getElementById('faucetButton');

    if (faucetButton) {
        faucetButton.addEventListener('click', () => {
            window.open('https://faucet.zkevm.ternoa.network/', '_faucet');
        });
    } else {
        console.error('faucetButton not found in the DOM.');
    }
});
