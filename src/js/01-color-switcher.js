refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);
refs.stopBtn.disabled = true;

function onStartBtn() { 
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  changeBgColor();
  changeColorId = setInterval(changeBgColor, 1000);
}

function onStopBtn() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearInterval(changeColorId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBgColor() { 
  refs.body.style.backgroundColor = getRandomHexColor();
}