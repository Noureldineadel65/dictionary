// Define UI Vars
const form = document.querySelector("#dictionary-form");
const clearBtn = document.querySelector(".clear-dictionary");
const filter = document.querySelector("#filter");
const table = document.querySelector("tbody");
const wordInput = document.querySelector("#word");
const meaningInput = document.querySelector("#meaning");
const submitButton = document.querySelector(".submitForm");
document.addEventListener("keydown", stopEditWord);
document.querySelector(".fa-redo").addEventListener("click", restartApp);

// Load all event listeners
loadEventListeners();
loadAll();
// Load all event listeners
function loadEventListeners() {
	submitButton.addEventListener("click", addWord);
	table.addEventListener("click", removeWord);
	table.addEventListener("click", editWord);
	clearBtn.addEventListener("click", clearDictionary);
	filter.addEventListener("keyup", filterAll);
}
function loadAll() {
	let word;
	if (localStorage.getItem("words") === null) {
		word = [];
	} else {
		word = JSON.parse(localStorage.getItem("words"));
	}
	word.forEach(e => {
		const wordInput = e[0];
		const meaningInput = e[1];
		const tr = document.createElement("tr");
		tr.className = "word-item";
		const td1 = document.createElement("td");
		td1.className = "word-name";
		td1.textContent = `${wordInput}`;
		tr.appendChild(td1);
		const td2 = document.createElement("td");
		td2.innerHTML = `<span>${meaningInput}</span> <i class="fas fa-times secondary-content"></i><i
    class="fas fa-i-cursor secondary-content"></i>`;
		tr.appendChild(td2);
		table.appendChild(tr);
	});
}
// Add word
function addWord(e) {
	if (wordInput.value === "" || meaningInput.value === "") {
		//do nth
		console.log("Enter smth");
	} else {
		let word;
		if (localStorage.getItem("words") === null) {
			word = [];
		} else {
			word = JSON.parse(localStorage.getItem("words"));
		}
		const tr = document.createElement("tr");
		tr.className = "word-item";
		const td1 = document.createElement("td");
		td1.className = "word-name";
		td1.textContent = `${wordInput.value}`;
		tr.appendChild(td1);
		const td2 = document.createElement("td");
		td2.innerHTML = `<span>${
			meaningInput.value
		}</span> <i class="fas fa-times secondary-content"></i><i
    class="fas fa-i-cursor secondary-content"></i>`;
		tr.appendChild(td2);
		table.appendChild(tr);
		word.push([wordInput.value, meaningInput.value]);
		localStorage.setItem("words", JSON.stringify(word));
		wordInput.value = "";
		meaningInput.value = "";
	}
}
function removeWord(e) {
	if (e.target.classList.contains("fa-times")) {
		const itemName =
			e.target.parentElement.parentElement.firstElementChild.textContent;
		let word = JSON.parse(localStorage.getItem("words"));
		word = word.filter(e => {
			return e[0] !== itemName;
		});
		localStorage.setItem("words", JSON.stringify(word));
		e.target.parentElement.parentElement.remove();
	}
}
function editWord(e) {
	if (e.target.classList.contains("fa-i-cursor")) {
		e.target.parentElement
			.querySelector("span")
			.setAttribute("contenteditable", true);
		e.target.parentElement.classList.add("active-td");
	}
}
function stopEditWord(e) {
	if (e.key == "Enter") {
		Array.from(table.children).forEach(e => {
			e.querySelector("td:last-of-type span").setAttribute(
				"contenteditable",
				false
			);

			e.querySelector("td:last-of-type").classList.remove("active-td");
		});
		const items = Array.from(document.querySelectorAll("td span")).map(
			e => e.textContent
		);
		let word = JSON.parse(localStorage.getItem("words"));
		index = word.findIndex((e, i) => {
			return e[1] !== items[i];
		});
		word[index][1] = items[index];
		localStorage.setItem("words", JSON.stringify(word));
		// console.log(JSON.parse(localStorage.getItem("words"))[word]);
	}
}
function clearDictionary(e) {
	table.innerHTML = ``;
	localStorage.setItem("words", JSON.stringify([]));
	e.preventDefault();
}
function filterAll(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".word-name").forEach(function(word) {
		const item = word.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			word.parentElement.style.removeProperty("display");
		} else {
			word.parentElement.style.display = "none";
		}
	});
}
function restartApp() {
	document.querySelector("#yes").addEventListener("click", function() {
		table.innerHTML = ``;
		localStorage.removeItem("words");
		window.location.reload();
	});
}
