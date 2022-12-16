'use strict';

const minDice = 1;
const maxDice = 6;
const badDice = 1;

const playerEls = document.querySelectorAll('.player');
const playerOneEl = document.querySelector('.player--0');
const playerTwoEl = document.querySelector('.player--1');

const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');

// State Variables
let activePlayerEl = playerOneEl;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let currentScore = 0;

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

const resetCurrentScore = function () {
  currentScore = 0;
  activePlayerEl.querySelector('.current-score').textContent = currentScore;
};

const calcShowCurrentScore = function (currentScoreEl, currentRoll) {
  currentScore += currentRoll;
  currentScoreEl.textContent = currentScore;
};

const activatePlayerOne = function () {
  activePlayerEl = playerOneEl;
  playerOneEl.classList.add('player--active');
  playerTwoEl.classList.remove('player--active');
};

const activatePlayerTwo = function () {
  activePlayerEl = playerTwoEl;
  playerTwoEl.classList.add('player--active');
  playerOneEl.classList.remove('player--active');
};

const calcTotalPlayerOne = function () {
  playerOneTotalScore += currentScore;
  activePlayerEl.querySelector('.score').textContent = playerOneTotalScore;
};

const calcTotalPlayerTwo = function () {
  playerTwoTotalScore += currentScore;
  activePlayerEl.querySelector('.score').textContent = playerTwoTotalScore;
};

const clearAllScores = function () {
  for (const player of playerEls) {
    player.querySelector('.score').textContent = currentScore;
    player.querySelector('.current-score').textContent = playerOneTotalScore;
  }
};

btnRoll.addEventListener('click', function (event) {
  const currentScoreEl = activePlayerEl.querySelector('.current-score');
  const currentRoll = diceRoll(minDice, maxDice);

  showDice(currentRoll);

  if (currentRoll === badDice) {
    resetCurrentScore(currentScoreEl);
    activePlayerEl === playerOneEl ? activatePlayerTwo() : activatePlayerOne();
    return;
  }

  calcShowCurrentScore(currentScoreEl, currentRoll);
});

btnHold.addEventListener('click', function (event) {
  if (activePlayerEl === playerOneEl) {
    calcTotalPlayerOne();
    resetCurrentScore();
    activatePlayerTwo();
  } else {
    calcTotalPlayerTwo();
    resetCurrentScore();
    activatePlayerOne();
  }
});

btnNewGame.addEventListener('click', function (event) {
  currentScore = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;

  clearAllScores();
  activatePlayerOne();
  hideDice();
});
