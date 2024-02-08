const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;
let isButtonPressed = false;

refs.startBtn.addEventListener('click', () => {
  onPressButton();
  timerId = setInterval(() => {
    generateColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  onUnPressBtn();
});

function onPressButton() {
  isButtonPressed = true;

  if (isButtonPressed) {
    refs.startBtn.setAttribute('disabled', 'disabled');
    refs.stopBtn.removeAttribute('disabled', 'disabled');
  }
}

function onUnPressBtn() {
  isButtonPressed = false;
  if (!isButtonPressed) {
    refs.startBtn.removeAttribute('disabled', 'disabled');
    refs.stopBtn.setAttribute('disabled', 'disabled');
  }
}

function generateColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
