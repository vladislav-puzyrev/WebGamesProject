let trueNumber = random(-1000, 1000);
let output = document.querySelector(".game__console span");

document.querySelector(".game__button").addEventListener("click", () => {
	indicate();
});

document.querySelector(".game__field").addEventListener("keydown", (e) => {
	if (e.code === "Enter") {
		indicate();
	}
});

function indicate() {
	let field = document.querySelector("#game__field").value;
	
	if (field === "") {
		output.innerHTML = "Вы не ввели число! &#128532;";
		output.style.animation = "pulse-fail 2s infinite";
		return;
	}

	if (+field === trueNumber) {
		output.style.animation = "pulse-success 2s infinite";
		output.innerHTML = "Угадал! &#128561;";
	} else {

		if (field > trueNumber) {
			output.style.animation = "pulse-fail 2s infinite";
			output.innerHTML = "Поменьше чем " + field;
		} else {
			output.style.animation = "pulse-fail 2s infinite";
			output.innerHTML = "Побольше чем " + field;
		}

	}
}

function random(min, max) {
	let random = min - 0.5 + Math.random() * (max - min + 1);
	return Math.round(random);
}