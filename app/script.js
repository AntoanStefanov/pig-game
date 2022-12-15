'use strict';

const minDice = 1;
const maxDice = 6;
const badDice = 1;

const btnRoll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');

const btnHold = document.querySelector('.btn--hold');

let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;

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

const switchPlayers = function (activePlayerEl, currentScoreEl) {
  const inactivePlayerEl = getInactivePlayer();
  currentScoreEl.textContent = 0;
  deactivatePlayer(activePlayerEl);
  activePlayer(inactivePlayerEl);
};

btnRoll.addEventListener('click', function (event) {
  const activePlayerEl = document.querySelector('.player--active');
  const currentScoreEl = activePlayerEl.querySelector('.current-score');
  const currentRoll = diceRoll(minDice, maxDice);

  showDice(currentRoll);

  if (currentRoll === badDice) {
    switchPlayers(activePlayerEl, currentScoreEl);
    return;
  }

  currentScoreEl.textContent = Number(currentScoreEl.textContent) + currentRoll;
});

// btnHold.addEventListener('click', function (event) {})
