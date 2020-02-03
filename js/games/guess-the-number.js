$(document).ready(() => {
	let trueNumber = random(-1000, 1000);
	let $console   = $(".game__console span");

	$(".game__button").on("click", () => {
		indicate()
	});

	$(".game__field").on("keydown", (e) => {
		if (e.code === "Enter") {
			indicate()
		}
	});

	function indicate() {
		let $field = $("#game__field").val();
		if ($field === "") {
			$($console).html("Вы не ввели число! &#128532;");
			$($console).css("animation", "pulse-fail 2s infinite");
			return;
		}

		if (+$field === trueNumber) {
			$($console).css("animation", "pulse-success 2s infinite");
			$($console).html("Угадал! &#128561;");
		} else {

			if ($field > trueNumber) {
				$($console).html("Поменьше чем " + $field);
				$($console).css("animation", "pulse-fail 2s infinite");
			} else {
				$($console).html("Побольше чем " + $field);
				$($console).css("animation", "pulse-fail 2s infinite");
			}

		}
	}

	function random(min, max) {
		let random = min - 0.5 + Math.random() * (max - min + 1);
		return Math.round(random);
	}
});