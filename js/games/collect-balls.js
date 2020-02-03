const field   = document.querySelector(".field");
const circles = document.querySelectorAll(".field__ball");
const paddle  = document.querySelector(".field__paddle");
const colors  = ["#f9ff68", "#74ff6e", "#FFFFFF", "#62ffff"];

const paddleCoords = {
	topLeft: [parseInt(getComputedStyle(paddle).left), parseInt(getComputedStyle(paddle).top)],
	topRight: [parseInt(getComputedStyle(paddle).left) + paddle.offsetWidth, parseInt(getComputedStyle(paddle).top)],
	bottomLeft: [parseInt(getComputedStyle(paddle).left), parseInt(getComputedStyle(paddle).top) + paddle.offsetHeight],
	bottomRight: [parseInt(getComputedStyle(paddle).left) + paddle.offsetWidth, parseInt(getComputedStyle(paddle).top) + paddle.offsetHeight]
};

let count = 0;

for (let i = 0; i < circles.length; i++) {
	let ball = circles[i];

	// Рандомное позиционирование
	ball.style.left = randint(ball.clientWidth, field.clientWidth - ball.clientWidth) + "px";
	ball.style.top = randint(ball.clientHeight, field.clientHeight - ball.clientHeight) + "px";
	ball.style.backgroundColor = colors[randint(0, colors.length-1)];

	ball.addEventListener("mousedown", (event) => {

		field.addEventListener("mousemove", moveAt);

		ball.addEventListener("mouseup", (event) => {
			field.removeEventListener("mousemove", moveAt);

			let cursorX = event.clientX - field.getBoundingClientRect().x;
			let cursorY = event.clientY - field.getBoundingClientRect().y;

			if (
				cursorX > paddleCoords["topLeft"][0]  &&
				cursorX < paddleCoords["topRight"][0] &&
				cursorY > paddleCoords["topLeft"][1]  &&
				cursorY < paddleCoords["bottomLeft"][1]
			) {
				ball.hidden = true;
				count++;
				if (count === circles.length) {	
					paddle.textContent = "Кружки собраны!"
				}
			}

		});

		// Правильное позиционирование
		let shiftX = event.clientX - ball.getBoundingClientRect().left;
		let shiftY = event.clientY - ball.getBoundingClientRect().top;

		function moveAt(event) {
			ball.style.left = event.clientX - field.getBoundingClientRect().x - shiftX + "px";
			ball.style.top = event.clientY - field.getBoundingClientRect().y - shiftY + "px";
		}

		ball.addEventListener("dragstart", (event) => {
			event.preventDefault();
		});

	});
	
}



function randint(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}