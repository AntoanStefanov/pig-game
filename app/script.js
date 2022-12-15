'use strict';

const minDice = 1;
const maxDice = 6;
const badDice = 1;

const btnRoll = document.querySelector('.btn--roll');
const dice = document.querySelector('.dice');

let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;

// const activePlayer = document.querySelector('.player--active');

// Returns a random integer between min (inclusive) and max (inclusive).
const diceRoll = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const showDice = function (roll) {
  dice.setAttribute('src', `PNGs/dice-${roll}.png`);
};

btnRoll.addEventListener('click', function (event) {
  const activePlayerEl = document.querySelector('.player--active');
  const currentScoreEl = activePlayerEl.querySelector('.current-score');
  const currentRoll = diceRoll(minDice, maxDice);
  console.log(activePlayerEl);
  console.log(currentScoreEl);
  console.log(currentRoll);

  showDice(currentRoll);

  const inactivePlayerEl = document.querySelectorAll('.player');
  console.log(inactivePlayerEl);
  if (currentRoll === badDice) {
  }

  const currentScore = Number(currentScoreEl.textContent) + currentRoll;
  currentScoreEl.textContent = currentScore;
});
