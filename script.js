'use strict';

const dice = document.querySelector('.dice');
const diceButton = document.querySelector('.btn--roll');
const resetButton = document.querySelector('.btn--new');
const holdButton = document.querySelector('.btn--hold');
const playerOneScore = document.querySelector('#score--0');
const playerTwoScore = document.querySelector('#score--1');
const playerOneCurrentScore = document.getElementById('current--0');
const playerTneCurrentScore = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
playerOneScore.textContent = 0;
playerTwoScore.textContent = 0;
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
dice.classList.add('hidden');

//Reset game functionality
resetButton.addEventListener('click', function () {
  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerTneCurrentScore.textContent = 0;
  scores = [0, 0];
  dice.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  activePlayer = 0;
  const playerOneName = prompt('Enter Player One Name');
  const playerTwoName = prompt('Enter Player Two Name');
  document.getElementById('name--0').textContent = playerOneName
    ? playerOneName
    : 'Player 1';
  document.getElementById('name--1').textContent = playerTwoName
    ? playerTwoScore
    : 'Player 2';
});

//Switching the player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  dice.classList.add('hidden');
};

//Rolling dice functionality

diceButton.addEventListener('click', function () {
  const diceValue = Math.trunc(Math.random() * 6) + 1;
  dice.classList.remove('hidden');
  const playerName = document.getElementById(
    `name--${activePlayer}`
  ).textContent;
  dice.src = `dice-${diceValue}.png`;
  if (diceValue !== 1) {
    currentScore += diceValue;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    if (currentScore >= 20) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      document.querySelector(
        `#name--${activePlayer}`
      ).textContent = `${playerName} WON !!`;
    }
  } else {
    console.log('Player Changed');
    switchPlayer();
  }
});

holdButton.addEventListener('click', function () {
  const score = document.getElementById(`current--${activePlayer}`).textContent;
  const playerName = document.getElementById(
    `name--${activePlayer}`
  ).textContent;
  scores[activePlayer] += Number(score);
  if (scores[activePlayer] >= 20) {
    //finish the game
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--active');
    document.querySelector(
      `#name--${activePlayer}`
    ).textContent = `${playerName} WON !!`;
  }
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  switchPlayer();
});
