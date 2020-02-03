const definition = {
	"толерантность": "Социологический термин, обозначающий терпимость к иному мировоззрению, образу жизни, поведению и обычаям.",
	"либерализм": "Общественно-политическое течение, объединяющее сторонников парламентаризма, демократических свобод и частного предпринимательства.",
	"экспонат": "Предмет, выставленный на выставке, в музее.",
	"парашют": "Устройство в форме зонта из ткани, к которому стропами прикреплена подвесная система или груз. Служит для замедления движения предмета в воздухе.",
	"сущность": "Внутренняя основа, содержание, смысл, суть чего-н.",
	"бесконечность": "Категория человеческого мышления, используемая для характеристики безграничных, беспредельных, неисчерпаемых предметов и явлений",
	"галстук": "Особым образом сшитая полоска ткани, завязанная вокруг шеи.",
	"образование": "Единый целенаправленный процесс воспитания и обучения, а также совокупность приобретаемых знаний.",
	"документ": "Деловая бумага, подтверждающая какой-то факт или право на что-то.",
	"программирование": "Процесс создания компьютерных программ",
	"ограбление": "Открытое хищение чужого имущества.",
	"эпиграф": "Цитата, помещаемая во главе сочинения или его части с целью указать его дух, его смысл, отношение к нему автора и тому подобное.",
	"иллюзия": "Обман чувств, нечто кажущееся, то есть искажённое восприятие реально существующего объекта или явления, допускающее неоднозначную интерпретацию.",
	"альтернатива": "Необходимость выбора одного из двух (или нескольких) возможных решений.",
	"достопримечательность": "Место или предмет, заслуживающие особого внимания в силу каких-то своих качеств.",
	"информация": "Сведения независимо от формы их представления.",
	"квалификация": "Уровень подготовки выпускников средних специальных и высших учебных заведенийУ",
	"космонавтика": "Теория и практика навигации за пределами атмосферы Земли для исследования космического пространства при помощи автоматических и пилотируемых космических аппаратов.",
	"аутентификация": "Проверка на знание чего-то уникального или обладание чем-то уникальным.",
	"параллелепипед": "Призма, основанием которой служит параллелограмм, или многогранник, у которого шесть граней и каждая из них — параллелограмм.",
	"колонизатор": "Тот, кто организует заселение пустующих земель.",
};
const words = Object.keys(definition);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
drawGallows();

// Заполнение
const wordBox = document.querySelector(".game > .game__content > .game__field > .game__word");
const word = words[randint(0, words.length-1)];
const definitionHTML = document.querySelector(".game > .game__definition");
console.log(word);
for (let i = 0; i < word.length; i++) {
	let letter = document.createElement("div");
	letter.textContent = "-";
	letter.classList.add("game__letter");
	wordBox.append(letter);
	definitionHTML.textContent = definition[word];
}

const letters = document.querySelectorAll(".game > .game__content > .game__field > .game__word > div");
const submit = document.querySelector(".game > .game__content > .game__field > .game__form > .game__submit");
const inpit = document.querySelector(".game > .game__content > .game__field > .game__form > .game__input");
const info = document.querySelector(".game > .game__content > .game__field > .game__info");
const UsedLetters = [];
let loseCount = 0;

submit.addEventListener("click", checkLetter);
inpit.addEventListener("keydown", function(event) {
	if (event.code === "Enter") {
		checkLetter();
	}
});

function checkLetter() {
	if (inpit.value) {

		let letter = inpit.value[0].toLowerCase();

		if ( UsedLetters.indexOf(letter) === -1 && word.indexOf(letter) !== -1 ) {
			UsedLetters.push(letter);
			for (let i = 0; i < letters.length; i++) {
				if (word[i] === letter) {
					letters[i].textContent = letter;
				}
			}
			info.textContent = "Вы угадали: " + letter;
		} else {
			if (UsedLetters.indexOf(letter) !== -1) {
				info.textContent = "Вы уже использовали: " + letter;
			} else {
				UsedLetters.push(letter);
				info.textContent = "Вы не угадали: " + letter;
				loseCount++;
				draw();
			}
		}

		let k = true;
		for (let i = 0; i < letters.length; i++) {
			if (letters[i].textContent === "-") {
				k = false;
			}
		}
		if (k) {
			info.textContent = "Вы угадали слово!";
		}
		
	} else {
		info.textContent = "Введите букву!";
	}

	input.select();
}



function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	drawGallows();

	switch (loseCount) {
		case 0:
			break;
		case 1:
			drawHead();
			break;
		case 2:
			drawHead();
			drawBody();
			break;
		case 3:
			drawHead();
			drawBody();
			drawLeftHand();
			break;
		case 4:
			drawHead();
			drawBody();
			drawLeftHand();
			drawRightHand();
			break;
		case 5:
			drawHead();
			drawBody();
			drawLeftHand();
			drawRightHand();
			drawLeftLeg();
			break;
		case 6:
			drawHead();
			drawBody();
			drawLeftHand();
			drawRightHand();
			drawLeftLeg();
			drawRightLeg();
			info.textContent = "Вы проиграли!";
			break;
		default:
			info.textContent = "Вы проиграли!";
	}
}

function drawGallows() {
	ctx.fillRect(20, 140, 90, 10);
	ctx.fillRect(35, 20, 5, 150);
	ctx.fillRect(35, 20, 45, 5);
	ctx.fillRect(80, 20, 5, 15);
}

function drawHead() {
	ctx.beginPath();
	ctx.arc(83, 47, 13, 0, Math.PI * 2);
	ctx.stroke();
	ctx.closePath();
}

function drawBody() {
	ctx.beginPath();
	ctx.moveTo(83, 60);
	ctx.lineTo(83, 100);
	ctx.stroke();
	ctx.closePath();
}

function drawLeftHand() {
	ctx.beginPath();
	ctx.moveTo(83, 65);
	ctx.lineTo(65, 80);
	ctx.stroke();
	ctx.closePath();
}

function drawRightHand() {
	ctx.beginPath();
	ctx.moveTo(83, 65);
	ctx.lineTo(100, 80);
	ctx.stroke();
	ctx.closePath();
}

function drawLeftLeg() {
	ctx.beginPath();
	ctx.moveTo(83, 100);
	ctx.lineTo(70, 120);
	ctx.stroke();
	ctx.closePath();
}

function drawRightLeg() {
	ctx.beginPath();
	ctx.moveTo(83, 100);
	ctx.lineTo(100, 120);
	ctx.stroke();
	ctx.closePath();
}

function randint(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}