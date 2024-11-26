let randomNumber = parseInt(Math.random() * 100 + 1);
const submit = document.querySelector("#submit");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remainingGuesses = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".loworHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 0;
let playGame = true;

if (playGame) {
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    // console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("please enter a valid number");
  } else if (guess < 1) {
    alert("please enter a number more than 1");
  } else if (guess > 100) {
    alert("please enter a number less than 100");
  } else {
    prevGuess.push(guess);
    numGuess++;
    if (numGuess === 10 || numGuess > 10) {
      displayGuess(guess);
      displayMessage(`Game Over. Random Number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`);
    endGame();
  } else if (guess < randomNumber) {
    displayMessage(`Number is too Low`);
  } else if (guess > randomNumber) {
    displayMessage(`Number is too High`);
  }
}
function displayGuess(guess) {
  userInput.value = "";
  guessSlot.innerHTML += `${guess}, `;
//   numGuess++;
  remainingGuesses.innerHTML = `${10 - numGuess}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  newGame();
  playGame = false;
}

function newGame() {
  const newGameButton = document.querySelector("#newGame");
  newGameButton.addEventListener("click", () => {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 0;
    guessSlot.innerHTML = "";
    remainingGuesses.innerHTML = `${10 - numGuess}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
  });
}
