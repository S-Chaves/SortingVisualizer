import { consts } from '../index.js';
import { sleep, getHeight, toggleSortBtn, endColor } from './utils.js';

async function insertionSort(bars) {
  const barsLen = bars.length;

  loop1:
  for (let i = 1; i < barsLen; i++) {
    let j = i - 1;
    // Get heights
    const H1 = getHeight(bars, i);
    let H2 = getHeight(bars, j);

    // Compare with each bar
    while (j >= 0 && H2 > H1) {
      if (!consts.RUNNING) break loop1;
      changeColor(bars, j);
      bars[j + 1].style.height = `${H2}px`;
      bars[j].style.height = `${H1}px`;
      j -= 1;
      if (j >= 0) H2 = getHeight(bars, j);

      await sleep(consts.DELAY);
    }
  }

  if (consts.RUNNING) {
    await endColor(bars);
    toggleSortBtn();
  }
}

function changeColor(bars, j) {
  bars[j].style.backgroundColor = 'red';
  bars[j + 1].style.backgroundColor = 'red';

  setTimeout(() => {
    bars[j].style.backgroundColor = 'skyblue';
    bars[j + 1].style.backgroundColor = 'skyblue';
  }, consts.DELAY);
}

export default insertionSort;