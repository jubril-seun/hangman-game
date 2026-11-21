function empty() {
let value = "";

const addLetter = (letter) => {
    value = letter;
}

const getLetter = () => value;

return {addLetter, getLetter};
}


function createPlayer (name = "Player") {
    let playerName = name;
    let lives = 6;
    let wins = 0;
    let losses = 0;

    const updatePlayerName = (newName) => {
        playerName = newName;
    }

    const resetLives = () => {
        lives = 6;
    }

    const loseLives = () => {
        --lives;
    }

    const addWin = () => {
        ++wins;
    }

    const addLoss = () => {
        ++losses;
    }

    const getPlayerName = () => playerName;

    const getLives = () => lives;

    const getWins = () => wins;

    const getLosses = () => losses;

    return {
        updatePlayerName,
        loseLives,
        addWin,
        addLoss,
        getPlayerName,
        getLives,
        getWins,
        getLosses,
        resetLives
    }

}

const wordBank = (function () {
    const words = [
    "Waffle", "Gorilla", "Telescope", "Lightning", "Cupcake",
    "Astronaut", "Dolphin", "Scarecrow", "Snowman", "Walrus",
    "Parachute", "Mermaid", "Burrito", "Haunted", "Thunder",
    "Sasquatch", "Pretzel", "Blizzard", "Platypus", "Zombie",
    "Cheeseburger", "Fireworks", "Lemonade", "Compass", "Dumpling",
    "Hedgehog", "Mustache", "Quicksand", "Raccoon", "Xylophone",
    "Chameleon", "Trombone", "Meatball", "Sunflower", "Boomerang",
    "Caterpillar", "Pineapple", "Backpack", "Tarantula", "Whirlpool",
    "Cat", "Frog", "Moon", "Duck", "Cake",
    "Bear", "Lamp", "Pizza", "Ghost", "Robot",
    "Taco", "Wolf", "Crab", "Star", "Jazz",
    "Fish", "Bone", "Toad", "Maze", "Quiz",
    "Slime", "Goat", "Kite", "Lava", "Yeti",
    "Beet", "Claw", "Joke", "Zoom", "Mud"
    ];

    const getRandomWord = () => words[Math.floor(Math.random() * words.length)];

    return { getRandomWord };
})();


function createGame(){

    const player = createPlayer();

    let secretWord = "";  
    let userWord = [];
    let arrSecretWord = [];

    const initializeRound = () => {
        let newWord = wordBank.getRandomWord();

        if(newWord === secretWord) return initializeRound();
        

        secretWord = newWord;
        arrSecretWord = secretWord.toLowerCase().split('');

        userWord = [];
        for(let i = 0; i < secretWord.length; i++){
            userWord[i] = empty();
        };

    }

    initializeRound();
    
    const getUserWord = () => userWord.map(n => n.getLetter());

    let guess = null;

    const checkGuess = (letter) => {
        const lowerCased = letter.toLowerCase();
        const match = arrSecretWord.includes(lowerCased);

        if(match){
            guess = true;
        } else {
            guess = false;
        }
    }


    const getGuess = () => guess;

    const updateWord = (letter) => {
        const lowerCased = letter.toLowerCase();

        arrSecretWord.forEach((item, index) => {
             if(item === lowerCased){
                userWord[index].addLetter(secretWord[index]);
             };
        });
    }


    let gameStatus = "playing";

    let gameMsg = "";

    const gameOver = () => {
        if(player.getLives() === 0){
            gameStatus = "lose";
            return;
        } 
        
        if(userWord.every(n => n.getLetter() != "")){
            gameStatus = "win";
            return;
        };
    }
    

    const playRound = (letter) => {
        if(gameStatus !== "playing") return;
        
        checkGuess(letter);
        
        if(!guess){
            player.loseLives(); 
            gameOver();
            gameMsg = `Oof! Sorry, bud.`
        } else {
            updateWord(letter);
            gameOver();
            gameMsg = `Nice one, ${player.getPlayerName()}! Keep going.`
        }

        if(gameStatus === "lose"){
            player.addLoss();
        } else if(gameStatus === "win"){
            player.addWin();
        };

    }

    const resetGame = () => {
        gameMsg = "";

        gameStatus = "playing";

        guess = null;

        player.resetLives();

        initializeRound();
    }

    const getGameMsg = () => gameMsg;
    const getGameStatus = () => gameStatus;
    const getSecretWord = () => secretWord;

    return {
        getUserWord,
        getGuess,
        playRound,
        getLives: player.getLives,
        getWins: player.getWins,
        getLosses: player.getLosses,
        updatePlayerName: player.updatePlayerName,
        getPlayerName: player.getPlayerName,
        getGameMsg,
        resetGame,
        getGameStatus,
        getSecretWord
    }
}

