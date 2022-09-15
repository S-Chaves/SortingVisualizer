function getHeight(bars, j) {
  return parseInt(bars[j].style.height);
}

function toggleSortBtn() {
  document.querySelector('.sort').disabled = false;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { getHeight, sleep, toggleSortBtn};