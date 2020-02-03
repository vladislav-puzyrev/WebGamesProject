let canvas = document.getElementById("canvas");
let ctx    = canvas.getContext("2d");
canvas.width  = 16*50;
canvas.height = 9*50;
canvas.style.backgroundColor = "#333336";
canvas.style.maxWidth        = "100%";

let ball = {
    x: canvas.width - 25,
    y: canvas.height / 2,
    radius: 25,

    color: "#57dd3c",
    dx: -10,
    dy: -10,
};

let rightPaddle = {
    x: canvas.width - 15,
    y: canvas.height / 2 - 60,
    w: 15,
    h: 100,
    color: "#ddba1f",
};

let leftPaddle = {
    x: 0,
    y: canvas.height / 2 - 60,
    w: 15,
    h: 100,
    color: "#ddba1f",
};

let score = {
    computer: 0,
    player: 0,
};

document.addEventListener("mousemove", placeRightPaddle);

function drawBall(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y <= ball.radius || ball.y >= canvas.height - ball.radius) {
        ball.dy = -ball.dy;
    }
    if (ball.x <= ball.radius || ball.x >= canvas.width - ball.radius) {
        ball.dx = -ball.dx;
    }

    if (ball.x + ball.radius === canvas.width) {
        if (ball.y > rightPaddle.h + rightPaddle.y || ball.y < rightPaddle.y) {
            score.computer++;
        }
    }

    if (ball.x - ball.radius === 0) {
        if (ball.y > leftPaddle.h + leftPaddle.y || ball.y < leftPaddle.y) {
            score.player++;
        }
    }

}

function placeRightPaddle(e) {
    if (e.pageY - canvas.height >= 0 && e.pageY - canvas.height <= canvas.height - rightPaddle.h) {
        rightPaddle.y = e.pageY - canvas.height;
    } else if (e.pageY - canvas.height <= 0) {
        rightPaddle.y = 0;
    } else {
        rightPaddle.y = canvas.height - rightPaddle.h;
    }
}

function drawPaddles() {
    ctx.fillStyle = rightPaddle.color;
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h);

    ctx.fillStyle = leftPaddle.color;
    if (ball.y < leftPaddle.y) {
        ctx.fillRect(leftPaddle.x, leftPaddle.y -= 5, leftPaddle.w, leftPaddle.h);
    } else {
        ctx.fillRect(leftPaddle.x, leftPaddle.y += 5, leftPaddle.w, leftPaddle.h);
    }
}

function drawScore(font, color) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (score.computer >= 10) {
        ctx.font = "60px Arial";
        ctx.fillStyle = "#58636d";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText("Вы проиграли! :(", canvas.width/2, canvas.height/2);

        setTimeout(() => {
            document.location.reload();
        }, 2000);
    } else if (score.player >= 10) {
        ctx.font = "60px Arial";
        ctx.fillStyle = "#58636d";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillText("Вы выиграли! :)", canvas.width/2, canvas.height/2);

        setTimeout(() => {
            document.location.reload();
        }, 2000);
    } else {
        ctx.fillText(String(score.computer), canvas.width/2/2, canvas.height/2);
        ctx.fillText(String(score.player), canvas.width/2 + canvas.width/2/2, canvas.height/2);
    }

}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScore("300px Arial", "#58636d");
    drawBall(ball.x, ball.y, ball.radius, ball.color);
    drawPaddles();

    requestAnimationFrame(draw);
}

draw();