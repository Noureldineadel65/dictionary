// Define UI Vars
const form = document.querySelector("#dictionary-form");
const clearBtn = document.querySelector(".clear-dictionary");
const filter = document.querySelector("#filter");
const table = document.querySelector("tbody");
const wordInput = document.querySelector("#word");
const meaningInput = document.querySelector("#meaning");
const submitButton = document.querySelector(".submitForm");
document.addEventListener("keydown", stopEditWord);

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// Add task event
	submitButton.addEventListener("click", addWord);
	table.addEventListener("click", removeWord);
	table.addEventListener("click", editWord);
	clearBtn.addEventListener("click", clearDictionary);
	filter.addEventListener("keyup", filterAll);
}

// Add Task
function addWord(e) {
	if (wordInput.value === "" || meaningInput.value === "") {
		//do nth
		console.log("Enter smth");
	} else {
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
		wordInput.value = "";
		meaningInput.value = "";
	}
}
function removeWord(e) {
	if (e.target.classList.contains("fa-times")) {
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
	}
}
function clearDictionary(e) {
	table.innerHTML = ``;
	e.preventDefault();
}
function filterAll(e) {
	const text = e.target.value.toLowerCase();

	document.querySelectorAll(".word-name").forEach(function(word) {
		const item = word.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			word.parentElement.style.display = "block";
		} else {
			word.parentElement.style.display = "none";
		}
	});
}
