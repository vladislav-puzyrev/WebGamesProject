let numbers = [];
let field = document.querySelector(".game > .game__left > .game__numbers");
let button = document.querySelector(".game > .game__left > .game__button");
let min = 0;
let max = 9;
let quantity = 5;
let score = 0;
let htmlScore = document.querySelector(".game > .game__left > .game__score");

for (let i = 0; i < quantity; i++) {
	numbers.push( randint(min, max) );
	let div = document.createElement("div");
	div.textContent = numbers[i];
	div.classList.add("game__number");
	field.append(div);
}

let htmlNumbers = document.querySelectorAll(".game > .game__left > .game__numbers > .game__number");
button.addEventListener("click", function() {
	let index = randint(0, numbers.length-1);

	let old = numbers[index];
	while (numbers[index] === old) {
		numbers[index] = randint(min, max);
	}

	for (let i = 0; i < quantity; i++) {
		htmlNumbers[i].textContent = "";
		setTimeout(function() {
			htmlNumbers[i].textContent = numbers[i];
			htmlNumbers[i].onclick = function() {
				if (i === index) {
					score++;
					htmlScore.textContent = "Очки: " + score;
					for (let q = 0; q < quantity; q++) {
						htmlNumbers[q].onclick = null;
					}
				} else {
					score--;
					htmlScore.textContent = "Очки: " + score;
					for (let q = 0; q < quantity; q++) {
						htmlNumbers[q].onclick = null;
					}
				}
			};
		}, 1000);
	}
});



function randint(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}