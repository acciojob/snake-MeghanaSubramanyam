const boardSize = 400;
const pixelSize = 10;
const totalPixels = (boardSize / pixelSize) ** 2;
const gameContainer = document.getElementById("gameContainer");

// Create grid
for (let i = 0; i < totalPixels; i++) {
  const pixel = document.createElement("div");
  pixel.classList.add("pixel");
  pixel.id = "pixel" + i;
  gameContainer.appendChild(pixel);
}

let snake = [760]; // Start at 20th row, 1st column (20 * 40)
let direction = "right";
let score = 0;
let food = null;

// Score update
function updateScore() {
  document.getElementById("pointsEarned").textContent = score;
}

// Place food in front of snake if starting, else randomly
function placeFood() {
  if (snake.length === 1) {
    food = snake[0] + 1;
  } else {
    while (true) {
      let temp = Math.floor(Math.random() * totalPixels);
      if (!snake.includes(temp)) {
        food = temp;
        break;
      }
    }
  }
  document.getElementById("pixel" + food).classList.add("food");
}

// Move snake
function moveSnake() {
  let head = snake[snake.length - 1];
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

// Arrow key direction update
document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (direction !== "down") direction = "up";
      break;
    case "ArrowDown":
      if (direction !== "up") direction = "down";
      break;
    case "ArrowLeft":
      if (direction !== "right") direction = "left";
      break;
    case "ArrowRight":
      if (direction !== "left") direction = "right";
      break;
  }
});

placeFood(); // Initial food
document.getElementById("pixel" + snake[0]).classList.add("snakeBodyPixel");

setInterval(moveSnake, 100); // Auto movement every 100ms
