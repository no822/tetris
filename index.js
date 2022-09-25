// 추가해야할 기능
// 1. 게임오버 리스너(v)
// 2. 블록 회전
// 3. 한줄 채움 + 점수 갱신
// 4. ??


class GameAreaSetter {
    constructor() {
        this.pointManager = new PointManager();
    }

    static convertIdxToCoordinate(idx) {
        return {
            x: (idx % 10 === 0) ? 10 : idx % 10,
            y: (idx % 10 === 0) ? Math.floor(idx / 10) : Math.floor(idx / 10) + 1
        }
    }

    static convertCoordToIdx({x, y}) {
        return ((y * 10) - 10) + x;
    }

    static calculateMinMaxXY(coordination) {
        return {
            minX: coordination.reduce((previous, current) => previous.x > current.x ? current : previous).x,
            maxX: coordination.reduce((previous, current) => previous.x < current.x ? current : previous).x,
            minY: coordination.reduce((previous, current) => previous.y > current.y ? current : previous).y + 1,
            maxY: coordination.reduce((previous, current) => previous.y < current.y ? current : previous).y + 1
        }
    }

    #makeElement(elementType, style) {
        const element = document.createElement(elementType);
        for (const prop in style) {
            const styleValue = style[prop];
            element.style[prop] = styleValue;
        }
        return element;
    }

    setGameOver() {
        const body = document.querySelector('body');
        const main = document.querySelector('main');
        main.style.opacity = '0.3';

        const gameOverMessageContainer = this.#makeElement('div', {
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120px',
            height: '55px',
            zIndex: 200,
            border: '2px solid gray',
            color: 'red',
            fontSize: 40,
            fontWeight: '800',
            backgroundColor: 'white',
            userSelect: 'none'
        });
        gameOverMessageContainer.textContent = 'GAME OVER';
        body.append(gameOverMessageContainer);
    }

    setPoint(blocks) {
        // 목표: 점수계산 후 ui 반영
        this.pointManager.checkShouldRemoveBlockLines(blocks);
        const pointArea = document.querySelector('.pointArea');
        pointArea.textContent = `${this.pointManager.point}점`;
    }

    setArea() {
        const body = document.querySelector('body');
        body.innerHTML = '';

        const layoutContainer = this.#makeElement('main', {
            display: 'flex',
            position: 'fixed',
            border: '1px solid #6F6E6D',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 100,
        });

        const gameArea = this.#makeElement('content', {
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 20px)',
            gridTemplateRows:'repeat(20, 20px)',
        });
        gameArea.classList.add('gameArea');

        for (let i=0; i<200; i++) {
            const grid = this.#makeElement('div', {
                backgroundColor: 'black',
                border: '1px solid #6F6E6D',
                color: 'white'
            })
            grid.classList.add(i+1);
            // grid.textContent = i+1
            gameArea.append(grid);
        };

        const infoArea = this.#makeElement('nav', {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
        });

        const pointArea = this.#makeElement('div', {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '3px solid #BFBEBE',
            width: '100px',
            height: '100px'
        });
        pointArea.classList.add('pointArea');
        pointArea.textContent = `${this.pointManager.point}점`;

        const nextBlocksArea = this.#makeElement('div', {
            width: '100px',
            border: '3px solid #BFBEBE',
            borderTop: 'none',
            height: '291px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        });
        nextBlocksArea.textContent = '다음 블록';

        infoArea.append(pointArea);
        infoArea.append(nextBlocksArea);
        layoutContainer.append(gameArea);
        layoutContainer.append(infoArea);
        body.append(layoutContainer);
    }
}

class PointManager {
    #point = 0;

