'use strict';

const minDice = 1;
const maxDice = 6;
const badDice = 1;

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

// State Variables
const playerOne = 0;
const playerTwo = 1;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let currentScore = 0;
let activePlayer = playerOne;

// Returns a random integer between min (inclusive) and max (inclusive).
const diceRoll = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const showDice = function (roll) {
  dice.setAttribute('src', `PNGs/dice-${roll}.png`);
};

const resetCurrentScore = function (currentScoreEl) {
  currentScore = 0;
  currentScoreEl.textContent = currentScore;
};

const calcShowCurrentScore = function (currentScoreEl, currentRoll) {
  currentScore += currentRoll;
  currentScoreEl.textContent = currentScore;
};

const activePlayerOne = function () {
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
};

const activePlayerTwo = function () {
  document.querySelector('.player--0').classList.remove('player--active');
  document.querySelector('.player--1').classList.add('player--active');
};

const calcTotalPlayerOne = function (activePlayerTotalScoreEl) {
  playerOneTotalScore += currentScore;
  activePlayerTotalScoreEl.textContent = playerOneTotalScore;
};
const calcTotalPlayerTwo = function (activePlayerTotalScoreEl) {
  playerTwoTotalScore += currentScore;
  activePlayerTotalScoreEl.textContent = playerTwoTotalScore;
};

btnRoll.addEventListener('click', function (event) {
  const activePlayerEl = document.querySelector('.player--active');
  const currentScoreEl = activePlayerEl.querySelector('.current-score');
  const currentRoll = diceRoll(minDice, maxDice);

  showDice(currentRoll);

  if (currentRoll === badDice) {
    if (activePlayer === playerOne) {
      activePlayer = playerTwo;
      activePlayerTwo();
    } else {
      activePlayer = playerOne;
      activePlayerOne();
    }

    resetCurrentScore(currentScoreEl);
    return;
  }

  calcShowCurrentScore(currentScoreEl, currentRoll);
});

btnHold.addEventListener('click', function (event) {
  const activePlayerEl = document.querySelector('.player--active');

  const activePlayerTotalScoreEl = activePlayerEl.querySelector('.score');
  const currentScoreEl = activePlayerEl.querySelector('.current-score');

  if (activePlayer === playerOne) {
    activePlayer = playerTwo;
    activePlayerTwo();
    calcTotalPlayerOne(activePlayerTotalScoreEl);
  } else {
    activePlayer = playerOne;
    activePlayerOne();
    calcTotalPlayerTwo(activePlayerTotalScoreEl);
  }

  resetCurrentScore(currentScoreEl);
});

btnNewGame.addEventListener('click', function (event) {
  currentScore = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;

  const playersEls = document.querySelectorAll('.player');
  for (const player of playersEls) {
    player.querySelector('.score').textContent = currentScore;
    player.querySelector('.current-score').textContent = playerOneTotalScore;
  }

  playersEls[playerOne].classList.add('player--active');
  playersEls[playerTwo].classList.remove('player--active');
});

// CODE THE GAME WITH PLAYER-0 AND PLAYER-1 AS CONSTANTS,
// INSTEAD OF PLAYING WITH "PLAYER--ACTIVE" CLASS. IT's REPETITIVE.
// USE BODY CLICK EVENT HANDLER, not each button event handler ?
