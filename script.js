const activeClass = 'active';
const containerPassword = document.querySelector('.gerador-password');
const output = document.querySelector('.gerador-input');
const copyPassword = document.querySelector('.gerador-copy');
const reloadButton = document.querySelector('.gerador-reload');
const sizePassword = document.querySelector('#size');
const repeatPassword = document.querySelector('#repeat');
const symbolsPassword = document.querySelector('#symbols');
const formGeneratePassword = document.querySelector('.gerador-configs');

function showContainer() {
  const container = document.querySelector('.gerador-container');

  container.classList.add(activeClass);
}

function addRotateClass() {
  reloadButton.classList.add('rotateAnimation');
  handleSubmit();

  setTimeout(() => {
    reloadButton.classList.remove('rotateAnimation');
  }, 500);
}

function blockNonNumbers(e) {
  const key = e.key;
  const includes = ['Enter', 'Backspace', 'Delete', 'Arrow', 'Tab'];
  if (!/[0-9]/.test(key) && !includes.some((exception) => key.includes(exception))) e.preventDefault();
}

function checkInput(e) {
  const target = e.target;
  const value = target.value;
  const max = target.max;
  const min = target.min;

  if (Number(value) > Number(max)) target.value = max;
  if (Number(value) < Number(min)) target.value = min;
}

