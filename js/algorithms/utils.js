import { RUNNING } from "../index.js";

function getHeight(bars, j) {
  return parseInt(bars[j].style.height);
}

function toggleSortBtn() {
  document.querySelector('.sort').disabled = false;
  document.querySelector('.shuffle').disabled = false;
  RUNNING = false;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { getHeight, sleep, toggleSortBtn };