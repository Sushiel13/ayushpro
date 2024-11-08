    // Tic-Tac-Toe Game
    let currentPlayer = 'X';
    let board = [['', '', ''], ['', '', ''], ['', '', '']];
    let gameActive = true;
    let isSinglePlayer = false;

    const xSymbol = `<svg width="60" height="60" viewBox="0 0 24 24" class="x-mark">
        <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>`;

    const oSymbol = `<svg width="60" height="60" viewBox="0 0 24 24" class="o-mark">
        <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
    </svg>`;

    function setGameMode(mode) {
        isSinglePlayer = mode === 'single';
        document.getElementById('gameMode').textContent = isSinglePlayer ? 'Single Player' : 'Two Players';
        resetBoard();
    }

    function makeMove(row, col) {
        if (!gameActive || board[row][col] !== '') return;

        board[row][col] = currentPlayer;
        const cell = document.querySelector(`#ticTacToeBoard tr:nth-child(${row+1}) td:nth-child(${col+1})`);
        cell.innerHTML = currentPlayer === 'X' ? xSymbol : oSymbol;
        cell.style.cursor = 'not-allowed';

        document.getElementById('currentTurn').textContent = currentPlayer === 'X' ? 'O' : 'X';

        if (checkWin()) {
            document.getElementById('ticTacToeResult').textContent = `${currentPlayer} wins!`;
            gameActive = false;
            return;
        }

        if (isDraw()) {
            document.getElementById('ticTacToeResult').textContent = "It's a draw!";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        if (isSinglePlayer && currentPlayer === 'O' && gameActive) {
            document.querySelectorAll('#ticTacToeBoard td').forEach(cell => {
                if (!cell.innerHTML) cell.style.cursor = 'not-allowed';
            });
            setTimeout(makeAIMove, 700);
        }
    }

    function resetBoard() {
        board = [['', '', ''], ['', '', ''], ['', '', '']];
        currentPlayer = 'X';
        gameActive = true;
        document.querySelectorAll('#ticTacToeBoard td').forEach(cell => {
            cell.innerHTML = '';
            cell.style.cursor = 'pointer';
        });
        document.getElementById('ticTacToeResult').textContent = '';
        document.getElementById('currentTurn').textContent = 'X';
    }

    // ... keep all other functions the same (makeAIMove, findWinningMove, checkWin, isDraw) ...
