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
        const wordsArr = [
            "Potato", 
            "Eggs", 
            "Adam", 
            "Computer", 
            "Bottle", 
            "Automobile"
        ]

        secretWord = wordsArr[Math.floor(Math.random() * wordsArr.length)];
        for(let i = 0; i < secretWord.length; i++){
            userWord[i] = "";
        };
    })();
    
    const getSecretWord = () => secretWord;
    const getUserWord = () => userWord;

    const checkGuess = (letter) => {
        const word = secretWord.toLowerCase().split('');
        const match = word.includes(letter.toLowerCase());

        return match;
    }

    const updateWord = (letter) => {
        const lowerCase = letter.toLowerCase();
        const word = secretWord.toLowerCase().split('');

        word.forEach((item, index) => {
             if(item === lowerCase){
                userWord[index] = secretWord[index];
             };
        });
    }
    

    const playRound = (letter) => {
        if(!checkGuess(letter)){
            console.log("There is no match, sorry!");
            player.loseLives();
            return false;
        } else {
            updateWord(letter);
            console.log("There's a match!");
            return true;
        }
    }


    return {
        getSecretWord,
        getUserWord,
        checkGuess,
        playRound,
        updateWord,
        getLives: player.getLives
    }
}

const game = createGame();

console.log(game.getSecretWord());
console.log(game.playRound("E"));
console.log(game.getUserWord());
console.log(game.playRound("g"));
console.log(game.getUserWord());
console.log(game.getLives());
