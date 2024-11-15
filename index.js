let board = [];
let rows = 8;
let columns = 8;
let minesCount = 10;
let minesLocation = [];
let tilesClicked = 0;
let flagEnabled = false;
let gameOver = false;
let timerInterval;
let timeElapsed = 0;

window.onload = function() {
    startGame();
}

function startGame() {
    // Reset game variables
    gameOver = false;
    tilesClicked = 0;
    minesLocation = [];
    board = [];  // Clear the existing board
    timeElapsed = 0; // Reset the timer
    document.getElementById("mines-count").innerText = minesCount;
    document.getElementById("timer").innerText = "0s";
    
    // Start Timer
    if (timerInterval) clearInterval(timerInterval); // Clear any previous intervals
    timerInterval = setInterval(updateTimer, 1000); // Update the timer every second
    
    // Reset UI elements
    document.getElementById("board").innerHTML = '';  // Clear existing board UI
    setMines();  // Set new mines randomly

    // Rebuild the board grid
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener("click", clickTile);
            tile.addEventListener("contextmenu", flagTile); // Right-click to flag
            document.getElementById("board").appendChild(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function setMines() {
    let minesLeft = minesCount;
    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * columns);
        let id = r.toString() + "-" + c.toString();
        if (!minesLocation.includes(id)) {
            minesLocation.push(id);
            minesLeft -= 1;
        }
    }
}

function setFlag() {
    if (flagEnabled) {
        flagEnabled = false;
        document.getElementById("flag-button").style.backgroundColor = "lightgray";
    } else {
        flagEnabled = true;
        document.getElementById("flag-button").style.backgroundColor = "darkgray";
    }
}

function clickTile() {
    if (gameOver || this.classList.contains("tile-clicked")) return;

    let tile = this;
    if (flagEnabled) return; // Don't interact with flagged tiles

    if (minesLocation.includes(tile.id)) {
        gameOver = true;
        revealMines();
        showGameOverModal();  // Show custom modal when game over
        clearInterval(timerInterval);  // Stop the timer
        return;
    }

    let coords = tile.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    checkMine(r, c);
}

function flagTile(e) {
    e.preventDefault(); // Prevent the default context menu

    if (gameOver || this.classList.contains("tile-clicked")) return;

    let tile = this;
    if (flagEnabled) {
        if (tile.innerText === "") {
            tile.innerText = "🚩";
        } else if (tile.innerText === "🚩") {
            tile.innerText = "";
        }
    }
}

function revealMines() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let tile = board[r][c];
            if (minesLocation.includes(tile.id)) {
                tile.innerText = "💣";
                tile.style.backgroundColor = "red";                
            }
        }
    }
}

function checkMine(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return;

    let tile = board[r][c];
    if (tile.classList.contains("tile-clicked")) return;

    tile.classList.add("tile-clicked");
    tilesClicked += 1;

    let minesFound = 0;
    minesFound += checkTile(r-1, c-1);
    minesFound += checkTile(r-1, c);
    minesFound += checkTile(r-1, c+1);
    minesFound += checkTile(r, c-1);
    minesFound += checkTile(r, c+1);
    minesFound += checkTile(r+1, c-1);
    minesFound += checkTile(r+1, c);
    minesFound += checkTile(r+1, c+1);

    if (minesFound > 0) {
        tile.innerText = minesFound;
        tile.classList.add("x" + minesFound.toString());
    } else {
        tile.innerText = "";
        checkMine(r-1, c-1);
        checkMine(r-1, c);
        checkMine(r-1, c+1);
        checkMine(r, c-1);
        checkMine(r, c+1);
        checkMine(r+1, c-1);
        checkMine(r+1, c);
        checkMine(r+1, c+1);
    }

    if (tilesClicked === rows * columns - minesCount) {
        document.getElementById("mines-count").innerText = "Cleared";
        gameOver = true;
        clearInterval(timerInterval);
        setTimeout(() => alert("You Win!"), 100);
    }
}

function checkTile(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= columns) return 0;
    if (minesLocation.includes(r.toString() + "-" + c.toString())) return 1;
    return 0;
}

function updateTimer() {
    timeElapsed++;
    document.getElementById("timer").innerText = `${timeElapsed}s`;
}

function showGameOverModal() {
    document.getElementById("game-over-modal").style.display = "flex";
    document.getElementById("restart-button").addEventListener("click", function() {
        document.getElementById("game-over-modal").style.display = "none";  // Hide the modal
        startGame();  // Restart the game
    });
}
