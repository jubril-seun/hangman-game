function createPlayer (name = "Player") {
    let playerName = name;
    let lives = 6;
    let wins = 0;
    let losses = 0;

    const updatePlayerName = (newName) => {
        playerName = newName;
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
        getLosses
    }

}


function createGame(){

    const player = createPlayer();

    let secretWord = "";  
    let userWord = [];
    
    const wordBank = (function () {
        const wordsArr = ["Potato", "Eggs", "Adam", "Computer", "Bottle", "Automobile"]

        secretWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
        for(let i = 0; i < secretWord.length; i++){
            userWord[i] = "";
        };
    })();

    const arrSecretWord = secretWord.toLocaleLowerCase().split('');
    
    const getSecretWord = () => secretWord;
    const getUserWord = () => userWord;

    const checkGuess = (letter) => {
        const lowerCased = letter.toLowerCase();
        const match = arrSecretWord.includes(lowerCased);

        return match;
    }

    const updateWord = (letter) => {
        const lowerCased = letter.toLowerCase();

        arrSecretWord.forEach((item, index) => {
             if(item === lowerCased){
                userWord[index] = secretWord[index];
             };
        });
    }

    let isGameOver = {
        playerLose: false,
        playerWin: false,
    }

    const gameOver = () => {
        if(player.getLives() === 0){
            isGameOver.playerLose = true;
            return true;
        } 
        
        if(userWord.join('') === secretWord){
            isGameOver.playerWin = true;
            return true;
        };
    }
    

    const playRound = (letter) => {
        if(gameOver()) return;
        
        if(!checkGuess(letter)){
            player.loseLives(); 
            gameOver();
            console.log("There is no match, sorry!");  
        } else {
            updateWord(letter);
            gameOver();
            console.log("There's a match!");
        }

        setTimeout(() => {
            if(isGameOver.playerLose){
                console.log("You have lost!");
                player.addLoss();
                return;
            } else if(isGameOver.playerWin){
                console.log("You Win!");
                player.addWin();
                return;
            };           
        }, 1500)
    }

    const getIsGameOver = () => isGameOver;

    return {
        getSecretWord,
        getUserWord,
        checkGuess,
        playRound,
        updateWord,
        getLives: player.getLives,
        getLosses: player.getLosses,
        getWins: player.getWins,
        getIsGameOver
    }
}

function displayController(){
    const game = createGame();

    
}

// const game = createGame();

// console.log(game.getSecretWord());
// game.playRound("f");
// game.playRound("f");
// game.playRound("f");
// game.playRound("d");
// game.playRound("c");
// game.playRound("e");
// console.log(game.getUserWord());
// console.log(game.getIsGameOver().playerLose);
// console.log(game.getLives());
// console.log(game.getLosses());