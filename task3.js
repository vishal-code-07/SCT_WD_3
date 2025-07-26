const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],  // rows
  [0,3,6], [1,4,7], [2,5,8],  // cols
  [0,4,8], [2,4,6]            // diagonals
];

function handleClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
  } else if (board.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw! 🤝";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin() {
  return winConditions.some(condition => {
    const [a, b, c] = condition;
    return board[a] && board[a] === board[b] && board[a] === board[c];
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  cells.forEach(cell => (cell.textContent = ""));
}

cells.forEach(cell => cell.addEventListener("click", handleClick));
resetBtn.addEventListener("click", resetGame);
