const gridDetails = {
  gridSize: "16",
  bw: "#333333",
  rainbow: "",
  eraser: "#ffffff",
  picked: "",
};

const grid = document.querySelector(".grid");

const bwBtn = document.querySelector(".button--bw");
const rainbowBtn = document.querySelector(".button--rainbow");
const eraserBtn = document.querySelector(".button--eraser");
const clearBtn = document.querySelector(".button--clear");
const colorPicker = document.querySelector(".color-picker");
const sizePicker = document.querySelector(".size-picker__control");
const sizePickerCounter = document.querySelector(".size-picker__counter");

function init() {
  bwBtn.addEventListener("click", paintBw);
  rainbowBtn.addEventListener("click", paintRainbow);
  eraserBtn.addEventListener("click", erase);
  clearBtn.addEventListener("click", clear);
  colorPicker.addEventListener("input", pickColor);
  sizePicker.addEventListener("input", pickSize);

  loadGrid();
  paintBw();
}

function loadGrid() {
  const size = gridDetails.gridSize ** 2;
  for (let i = 0; i < size; i++) {
    const element = document.createElement("div");
    element.classList.add("grid__element");
    grid.appendChild(element);
  }
}

function paintRainbow() {
  grid.querySelectorAll(".grid__element").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.classList.add("grid__element--painted");
      generateRandomColor();
      element.style.backgroundColor = gridDetails.rainbow;
    });
  });
}

function paintBw() {
  grid.querySelectorAll(".grid__element").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.classList.add("grid__element--painted");
      element.style.backgroundColor = gridDetails.bw;
    });
  });
}

function paintOwnColor() {
  grid.querySelectorAll(".grid__element").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.classList.add("grid__element--painted");
      element.style.backgroundColor = gridDetails.picked;
    });
  });
}

function erase() {
  grid.querySelectorAll(".grid__element").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      element.classList.remove("grid__element--painted");
      element.style.backgroundColor = gridDetails.eraser;
    });
  });
}

function clear() {
  grid.textContent = "";
  init();
}

function generateRandomColor() {
  const red = getRandomNumber();
  const green = getRandomNumber();
  const blue = getRandomNumber();

  gridDetails.rainbow = `rgb(${red}, ${green}, ${blue})`;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 256);
}

function pickColor() {
  gridDetails.picked = this.value;
  paintOwnColor();
}

function pickSize() {
  sizePickerCounter.textContent = this.value;
  gridDetails.gridSize = this.value;
  setGridSize(this.value);

  clear();
}

function setGridSize(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

init();
