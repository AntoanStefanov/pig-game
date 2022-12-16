'use strict';

const minDice = 1;
const maxDice = 6;
const badDice = 1;

const playerEls = document.querySelectorAll('.player');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const dice = document.querySelector('.dice');

const playerOne = 0;
const playerTwo = 1;
// State Variables
let activePlayer = playerOne;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let currentScore = 0;

// Returns a random integer between min (inclusive) and max (inclusive).
const diceRoll = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const hideDice = () => {
  dice.style.display = 'none';
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

const activatePlayerOne = function () {
  activePlayer = playerOne;
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
};

const activatePlayerTwo = function () {
  activePlayer = playerTwo;
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

const clearAllScores = function () {
  for (const player of playerEls) {
    player.querySelector('.score').textContent = currentScore;
    player.querySelector('.current-score').textContent = playerOneTotalScore;
  }
};

const activatePlayerOneOnReset = function () {
  playerEls[playerOne].classList.add('player--active');
  playerEls[playerTwo].classList.remove('player--active');
  activePlayer = playerOne;
};

btnRoll.addEventListener('click', function (event) {
  const activePlayerEl = document.querySelector('.player--active');
  const currentScoreEl = activePlayerEl.querySelector('.current-score');
  const currentRoll = diceRoll(minDice, maxDice);

  showDice(currentRoll);

  if (currentRoll === badDice) {
    activePlayer === playerOne ? activatePlayerTwo() : activatePlayerOne();
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
    activatePlayerTwo();
    calcTotalPlayerOne(activePlayerTotalScoreEl);
  } else {
    activatePlayerOne();
    calcTotalPlayerTwo(activePlayerTotalScoreEl);
  }

  resetCurrentScore(currentScoreEl);
});

btnNewGame.addEventListener('click', function (event) {
  currentScore = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;

  clearAllScores();
  activatePlayerOneOnReset();
  hideDice();
});
