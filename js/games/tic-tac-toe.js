let cells = document.querySelectorAll(".game__table-cell");
let state = document.querySelector(".game__state");
let move = "X";
let draw = 0;

let field = [
	cells[0], cells[1], cells[2],
	cells[3], cells[4], cells[5],
	cells[6], cells[7], cells[8]
];

let win = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
]

for (let i = 0; i < field.length; i++) {
	field[i].onclick = function() {
		if (draw < 9) {
			if (move === "X" && this.textContent === "-") {
				this.textContent = move;
				move = "O";
				draw++;
			} else if (this.textContent === "-") {
				this.textContent = move;
				move = "X";
				draw++;
			}
		} else {
			state.textContent = "Ничья! Игра окончена."
		}

		checkWin(win, field, state);
	}
}



function checkWin(win, field, state) {
	for (let i = 0; i < win.length; i++) {
		if (field[win[i][0]].textContent === "X" && field[win[i][1]].textContent === "X" && field[win[i][2]].textContent === "X") {
			state.textContent = "Крестики победили! Игра окончена.";
			clearOnclick(field);
			return true;
		} else if (field[win[i][0]].textContent === "O" && field[win[i][1]].textContent === "O" && field[win[i][2]].textContent === "O") {
			state.textContent = "Нолики победили! Игра окончена.";
			clearOnclick(field);
			return true;
		}
	}

	function clearOnclick(field) {
		for (let i = 0; i < field.length; i++) {
			field[i].onclick = null;
		}
	}
}
















computer.onchange = function() {
	difficulty.toggleAttribute("disabled");
}

function randint(min, max) {
  let random = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}