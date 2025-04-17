//your code here
const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");

const gridSize = 40;
let snake = [760]; // Starting at row 20, col 1 -> (20 * 40) = 800 - 40 = 760
let direction = 1; // Moving right
let food = 0;
let score = 0;

// Create pixels
for (let i = 0; i < 1600; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.setAttribute("id", "pixel" + i);
  gameContainer.appendChild(pixel);
}

// Draw snake
function drawSnake() {
  document.querySelectorAll(".snakeBodyPixel").forEach(p =>
    p.classList.remove("snakeBodyPixel")
  );
  snake.forEach(index => {
    document.getElementById("pixel" + index).classList.add("snakeBodyPixel");
  });
}

// Place food
function placeFood() {
  while (true) {
    let foodIndex = Math.floor(Math.random() * 1600);
    if (!snake.includes(foodIndex)) {
      food = foodIndex;
      const foodPixel = document.getElementById("pixel" + food);
      foodPixel.classList.add("food");
      break;
    }
  }
}

// Update score
function updateScore() {
  scoreDisplay.textContent = score;
}

// Move Snake
function moveSnake() {
  let head = snake[snake.length - 1];
  let newHead = head + direction;

  // Check for wall collisions
  if (
    newHead < 0 || newHead >= 1600 ||
    (direction === 1 && head % gridSize === gridSize - 1) ||
    (direction === -1 && head % gridSize === 0) ||
    (direction === gridSize && head + gridSize >= 1600) ||
    (direction === -gridSize && head < gridSize) ||
    snake.includes(newHead)
  ) {
    alert("Game Over!");
    clearInterval(gameLoop);
    return;
  }

  snake.push(newHead);

  if (newHead === food) {
    document.getElementById("pixel" + food).classList.remove("food");
    placeFood();
    score++;
    updateScore();
  } else {
    snake.shift();
  }

  drawSnake();
}

// Change direction
document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && direction !== gridSize) direction = -gridSize;
  if (e.key === "ArrowDown" && direction !== -gridSize) direction = gridSize;
  if (e.key === "ArrowLeft" && direction !== 1) direction = -1;
  if (e.key === "ArrowRight" && direction !== -1) direction = 1;
});

// Start game
placeFood();
drawSnake();
let gameLoop = setInterval(moveSnake, 100);
