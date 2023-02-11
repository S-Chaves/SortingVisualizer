import { DELAY, RUNNING } from '../index.js';
import { getHeight, sleep, toggleSortBtn } from './utils.js';

async function selectionSort() {
  const bars = document.querySelectorAll('.bar');
  const barsLen = bars.length;

  loop1:
  for (let i = 0; i < barsLen - 1; i++) {
    let p = i;
    for (let j = i; j < barsLen; j++) {
      if (!RUNNING) break loop1;
      changeColor(bars, p, j);
      // Compare bars height
      if (getHeight(bars, p) > getHeight(bars, j)) {
        p = j;
      }

      await sleep(DELAY);
    }
    const firstH = getHeight(bars, i);
    const minH = getHeight(bars, p);
    // Swap bars
    bars[p].style.height = `${firstH}px`;
    bars[i].style.height = `${minH}px`;
    bars[i].style.backgroundColor = 'lime';
  }

  if (RUNNING) bars[barsLen - 1].style.backgroundColor = 'lime';
  toggleSortBtn();
}

// Change color of bars being compared
function changeColor(bars, p, j) {
  bars[p].style.backgroundColor = 'red';
  bars[j].style.backgroundColor = 'red';

  setTimeout(() => {
    bars[p].style.backgroundColor = 'skyblue';
    bars[j].style.backgroundColor = 'skyblue';
  }, DELAY);
}

export default selectionSort;