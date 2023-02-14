import algorithms from './algorithms/index.js';
import { sleep } from './algorithms/utils.js';

let DELAY = 5; // Algorithms sleep time
let CANT = null; // Number of bars
let RUNNING = false; // Is sorting running
const BARS_CONT_W = 800; // Bars Width 50rem

const algos = {
  "Bubble Sort": algorithms.bubbleSort,
  "Selection Sort": algorithms.selectionSort
};

const barsContainer = document.querySelector('.bars');

// Sliders
const barsCant = document.querySelector('.barsCant');
const barsSlider = document.querySelector('.barsSlider');
barsSlider.addEventListener('input', (e) => {
  RUNNING = false;
  plotBars();
});

const sortSpeed = document.querySelector('.sortSpeed');
const delaySlider = document.querySelector('.delaySlider');
delaySlider.addEventListener('input', (e) => {
  sortSpeed.textContent = e.target.value;
  DELAY = e.target.value;
});

// Algorithm List
const sortUl = document.querySelector('.sortUl');
const placeholder = document.querySelector('.placeholder');
placeholder.addEventListener('click', () => {
  toggleUlClass();
});

const sortLi = document.querySelectorAll('.sortUl li');
sortLi.forEach(li => li.addEventListener('click', e => {
  toggleUlClass();
  placeholder.textContent = e.target.textContent;
}));

// Buttons
const stopBtn = document.querySelector('.stop');
stopBtn.addEventListener('click', () => RUNNING = false);

const shuffleBtn = document.querySelector('.shuffle');
shuffleBtn.addEventListener('click', shuffleBars);

const sortBtn = document.querySelector('.sort');
sortBtn.addEventListener('click', (e) => {
  e.target.disabled = true;
  shuffleBtn.disabled = true;
  RUNNING = true;

  const sort = placeholder.textContent;
  algos[sort]();
});

plotBars();

// Functions
function toggleUlClass() {
  if (sortUl.classList.contains('hideUl')) sortUl.style.display = 'block'
  else setTimeout(() => sortUl.style.display = 'none', 250);
  sortUl.classList.toggle('showUl');
  sortUl.classList.toggle('hideUl');
}

function randomNum(num, offset) {
  return Math.floor(Math.random() * num) + offset;
}

async function plotBars() {
  CANT = barsSlider.value;
  barsCant.textContent = CANT;

  const barWidth = Math.round(BARS_CONT_W / CANT);
  let height = barWidth / 2;

  barsContainer.innerHTML = '';
  for (let i = 0; i < CANT; i++) {
    const bar = document.createElement('div');

    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    bar.style.width = `${barWidth}px`;
    bar.style.left = `${i * barWidth}px`;

    barsContainer.appendChild(bar);
    height += barWidth / 2;
  }
}

async function shuffleBars() {
  const bars = document.querySelectorAll('.bar');

  for (let i = 0; i < bars.length; i++) {
    const rand = randomNum(CANT, 0);
    const temp = bars[i].style.height;

    bars[i].style.backgroundColor = 'skyblue';
    bars[i].style.height = bars[rand].style.height;
    bars[rand].style.height = temp;

    await sleep(10);
  }
}

export { DELAY, RUNNING };