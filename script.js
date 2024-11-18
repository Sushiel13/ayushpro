let player1Name = '';
let player2Name = '';
let currentPlayer = '';
let isXTurn = true;
let gameActive = false;

const playerSetup = document.getElementById('playerSetup');
const gameContainer = document.getElementById('gameContainer');
const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('[data-cell]');
const playerTurn = document.getElementById('player-turn');
const restartButton = document.getElementById('restart');
const startGameButton = document.getElementById('startGame');

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
];

// Start Game Setup
startGameButton.addEventListener('click', () => {
    player1Name = document.getElementById('player1').value.trim();
    player2Name = document.getElementById('player2').value.trim();

    if (player1Name && player2Name) {
        gameActive = true;
        playerSetup.style.display = 'none';
        gameContainer.style.display = 'block';
        currentPlayer = player1Name;
        updatePlayerTurn();
        initializeGame();
    } else {
        alert('Please enter names for both players!');
    }
});

function initializeGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
        cell.addEventListener('click', handleClick, { once: true });
    });
    isXTurn = true;
    currentPlayer = player1Name;
    updatePlayerTurn();
}

function handleClick(e) {
    const cell = e.target;
    if (!gameActive || cell.textContent !== '') return;

    const currentMark = isXTurn ? 'X' : 'O';
    placeMark(cell, currentMark);

    if (checkWin(currentMark)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        updatePlayerTurn();
    }
}

function updatePlayerTurn() {
    playerTurn.textContent = `${currentPlayer}'s turn (${isXTurn ? 'X' : 'O'})`;
}

function placeMark(cell, mark) {
    cell.textContent = mark;
}

function swapTurns() {
    isXTurn = !isXTurn;
    currentPlayer = isXTurn ? player1Name : player2Name;
}

function checkWin(currentMark) {
    return winningCombinations.some(combination => {
        if (combination.every(index => cells[index].textContent === currentMark)) {
            // Highlight winning cells
            combination.forEach(index => cells[index].classList.add('winner'));
            return true;
        }
        return false;
    });
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== '');
}

function endGame(draw) {
    gameActive = false;
    if (draw) {
        playerTurn.innerHTML = `<div class="winner-announcement">It's a Draw!</div>`;
    } else {
        playerTurn.innerHTML = `<div class="winner-announcement">🎉 ${currentPlayer} Wins! 🎉</div>`;
    }
}

restartButton.addEventListener('click', () => {
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
        cell.addEventListener('click', handleClick, { once: true });
    });
    isXTurn = true;
    currentPlayer = player1Name;
    updatePlayerTurn();
});