    #getRemoveIndexes(yIndex) {
        const removeIndexesPerLine = [];
        const startIndexes = [
            1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 101,
            111, 121, 131, 141, 151, 161, 171, 181, 191
        ];
        for (let i=1; i<11; i++) {
            if (i === 1) {
                removeIndexesPerLine.push(startIndexes[yIndex-1]);
            }else {
                removeIndexesPerLine.push(removeIndexesPerLine[removeIndexesPerLine.length-1] + 1)
            }
        }
        return removeIndexesPerLine;
    }

    checkShouldRemoveBlockLines(blocks) {
        const grids =  blocks.map(block => {
            return block.coordination.map(coord => GameAreaSetter.convertCoordToIdx(coord))
        }).flat();

        const numberOfGridPerYAxis = grids
                .map(index => GameAreaSetter.convertIdxToCoordinate(index).y)
                .reduce((acc, yIndex) => {
                    return acc.set(yIndex, acc.get(yIndex) + 1)
                }, new Map([
                    [1, 0], [2, 0], [3, 0], [4, 0], [5, 0],
                    [6, 0], [7, 0], [8, 0],[9, 0], [10, 0],
                    [11, 0], [12, 0], [13, 0], [14, 0], [15, 0],
                    [16, 0], [17, 0], [18, 0], [19, 0], [20, 0],
                ]))

        const removeIndexes = [];
        numberOfGridPerYAxis.forEach((value, key) => {
            if (numberOfGridPerYAxis.get(key) >= 10) {
                removeIndexes.push(this.#getRemoveIndexes(key));
            }
        })
        blocks.forEach(block => block.removeTargetCoordination(removeIndexes.flat()))

        this.point = removeIndexes.length * 10; // 점수
    }

    get point() {
        return this.#point;
    }

    set point(point) {
        if (typeof parseInt(point) !== 'number') {
            throw new Error('invalid point type');
        }
        this.#point += point;
    }
}

class BlockMaker {
    blocks = [];
    landingCoords = [];
    blockSpeedInterval;
    blockSpeed = 500;

    constructor(setGameOver, setPoint) {
        this.setGameOver = setGameOver;
        this.setPoint = setPoint;
        this.blockSpeedInterval = setInterval(() => {
            if (this.blockSpeed < 90) {
                clearInterval(this.blockSpeedInterval);
            }
            this.blockSpeed -= 20;
        }, 60000)
    }

    #makeBlock(type) {
        //블록 위치 초기값
        //블록 타입: I, O, T, Z, L(각 블럭의 모양)
        switch (type) {
            case 'O':
                this.blocks.push(new OBlock(
                    this.initializationArea.bind(this),
                    this.landingEventListener.bind(this),
                    this.isOverlayBlock.bind(this),
                    this.blockSpeed
                ));
                break;
            case 'I':
                this.blocks.push(new IBlock(
                    this.initializationArea.bind(this),
                    this.landingEventListener.bind(this),
                    this.isOverlayBlock.bind(this),
                    this.blockSpeed
                ));
                break;
            case 'T':
                this.blocks.push(new TBlock(
                    this.initializationArea.bind(this),
                    this.landingEventListener.bind(this),
                    this.isOverlayBlock.bind(this),
                    this.blockSpeed
                ));
                break;
            case 'Z':
                this.blocks.push(new ZBlock(
                    this.initializationArea.bind(this),
                    this.landingEventListener.bind(this),
                    this.isOverlayBlock.bind(this),
                    this.blockSpeed
                ));
                break;
            case 'L':
                this.blocks.push(new LBlock(
                    this.initializationArea.bind(this),
                    this.landingEventListener.bind(this),
                    this.isOverlayBlock.bind(this),
                    this.blockSpeed
                ));
                break;
    
            default:
                throw new Error('invalid block type!');
        }
    }

    #decideShouldGameOver(addedBlockCoord) {
        const addedBlockIdxes = addedBlockCoord.map(coord => GameAreaSetter.convertCoordToIdx(coord));
        const isGameOver = addedBlockIdxes.filter(idx => this.landingCoords.includes(idx)).length > 0;
        if (isGameOver) {
            this.setGameOver();
        }
        return isGameOver;
    }

    makeRandomBlock() {
        const lastBlock = this.blocks[this.blocks.length-1];
        const blockTypes = ['O', 'I', 'T', 'Z', 'L'];
        const filtered = blockTypes.filter(block => block !== lastBlock?.blockType)
        const min = 0;
        const max = 3;
        const randomIndex = Math.floor(Math.random() * (max - min + 1) + min);
        // this.#makeBlock(filtered[randomIndex]);
        this.#makeBlock(blockTypes[0]);
    }0

    landingEventListener(addedBlockCoord) {
        if(this.#decideShouldGameOver(addedBlockCoord)) return;
        this.setPoint(this.blocks);
        this.makeRandomBlock();
        // todo 배열에 undefined 가 요소로 들어가는 원인 수정
        this.landingCoords = this.blocks.map(block => {
            if (block.isLanding === true) {
                return block.coordination.map(coord => GameAreaSetter.convertCoordToIdx(coord))
            }
        })
        .flat()
        .filter(el => el !== undefined);
    }

    isOverlayBlock(direction, coordination) {
        let isOverlay = false;
        coordination.forEach(coord => {
            const {x, y} = coord;

            switch(direction) {
                case 'down':
                    const nextDownIdx = GameAreaSetter.convertCoordToIdx({x, y: y+1});
                    if (this.landingCoords.includes(nextDownIdx)) {
                        isOverlay = true;
                    }
                    break;

                case 'right':
                    const nextRightIdx = GameAreaSetter.convertCoordToIdx({x: x+1, y});
                    if (this.landingCoords.includes(nextRightIdx)) {
                        isOverlay = true;
                    }
                    break;

                case 'left':
                    const nextLeftIdx = GameAreaSetter.convertCoordToIdx({x: x-1, y})
                    if (this.landingCoords.includes(nextLeftIdx)) {
                        isOverlay = true;
                    }
                    break;

                default:
                    throw new Error('invalid direction')
            }
        })

        return isOverlay;
    }

    initializationArea() {
        let generateBlockIndexes = [];
        const gameArea = document.querySelector('.gameArea');
        if (this.blocks == null) return;
        this.blocks.forEach(block => {
            if (block.isLanding === true) {
                const blockIndexes = block.coordination.map(coord => {
                    const index = GameAreaSetter.convertCoordToIdx(coord);
                    return index;
                })
                generateBlockIndexes = [...generateBlockIndexes, ...blockIndexes];
            }
        });
        gameArea.childNodes.forEach((child, areaIdx) => {
            if (child.style.backgroundColor !== 'black'
                && !generateBlockIndexes.includes(areaIdx+1)) {
                child.style.backgroundColor = 'black';
            }
        });
    }

    tearDownBlocks() {
        // todo 블록이 한줄을 채워 사라진 후, 사라진 블록자리로 위에있는 블록을 채워넣음
    }
};

