document.addEventListener("DOMContentLoaded", function(){
	buildMonsterForm();
	setTheme();
	getMonsters();
	addPageButtonListeners();
})

function setTheme() {
	var time = new Date().getHours();
	if (time >= 18) {
		let body = document.body.id = "night-mode";
	} 
}


// make buttons work their magic
function addPageButtonListeners() {
	console.log("addPageButtonListeners")
	document.querySelector('#back').addEventListener('click', changePage)
	document.querySelector('#forward').addEventListener('click', changePage)
}


//build form
function buildMonsterForm() {
	console.log('buildMonsterForm')

	let monster = document.querySelector("#create-monster");
	let monsterForm = document.createElement("form"),
		name = document.createElement("input"),
		age = document.createElement("input"),
		description = document.createElement("input"),
		submit = document.createElement('button');

	name.id = "name";
	name.placeholder = "Monster McMonsterson";
	monsterForm.appendChild(name);

	age.id = "age";
	age.placeholder = "64 Billion Years";
	age.setAttribute("type", "number");
	monsterForm.appendChild(age);

	description.id = "description";
	description.placeholder = "I come from the land down under...";
	monsterForm.appendChild(description);

	submit.id = "submit";
	submit.innerText = "Create Monster";
	monsterForm.appendChild(submit);

	monsterForm.id = "mosterForm";
	monsterForm.addEventListener("submit", createNewMonster);
	monsterForm.action = "localhost:3000/monsters";
	monsterForm.method = "POST"
	monsterForm.id = "monster-form";

	monster.appendChild(monsterForm)

	monsterForm.addEventListener('submit', createNewMonster)
}

function createNewMonster(event) {
	console.log("I created a monster...")
	event.preventDefault();

	let form = document.querySelector('#monster-form')

	let formData = {
		name: document.querySelector('#name').value,
		age: Number(document.querySelector('#age').value),
		description: document.querySelector('#description').value
	}

	const configObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		    "Accept": "application/json"
		},
		body: JSON.stringify(formData)
	}
	// debugger

	fetch('http://localhost:3000/monsters', configObj)
		.then(response => response.json())
		.then(monster => renderMonster(monster, "prepend"))
		.catch(error => { console.log(error.message)});

	// getMonsters();
	console.log("It's alive!")
	form.reset()
	
}

// Page ${page} of ${total}
function addPagination(page, limit, total) {
	// let totalPages = (total / limit);
	let container = document.querySelector('#button-container')

	let pagination = document.querySelector('#pagination') 
		? document.querySelector('#pagination') 
		: document.createElement('span')
	pagination.innerText = `Page ${page} of Many`
	pagination.id = 'pagination'
	container.appendChild(pagination)

	if (page === 1) {
		document.querySelector("#back").disabled = true;
		document.querySelector("#forward").disabled = false;
	} else {
		document.querySelector("#back").disabled = false;
	}
}

function getMonsters(page=1, limit=50) {
	console.log('getMonsters')

	// clear existing monsters
	let monsterList = document.querySelector('#monster-list');
	monsterList.innerHTML = ''

	fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
		.then(response => response.json())
		.then(json => {
			if (json.length === 0) {
				document.querySelector("#forward").disabled = true;
			}
			// json.reverse()
			let total = json.length;
			addPagination(page, limit, total);
			json.forEach(monster => {
					renderMonster(monster)
				})
		})
		// .then(json => showMonsters(json, pageStart, pageEnd))
		.catch(error => { console.log(error.message)});
}

// generate the monster tile
function renderMonster(monster, action="append") {
	let monsterList = document.querySelector('#monster-list');
	// monsterList.innerHTML = ''

	// create new list element
	let monsterItem = document.createElement("li")
	if (action === "prepend") {
		monsterList.prepend(monsterItem);
	} else {
		monsterList.appendChild(monsterItem);
	}

	//create name header
	let name = document.createElement('h1')
	name.innerText = monster.name
	monsterItem.appendChild(name);

	// create age block
	let age = document.createElement('h3')
	age.innerText = `Age: ${monster.age}`
	monsterItem.appendChild(age);

	// create description
	let description = document.createElement('p')
	description.innerText = `Bio: ${monster.description}`
	monsterItem.appendChild(description);

}