(function displayController () {
    const game = createGame();

    const boardTop = document.querySelector('.top-area');
    const boardBottom = document.querySelector('.bottom-area');
    const modal = document.getElementById('gameover-modal');

    const gameStartInput = () => {
        boardTop.replaceChildren();

        const input = document.createElement('input');
        input.classList.add('user-input');
        input.id = 'user-input';
        input.setAttribute("placeholder", "Enter name...");
        const button = document.createElement('button');
        button.textContent = "Begin";
        button.classList.add('submit-btn');
        
        boardTop.append(input, button);
        
    }

    gameStartInput();

    const greeting = () => {

        boardTop.replaceChildren();

        boardTop.classList.remove('fade-out');
        const greeting = document.createElement('h2');
        greeting.classList.add('greeting-txt');
        greeting.textContent = `Welcome, ${game.getPlayerName()}.`;

        boardTop.appendChild(greeting);
    }

    const printGame = () => {
        boardBottom.replaceChildren();

        const userWord = game.getUserWord();
        const userLives = game.getLives();

        const txt = document.createElement('p');
        txt.classList.add('top-txt');
        txt.textContent = "Secret word";

        boardBottom.appendChild(txt);

        const userWordDiv = document.createElement('div');
        userWordDiv.classList.add('user-word-div');
        boardBottom.appendChild(userWordDiv);
        
        userWord.forEach((item, index) => {
            const cell = document.createElement('div');
            cell.classList.add('txt-cell');
            cell.setAttribute ('index', index);
            cell.textContent = "_";
            cell.classList.add('empty');
            userWordDiv.appendChild(cell);
        });

        const lifeCounter = document.createElement('p');
        lifeCounter.classList.add('life-counter');
        lifeCounter.textContent = `Lives left: ${userLives}`;
        boardBottom.appendChild(lifeCounter);

        const tokenDiv = document.createElement('div');
        tokenDiv.classList.add('token-div');
        boardBottom.appendChild(tokenDiv);

        for(let i = 0; i < userLives; i++){
            const cell = document.createElement('div');
            cell.classList.add('lives-cell');
            cell.setAttribute('index', [i]);
            tokenDiv.appendChild(cell);
        }

        const lettersDiv = document.createElement('div');
        lettersDiv.classList.add('letters-div');
        boardBottom.appendChild(lettersDiv);

        const printAlphabet = (() => {
            let alphabet = 'abcdefghijklmnopqrstuvwxyz';

            for(let i = 0; i < alphabet.length; i++){
                const cell = document.createElement('button');
                cell.classList.add('letters-btn');
                cell.setAttribute('letter', alphabet[i]);
                cell.textContent = alphabet[i].toUpperCase();
                lettersDiv.appendChild(cell);
            }
        })();

        const gameMsg = document.createElement('div');
        gameMsg.classList.add('game-msg');
        gameMsg.textContent = game.getGameMsg();
        boardBottom.appendChild(gameMsg);

        const playerScore = document.createElement('p');
        playerScore.classList.add('player-score');
        playerScore.textContent = `Wins: ${game.getWins()} · Losses: ${game.getLosses()}`
        boardBottom.appendChild(playerScore);

        boardBottom.classList.add('fade-in');
    }

    // printGame();

    const update = () => {
        const userWord = game.getUserWord();
        const userLives = game.getLives();
        
        userWord.forEach((item, index) => {
            if(item != ""){
                const cell = document.querySelector(`.txt-cell[index="${index}"]`);
                cell.textContent = item;
            }
        })

        const lives = document.querySelector('.life-counter');
        lives.textContent = `Lives left: ${userLives}`;

        const gameMsg = document.querySelector('.game-msg');
        gameMsg.textContent = game.getGameMsg();

        const livesCells = document.querySelectorAll('.lives-cell');
        livesCells.forEach((item, index) => {
            if(index + 1 > userLives){
                item.classList.add('dead');
            }
        })

        const modalMsg = document.getElementById('modal-message');

        if(game.getGameStatus() === "lose"){
            modalMsg.textContent = `You lose. The secret word was "${game.getSecretWord().toUpperCase()}". Would you like to play again?`
            modal.showModal();
        } 

        if (game.getGameStatus() === "win") {
            modalMsg.textContent = "You win! Would you like to play again?"
            modal.showModal();
        }

        const score = document.querySelector('.player-score');
        score.textContent = `Wins: ${game.getWins()} · Losses: ${game.getLosses()}`;
        
    }

    const reset = () => {    
        game.resetGame();
        printGame();
    }

    // Event listener for begin/enter name button
    boardTop.addEventListener('click', (e) => {
        const submit = e.target.classList.contains('submit-btn');
        const input = document.getElementById('user-input');
        
        if(submit && input.value != ""){
            game.updatePlayerName(input.value);
            boardTop.classList.add('fade-out');

            setTimeout(() => {
                greeting();
                printGame();
            }, 700);
        }
    })


    boardBottom.addEventListener('click', (e) => {
        if(game.getGameStatus() !== "playing") {
            modal.showModal();
            update();
            return;
        }
        
        const i = e.target.classList.contains('letters-btn');

        if(i){
            const btn = e.target;
            const letter = btn.getAttribute('letter');
            game.playRound(letter);
            update();

            if(game.getGuess()){
                btn.classList.add('good-guess');
                btn.disabled = true;
            } else {
                btn.classList.add('bad-guess');
                btn.disabled = true;
            }
        }
    });

    modal.addEventListener('click', (e) => {
        const yesBtn = e.target.id === 'yes-btn';
        const noBtn = e.target.id === 'no-btn';

        if(yesBtn){
            reset();
            modal.close();
        } else if (noBtn){
            modal.close();
        }
    })
})();