class Block {
    coordination;
    blockColor;
    isLanding;
    initArea;
    landingEventListener;
    getIsOverlay;
    downInterval;
    blockSpeed;
ㅓ
    constructor(initArea, landingEventListener, isOverlay, blockSpeed) {
        this.isLanding = false;
        this.initArea = initArea;
        this.landingEventListener = landingEventListener;
        this.getIsOverlay = isOverlay;
        this.blockSpeed = blockSpeed;
        this.#enrollInitialEvent();
        // this.autoDown();
    };

    #enrollInitialEvent() {
        document.addEventListener("keydown", (e) => {
            switch(e.key) {
                case "ArrowDown":
                    this.moveBlock('down');
                    break;
                case "ArrowRight":
                    this.moveBlock('right');
                    break;
                case "ArrowLeft":
                    this.moveBlock('left');
                    break;
                case "ArrowUp":
                    throw new Error('위로는 이동할 수 없습니다');
                case " ":
                    this.rotateBlock();
                    break;
                default:
                    throw new Error('invalid key type');
            }
        });
    }

    autoDown() {
        this.downInterval = setInterval(() => {
            if (this.isLanding === true) {
                clearInterval(this.downInterval);
            }
            this.moveBlock('down');
        }, this.blockSpeed);
    };

    #stopAutoDown() {
        clearInterval(this.downInterval);
    }

    #makeNextBlock() {
        this.isLanding = true;
        this.landingEventListener(this.coordination);
    }

    locate() {
        this.initArea();
        this.coordination
            .map(coord => GameAreaSetter.convertCoordToIdx(coord))
            .map(className => document.getElementsByClassName(className.toString()))
            .forEach(grid => grid[0].style.backgroundColor = this.blockColor);
    };

    moveBlock(direction) {
        if (this.isLanding === true) {
            return;
        };

        if (this.getIsOverlay(direction, this.coordination)) {
            if (direction === 'down') {
                this.#makeNextBlock();
            }
            return;
        }

        this.coordination.forEach((coord, coordIdx) => {
            const {x, y} = coord;

            switch(direction) {
                case 'down':
                    this.coordination[coordIdx] = {
                        x: x,
                        y: y + 1 
                    }
                    break;
                case 'right':
                    this.coordination[coordIdx] = {
                        x: x + 1,
                        y: y
                    }
                    break;
                case 'left':
                    this.coordination[coordIdx] = {
                        x: x - 1,
                        y: y
                    }
                    break;
                case 'top':
                    this.coordination[coordIdx] = {
                        x: x,
                        y: y - 1
                    }
                    break;
                default:
                    throw new Error('invalid block move direction!');
            }
        })

        const minMaxXY = GameAreaSetter.calculateMinMaxXY(this.coordination);
        const {minX, maxX, minY, maxY} = minMaxXY;

        if (maxY > 20) {
            this.#makeNextBlock();
        }else if (maxX > 10) {
            this.moveBlock('left');
        }else if (minX < 1) {
            this.moveBlock('right');
        }

        this.locate();
    };


    rotateBlock() {
        // abstract method
        throw new Error('this method(rotateBlock) is abstract method!');
    }

    removeTargetCoordination(shouldRemoveIndexes) {
        // 제거될 그리드의 인덱스배열을 받아서 이 블록에 포함된 인덱스만 제거
        const blockIndexes = this.coordination
            .map(coord => GameAreaSetter.convertCoordToIdx(coord))
            .filter(index => !shouldRemoveIndexes.includes(index));

        this.coordination = blockIndexes.map(blockIndex => GameAreaSetter.convertIdxToCoordinate(blockIndex))
    }
}

