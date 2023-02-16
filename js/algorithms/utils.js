import { consts } from "../index.js";
// Parses bar height to int
function getHeight(bars, j) {
  return parseInt(bars[j].style.height);
}

function toggleSortBtn() {
  document.querySelector('.sort').textContent = 'Sort!';
  document.querySelector('.shuffle').disabled = false;
  consts.RUNNING = false;
}
// Changes the bars color to lime when sorted
async function endColor(bars) {
  const barsLen = bars.length;

  for (let i = 0; i < barsLen; i++) {
    bars[i].style.backgroundColor = 'lime';
    await sleep(5);
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { getHeight, sleep, toggleSortBtn, endColor};