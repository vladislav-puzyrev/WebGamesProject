const $FIELD = $(".game");
const $CHARACTER = $(".game__character");
const $TREASURE  = $(".game__treasure");
const $DISTANCE_TO_TREASURE = $(".game__state-value");
const $CHARACTER_MESSAGES = $(".game__character-messages");
const SPEED = 2;

let timerMovement;
let timerMessage;
let previousPressedKey;

$DISTANCE_TO_TREASURE.text( calculateDistance($CHARACTER, $TREASURE) + "px" );
positioningCharacterMessage($CHARACTER_MESSAGES, $CHARACTER);
showCharacterMessage($CHARACTER_MESSAGES, "Вперед!");

$(document).keydown(function(event) {
	if (previousPressedKey !== event.code) {
		previousPressedKey = event.code;
		let changeXY = [0, 0];
		clearInterval(timerMovement);

		switch (event.code) {
			case "KeyW":
				changeXY[1] = -SPEED;
				$CHARACTER.addClass("game__character_gif");
				break;
			case "KeyA":
				changeXY[0] = -SPEED;
				$CHARACTER.addClass("game__character_gif");
				$CHARACTER.addClass("game__character_left");
				break;
			case "KeyS":
				changeXY[1] = SPEED;
				$CHARACTER.addClass("game__character_gif");
				break;
			case "KeyD":
				changeXY[0] = SPEED;
				$CHARACTER.addClass("game__character_gif");
				$CHARACTER.removeClass("game__character_left");
				break;
		}

		timerMovement = setInterval(function() {
			if (changeXY[0] > 0) {
				if ($CHARACTER.position().left + $CHARACTER.outerWidth() < $FIELD.outerWidth()) {
					characterMovement($CHARACTER, "x", changeXY);
				}
			} else {
				if ($CHARACTER.position().left > 0) {
					characterMovement($CHARACTER, "x", changeXY);
				}
			}

			if (changeXY[1] > 0) {
				if ($CHARACTER.position().top + $CHARACTER.outerHeight() < $FIELD.outerHeight()) {
					characterMovement($CHARACTER, "y", changeXY);
				}
			} else {
				if ($CHARACTER.position().top > 0) {
					characterMovement($CHARACTER, "y", changeXY);
				}
			}

			let distance = calculateDistance($CHARACTER, $TREASURE);
			$DISTANCE_TO_TREASURE.text( distance + "px" );

			positioningCharacterMessage($CHARACTER_MESSAGES, $CHARACTER);
			
			if (distance < 100) {
				$TREASURE.css("animation", "increase 0.5s");
				$TREASURE.css("z-index", "0");
				showCharacterMessage($CHARACTER_MESSAGES, "Нашел!");
			} else if (distance < 200) {
				$TREASURE.css("animation", "null");
				showCharacterMessage($CHARACTER_MESSAGES, "Близко");
			} else if (distance < 400) {
				showCharacterMessage($CHARACTER_MESSAGES, "Теплее");
			}
		});
	}
});

$(document).keyup(function(event) {	
	clearInterval(timerMovement);
	previousPressedKey = null;
	$CHARACTER.removeClass("game__character_gif");
});



function calculateDistance(a, b) {
	let posAX = a.position().left + (a.outerWidth() / 2);
	let posAY = a.position().top + (a.outerHeight() / 2);

	let posBX = b.position().left + (b.outerWidth() / 2);
	let posBY = b.position().top + (b.outerHeight() / 2);
	
	let result = Math.sqrt( (posBX - posAX)**2 + (posBY - posAY)**2 );
	return Math.round(result);
}

function showCharacterMessage(cloud, message) {
	cloud.text(message);
	cloud.css("display", "flex");
}

function positioningCharacterMessage(cloud, character) {
	cloud.css("left", character.position().left + 20 + "px");
	cloud.css("top", character.position().top - 70 + "px");
}

function characterMovement(character, axis, changeXY) {
	switch (axis) {
		case "x":
			character.css( "left", parseInt($CHARACTER.css("left")) + changeXY[0] + "px" );
			break;
		case "y":
			$CHARACTER.css( "top", parseInt($CHARACTER.css("top")) + changeXY[1] + "px" );
			break;
		case "xy":
			$CHARACTER.css( "left", parseInt($CHARACTER.css("left")) + changeXY[0] + "px" );
			$CHARACTER.css( "top", parseInt($CHARACTER.css("top")) + changeXY[1] + "px" );
			break;
	}
}