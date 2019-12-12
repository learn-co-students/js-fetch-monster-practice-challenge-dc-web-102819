document.addEventListener("DOMContentLoaded", function(){
	// show form
	buildMonsterForm();
	getMonsters();
	//add actions
})


//build form
function buildMonsterForm() {
	let monster = document.querySelector("#create-monster");
	let monsterForm = document.createElement("form"),
		name = document.createElement("input"),
		age = document.createElement("input"),
		description = document.createElement("input"),
		submit = document.createElement('button');

	name.id = "name";
	name.placeholder = "Name";
	monsterForm.appendChild(name);

	age.id = "age";
	age.placeholder = "Age";
	age.setAttribute("type", "number");
	monsterForm.appendChild(age);

	description.id = "description";
	description.placeholder = "Description...";
	monsterForm.appendChild(description);

	submit.id = "submit";
	submit.innerText = "Create Monster";
	monsterForm.appendChild(submit);

	monsterForm.addEventListener("submit", createNewMonster);
	monsterForm.action = "localhost:3000/monsters";
	monsterForm.method = "POST"
	monsterForm.id = "monster-form";

	monster.appendChild(monsterForm)
}

function createNewMonster(event) {
	event.preventDefault();

	let form = document.querySelector("#monster-form");
	let name = document.querySelector('#name');
	let age = document.querySelector('#age');
	let description = document.querySelector('#description');

	console.log("creating new monster...")
	debugger
}
//list monster

//shuffle thorugh monsters??? maybe FEATURED?
function getMonsters() {
	let monsterFeatured = document.querySelector('#monster-container');
	fetch('http://localhost:3000/monsters')
		.then(response => response.json())
		.then(json => showMonsters(json))
		.catch(error => { console.log(error.message)});
}

function showMonsters(json) {
	let monsterContainer = document.querySelector('#monster-container');
	let	monsterList = document.createElement('ul')

	for (i=0; i<json.length; i++) {
	//@TODO limit each page to X monsters
		let monsterItem = document.createElement("li"),
			name = document.createElement('h1'),
			age = document.createElement('h3'),
			description = document.createElement('p');

		name.innerText = json[i].name
		age.innerText = `Age: ${json[i].age}`
		description.innerText = `Bio: ${json[i].description}`

		monsterItem.appendChild(name);
		monsterItem.appendChild(age);
		monsterItem.appendChild(description);

		monsterList.appendChild(monsterItem);
	}
	monsterContainer.appendChild(monsterList)
}