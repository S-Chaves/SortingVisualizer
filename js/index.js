import algorithms from './algorithms/index.js';
import { sleep } from './algorithms/utils.js';

let DELAY = 5; // Algorithms sleep time
let CANT = null; // Number of bars
const BARS_CONT_W = 800; // 50rem

const barsContainer = document.querySelector('.bars');


const barsSlider = document.querySelector('.barsSlider');
barsSlider.addEventListener('change', plotBars);

const delaySlider = document.querySelector('.delaySlider');
delaySlider.addEventListener('change', (e) => DELAY = e.target.value);


const shuffleBtn = document.querySelector('.shuffle');
shuffleBtn.addEventListener('click', shuffleBars);

const sortBtn = document.querySelector('.sort');
sortBtn.addEventListener('click', (e) => {
  e.target.disabled = true;
  const sort = document.querySelector('.sorts').value;
  algorithms[sort]();
});


plotBars();


// Functions
function randomNum(num, offset) {
  return Math.floor(Math.random() * num) + offset;
}

async function plotBars() {
  CANT = barsSlider.value;
  const barWidth = Math.round(BARS_CONT_W / CANT);
  let height = randomNum(barWidth / 2, 2);

  barsContainer.innerHTML = '';
  for (let i = 0; i < CANT; i++) {
    const bar = document.createElement('div');

    bar.classList.add('bar');
    bar.style.height = `${height}px`;
    bar.style.width = `${barWidth}px`;
    bar.style.left = `${i * barWidth}px`;

    barsContainer.appendChild(bar);
    height += randomNum(barWidth / 2, 2);
  }

  await sleep(1000);
  await shuffleBars();
}

async function shuffleBars() {
  const bars = document.querySelectorAll('.bar');

  for (let i = 0; i < bars.length; i++) {
    const rand = randomNum(CANT, 0);
    const temp = bars[i].style.height;

    bars[i].style.backgroundColor = 'skyblue'
    bars[i].style.height = bars[rand].style.height;
    bars[rand].style.height = temp;
 
    await sleep(10);
  }
}

export { DELAY };