class IBlock extends Block {
    constructor(initFunc, landingEventListener, isOverlay, blockSpeed) {
        super(initFunc, landingEventListener, isOverlay, blockSpeed);
        this.coordination = [{x: 4, y:1}, {x:5, y:1}, {x:6, y:1}, {x:7, y:1}];
        this.blockColor = 'red';
        super.locate();
    }

    rotateBlock() {
        super.rotateBlock();
        console.log('IBock is rotating')
    }

    get blockType() {
        return 'I'
    }
}

class OBlock extends Block {
    constructor(initFunc, landingEventListener, isOverlay, blockSpeed) {
        super(initFunc, landingEventListener, isOverlay, blockSpeed);
        this.coordination = [{x: 6, y: 1}, {x: 7, y: 1}, {x: 7, y: 2}, {x: 6, y: 2}];
        this.blockColor = 'blue';
        super.locate();
    }

    rotateBlock() {
        if (this.isLanding === true) return true;

        console.log('OBock is rotating')
    }

    get blockType() {
        return 'O'
    }
}

class TBlock extends Block {
    constructor(initFunc, landingEventListener, isOverlay, blockSpeed) {
        super(initFunc, landingEventListener, isOverlay, blockSpeed);
        this.coordination = [{x: 5, y: 1}, {x: 6, y: 1}, {x: 7, y: 1}, {x: 6, y: 2}];
        this.blockColor = 'yellow';
        super.locate();
    }

    rotateBlock() {
        if (this.isLanding === true) return true;

        console.log('TBock is rotating')
    }

    get blockType() {
        return 'T'
    }

}

class ZBlock extends Block {
    constructor(initFunc, landingEventListener, isOverlay, blockSpeed) {
        super(initFunc, landingEventListener, isOverlay, blockSpeed);
        this.coordination = [{x:5, y:1}, {x:6, y:1}, {x:6, y:2}, {x:7, y:2}];
        this.blockColor = '#28DA56';
        super.locate();
    }

    rotateBlock() {
        if (this.isLanding === true) return true;

        console.log('ZBock is rotating')
    }

    get blockType() {
        return 'Z'
    }

}

class LBlock extends Block {
    constructor(initFunc, landingEventListener, isOverlay, blockSpeed) {
        super(initFunc, landingEventListener, isOverlay, blockSpeed);
        this.coordination = [{x:5, y:1}, {x:6, y:1}, {x:7, y:1}, {x:5, y:2}];
        this.blockColor = '#D54CF3';
        super.locate();
    }

    rotateBlock() {
        if (this.isLanding === true) return true;

        console.log('LBock is rotating')
    }

    get blockType() {
        return 'L'
    }
}

const startGame = () => {
    const areaSetter = new GameAreaSetter();
    const blockMaker = new BlockMaker(
        areaSetter.setGameOver.bind(areaSetter),
        areaSetter.setPoint.bind(areaSetter)
    );
    areaSetter.setArea();
    blockMaker.makeRandomBlock();
};

startGame();