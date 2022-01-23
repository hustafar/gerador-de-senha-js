const activeClass = 'active';
const reloadButton = document.querySelector('.gerador-reload');
const sizePassword = document.querySelector('#size');
const formGeneratePassword = document.querySelector('.gerador-configs');

function showContainer() {
  const container = document.querySelector('.gerador-container');

  container.classList.add(activeClass);
}

function addRotateClass() {
  reloadButton.classList.add('rotateAnimation');

  setTimeout(() => {
    reloadButton.classList.remove('rotateAnimation');
    handleSubmit();
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

function generatePassword(newPassword, limitation, cbxUpperCase, cbxLowerCase, cbxNumber, cbxSymbol) {
  const arrOptions = [];
  // 'upperCase', 'lowerCase', 'number', 'symbol'
  if (cbxUpperCase) arrOptions.push('upperCase');
  if (cbxLowerCase) arrOptions.push('lowerCase');
  if (cbxNumber) arrOptions.push('number');
  if (cbxSymbol) arrOptions.push('symbol');

  const allUpperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  const allLowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const allNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const allSymbols = ['!', '#', '$', '%', '&', '(', ')', '/', '*', '-', '+', '~', '^'];

  let tempPassword = '';
  let limitToRepeat = 3;
  let timesRepeated = 0;
  let lastOption = '';
  let newAlpha = '';

  while (tempPassword.length < Number(newPassword)) {
    let option = arrOptions[Math.floor(Math.random() * arrOptions.length)];
    let timesToRepeat = Math.floor(Math.random() * limitToRepeat) + 1;

    if (arrOptions.length >= 2) {
      while (lastOption === option) {
        option = arrOptions[Math.floor(Math.random() * arrOptions.length)];
      }
    }

    if (tempPassword.length + timesToRepeat > Number(newPassword)) timesToRepeat = Number(newPassword) - tempPassword.length;

    switch (option) {
      case 'upperCase':
        lastOption = 'upperCase';
        for (i = 0; i < timesToRepeat; i++) newAlpha += allUpperCase[Math.floor(Math.random() * allLowerCase.length)];
        timesRepeated = 0;
        break;
      case 'lowerCase':
        lastOption = 'lowerCase';
        for (i = 0; i < timesToRepeat; i++) newAlpha += allLowerCase[Math.floor(Math.random() * allLowerCase.length)];
        timesRepeated = 0;
        break;
      case 'number':
        lastOption = 'number';
        for (i = 0; i < timesToRepeat; i++) newAlpha += allNumbers[Math.floor(Math.random() * allNumbers.length)];
        timesRepeated = 0;
        break;
      case 'symbol':
        lastOption = 'symbol';
        for (i = 0; i < timesToRepeat; i++) newAlpha += allSymbols[Math.floor(Math.random() * allSymbols.length)];
        timesRepeated = 0;
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
  const output = document.querySelector('.gerador-input');

  var limitations = document.getElementsByName('limitations');
  let limitation;

  for (i = 0; i < limitations.length; i++) {
    if (limitations[i].checked) {
      limitation = limitations[i];
      break;
    }
  }

  if (!limitation) limitation = limitations[limitations.length - 1];

  const cbxUpperCase = document.querySelector('#cbxUpperCase');
  const cbxLowerCase = document.querySelector('#cbxLowerCase');
  const cbxNumber = document.querySelector('#cbxNumber');
  const cbxSymbol = document.querySelector('#cbxSymbol');

  output.value = generatePassword(sizePassword.value, limitation.value, cbxUpperCase.checked, cbxLowerCase.checked, cbxNumber.checked, cbxSymbol.checked);
}

window.addEventListener('load', showContainer);
reloadButton.addEventListener('click', addRotateClass);
sizePassword.addEventListener('keydown', blockNonNumbers);
sizePassword.addEventListener('change', checkInput);
formGeneratePassword.addEventListener('submit', handleSubmit);
