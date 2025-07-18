function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * array.length);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }

  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }
  isLower() {
    return this.playersGuess < this.winningNumber;
  }
  playersGuessSubmission(num) {
    if (typeof num !== "number" || num < 1 || num > 100 || isNaN(num)) {
      throw "That is an invalid guess.";
    }
    this.playersGuess = num;
    return this.checkGuess();
  }
  checkGuess() {
    if (this.playersGuess === this.winningNumber) {
      return "You Win!";
    }
    if (this.pastGuesses.includes(this.playersGuess)) {
      return "You have already guessed that number.";
    }
    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length === 5) {
      return "You Lose.";
    }
    let difference = Math.abs(this.playersGuess - this.winningNumber);
    if (difference < 10) {
      return "You're burning up!";
    } else if (difference < 25) {
      return "You're lukewarm.";
    } else if (difference < 50) {
      return "You're a bit chilly.";
    } else if (difference < 100) {
      return "You're ice cold!";
    }
  }

  provideHint() {
    let arr = [];
    arr.push(this.winningNumber);
    arr.push(generateWinningNumber());
    arr.push(generateWinningNumber());
    shuffle(arr);
    return arr;
  }
}

function newGame() {
  return new Game();
}

let game = newGame();
let myInput = document.getElementById("myInput"); //2
document.getElementById("hintsBtn").disabled = true;
//check
let check = document.getElementById("checkBtn");
check.addEventListener("click", () => {
  //result
  let result = game.playersGuessSubmission(Number(myInput.value));
  let resultValue = document.getElementById("result");

  resultValue.innerText = result;

  //previous guesses
  let prevGuess = document.getElementById("prevGuess");
  prevGuess.innerText = game.pastGuesses.join(",");

  //guessleft
  let guessLeft = document.getElementById("guessesLeft");
  let guessLeftVal = 5 - game.pastGuesses.length;
  guessLeft.innerText = "You have " + guessLeftVal + " remaining!";
  if (guessLeftVal == 2) {
    document.getElementById("hintsBtn").disabled = false;
  }

  //disable check
  if (result === "You Win!" || result === "You Lose.") {
    check.disabled = true;
  }
  document.getElementById("myInput").value = "";
});

//Hints
let myHint = document.getElementById("hintsBtn");

let myHintsTxt = document.getElementById("hints");

myHint.addEventListener("click", () => {
  const hints = game.provideHint();
  console.log("checking input", myInput.value);
  myHintsTxt.innerText = hints;
});

//play Again
let playAgain = document.getElementById("playAgain");
playAgain.addEventListener("click", () => {
  game = newGame();
  document.getElementById("myInput").value = "";
  document.getElementById("prevGuess").innerText = "";
  document.getElementById("hints").innerText = "";
  document.getElementById("result").innerText = "";
  document.getElementById("guessesLeft").innerText = "";
  document.getElementById("checkBtn").disabled = false;
});
