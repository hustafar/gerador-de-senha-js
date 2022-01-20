const activeClass = 'active';
const reloadButton = document.querySelector('.gerador-reload');
const sizePassword = document.querySelector('#size');
const formGerasenha = document.querySelector('.gerador-configs');

function showContainer() {
  const container = document.querySelector('.gerador-container');

  container.classList.add(activeClass);
}

function addRotateClass() {
  reloadButton.classList.add('rotateAnimation');

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

function handleSubmit(e) {
  e.preventDefault();
  console.log('submit');
}

window.addEventListener('load', showContainer);
reloadButton.addEventListener('click', addRotateClass);
sizePassword.addEventListener('keydown', blockNonNumbers);
sizePassword.addEventListener('change', checkInput);
formGerasenha.addEventListener('submit', handleSubmit);
