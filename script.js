function createGame(){

    let secretWord = "";
    let userGuess = "";
    
    const wordBank = (() => {
        const wordsArr = [
            "Potato", 
            "Eggs", 
            "Adam", 
            "Computer", 
            "Bottle", 
            "Automobile"
        ]

        secretWord = wordsArr[Math.floor(Math.random() * wordsArr.length)]
    })()
    
    const getSecretWord = () => secretWord;

    const guess = (letter) => {
        return letter;
    }

    return {
        getSecretWord
    }
}

console.log(createGame().getSecretWord())