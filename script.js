let playerText = document.getElementById('playerText')
let restartBtn = document.getElementById('restartBtn')
let board = document.getElementById('gameboard');
let boxes = Array.from(document.getElementsByClassName('box'));
let trapBox = generateRandomNumber(0, 8);

const winningMap = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
];

const O_TEXT = 'O';
const X_TEXT = 'X';

let currentPlayer = X_TEXT;

const line = document.createElement('div');
line.classList.add('line');

function drawLine(winningIndex) {
    let style = '';
    switch(winningIndex) {
        case 0:
            style = 'top: 75px; width: 100%;';
            break;
        case 1:
            style = 'top: 225px; width: 100%;';
            break;
        case 2:
            style = 'top: 425px; width: 100%;';
            break;

        case 3:
            style = 'left: 75px; height: 100%;';
            break;
        case 4:
            style = 'left: 225px; height: 100%;';
            break;
        case 5:
            style = 'left: 425px; height: 100%;';
            break;

        case 6:
            style = 'left: 225px; height: 100%; transform: rotateZ(-45deg);';
        break;
        case 7:
            style = 'left: 225px; height: 100%; transform: rotateZ(45deg);';
        break;
    }
    
    line.setAttribute('style', style);
    board.appendChild(line);

    boxes.forEach(box => box.removeEventListener('click', boxClicked));
}

function getAllIndexes(arr, val) {
    var indexes = [], i = -1;
    while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
    }
    return indexes;
}

function markWinner(map) {
    drawLine(winningMap.indexOf(map));
}

function checkUserHasWon() {
    const boxValues = boxes.map(box => box.innerText);
    const playerBoxes = getAllIndexes(boxValues, currentPlayer);

    winningMap.forEach(map => {
        const hasWon = map.every((e) => playerBoxes.includes(e));
        if (hasWon) {
            markWinner(map);
        }
    });
}

function boxClicked(element) {
    if (element.target.innerHTML != "") {
        return;
    }

    if (Number(element.target.id) === trapBox) {
        // trigger trap
        console.log('trap triggered');
        element.target.setAttribute('style', 'background: red');
        trapBox = -1;
        return;
    }

    element.target.innerHTML = currentPlayer;

    if (checkUserHasWon()) {
        console.log('user won: ', currentPlayer);
    }

    if (currentPlayer === X_TEXT) {
        currentPlayer = O_TEXT;
    }
    else {
        currentPlayer = X_TEXT;
    }
}

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

function restart() {
    boxes.forEach( box=> {
        box.innerText = ''
        box.setAttribute('style', '')

    })

    currentPlayer = X_TEXT;
    try {
        board.removeChild(line);
    } catch(e) {}

    startGame();
}
restartBtn.addEventListener('click', restart)

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

startGame();