function changePage(event) {
	console.log('changePage')
	let pagination = document.querySelector('#pagination')
	let currentPage = Number(pagination.innerText.split(' ')[1])

	let source = event.target
	let action = source.id
	
	if (currentPage === 1 && action === "back") {
		console.log('no more pages')
	} else if (action === "forward") {
		currentPage += 1
		getMonsters(currentPage)
		// addPagination(currentPage + 1)
	} else {
		document.querySelector("#forward").disabled = false;
		getMonsters(currentPage - 1)
		// addPagination(currentPage - 1)
	}
}

//list monsters
// function showMonsters(json, pageStart=0, pageEnd=monstersPerPage) {
// 	console.log('showMonsters')

// 	let hasPages = document.querySelector('#pagination')
// 		hasPages ? hasPages.remove() : null;
// 	let pageTotal = document.querySelector('#total-results')
// 		pageTotal? pageTotal.remove() : null;

// 	let monsterContainer = document.querySelector('#monster-container');
// 	if (pageStart <= 0) {
// 		pageStart = 0
// 	}

// 	if (json.length && pageEnd >= json.length) {
// 		pageEnd = json.lentgh
// 	}

// 	if (pageEnd <= 0) {
// 		pageEnd = monstersPerPage
// 	}

// 	let pagination = document.createElement('span')
// 	pagination.id = "pagination"
// 	pagination.innerText = `Viewing Results ${pageStart +1} through ${pageEnd}`
	
// 	let totalPages = document.createElement('span');
// 	totalPages.id = 'total-results';
// 	totalPages.innerText = ` of ${json.length ? json.length : totalMonsters}`;
// 	// totalPages.style.display = "inline"
	
// 	monsterContainer.prepend(totalPages);
// 	monsterContainer.prepend(pagination);


// 	// if (document.querySelector('#monsterList')){
// 	// 	document.querySelector('#monsterList').remove()
// 	// }

// 	let	monsterList = document.querySelector('#monsterList') ? document.querySelector('#monsterList') : document.createElement('ul');

// 	if(json.length) {
// 		// debugger
// 		totalMonsters = json.length
// 		json.reverse();
		
// 		monsterList.id = "monsterList";
// 		monsterContainer.appendChild(monsterList);

// 		for (i=0; i<json.length; i++) {
			
// 			if (i >= pageEnd || i < pageStart ) {
// 				//skip the record entirely
// 				continue
// 			}

// 			let monsterItem = document.createElement("li"),
// 				name = document.createElement('h1'),
// 				age = document.createElement('h3'),
// 				description = document.createElement('p');

// 			name.innerText = json[i].name
// 			age.innerText = `Age: ${json[i].age}`
// 			description.innerText = `Bio: ${json[i].description}`

// 			monsterItem.appendChild(name);
// 			monsterItem.appendChild(age);
// 			monsterItem.appendChild(description);

// 			monsterList.appendChild(monsterItem);
// 		}
// 	} else {
// 		let monsterItem = document.createElement("li"),
// 				name = document.createElement('h1'),
// 				age = document.createElement('h3'),
// 				description = document.createElement('p');

// 			name.innerText = json.name
// 			age.innerText = `Age: ${json.age}`
// 			description.innerText = `Bio: ${json.description}`

// 			monsterItem.appendChild(name);
// 			monsterItem.appendChild(age);
// 			monsterItem.appendChild(description);

// 			monsterList.prepend(monsterItem);
// 			// getMonsters()
// 	}
// }
/// OLD
// function changePage(event) {
// 	console.log('changePage')

// 	let currentPage = document.querySelector('#pagination');
// 	let totalResults = document.querySelector('#total-results')
	
// 	let pagination = currentPage.innerText.slice(16)
// 	pagination = pagination.replace(" through ", '/')
	
