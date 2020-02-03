const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");

canvas.width  = 16*50;
canvas.height = 9*50;
canvas.style.backgroundColor = "#333336";
canvas.style.maxWidth        = "100%";

let circles = [];
let currentMouseCoords = [];
let mousedown = false;
let cleaning = true;
const colors = ["#f9ff68", "#74ff6e", "#FFFFFF", "#62ffff"];

class Circle {
	constructor(radius, color, dx, dy) {
		this.x = currentMouseCoords[0];
		this.y = currentMouseCoords[1];
		this.radius = radius;
		this.color = color;
		this.dx = dx;
		this.dy = dy;
	}
}

canvas.addEventListener("mousedown", (e) => {
	e.preventDefault();
	if (e.which === 3) {
		cleaning = false;
		circles = [];
	} else {
		cleaning = true;
	}
	mousedown = true;
	currentMouseCoords = getTrueMouseCoords(e);
});

canvas.addEventListener("touchstart", (e) => {
	mousedown = true;
	currentMouseCoords = getTrueMouseCoords(e.changedTouches[0]);
});

canvas.addEventListener("mousemove", (e) => {
	currentMouseCoords = getTrueMouseCoords(e);
});

canvas.addEventListener("touchmove", (e) => {
	currentMouseCoords = getTrueMouseCoords(e.changedTouches[0]);
});

canvas.addEventListener("mouseup", () => {
	mousedown = false;
});

canvas.addEventListener("touchend", () => {
	mousedown = false;
});

canvas.addEventListener("mouseout", () => {
	mousedown = false;
});

canvas.addEventListener("contextmenu", (e) => {
	e.preventDefault();
});

function drawCircles() {
	if (mousedown) {
		circles.push(
			new Circle(
				20,
				colors[randomInt(0, colors.length-1)],
				randomSpeed(-6, -1, 1, 6),
				randomSpeed(-6, -1, 1, 6)
			)
		);
	}

	for (let i = 0; i < circles.length; i++) {
		// Движение
		circles[i].x += circles[i].dx;
		circles[i].y += circles[i].dy;

		// Уменьшение
		if (Math.round(Math.random()) && Math.round(Math.random()) && circles[i].radius > 1 && cleaning) {
			circles[i].radius -= 1;
		}

		// Отталкивание от границ
		if (circles[i].y <= circles[i].radius || circles[i].y >= canvas.height - circles[i].radius) {
	        circles[i].dy = -circles[i].dy;
	    }
	    if (circles[i].x <= circles[i].radius || circles[i].x >= canvas.width - circles[i].radius) {
	        circles[i].dx = -circles[i].dx;
	    }

	    // Отрисовка
	    ctx.beginPath();
	    ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, Math.PI * 2);
	    ctx.fillStyle = circles[i].color;
	    ctx.fill();
	    ctx.closePath();

		// Очистка
		if (circles[i].radius === 1) {
			circles.splice(i, 1);
			i--;
		}
	}
}

function drawText(opt) {
	ctx.font = opt.font;
	ctx.fillStyle = opt.color;
	ctx.textAlign = opt.align;
	ctx.textBaseline = opt.baseLine;

	ctx.fillText(opt.text, opt.x - 10, opt.y);
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawText({
		font: "16px Arial",
		color: "#58636d",
		align: "right",
		baseLine: "bottom",
		text: "Created by Vladislav Puzyrev 2019",
		x: canvas.width,
		y: canvas.height - 10,
	});

	drawText({
		font: "16px Arial",
		color: "#58636d",
		align: "left",
		baseLine: "bottom",
		text: "ЛКМ - Исчезающие",
		x: 20,
		y: canvas.height - 32,
	});

	drawText({
		font: "16px Arial",
		color: "#58636d",
		align: "left",
		baseLine: "bottom",
		text: "ПКМ - Статичные",
		x: 20,
		y: canvas.height - 10,
	});

	drawCircles();

	requestAnimationFrame(draw);
}

draw();



function getTrueMouseCoords(e) {
	const coords = [];
	coords[0] = (e.pageX - e.target.offsetLeft) * canvas.width / canvas.clientWidth;
	coords[1] = (e.pageY - e.target.offsetTop) * canvas.height / canvas.clientHeight;
	return coords;
}

function randomSpeed(min1, max1, min2, max2) {
	const random1 = min1 - 0.5 + Math.random() * (max1 - min1 + 1);
	const random2 = min2 - 0.5 + Math.random() * (max2 - min2 + 1);

	return (Math.round(Math.random())) ? random1 : random2;
}

function randomInt(min, max) {
	const random = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(random);
}