import * as L from "./list.js";
import * as A from "./area.js";

const cellWidth = 35;

const areaWidthLength = 10;
const areaHeightLength = 20;

const containerClass = "container";

export function clear() {
  const gameAreaContainer = document.querySelector("." + containerClass);
  if (gameAreaContainer) {
    gameAreaContainer.remove();
  }
}

// render :: Area -> void
export function render(area, activeBlockColor) {
  const areaList = L.listToArray(area);
  const body = document.querySelector("body");
  body.style.display = "flex";
  body.style.justifyContent = "center";
  body.style.alignItems = "center";
  body.style.margin = "0px";
  body.style.height = "100vh";

  const areaContainer = gameAreaContainer();
  for (let y = 0; y < areaList.length; y++) {
    for (let x = 0; x < areaList[y].length; x++) {
      const axisValue = areaList[y][x];
      const newCell = cell(axisValue, activeBlockColor, x, y);
      areaContainer.append(newCell);
    }
  }

  body.append(areaContainer);
}

function gameAreaContainer() {
  const gameAreaContainer = document.createElement("div");
  gameAreaContainer.classList.add(containerClass);
  gameAreaContainer.style.gap = 0;
  gameAreaContainer.style.display = "grid";
  gameAreaContainer.style.gridTemplateColumns = `repeat(${areaWidthLength}, 1fr)`;
  gameAreaContainer.style.gridTemplateRows = `repeat(${areaHeightLength}, 1fr)`;
  gameAreaContainer.style.border = "5px solid black";
  gameAreaContainer.style.backgroundColor = "#2e2e2e";
  return gameAreaContainer;
}

function cell(value, currentColor, x, y) {
  const newCell = document.createElement("div");
  newCell.style.boxSizing = "border-box";
  newCell.style.width = cellWidth + "px";
  newCell.style.height = cellWidth + "px";
  newCell.style.border = "0.5px solid #3bcf3d";
  // newCell.textContent = `(${x}, ${y})`; // for debug
  // newCell.textContent = value; // for debug

  if (A.is_active(value) || A.is_inactive(value)) {
    newCell.style.border = "4px outset gray";
  }

  if (A.is_ghost(value)) {
    newCell.style.border = "4px outset gray";
    newCell.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
  }

  if (A.is_active(value)) {
    newCell.style.background = currentColor;
    newCell.style.borderColor = currentColor;
  }

  if (A.is_inactive(value)) {
    const inActiveColor = A.inactiveColor(value);
    newCell.style.background = inActiveColor;
    newCell.style.borderColor = inActiveColor;
  }

  return newCell;
}
