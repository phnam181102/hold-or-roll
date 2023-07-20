'use strict';

const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const winner0El = document.querySelector('.winner--0');
const winner1El = document.querySelector('.winner--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, currentPlayer, totalScore, playing;

const init = () => {
    currentScore = 0;
    currentPlayer = 0;
    totalScore = [0, 0];
    playing = true;

    diceEl.classList.add('hidden');
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0EL.textContent = 0;
    current1EL.textContent = 0;
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    winner0El.classList.add('hidden');
    winner1El.classList.add('hidden');
};
init();

const switchPlayer = () => {
    currentScore = 0;
    document.querySelector(`#current--${currentPlayer}`).textContent = 0;

    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', () => {
    if (playing) {
        const dice = Math.trunc(Math.random() * 6) + 1;

        diceEl.classList.remove('hidden');
        diceEl.src = `./assets/imgs/dice-${dice}.png`;

        if (dice !== 1) {
            currentScore += dice;
            document.querySelector(`#current--${currentPlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', () => {
    if (playing) {
        totalScore[currentPlayer] += currentScore;

        document.getElementById(`score--${currentPlayer}`).textContent = totalScore[currentPlayer];
        console.log(totalScore[currentPlayer]);
        if (totalScore[currentPlayer] >= 100) {
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.winner--${currentPlayer}`).classList.remove('hidden');
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
        } else {
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', init);
