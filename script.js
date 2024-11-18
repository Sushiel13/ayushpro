const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('[data-cell]');
const playerTurn = document.getElementById('player-turn');
const restartButton = document.getElementById('restart');

let isXTurn = true;
let gameActive = true;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
});

restartButton.addEventListener('click', restartGame);

function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.textContent !== '') return;

    const currentPlayer = isXTurn ? 'X' : 'O';
    placeMark(cell, currentPlayer);

    if (checkWin(currentPlayer)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, mark) {
    cell.textContent = mark;
}

function swapTurns() {
    isXTurn = !isXTurn;
    playerTurn.textContent = `Player ${isXTurn ? 'X' : 'O'}'s turn`;
}

function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === currentPlayer;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        playerTurn.textContent = "It's a draw!";
    } else {
        playerTurn.textContent = `Player ${isXTurn ? 'X' : 'O'} wins!`;
    }
}

function restartGame() {
    gameActive = true;
    isXTurn = true;
    playerTurn.textContent = "Player X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
}
