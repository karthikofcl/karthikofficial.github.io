const boxes = document.querySelectorAll(".box");
const status = document.getElementById("status");
const btnRestart = document.getElementById("restart");
const x = "<img src='../tick-tack-toe-js/cross.png'>";
const o = "<img src='../tick-tack-toe-js/oow.png'>";

const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = x;
let player = "X";
let ai = "O";
let running = false;
let gameOver = false;
let playerFirst = true;
init();

// Modal Elements
const modal = document.getElementById("winnerModal");
const winnerText = document.getElementById("winnerText");
const closeModal = document.getElementsByClassName("close")[0];

function init() {
  const choice = prompt("Choose your symbol ('X' or 'O')").toUpperCase();
  if (choice === "X") {
    player = "X";
    ai = "O";
    currentPlayer = x;
    playerFirst = true;
  } else if (choice === "O") {
    player = "O";
    ai = "X";
    currentPlayer = o;
    playerFirst = false;
  } else {
    alert("Invalid choice, defaulting to 'X'");
    player = "X";
    ai = "O";
    currentPlayer = x;
    playerFirst = true;
  }

  boxes.forEach((box) => box.addEventListener("click", boxClick));
  btnRestart.addEventListener("click", restartGame);
  status.textContent = playerFirst ? `${player} Your Turn` : "AI's Turn";
  running = true;

  if (!playerFirst) {
    setTimeout(aiMove, 500);
  }
}

function boxClick() {
  const index = parseInt(this.dataset.index);
  if (options[index] !== "" || !running || gameOver) {
    return;
  }
  updateBox(this, index, player, true);
  checkWinner();
  if (!gameOver) {
    setTimeout(aiMove, 500);
  }
}

function updateBox(box, index, currentPlayer, delay = false) {
  if (delay) {
    setTimeout(() => {
      options[index] = currentPlayer;
      box.innerHTML = currentPlayer === "X" ? x : o;
    }, 300);
  } else {
    options[index] = currentPlayer;
    box.innerHTML = currentPlayer === "X" ? x : o;
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === x ? o : x;
}

function checkWinner() {
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (options[a] && options[a] === options[b] && options[a] === options[c]) {
      status.classList.add("winner-text");
      status.textContent = `${options[a]} Wins!`;
      running = false;
      gameOver = true;
      showWinnerModal(options[a]);
      return;
    }
  }
  if (options.every((option) => option !== "")) {
    status.textContent = "It's a Draw!";
    running = false;
    gameOver = true;
  }
}

function showWinnerModal(winner) {
  winnerText.textContent = `${winner} Wins!`;
  modal.style.display = "block";
}

function restartGame() {
  options = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = playerFirst ? x : o;
  player = currentPlayer === x ? "X" : "O";
  ai = currentPlayer === x ? "O" : "X";
  running = true;
  gameOver = false;
  boxes.forEach((box) => {
    box.innerHTML = "";
  });
  status.textContent = playerFirst ? `${player} Your Turn` : "AI's Turn";
  modal.style.display = "none";

  if (!playerFirst) {
    setTimeout(aiMove, 500);
  }
}

closeModal.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Minimax AI Algorithm
function aiMove() {
  let bestScore = -Infinity;
  let bestMove;

  for (let i = 0; i < options.length; i++) {
    if (options[i] === "") {
      options[i] = ai;
      let score = minimax(options, 0, false);
      options[i] = "";
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  updateBox(boxes[bestMove], bestMove, ai);
  changePlayer();
  checkWinner();
}

function minimax(board, depth, isMaximizing) {
  const result = checkResult(board);
  if (result !== null) {
    return result;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = ai;
        let score = minimax(board, depth + 1, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") {
        board[i] = player;
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkResult(board) {
  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (board[a] === board[b] && board[b] === board[c]) {
      if (board[a] === ai) {
        return 10 - i; // AI wins
      } else if (board[a] === player) {
        return i - 10; // Player wins
      }
    }
  }

  if (board.every((option) => option !== "")) {
    return 0; // Draw
  }

  return null; // Game is not over yet
}
