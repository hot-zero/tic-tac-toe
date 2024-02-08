// Constants for player classes and winning combinations
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
];

// DOM elements
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const restButton = document.getElementById("restButton");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector("[data-winning-message-text]");

// Game state
let circleTurn;

// Initialize the game
startGame();

// Event listeners
restButton.addEventListener("click", startGame);

// Functions
function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS, CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove("show");
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function endGame(draw) {
    winningMessageTextElement.innerText = draw ? "Draw!" : `${circleTurn ? "O's" : "X's"} Wins!`;
    winningMessageElement.classList.add("show");
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS, CIRCLE_CLASS);
    board.classList.add(circleTurn ? CIRCLE_CLASS : X_CLASS);
}
