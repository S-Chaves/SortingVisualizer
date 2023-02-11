import { DELAY, RUNNING } from '../index.js';
import { sleep, getHeight, toggleSortBtn } from './utils.js';

async function bubbleSort() {
  const bars = document.querySelectorAll('.bar');
  const barsLen = bars.length - 1;

  loop1:
  for (let i = 0; i < barsLen; i++) {
    for (let j = 0; j < barsLen - i; j++) {
      if (!RUNNING) break loop1;
      changeColor(bars, j);
      // Get bars heights
      const H1 = getHeight(bars, j);
      const H2 = getHeight(bars, j + 1);
      // Compare and swap
      if (H1 > H2) {
        const temp = H1;
        bars[j].style.height = `${H2}px`;
        bars[j + 1].style.height = `${temp}px`;
      }

      await sleep(DELAY);
    }

    bars[barsLen - i].style.backgroundColor = 'lime';
  }

  if (RUNNING) bars[0].style.backgroundColor = 'lime';
  toggleSortBtn();
};

// Change color of bars being compared
function changeColor(bars, j) {
  bars[j].style.backgroundColor = 'red';
  bars[j + 1].style.backgroundColor = 'red';

  setTimeout(() => {
    bars[j].style.backgroundColor = 'skyblue';
    bars[j + 1].style.backgroundColor = 'skyblue';
  }, DELAY);
}

export default bubbleSort;