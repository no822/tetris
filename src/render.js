import * as L from "./list.js";

const cell = 50;

const areaWidthLength = 10;
const areaHeightLength = 20;

const areaWidth = cell * areaWidthLength;
const areaHeightght = cell * areaHeightLength;

// render :: Area -> void
export function render(area) {
  const areaList = L.listToArray(area);
  const areaContainer = gameAreaContainer();
  const body = document.querySelector("body");

  for (let y = 0; y < areaList.length; y++) {
    for (let x = 0; x < areaList[y].length; x++) {
      const axisValue = areaList[y][x];
      const cell = newCell(axisValue);
      areaContainer.append(cell);
    }
  }

  body.append(areaContainer);
}

function gameAreaContainer() {
  const gameAreaContainer = document.createElement("div");
  gameAreaContainer.style.width = "100%";
  gameAreaContainer.style.gap = 0;
  gameAreaContainer.style.display = "grid";
  gameAreaContainer.style.gridTemplateColumns = `repeat(${areaWidthLength}, 1fr)`;
  gameAreaContainer.style.gridTemplateRows = `repeat(${areaHeightLength}, 1fr)`;
  gameAreaContainer.style.width = areaWidth + "px";
  gameAreaContainer.style.height = areaHeightght + "px";
  return gameAreaContainer;
}

function newCell(value) {
  const newCell = document.createElement("div");
  newCell.style.width = cell + "px";
  newCell.style.height = cell + "px";
  newCell.style.border = "1px solid black";
  newCell.textContent = value;
  if (value !== 0) newCell.style.background = "red";
  return newCell;
}
