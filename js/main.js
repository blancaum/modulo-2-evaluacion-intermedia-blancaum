'use strict';

/***********VARIABLES***********/
//Elementos HTML - Form
const battleForm = document.querySelector('.js-battle-form');
const resultText = document.querySelector('.js-text-result');
const btn = document.querySelector('.js-btn');
const select = document.querySelector('.js-select');

//Razas
const evilRace1 = getRace('Sureños malos', 2);
const evilRace2 = getRace('Orcos', 2);
const evilRace3 = getRace('Goblins', 2);
const evilRace4 = getRace('Huargos', 3);
const evilRace5 = getRace('Trolls', 5);

const evilRaces = [evilRace1, evilRace2, evilRace3, evilRace4, evilRace5];

/*END VARIABLES*/

/***********FUNCTIONS***********/
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

function printResult() {
  const selectValue = select.innerHTML;
  resultText.innerHTML = selectValue;
}

function handleClick(e) {
  e.preventDefault();
  const compRaceNum = getEvilRace();
  const userRaceNum = select.value;

  console.log('EMPIEZA LA BATALLA');
  console.log(compRaceNum);
  console.log(userRaceNum);

  if (compRaceNum.strength > userRaceNum) {
    resultText.innerHTML =
      'Ha ganado el Ejército del Mal! Vuelve a Intentarlo.';
  } else if (compRaceNum.strength < userRaceNum) {
    resultText.innerHTML = 'Ha ganado el Ejército del Bien! Enhorabuena.';
  } else {
    resultText.innerHTML = 'Empate';
  }
}

/*END FUNCTIONS*/

/***********EVENTS***********/
btn.addEventListener('click', handleClick);

/*END EVENTS*/
