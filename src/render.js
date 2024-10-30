import * as L from "./list.js";
import * as A from "./area.js";

const cellWidth = 35;

const areaWidthLength = 10;
const areaHeightLength = 20;

const mainLayoutContainerClass = "main_layout_container";
const subLayoutContainerClass = "sub_layout_container";
const gameAreaContainerClass = "game_area_container";
const nextBlocksContainerClass = "next_blocks_containers";

export function clear() {
  const layoutContainer = document.querySelector(
    "." + mainLayoutContainerClass,
  );
  if (layoutContainer) {
    layoutContainer.remove();
  }
}

// render :: Area -> void
export function render(
  area,
  activeBlockColor,
  nextBlockColors = [],
  nextBlockCoords = [],
) {
  clear();

  const areaList = L.listToArray(area);
  const body = document.querySelector("body");

  const mainLayout = mainLayoutContainer();
  const subLayout = subLayoutContainer();

  const areaContainer = gameArea();
  for (let y = 0; y < areaList.length; y++) {
    for (let x = 0; x < areaList[y].length; x++) {
      const axisValue = areaList[y][x];
      const newCell = cell(axisValue, activeBlockColor, x, y);
      areaContainer.append(newCell);
    }
  }

  // 레이아웃을 위한 값 삽입 & 제거
  const firstLine =
    nextBlockCoords.length === 0
      ? []
      : [[A.empty(), A.empty(), A.empty(), A.empty(), A.empty()]];

  const nextBlocksCoordsForRender = [
    firstLine,
    ...nextBlockCoords.map((coord) => {
      return coord
        .map((c) => [A.empty(), ...c])
        .filter((_, index) => {
          if (index === coord.length - 1) return false;
          return true;
        });
    }),
  ];

  const blockColors = ["", ...nextBlockColors];

  const blocksContainer = nextBlocksContainer();
  for (let y = 0; y < nextBlocksCoordsForRender.length; y++) {
    const currentBlockColor = blockColors[y];
    for (let x = 0; x < nextBlocksCoordsForRender[y].length; x++) {
      const blockCoords = nextBlocksCoordsForRender[y][x];
      blockCoords.forEach((point) => {
        const newCell = cell(point, currentBlockColor, x, y);
        blocksContainer.append(newCell);
      });
    }
  }

  mainLayout.append(areaContainer);

  subLayout.append(blocksContainer);
  subLayout.append(pointAreaContainer());

  mainLayout.append(subLayout);

  body.append(mainLayout);
}

function mainLayoutContainer() {
  const mainLayoutContainer = document.createElement("div");
  mainLayoutContainer.classList.add(mainLayoutContainerClass);
  mainLayoutContainer.style.display = "flex";
  mainLayoutContainer.style.justifyContent = "center";
  mainLayoutContainer.style.alignItems = "center";
  mainLayoutContainer.style.margin = "0px";
  mainLayoutContainer.style.height = "720px";
  mainLayoutContainer.style.boxSizing = "border-box";

  return mainLayoutContainer;
}

function subLayoutContainer() {
  const subLayoutContainer = document.createElement("div");

  subLayoutContainer.classList.add(subLayoutContainerClass);
  subLayoutContainer.style.display = "flex";
  subLayoutContainer.style.flexDirection = "column";
  subLayoutContainer.style.height = "100%";
  subLayoutContainer.style.border = "10px solid black";
  subLayoutContainer.style.boxSizing = "border-box";
  subLayoutContainer.style.gap = "10px";
  subLayoutContainer.style.backgroundColor = "black";

  subLayoutContainer.append(subLayoutLabel("NEXT"));
  return subLayoutContainer;
}

function subLayoutLabel(text) {
  const nextLabel = document.createElement("label");
  nextLabel.textContent = text;
  nextLabel.style.color = "#3bcf3d";
  nextLabel.style.outline = "1px solid #3bcf3d";
  nextLabel.style.fontSize = "2em";
  nextLabel.style.fontWeight = "bold";
  nextLabel.style.display = "flex";
  nextLabel.style.justifyContent = "center";
  nextLabel.style.height = "35px";

  return nextLabel;
}

function gameArea() {
  const gameAreaContainer = document.createElement("div");

  gameAreaContainer.classList.add(gameAreaContainerClass);
  gameAreaContainer.style.gap = 0;
  gameAreaContainer.style.display = "grid";
  gameAreaContainer.style.gridTemplateColumns = `repeat(${areaWidthLength}, 1fr)`;
  gameAreaContainer.style.gridTemplateRows = `repeat(${areaHeightLength}, 1fr)`;
  gameAreaContainer.style.border = "10px solid black";
  gameAreaContainer.style.backgroundColor = "#2e2e2e";

  return gameAreaContainer;
}

function nextBlocksContainer() {
  const newBlockArea = document.createElement("div");

  newBlockArea.classList.add(nextBlocksContainerClass);
  newBlockArea.style.display = "grid";
  newBlockArea.style.gridTemplateColumns = "repeat(5, 1fr)";
  newBlockArea.style.gridTemplateRows = "repeat(13, 1fr)";
  newBlockArea.style.gap = 0;
  newBlockArea.style.backgroundColor = "#2e2e2e";
  return newBlockArea;
}

function pointAreaContainer() {
  const pointArea = document.createElement("div");

  pointArea.style.height = `calc(100% - ${cellWidth * 13}px)`;

  pointArea.append(subLayoutLabel("POINT"));

  return pointArea;
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
    newCell.style.color =
      "linear-gradient(to bottom, #555555 0%, #1a1a1a 50%, #000000 100%)";
    newCell.style.background =
      "linear-gradient(to bottom, #555555 0%, #1a1a1a 50%, #000000 100%)";
    newCell.style.boxShadow = `inset 0 10px 20px rgba(255, 255, 255, 0.2),
            inset 0 -10px 20px rgba(0, 0, 0, 0.5),
            0 4px 8px rgba(0, 0, 0, 0.8)`;
  }

  if (A.is_active(value)) {
    newCell.style.color = currentColor;
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
