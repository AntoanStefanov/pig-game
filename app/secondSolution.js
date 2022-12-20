'use strict';

const totalScoreForWin = 100;

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

const getElOnActivePlayer = (className) =>
  activePlayerEl.querySelector(`.${className}`);

const showCurrentScore = () =>
  (getElOnActivePlayer('current-score').textContent = currentScore);

const showCurrentTotalScore = (currentTotalScore) =>
  (getElOnActivePlayer('score').textContent = currentTotalScore);

const resetCurrentScore = function () {
  currentScore = 0;
  showCurrentScore();
};

const calcCurrentScore = function (currentRoll) {
  currentScore += currentRoll;
  showCurrentScore();
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

const winCheck = (totalScore) => totalScore >= totalScoreForWin;

const displayWinner = () => {
  activePlayerEl.classList.add('player--winner', 'name');
  btnRoll.disabled = true;
  btnHold.disabled = true;
};

const hideWinner = () => {
  activePlayerEl.classList.remove('player--winner', 'name');
  btnRoll.disabled = false;
  btnHold.disabled = false;
};

const calcTotalPlayerOne = function () {
  playerOneTotalScore += currentScore;
  return playerOneTotalScore;
};

const calcTotalPlayerTwo = function () {
  playerTwoTotalScore += currentScore;
  return playerTwoTotalScore;
};

const clearAllScores = function () {
  for (const player of playerEls) {
    player.querySelector('.score').textContent = currentScore;
    player.querySelector('.current-score').textContent = playerOneTotalScore;
  }
};

const isActivePlayerWinner = function () {
  let currentTotalScore;

  if (activePlayerEl === playerOneEl) {
    currentTotalScore = calcTotalPlayerOne();
  } else {
    currentTotalScore = calcTotalPlayerTwo();
  }

  showCurrentTotalScore(currentTotalScore);

  if (winCheck(currentTotalScore)) return true;

  resetCurrentScore();
};

const switchPlayers = () =>
  activePlayerEl === playerOneEl ? activatePlayerTwo() : activatePlayerOne();

const isThereWinner = () => activePlayerEl.classList.contains('player--winner');

btnRoll.addEventListener('click', function () {
  const currentRoll = diceRoll(minDice, maxDice);

  showDice(currentRoll);

  if (currentRoll === badDice) {
    resetCurrentScore();
    switchPlayers();
    return;
  }

  calcCurrentScore(currentRoll);
});

btnHold.addEventListener('click', function () {
  if (isActivePlayerWinner()) {
    displayWinner();
    return;
  }
  switchPlayers();
});

btnNewGame.addEventListener('click', function () {
  currentScore = 0;
  playerOneTotalScore = 0;
  playerTwoTotalScore = 0;

  if (isThereWinner()) hideWinner();

  activatePlayerOne();
  clearAllScores();
  hideDice();
});
