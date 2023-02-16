import algorithms from './algorithms/index.js';
import { sleep } from './algorithms/utils.js';

const consts = {
  DELAY: 5, // Algorithms sleep time
  RUNNING: false, // Is sorting running
};

let CANT = null; // Number of bars
const BARS_CONT_W = 800; // Bars Width 50rem

const algos = {
  "Bubble Sort": algorithms.bubbleSort,
  "Selection Sort": algorithms.selectionSort,
  "Insertion Sort": algorithms.insertionSort,
};

const barsContainer = document.querySelector('.bars');

// Sliders
const barsCant = document.querySelector('.barsCant');
const barsSlider = document.querySelector('.barsSlider');
barsSlider.addEventListener('input', (e) => {
  consts.RUNNING = false;
  plotBars();
});

const sortSpeed = document.querySelector('.sortSpeed');
const delaySlider = document.querySelector('.delaySlider');
delaySlider.addEventListener('input', (e) => {
  sortSpeed.textContent = e.target.value;
  consts.DELAY = e.target.value;
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
const shuffleBtn = document.querySelector('.shuffle');
shuffleBtn.addEventListener('click', shuffleBars);

const sortBtn = document.querySelector('.sort');
sortBtn.addEventListener('click', (e) => {
  const bars = document.querySelectorAll('.bar');

  if (e.target.textContent == 'Sort!') {
    e.target.textContent = 'Stop';

    shuffleBtn.disabled = true;
    consts.RUNNING = true;

    const sort = placeholder.textContent;
    algos[sort](bars);
  } else {
    e.target.textContent = 'Sort!';
    shuffleBtn.disabled = false;
    consts.RUNNING = false;
  }
});

plotBars();

// Functions
function toggleUlClass() {
  if (sortUl.classList.contains('hideUl')) sortUl.style.display = 'block';
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

export { consts };