const img1 = document.getElementById("dice-img1");
const img2 = document.getElementById("dice-img2");
const rollDiceBtn = document.getElementById("btn-roll");
const newGameBtn = document.getElementById("btn-newgame");
const holdScoreBtn = document.getElementById("btn-hold");
const pl1CurrentScore = document.getElementById("player1-currentscore");
const pl2CurrentScore = document.getElementById("player2-currentscore");
const pl1TotalScore = document.querySelector("#player1-totalscore");
const pl2TotalScore = document.querySelector("#player2-totalscore");
const pl1_Panel = document.querySelector(".player1-panel");
const pl2_Panel = document.querySelector(".player2-panel");
const player1_Id = document.getElementById("player1-id");
const player2_Id = document.getElementById("player2-id");
const winningScoreInput = document.getElementById("winning-scoreInput");
const startGame = document.getElementById("start");
const instructionIcon = document.querySelector(".instructions");
var gamePlay = true;
var winningScore = 50;
var roundScore = 0;
var activePlayer1 = true;
var activePlayer2 = false;

newGameBtn.addEventListener("click", () => {
  gamePlay = true;
  winningScore = 50;
  roundScore = 0;
  activePlayer1 = true;
  activePlayer2 = false;
  pl1CurrentScore.textContent = 0;
  pl2CurrentScore.textContent = 0;
  img1.style.display = "none";
  img2.style.display = "none";
  pl1TotalScore.textContent = 0;
  pl2TotalScore.textContent = 0;
  pl1_Panel.classList.add("active");
  pl2_Panel.classList.remove("active");
  pl1_Panel.classList.remove("winner");
  pl2_Panel.classList.remove("winner");
  player1_Id.textContent = "PLAYER 1";
  player1_Id.style.color = "#fff";
  player2_Id.textContent = "PLAYER 2";
  player2_Id.style.color = "#fff";
  winningScoreInput.value = "none";
});

function nextPlayer() {
  pl1_Panel.classList.toggle("active");
  pl2_Panel.classList.toggle("active");
  pl1CurrentScore.textContent = 0;
  pl2CurrentScore.textContent = 0;
  img1.style.display = "none";
  img2.style.display = "none";
  roundScore = 0;
}

rollDiceBtn.addEventListener("click", function () {
  if (gamePlay) {
    const randomNum1 = Math.floor(Math.random() * 6) + 1;
    const randomNum2 = Math.floor(Math.random() * 6) + 1;
    var diceSum = randomNum1 + randomNum2;

    img1.setAttribute(`src`, `./images/dice-${randomNum1}.png`);
    img2.setAttribute(`src`, `./images/dice-${randomNum2}.png`);

    img1.style.display = "block";
    img2.style.display = "block";

    if (activePlayer1) {
      if (randomNum1 !== 1 && randomNum2 !== 1) {
        roundScore += diceSum;
        pl1CurrentScore.textContent = roundScore;
      } else {
        nextPlayer();
        activePlayer1 = false;
        activePlayer2 = true;
      }
    } else if (activePlayer2) {
      if (randomNum1 !== 1 && randomNum2 !== 1) {
        roundScore += diceSum;
        pl2CurrentScore.textContent = roundScore;
      } else {
        nextPlayer();
        activePlayer1 = true;
        activePlayer2 = false;
      }
    }

    console.log(randomNum1, randomNum2);
  }
});

holdScoreBtn.addEventListener("click", () => {
  img1.style.display = "none";
  img2.style.display = "none";
  var sumScore1 = 0;
  var sumScore2 = 0;
  sumScore1 += Number(pl1CurrentScore.textContent);
  sumScore2 += Number(pl2CurrentScore.textContent);
  pl1TotalScore.textContent = Number(pl1TotalScore.textContent) + sumScore1;
  pl2TotalScore.textContent = Number(pl2TotalScore.textContent) + sumScore2;
  pl1CurrentScore.textContent = 0;
  pl2CurrentScore.textContent = 0;

  if (activePlayer1) {
    nextPlayer();
    activePlayer1 = false;
    activePlayer2 = true;
  } else if (activePlayer2) {
    nextPlayer();
    activePlayer1 = true;
    activePlayer2 = false;
  }

  if (Number(pl1TotalScore.textContent) >= winningScore) {
    pl1_Panel.classList.add("winner");
    pl1_Panel.classList.remove("active");
    pl2_Panel.classList.remove("active");
    player1_Id.textContent = "WINNER!!";
    player1_Id.style.color = "red";
    gamePlay = false;
  } else if (Number(pl2TotalScore.textContent) >= winningScore) {
    pl2_Panel.classList.add("winner");
    pl1_Panel.classList.remove("active");
    pl2_Panel.classList.remove("active");
    player2_Id.textContent = "WINNER!!";
    player2_Id.style.color = "red";
    gamePlay = false;
  }
});

winningScoreInput.addEventListener("change", () => {
  winningScore = Number(winningScoreInput.value);
});

startGame.addEventListener("click", () => {
  document.getElementsByClassName("how-to-play")[0].style.display = "none";
  document.querySelector(".blur_background").style.display = "none";
});

instructionIcon.addEventListener("click", () => {
  document.querySelector(".how-to-play").style.display = "block";
  document.querySelector(".blur_background").style.display = "block";
});