// 	let start = Number(pagination.split('/')[0]-1)
// 	let end = Number(pagination.split('/')[1])
	
// 	currentPage.remove();
// 	totalResults.remove();
	
// 	let action = event.target.id;
// 	if (action === "back") {
// 		getMonsters((start-monstersPerPage),(end-monstersPerPage))	
// 	} else if (action === "forward") {
// 		getMonsters((start+monstersPerPage),(end+monstersPerPage))
// 	} else {
// 		console.log("Whoops. That's an error.")
// 	}
// }







// not currently used
const monsterElements = [
	{
		html: 'li',
		// id: 'monster',
		class: "monster-item",
		innerText: 'Create Monster',
		// placeholder: "N/A",
		// action: 'localhost:3000/monsters',
		// method: 'POST',
		parent_id: '#monster-list'
	},
	{
		html: 'h1',
		// id: 'monster',
		class: "monster-item",
		innerText: 'Create Monster',
		// placeholder: "N/A",
		// action: 'localhost:3000/monsters',
		// method: 'POST',
		parent_id: '#monster-item'
	},
	{
		html: 'h3',
		// id: 'monster',
		class: "monster-item",
		innerText: 'Create Monster',
		// placeholder: "N/A",
		// action: 'localhost:3000/monsters',
		// method: 'POST',
		parent_id: '#monster-item'
	},
	{
		html: 'p',
		// id: 'monster',
		class: "monster-item",
		innerText: 'Create Monster',
		// placeholder: "N/A",
		// action: 'localhost:3000/monsters',
		// method: 'POST',
		parent_id: '#monster-item'
	}
]

// add pagination
// element importer
const formElements = [
	{
		html: 'form',
		id: 'monster_form',
		// innerText: ,
		// placeholder: "N/A"
		action: 'localhost:3000/monsters',
		method: 'POST',
		// parent_id: '#monster-container'
	},
	{
		html: 'input',
		id: 'name',
		// innerText: ,
		placeholder: "Monster McMonsterson",
		// action: 'localhost:3000/monsters',
		// method: 'POST',
		parent_id: '#monster-form'
	},
	{
		html: 'input',
		id: 'age',
		// innerText: ,
		placeholder: '64 Billion Years',
		// action: 'localhost:3000/monsters',
		// method: 'POST',
		parent_id: '#monster-form'
	},
	{
		html: 'input',
		id: 'description',
		// innerText: ,
		placeholder: 'I come from the land down under',
		// action: 'localhost:3000/monsters',
		// method: 'POST',
		parent_id: '#monster-form'
	},
	{
		html: 'button',
		id: 'submit',
		innerText: 'Create Monster',
		// placeholder: "N/A",
		// action: 'localhost:3000/monsters',
		// method: 'POST',
		parent_id: '#monster-form',
		listener: {
			event: 'click', 
			action: createNewMonster
		}
	}
]



function templateHTML(parent, elements) {
	/* currently only one level deep
	*/ 

	// `${parent}` is the querySelector (value) for the parent element
	// `${elements}` is an array of objects
	let templateParent = document.querySelector(parent)
	
	for (i = 0; i < elements.length; i++) {
		let html = document.createElement(elements[i].html);

			// @TODO refactor attrAssignment as a loop
			html.id = elements[i].id ? elements[i].id : null;
			html.innerText = elements[i].innerText ? elements[i].innerText : null;
			html.placeholder = elements[i].placeholder ? elements[i].placeholder : null;
			html.action = elements[i].action ? elements[i].action : null;
			html.method = elements[i].method ? elements[i].method : null;

			// if (elements[i].listener) {
			// 	element = elements[i]
			// 	debugger
			// 	element.addEventListener(elements[i].listener.event, elements[i].listener.action)
			// }

		let newParent = elements[i].parent_id ? document.querySelector(elements[i].parent_id) : null; 

		// IF THERE IS NOT A PARENT SPECIFIED, USE templateParent
		debugger
		if (newParent && newParent !== templateParent) {
			newParent.appendChild(html)
		} else {
			templateParent.appendChild(html);
		}
	}
}
// end element importer