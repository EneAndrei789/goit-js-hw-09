import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// Elemente DOM
const startButton = document.querySelector('[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const timerFields = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]')
};

// Funcția pentru a formata valorile cu 0 adăugat la început, dacă este necesar
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Funcția de conversie a milisecundelor în zile, ore, minute și secunde
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

// Configurarea flatpickr pentru selectarea datei
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      alert('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

// Cronometrul
let timerInterval;
startButton.addEventListener('click', () => {
  const targetDate = new Date(datetimePicker.value);

  // Dezactivăm butonul "Start" după ce a fost apăsat
  startButton.disabled = true;

  // Setăm un interval care actualizează cronometrul la fiecare secundă
  timerInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = targetDate - currentTime;
    
    if (timeDifference <= 0) {
      clearInterval(timerInterval);
      Object.values(timerFields).forEach(field => field.textContent = '00');
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    timerFields.days.textContent = addLeadingZero(days);
    timerFields.hours.textContent = addLeadingZero(hours);
    timerFields.minutes.textContent = addLeadingZero(minutes);
    timerFields.seconds.textContent = addLeadingZero(seconds);
  }, 1000);
});
