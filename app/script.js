'use strict';

const minDice = 1;
const maxDice = 6;
const badDice = 1;

const btnRoll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');

const btnHold = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

// State Variables
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let currentScore = 0;

// const activePlayer = document.querySelector('.player--active');

// Returns a random integer between min (inclusive) and max (inclusive).
const diceRoll = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getInactivePlayer = function () {
  const playersEls = document.querySelectorAll('.player');
  for (const player of playersEls) {
    if (!player.classList.contains('player--active')) {
      return player;
    }
  }
};

const activePlayer = function (inactivePlayerEl) {
  inactivePlayerEl.classList.add('player--active');
};

const deactivatePlayer = function (activePlayerEl) {
  activePlayerEl.classList.remove('player--active');
};

const showDice = function (roll) {
  dice.setAttribute('src', `PNGs/dice-${roll}.png`);
};

const switchPlayers = function (activePlayerEl) {
  const inactivePlayerEl = getInactivePlayer();
  deactivatePlayer(activePlayerEl);
  activePlayer(inactivePlayerEl);
};

const resetCurrentScore = function (currentScoreEl) {
  currentScore = 0;
  currentScoreEl.textContent = currentScore;
};

const calcShowCurrentScore = function (currentScoreEl, currentRoll) {
  currentScore += currentRoll;
  currentScoreEl.textContent = currentScore;
};

btnRoll.addEventListener('click', function (event) {
  const activePlayerEl = document.querySelector('.player--active');
  const currentScoreEl = activePlayerEl.querySelector('.current-score');
  const currentRoll = diceRoll(minDice, maxDice);

  showDice(currentRoll);

  if (currentRoll === badDice) {
    switchPlayers(activePlayerEl);
    resetCurrentScore(currentScoreEl);
    return;
  }

  calcShowCurrentScore(currentScoreEl, currentRoll);
});

btnHold.addEventListener('click', function (event) {
  const activePlayerEl = document.querySelector('.player--active');
  const activePlayerTotalScoreEl = activePlayerEl.querySelector('.score');
  const currentScoreEl = activePlayerEl.querySelector('.current-score');

  if (activePlayerEl.classList.contains('player--0')) {
    playerOneTotalScore += currentScore;
    activePlayerTotalScoreEl.textContent = playerOneTotalScore;
  } else {
    playerTwoTotalScore += currentScore;
    activePlayerTotalScoreEl.textContent = playerTwoTotalScore;
  }

  resetCurrentScore(currentScoreEl);
  switchPlayers(activePlayerEl);
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

  playersEls[0].classList.add('player--active');
  playersEls[1].classList.remove('player--active');
});

// CODE THE GAME WITH PLAYER-0 AND PLAYER-1 AS CONSTANTS,
// INSTEAD OF PLAYING WITH "PLAYER--ACTIVE" CLASS. IT's REPETITIVE.
