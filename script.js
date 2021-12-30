'use strict';
//---------------------------Elements selected--------------------------------------
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const activeClass0EL = document.querySelector('.player--0');
const activeClass1EL = document.querySelector('.player--1');

//---------------------------Variables----------------------------------------------
let scoreArray, currentScore, activePlayer, flag;

//---------------------------Functions----------------------------------------------
const init = function () {
  scoreArray = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  flag = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  diceEL.classList.add('hidden');
  activeClass0EL.classList.remove('player--winner');
  activeClass0EL.classList.add('player--active');
  activeClass1EL.classList.remove('player--winner');
  activeClass1EL.classList.remove('player--active');
};
const switchPlayers = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
};

// -----------------------Main Game Logic-----------------------------------------------------------
init();
//Buttons
//--------Roll Dice Button.--------------
btnRoll.addEventListener('click', function () {
  if (flag) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;
    if (dice != 1) {
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayers();
    }
  }
});
//-------Hold Button.-------------------
btnHold.addEventListener('click', function () {
  if (flag) {
    scoreArray[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scoreArray[activePlayer];
    if (scoreArray[activePlayer] >= 100) {
      currentScore = 0;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      diceEL.classList.add('hidden');
      flag = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
    } else {
      switchPlayers();
    }
  }
});

//-------New Game Button.---------------
btnNew.addEventListener('click', init);
