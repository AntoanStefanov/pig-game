'use strict';

const minDice = 1;
const maxDice = 6;
const badDice = 1;

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');
dice.style.display = 'none';

// State Variables
const playerOne = 0;
const playerTwo = 1;
let activePlayer = playerOne;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let currentScore = 0;

// Returns a random integer between min (inclusive) and max (inclusive).
const diceRoll = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const showDice = function (roll) {
  if (dice.style.display === 'none') dice.style.display = 'block';
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

const clearAllScores = function (playersEls) {
  for (const player of playersEls) {
    player.querySelector('.score').textContent = currentScore;
    player.querySelector('.current-score').textContent = playerOneTotalScore;
  }
};

const activatePlayerOne = function (playerEls) {
  playerEls[playerOne].classList.add('player--active');
  playerEls[playerTwo].classList.remove('player--active');
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
  const playerEls = document.querySelectorAll('.player');

  currentScore = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;

  clearAllScores(playerEls);
  activatePlayerOne(playerEls);
  dice.style.display = 'none';
});