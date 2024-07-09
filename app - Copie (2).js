document.addEventListener('DOMContentLoaded', async () => {
    const connectButton = document.getElementById('connectButton');
    const statusDiv = document.getElementById('status');
    const mainContent = document.getElementById('mainContent');
    const welcomeContent = document.getElementById('welcomeContent');

    let web3;
    let contract;
    let accounts;

    if (connectButton) {
        connectButton.addEventListener('click', async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    accounts = await web3.eth.getAccounts();
                    statusDiv.innerHTML = `<p style="color: green;">Connected to MetaMask</p>`;
                    welcomeContent.style.display = 'none';
                    mainContent.style.display = 'block';
                } catch (error) {
                    statusDiv.innerHTML = `<p style="color: red;">Error connecting to MetaMask: ${error.message}</p>`;
                }
            } else {
                statusDiv.innerHTML = `<p style="color: red;">MetaMask is not installed. Please install it to continue.</p>`;
            }
        });
    }

    const createManageButton = document.getElementById('createManageButton');
    if (createManageButton) {
        createManageButton.addEventListener('click', () => {
            window.location.href = 'create-manage.html';
        });
    }

    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }

    const contractAddress = "0x6f19096082Dc30f51189336c66927fb182eAD715";
    const contractABI = [
        // ... (votre ABI ici)
    ];

    function initializeContract() {
        if (!web3) {
            web3 = new Web3(window.ethereum);
        }
        contract = new web3.eth.Contract(contractABI, contractAddress);
        console.log("Contract initialized");
    }

    const pageFunctions = {
        'create-manage.html': () => {
            initializeContract();
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
            initializeContract();
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
});
