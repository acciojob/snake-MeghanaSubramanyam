const boardSize = 400;
const pixelSize = 10;
const totalPixels = (boardSize / pixelSize) ** 2;
const gameContainer = document.getElementById("gameContainer");

// Generate 40x40 grid
for (let i = 0; i < totalPixels; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.id = "pixel" + i;
  gameContainer.appendChild(pixel);
}

// Initial game setup
let snake = [760]; // 20th row, 1st col
let direction = "right";
let food = null;
let score = 0;

function updateScore() {
  document.getElementById("pointsEarned").textContent = score;
}

function placeFood() {
  while (true) {
    const rand = Math.floor(Math.random() * totalPixels);
    if (!snake.includes(rand)) {
      food = rand;
      const foodPixel = document.getElementById("pixel" + food);
      foodPixel.classList.add("food");
      break;
    }
  }
}

function moveSnake() {
  const head = snake[snake.length - 1];
  let newHead;

  switch (direction) {
    case "right":
      newHead = (head % 40 === 39) ? head - 39 : head + 1;
      break;
    case "left":
      newHead = (head % 40 === 0) ? head + 39 : head - 1;
      break;
    case "up":
      newHead = (head < 40) ? head + 1560 : head - 40;
      break;
    case "down":
      newHead = (head >= 1560) ? head - 1560 : head + 40;
      break;
  }

  snake.push(newHead);
  document.getElementById("pixel" + newHead).classList.add("snakeBodyPixel");

  if (newHead === food) {
    document.getElementById("pixel" + food).classList.remove("food");
    placeFood();
    score++;
    updateScore();
  } else {
    const tail = snake.shift();
    document.getElementById("pixel" + tail).classList.remove("snakeBodyPixel");
  }
}

// Key events
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && direction !== "down") direction = "up";
  if (e.key === "ArrowDown" && direction !== "up") direction = "down";
  if (e.key === "ArrowLeft" && direction !== "right") direction = "left";
  if (e.key === "ArrowRight" && direction !== "left") direction = "right";
});

// Init game
function init() {
  document.getElementById("pixel" + snake[0]).classList.add("snakeBodyPixel");
  placeFood();
  updateScore();
  setInterval(moveSnake, 100); // 🟢 this ensures snake starts moving
}

init();
