import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const timerDays = document.querySelector('[data-days]');
const timerHours = document.querySelector('[data-hours]');
const timerMinutes = document.querySelector('[data-minutes]');
const timerSeconds = document.querySelector('[data-seconds]');

let timerValue = 0;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0].getTime();
    const currentDate = Date.now();
    if (selectedDate <= currentDate) {
      window.alert('Please choose a date in the future');
      return
    }
    startBtn.disabled = false;
    timerValue = selectedDate;
  },
};

flatpickr("#datetime-picker", options);

startBtn.disabled = true;
startBtn.addEventListener('click', startTimer);

function startTimer() { 
  startBtn.disabled = true;
  timer();
  timerId = setInterval(timer, 1000);
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const updDays = String(days).padStart(2, 0);
  const updHours = String(hours).padStart(2, 0);
  const updMinutes = String(minutes).padStart(2, 0);
  const updSeconds = String(seconds).padStart(2, 0);
  return { updDays, updHours, updMinutes, updSeconds };
};

function timer() { 
  if (timerValue < Date.now()) {
    clearInterval(timerId);
    return
  }
  updTimer(addLeadingZero(convertMs(timerValue - Date.now())));
}

function updTimer({ updDays, updHours, updMinutes, updSeconds }) {
  timerDays.textContent = updDays;
  timerHours.textContent = updHours;
  timerMinutes.textContent = updMinutes;
  timerSeconds.textContent = updSeconds;
}