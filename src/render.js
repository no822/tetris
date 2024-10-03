import * as L from "./list.js";
import * as A from "./area.js";

const cellWidth = 50;

const areaWidthLength = 10;
const areaHeightLength = 20;

const areaWidth = cellWidth * areaWidthLength;
const areaHeightght = cellWidth * areaHeightLength;

const containerClass = "container";

export function clear() {
  const gameAreaContainer = document.querySelector("." + containerClass);
  if (gameAreaContainer) {
    gameAreaContainer.remove();
  }
}

// render :: Area -> void
export function render(area, blockColor) {
  const areaList = L.listToArray(area);
  const body = document.querySelector("body");
  body.style.display = "flex";
  body.style.justifyContent = "center";
  body.style.alignItems = "center";

  const areaContainer = gameAreaContainer();
  for (let y = 0; y < areaList.length; y++) {
    for (let x = 0; x < areaList[y].length; x++) {
      const axisValue = areaList[y][x];
      const newCell = cell(axisValue, blockColor);
      areaContainer.append(newCell);
    }
  }

  body.append(areaContainer);
}

function gameAreaContainer() {
  const gameAreaContainer = document.createElement("div");
  gameAreaContainer.classList.add(containerClass);
  gameAreaContainer.style.width = "100%";
  gameAreaContainer.style.gap = 0;
  gameAreaContainer.style.display = "grid";
  gameAreaContainer.style.gridTemplateColumns = `repeat(${areaWidthLength}, 1fr)`;
  gameAreaContainer.style.gridTemplateRows = `repeat(${areaHeightLength}, 1fr)`;
  gameAreaContainer.style.width = areaWidth + "px";
  gameAreaContainer.style.height = areaHeightght + "px";
  return gameAreaContainer;
}

function cell(value, color) {
  const newCell = document.createElement("div");
  newCell.style.width = cellWidth + "px";
  newCell.style.height = cellWidth + "px";
  newCell.style.border = "1px solid black";
  newCell.textContent = value;
  if (!A.is_empty(value)) {
    newCell.style.background = color;
    newCell.style.outline = "2.3px solid black";
  }
  return newCell;
}
