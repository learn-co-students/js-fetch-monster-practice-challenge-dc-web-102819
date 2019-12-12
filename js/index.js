
//Global variable to keep track of the page the user is on
let page = 1


document.addEventListener("DOMContentLoaded", () => {

	getMonsters(page)

	createForm()

	let submitBtn = document.getElementById('create-button')

	let forward = document.getElementById("forward")
	forward.addEventListener("click", nextPage)

	let backward = document.getElementById("back")
	back.addEventListener('click', backPage)

	submitBtn.addEventListener('click', addMonster)


})


function getMonsters(page) {
	page
	fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
	.then(response => response.json())
	.then(json => { 
		json.forEach(monster => {
		makeMonster(monster)
		})
	})

}


function makeMonster(monster) {
	let monsterContainer = document.getElementById("monster-container")

	let monsterDiv = document.createElement('div')
	monsterDiv.className = "monster-divs"
	monsterContainer.appendChild(monsterDiv)

	let monsterNameEl = document.createElement('h2')
	monsterNameEl.innerText = monster.name
	monsterDiv.appendChild(monsterNameEl)

	let monsterAgeEl = document.createElement('h4')
	monsterAgeEl.innerText = `Age: ${monster.age}`
	monsterDiv.appendChild(monsterAgeEl)

	let monsterDescEl = document.createElement('p')
	monsterDescEl.innerText = `${monster.description}`
	monsterDiv.appendChild(monsterDescEl)

	return monsterDiv
}



function nextPage(event) {
	page++
	hideMonstersAndGetNew(page)
}

function backPage(event) {
	if (page > 1) {
		page--
		hideMonstersAndGetNew(page)
	}
}

function hideMonstersAndGetNew(page) {
	let oldMonsters = document.getElementsByClassName("monster-divs")
	for (i = 0; i <oldMonsters.length; i++) {
		oldMonsters[i].style.display = 'none'
	}
	getMonsters(page)
}

function createForm() {

	let createMon = document.getElementById("create-monster")
	let form = document.createElement('form')
	let header = document.createElement('h2')
	header.innerText = "Create a Monster"
	createMon.appendChild(header)
	createMon.appendChild(form)

	let nameLabel = document.createElement('label')
	nameLabel.innerText = "Name:"
	let name = document.createElement('input')
	name.setAttribute('type', 'text')
	name.setAttribute('name', 'name')
	name.setAttribute('id', 'create-name')

	let ageLabel = document.createElement('label')
	ageLabel.innerText = "Age:"
	let age = document.createElement('input')
	age.setAttribute('type', 'number')
	age.setAttribute('name', 'age')
	age.setAttribute('id', 'create-age')

	let descriptionLabel = document.createElement('label')
	descriptionLabel.innerText = "Description:"
	let description = document.createElement('textarea')
	// description.setAttribute('type', 'text')
	description.setAttribute('name', 'description')
	description.setAttribute('id', 'create-description')

	let submitBtn = document.createElement('input')
	submitBtn.setAttribute('type', 'submit')
	submitBtn.setAttribute('value', "Create Monster")
	submitBtn.setAttribute('id', 'create-button')

	form.appendChild(nameLabel)
	form.appendChild(name)
	form.appendChild(ageLabel)
	form.appendChild(age)
	form.appendChild(descriptionLabel)
	form.appendChild(description)
	form.appendChild(submitBtn)


}

function addMonster(event) {
	event.preventDefault()
	console.log(event)

	let name = document.getElementById('create-name').value
	let age = document.getElementById('create-age').value
	let description = document.getElementById('create-description').value

	let formData = {
		name: name,
		age: age,
		description: description
	}

	let configObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify(formData)
	}

	fetch("http://localhost:3000/monsters", configObj)
	.then(response => response.json())
	.then(json => {
		newMon = makeMonster(json) 
		monsterContainer = document.getElementById('monster-container')
		monsterContainer.prepend(newMon)

	})
	document.getElementById('create-name').value = null
	document.getElementById('create-age').value = null
	document.getElementById('create-description').value = null

}


