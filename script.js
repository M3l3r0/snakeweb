const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 32; // tamaño de cada cuadro
const canvasSize = 16 * box; // tamaño del canvas
canvas.width = canvasSize;
canvas.height = canvasSize;

// Cargar imágenes
const ground = new Image();
ground.src = "https://i.imgur.com/5XEU8Ub.png"; // Fondo
const foodImg = new Image();
foodImg.src = "https://i.imgur.com/HQy5dKi.png"; // Comida

// Crear la serpiente
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// Crear la comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
};

// Puntaje
let score = 0;

// Control de la serpiente
let d;
document.addEventListener("keydown", direction);

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Verificar colisión
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// Dibujar en el canvas
function draw() {
    ctx.drawImage(ground, 0, 0);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // Posición antigua de la cabeza
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Dirección
    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    // Si la serpiente come la comida
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        };
    } else {
        // Eliminar la cola
        snake.pop();
    }

    // Añadir nueva cabeza
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    // Fin del juego
    if (snakeX < 0 || snakeY < 0 || snakeX >= canvasSize || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
    }

    snake.unshift(newHead);

    // Mostrar puntaje
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2 * box, 1.6 * box);
}

// Llamar la función cada 100 ms
let game = setInterval(draw, 100);
