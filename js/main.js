'use strict';

/***********VARIABLES***********/
//Elementos HTML
const battleForm = document.querySelector('.js-battle-form');
const resultText = document.querySelector('.js-text-result');
const battleBtn = document.querySelector('.js-battle-btn');
const select = document.querySelector('.js-select');
const resetBtn = document.querySelector('.js-reset-btn');
const winnerText = document.querySelector('.js-winner');
const userText = document.querySelector('.js-user-count');
const compText = document.querySelector('.js-comp-count');

//Razas
const evilRace1 = getRace('Sureños malos', 2);
const evilRace2 = getRace('Orcos', 2);
const evilRace3 = getRace('Goblins', 2);
const evilRace4 = getRace('Huargos', 3);
const evilRace5 = getRace('Trolls', 5);

const evilRaces = [evilRace1, evilRace2, evilRace3, evilRace4, evilRace5];

//Contadores de puntuación
let userCount = 0;
let compCount = 0;

//Movimientos
let mov = 0;

//Máximo de movimientos
const maxMov = 10;

//Juego terminado?
let isGameEnded = false;

/*END VARIABLES*/

/***********FUNCTIONS***********/
function setInnerHtml(element, newInnerHtml) {
  element.innerHTML = newInnerHtml;
}

function getRace(name, strength) {
  return {
    name: name,
    strength: strength,
  };
}

function getRandomNumber(max) {
  return Math.ceil(Math.random() * max);
}

//generar raza malvada aleatoria
function getEvilRace() {
  const evilRaceNum = getRandomNumber(evilRaces.length);
  return evilRaces[evilRaceNum - 1];
}

function calculateBattle(raceEvil, raceGood) {
  if (raceEvil > raceGood) {
    setInnerHtml(
      resultText,
      'Ha ganado el Ejército del Mal! Vuelve a Intentarlo.'
    );
    compCount++;
    setInnerHtml(compText, `Puntuación del ordenador: ${compCount}`);
    setInnerHtml(userText, `Puntuación de la usuaria: ${userCount}`);
  } else if (raceEvil < raceGood) {
    setInnerHtml(resultText, 'Ha ganado el Ejército del Bien! Enhorabuena.');
    userCount++;
    setInnerHtml(compText, `Puntuación del ordenador: ${compCount}`);
    setInnerHtml(userText, `Puntuación de la usuaria: ${userCount}`);
  } else {
    setInnerHtml(resultText, 'Empate');
    setInnerHtml(compText, `Puntuación del ordenador: ${compCount}`);
    setInnerHtml(userText, `Puntuación de la usuaria: ${userCount}`);
  }
}

function gameEnd() {
  if (mov === maxMov) {
    isGameEnded = true;
    battleBtn.classList.add('collapsed');
    resetBtn.classList.remove('collapsed');
    if (compCount > userCount) {
      setInnerHtml(winnerText, `Ha ganado el ordenador :(`);
    } else if (compCount < userCount) {
      setInnerHtml(winnerText, `Has ganado!!! :)`);
    } else if (compCount === userCount) {
      setInnerHtml(winnerText, `Empate!`);
    }
    setInnerHtml(resultText, '');
  }
}

function handleBattleClick(e) {
  e.preventDefault();
  const compRace = getEvilRace();
  const compRaceNum = parseInt(compRace.strength);
  const userRaceNum = parseInt(select.value);

  console.log('EMPIEZA LA BATALLA');
  console.log(compRaceNum);
  console.log(userRaceNum);
  if (userRaceNum > 0 && !isGameEnded) {
    calculateBattle(compRaceNum, userRaceNum);
    mov++;
  }
  gameEnd();
  console.log(`mov=${mov}`);
}

function handleResetClick(e) {
  e.preventDefault();
  compCount = 0;
  userCount = 0;
  mov = 0;
  isGameEnded = false;
  setInnerHtml(winnerText, '');
  setInnerHtml(compText, '');
  setInnerHtml(userText, '');
  battleBtn.classList.remove('collapsed');
  resetBtn.classList.add('collapsed');
}

/*END FUNCTIONS*/

/***********EVENTS***********/
battleBtn.addEventListener('click', handleBattleClick);

resetBtn.addEventListener('click', handleResetClick);

/*END EVENTS*/
