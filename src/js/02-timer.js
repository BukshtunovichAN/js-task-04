import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  tDays: document.querySelector('[data-days]'),
  tHours: document.querySelector('[data-hours]'),
  tMinutes: document.querySelector('[data-minutes]'),
  tSeconds: document.querySelector('[data-seconds]'),
  input: document.getElementById('datetime-picker'),
};

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    selectedTime = selectedDates[0];

    if (selectedDates[0] < options.defaultDate) {
      //   window.alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
      const time = selectedDates[0].getTime();
      refs.startBtn.addEventListener('click', () => {
        onStartTime(time);
        refs.startBtn.disabled = true;
      });
    }
  },
};

flatpickr(refs.input, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  updateClockface({ days, hours, minutes, seconds });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function onStartTime(time) {
  let timerId = setInterval(() => {
    refs.startBtn.disabled = true;
    const endTime = time - Date.now();
    if (endTime <= 0) {
      clearInterval(timerId);
      return;
    }
    convertMs(endTime);
  }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
  refs.tDays.textContent = days;
  refs.tHours.textContent = hours;
  refs.tMinutes.textContent = minutes;
  refs.tSeconds.textContent = seconds;
}