function generatePassword(newPassword, cbxUpperCase, cbxLowerCase, cbxNumber, cbxSymbol) {
  const arrOptions = [];
  if (cbxUpperCase) arrOptions.push('upperCase');
  if (cbxLowerCase) arrOptions.push('lowerCase');
  if (cbxNumber) arrOptions.push('number');
  if (cbxSymbol) arrOptions.push('symbol');

  const allUpperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  let allUpperCaseChanceWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const allLowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  let allLowerCaseChanceWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const allNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  let allNumbersChanceWeight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const allSymbols = symbolsPassword.value ? [...symbolsPassword.value] : ['!', '#', '$', '%', '&', '(', ')', '/', '*', '-', '+', '~', '^'];
  let allSymbolsChanceWeight = [];

  allSymbols.map((symbol) => {
    allSymbolsChanceWeight.push(0);
  });

  let tempPassword = '';
  let limitToRepeat = Number(repeatPassword.value);
  let lastOption = '';
  let newAlpha = '';
  let lastTimesToRepeat = 0;

  let upperChanceWeight = arrOptions.filter((valor) => valor === 'upperCase').length > 0 ? 0 : -1;
  let lowerChanceWeight = arrOptions.filter((valor) => valor === 'lowerCase').length > 0 ? 0 : -1;
  let numberChanceWeight = arrOptions.filter((valor) => valor === 'number').length > 0 ? 0 : -1;
  let symbolChanceWeight = arrOptions.filter((valor) => valor === 'symbol').length > 0 ? 0 : -1;

  while (tempPassword.length < Number(newPassword)) {
    let option;
    let chosenIndex;

    if (arrOptions.length >= 2) {
      do {
        let arrChanceWeight = [];
        if (upperChanceWeight >= 0) arrChanceWeight.push(Math.random() * (upperChanceWeight + 1));
        if (lowerChanceWeight >= 0) arrChanceWeight.push(Math.random() * (lowerChanceWeight + 1));
        if (numberChanceWeight >= 0) arrChanceWeight.push(Math.random() * (numberChanceWeight + 1));
        if (symbolChanceWeight >= 0) arrChanceWeight.push(Math.random() * (symbolChanceWeight + 1));

        chosenIndex = arrChanceWeight.indexOf(Math.min(...arrChanceWeight));
        option = arrOptions[chosenIndex];
      } while (lastOption === option);
    } else {
      option = arrOptions[0];
    }

    let timesToRepeat;

    if (limitToRepeat > 2) {
      do {
        timesToRepeat = Math.floor(Math.random() * limitToRepeat) + 1;
      } while (lastTimesToRepeat === timesToRepeat);
    } else {
      timesToRepeat = Math.floor(Math.random() * limitToRepeat) + 1;
    }

    switch (arrOptions[chosenIndex]) {
      case 'upperCase':
        upperChanceWeight += 3 * timesToRepeat;
        break;
      case 'lowerCase':
        lowerChanceWeight += 3 * timesToRepeat;
        break;
      case 'number':
        numberChanceWeight += 3 * timesToRepeat;
        break;
      case 'symbol':
        symbolChanceWeight += 3 * timesToRepeat;
        break;
    }

    lastTimesToRepeat = timesToRepeat;

    if (tempPassword.length + timesToRepeat > Number(newPassword)) timesToRepeat = Number(newPassword) - tempPassword.length;

    switch (option) {
      case 'upperCase':
        lastOption = 'upperCase';
        for (i = 0; i < timesToRepeat; i++) {
          let arrChanceWeight = [];

          allUpperCaseChanceWeight.map((chance) => {
            arrChanceWeight.push(Math.random() * (chance + 1));
          });

          const chosenChar = arrChanceWeight.indexOf(Math.min(...arrChanceWeight));
          newAlpha += allUpperCase[chosenChar];
          allUpperCaseChanceWeight[chosenChar] = allUpperCaseChanceWeight[chosenChar] * 3;
        }
        break;
      case 'lowerCase':
        lastOption = 'lowerCase';
        for (i = 0; i < timesToRepeat; i++) {
          let arrChanceWeight = [];

          allLowerCaseChanceWeight.map((chance) => {
            arrChanceWeight.push(Math.random() * (chance + 1));
          });

          const chosenChar = arrChanceWeight.indexOf(Math.min(...arrChanceWeight));
          newAlpha += allLowerCase[chosenChar];
          allLowerCaseChanceWeight[chosenChar] = allLowerCaseChanceWeight[chosenChar] * 3;
        }
        break;
      case 'number':
        lastOption = 'number';
        for (i = 0; i < timesToRepeat; i++) {
          let arrChanceWeight = [];

          allNumbersChanceWeight.map((chance) => {
            arrChanceWeight.push(Math.random() * (chance + 1));
          });

          const chosenChar = arrChanceWeight.indexOf(Math.min(...arrChanceWeight));
          newAlpha += allNumbers[chosenChar];
          allNumbersChanceWeight[chosenChar] = allNumbersChanceWeight[chosenChar] * 3;
        }
        break;
      case 'symbol':
        lastOption = 'symbol';
        if (allSymbols) {
          for (i = 0; i < timesToRepeat; i++) {
            let arrChanceWeight = [];

            allSymbolsChanceWeight.map((chance) => {
              arrChanceWeight.push(Math.random() * (chance + 1));
            });

            const chosenChar = arrChanceWeight.indexOf(Math.min(...arrChanceWeight));
            newAlpha += allSymbols[chosenChar];
            allSymbolsChanceWeight[chosenChar] = allSymbolsChanceWeight[chosenChar] * 3;
          }
        }
        break;
      default:
        break;
    }

    tempPassword += newAlpha;
    newAlpha = '';
  }

  return tempPassword;
}

function handleSubmit(e) {
  if (e) e.preventDefault();

  const cbxUpperCase = document.querySelector('#cbxUpperCase');
  const cbxLowerCase = document.querySelector('#cbxLowerCase');
  const cbxNumber = document.querySelector('#cbxNumber');
  const cbxSymbol = document.querySelector('#cbxSymbol');

  output.value = generatePassword(sizePassword.value, cbxUpperCase.checked, cbxLowerCase.checked, cbxNumber.checked, cbxSymbol.checked);
}

function copiaSenha() {
  if (output.value) {
    containerPassword.classList.add('copy');
    output.focus();
    navigator.clipboard.writeText(output.value);
    setTimeout(() => {
      output.blur();
      containerPassword.classList.remove('copy');
    }, 2000);
  }
}

window.addEventListener('load', showContainer);
reloadButton.addEventListener('click', addRotateClass);
sizePassword.addEventListener('keydown', blockNonNumbers);
sizePassword.addEventListener('change', checkInput);
repeatPassword.addEventListener('keydown', blockNonNumbers);
repeatPassword.addEventListener('change', checkInput);
formGeneratePassword.addEventListener('submit', handleSubmit);
output.addEventListener('click', copiaSenha);
copyPassword.addEventListener('click', copiaSenha);
