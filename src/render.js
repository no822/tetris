import * as L from "./list.js";
import * as A from "./area.js";

const cellWidth = 35;

const areaWidthLength = 10;
const areaHeightLength = 20;

const mainLayoutContainerClass = "main_layout_container";
const subLayoutContainerClass = "sub_layout_container";
const gameAreaContainerClass = "game_area_container";
const nextBlocksContainerClass = "next_blocks_containers";
const startPopupContainerClass = "start_popup_container";

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
  difficulty = 1,
  point = 0,
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
        const newCell = cell(point, currentBlockColor, x, y, "#2e2e2e");
        blocksContainer.append(newCell);
      });
    }
  }

  mainLayout.append(areaContainer);

  subLayout.append(blocksContainer);
  subLayout.append(pointAreaContainer(difficulty, point));

  mainLayout.append(subLayout);

  body.append(mainLayout);
}

export function gameStart(startHandler = () => console.log("game start")) {
  const mainContainer = document.querySelector("." + mainLayoutContainerClass);

  function gameStartPopup(listener) {
    const popupContainer = document.createElement("div");
    popupContainer.classList.add(startPopupContainerClass);

    popupContainer.style.zIndex = 10;
    popupContainer.style.display = "flex";
    popupContainer.style.flexDirection = "column";
    popupContainer.style.gap = "10px";

    popupContainer.style.position = "absolute";
    popupContainer.style.top = "50%";
    popupContainer.style.left = "50%";
    popupContainer.style.transform = "translate(-50%, -50%)";

    popupContainer.style.width = "180px";
    popupContainer.style.height = "80px";

    popupContainer.style.color = "white";
    popupContainer.style.backgroundColor = "#2e2e2e";

    popupContainer.style.border = "5px double #3bcf3d";
    popupContainer.style.borderRadius = "8px";
    popupContainer.style.boxShadow =
      "0px 8px 30px rgba(0, 0, 0, 0.3), 0px 10px 40px rgba(0, 0, 0, 0.25)";

    popupContainer.style.display = "flex";
    popupContainer.style.justifyContent = "center";
    popupContainer.style.alignItems = "center";

    popupContainer.style.fontSize = "2em";

    popupContainer.style.color = "#3bcf3d";

    const startButton = document.createElement("button");
    startButton.style.color = "#3bcf3d";
    startButton.style.cursor = "pointer";
    startButton.style.backgroundColor = "#2e2e2e";

    startButton.style.fontSize = "36px";
    startButton.textContent = "PLAY";
    startButton.addEventListener("click", listener);

    popupContainer.append(startButton);
    return popupContainer;
  }

  mainContainer.append(popupOverlay());
  mainContainer.append(gameStartPopup(startHandler));
}

export function deleteStartPopup() {
  const startPopupContainer = document.querySelector(
    "." + startPopupContainerClass,
  );

  if (startPopupContainerClass) {
    startPopupContainer.remove();
  }
}

export function gameOver(restartHandler = () => console.log("not implement")) {
  const mainContainer = document.querySelector("." + mainLayoutContainerClass);

  function gameOverNoticePopup(listener) {
    const popupContainer = document.createElement("div");
    popupContainer.style.display = "flex";
    popupContainer.style.flexDirection = "column";
    popupContainer.style.gap = "10px";

    popupContainer.style.position = "absolute";
    popupContainer.style.top = "50%";
    popupContainer.style.left = "50%";
    popupContainer.style.transform = "translate(-50%, -50%)";

    popupContainer.style.width = "200px";
    popupContainer.style.height = "100px";

    popupContainer.style.color = "white";
    popupContainer.style.backgroundColor = "#2e2e2e";

    popupContainer.style.border = "5px double #3bcf3d";
    popupContainer.style.borderRadius = "8px";
    popupContainer.style.boxShadow =
      "0px 4px 15px rgba(0, 0, 0, 0.2), 0px 6px 20px rgba(0, 0, 0, 0.19)";

    popupContainer.style.display = "flex";
    popupContainer.style.justifyContent = "center";
    popupContainer.style.alignItems = "center";

    popupContainer.style.fontSize = "2em";

    popupContainer.style.color = "#3bcf3d";
    popupContainer.textContent = "GAME OVER";

    const restartButton = document.createElement("button");
    restartButton.style.backgroundColor = "#2e2e2e";
    restartButton.style.color = "#3bcf3d";
    restartButton.style.cursor = "pointer";
    restartButton.style.fontSize = "16px";
    restartButton.textContent = "> Restart";
    restartButton.addEventListener("click", listener);

    popupContainer.append(restartButton);
    return popupContainer;
  }
  mainContainer.append(popupOverlay());
  mainContainer.append(gameOverNoticePopup(restartHandler));
}

function mainLayoutContainer() {
  const mainLayoutContainer = document.createElement("div");
  mainLayoutContainer.classList.add(mainLayoutContainerClass);
  mainLayoutContainer.style.position = "relative";
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
  subLayoutContainer.style.gap = "15px";
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
  newBlockArea.style.border = "1px solid #3bcf3d";
  newBlockArea.style.padding = "0 10px 0 0px";

  return newBlockArea;
}

function pointAreaContainer(currentDifficulty, currentPoint) {
  const pointAreaContainer = document.createElement("div");

  pointAreaContainer.style.height = `calc(100% - ${cellWidth * 13}px)`;
  pointAreaContainer.style.color = "#3bcf3d";

  function difficultyArea() {
    const difficultyArea = document.createElement("div");
    difficultyArea.style.padding = "20px 0 10px";
    difficultyArea.style.fontWeight = "bold";
    difficultyArea.style.fontSize = "20px";
    difficultyArea.innerText = `DIFFICULTY: ${currentDifficulty}`;

    return difficultyArea;
  }

  function pointArea() {
    const pointArea = document.createElement("div");
    pointArea.style.padding = "0px 0 20px";
    pointArea.style.fontWeight = "bold";
    pointArea.style.fontSize = "20px";

    pointArea.innerText = `POINT: ${currentPoint}`;

    return pointArea;
  }

  pointAreaContainer.append(subLayoutLabel("POINT"));
  pointAreaContainer.append(difficultyArea());
  pointAreaContainer.append(pointArea());

  return pointAreaContainer;
}

function popupOverlay() {
  const overlay = document.createElement("div");

  overlay.style.position = "absolute";
  overlay.style.width = "580px";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "gray";
  overlay.style.opacity = "60%";

  return overlay;
}

function cell(value, currentColor, x, y, lineColor = "#3bcf3d") {
  const newCell = document.createElement("div");
  newCell.style.boxSizing = "border-box";
  newCell.style.width = cellWidth + "px";
  newCell.style.height = cellWidth + "px";
  newCell.style.border = `0.5px solid ${lineColor}`;
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
