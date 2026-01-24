const keyboardDiv = document.querySelector(".keyboard");
const Hangman = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gamemodel = document.querySelector(".game-model");
const Playagain = document.querySelector(".play-again");
let currentWord,correctLetter = [], wrongGuessCount = 0;
const maxGuesses = 6; 
const resetGame = () => {
    //ressetting all game variable and UI elements 
    correctLetter = [];
    wrongGuessCount = 0;
    Hangman.src = `images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(()=>`<li class="letter"></li>`).join("");//display the word ko tala ko underline
    gamemodel.classList.remove("show");
}
const getRandomWord = () => {
    //selection of random word and hint from wordlist
    const {word,hint}= wordList[Math.floor(Math.random() * wordList.length) ];
    currentWord = word;
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint; //display random hint
    resetGame();
}
const gameOver = (isVictory) =>
{
    //after certain time of completing the game... shows the model with relevant details
    setTimeout( () => {
         const modeltext = isVictory ? `you found the correct word: ` : `The correct word was: `;
         gamemodel.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
         gamemodel.querySelector("h4").innerText = `${isVictory ? 'Congrats' : 'Game Over!'}`;
         gamemodel.querySelector("p").innerHTML = `${modeltext} <b>${currentWord}</b>`;
          gamemodel.classList.add("show");
    },300);
    
}
//to press the buttons
const initgame=(button, clickedLetter) =>{
    //checnking if clickedletter exist in the word give or not
    if(currentWord.includes(clickedLetter)) {
        //showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
if(letter === clickedLetter) {
    correctLetter.push(letter);
    wordDisplay.querySelectorAll("li")[index].innerText = letter ;
    wordDisplay.querySelectorAll("li")[index].classList.add ("guessed") ;
}
        })
    }
    else
    {
        //if the letter doesnt exits the hangman img will update
        wrongGuessCount++;
        Hangman.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true;
guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`; 
if(wrongGuessCount === maxGuesses) 
    return gameOver(false);
if(correctLetter.length === currentWord.length) 
    return gameOver(true);

}
//creating keyboard button and adding even listener
for (let i = 97; i <=122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initgame(e.target,String.fromCharCode(i) ))
}
getRandomWord();

Playagain.addEventListener("click", getRandomWord);