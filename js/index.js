const roadWidth = 500;
const carSize = 100;
const carSpeed = 3;
const roadSpeed = 3;

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
    addEventListeners();
  };
  function startGame() {
    scene.drawRoad();
    car.drawCar();
    update();
  }
};

class Scene {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.height = window.innerHeight;
    this.canvas.width = window.innerWidth;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "images/road.png";
    this.backgroundY = 0;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawRoad() {
    this.ctx.drawImage(
      this.backgroundImage,
      this.canvas.width / 2,
      this.backgroundY % this.canvas.height,
      roadWidth,
      this.canvas.height
    );
    this.backgroundY += carSpeed;
    this.ctx.drawImage(
      this.backgroundImage,
      this.canvas.width / 2,
      (this.backgroundY % this.canvas.height) - this.canvas.height,
      roadWidth,
      this.canvas.height
    );
  }
}

class Car {
  constructor() {
    this.x = (scene.canvas.width + roadWidth - carSize) / 2;
    this.y = scene.canvas.height / 2;
    this.speedY = 0;
    this.speedX = 0;
    this.image = new Image();
    this.image.src = "images/car.png";
  }
  drawCar() {
    scene.ctx.drawImage(this.image, this.x, this.y, carSize, carSize);
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width / 2 + roadWidth - carSize) {
      this.speedX = 0;
    }
    if (this.x < canvas.width / 2) {
      this.speedX = 0;
    }
  }
  moveRight() {
    this.speedX = carSpeed;
    this.speedY = 0;
  }
  moveLeft() {
    this.speedX = -carSpeed;
    this.speedY = 0;
  }
}

class Obstacle {
  constructor() {
    this.x = scene.canvas.width / 2 + Math.random() * roadWidth;
    this.width = 100;
    this.height = 30;
    this.color = "brown";
    this.speedY = roadSpeed;
    this.y = 0;
  }
  draw() {
    scene.ctx.fillStyle = this.color;
    scene.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.y += this.speedY;
    if (this.y > scene.canvas.height) {
      this.y = 0;
      this.x = scene.canvas.width / 2 + Math.random() * roadWidth;
    }
  }
}

function detectCrash(objectA, objectB) {
  const boxA = {
    top: objectA.y,
    right: objectA.x + objectA.width,
    bottom: objectA.y + objectA.height,
    left: objectA.x,
  };
  const boxB = {
    top: objectB.y,
    right: objectB.x + objectB.width,
    bottom: objectB.y + objectB.height,
    left: objectB.x,
  };
  if (
    (boxA.top < boxB.bottom || boxA.bottom > boxB.top) &&
    (boxA.right > boxB.left || boxA.left < boxB.right)
  ) {
    // alert("CRASH!");
    console.log('crash')
  }
}

const scene = new Scene();
const car = new Car();
const obstacle = new Obstacle();

function addEventListeners() {
  document.addEventListener("keydown", (event) => {
    const pressedKey = event.key;
    switch (pressedKey) {
      case "ArrowLeft":
        car.moveLeft();
        break;
      case "ArrowRight":
        car.moveRight();
        break;
      case "ArrowUp":
        car.moveUp();
        break;
      case "ArrowDown":
        car.moveDown();
        break;
    }
  });
}

function update() {
  scene.clear();
  scene.drawRoad();
  car.drawCar();
  obstacle.draw();
  requestAnimationFrame(update);
  detectCrash(car, obstacle);
}
