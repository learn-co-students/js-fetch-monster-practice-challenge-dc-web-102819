let page = 1

document.addEventListener('DOMContentLoaded', function(){
    fetchMonsters(page)
    createForm()

    let forward = document.getElementById('forward')
    forward.addEventListener('click', nextPage)

	let backward = document.getElementById('back')
	back.addEventListener('click', backPage)
})

function fetchMonsters(page){
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(monsters => {
        monsters.forEach(monster => renderMonster(monster))
    })
}

function renderMonster(monster){
    let monsterContainer = document.getElementById('monster-container')

    let divElement = document.createElement('div')
    divElement.classList.add('card')
    monsterContainer.appendChild(divElement)

    let monsterName = document.createElement('p')
    monsterName.innerText = `Name: ${monster.name}`
    let monsterAge = document.createElement('p')
    monsterAge.innerText = `Age: ${monster.age}`
    let monsterDescription = document.createElement('p')
    monsterDescription.innerText = `Description: ${monster.description}`

    divElement.appendChild(monsterName)
    divElement.appendChild(monsterAge)
    divElement.appendChild(monsterDescription)

}

function createForm(){
    let monsterCreateDiv = document.getElementById('create-monster')

    let formHeader = document.createElement('h2')
    formHeader.innerText = 'Create a New Monster'
    monsterCreateDiv.appendChild(formHeader)

    let monsterForm = document.createElement('form')
    monsterForm.id = 'monster-form'
    monsterForm.action = 'http://localhost:3000/monsters'
    monsterForm.method = 'POST'

        let nameLabel = document.createElement('label')
        nameLabel.innerText = 'Name:'
        monsterForm.appendChild(nameLabel)

        let nameInput = document.createElement('input')
        nameInput.setAttribute('name', 'name')
        nameInput.setAttribute('id', 'monster-name')
        nameInput.setAttribute('placeholder', 'Cookie Monster')
        nameInput.setAttribute('type', 'text') 
        monsterForm.appendChild(nameInput)


        let ageLabel = document.createElement('label')
        ageLabel.innerText = 'Age:'
        monsterForm.appendChild(ageLabel)

        let ageInput = document.createElement('input')
        ageInput.setAttribute('name', 'age')
        ageInput.setAttribute('id', 'monster-age')
        ageInput.setAttribute('placeholder', '5')
        ageInput.setAttribute('type', 'number') 
        monsterForm.appendChild(ageInput)

        let descriptionLabel = document.createElement('label')
        descriptionLabel.innerText = 'Description:'
        monsterForm.appendChild(descriptionLabel)

        let descriptionInput = document.createElement('input')
        descriptionInput.setAttribute('name', 'description')
        descriptionInput.setAttribute('id', 'monster-description')
        descriptionInput.setAttribute('placeholder', 'Loves cookies')
        descriptionInput.setAttribute('type', 'text') 
        monsterForm.appendChild(descriptionInput)

        let submitButton = document.createElement('button')
        submitButton.addEventListener('click', addNewMonster)
        submitButton.setAttribute('id', 'submit-button')
        submitButton.innerText = 'Create Monster'
        monsterForm.appendChild(submitButton)

    monsterCreateDiv.appendChild(monsterForm)
    monsterForm.reset()
}

function addNewMonster(event){

    let name = document.getElementById('monster-name').value
    let age = document.getElementById('monster-age').value
    let description = document.getElementById('monster-description').value

    let formData = {
        nameInput: name,
        ageInput: age,
        descriptionInput: description
    }

    let configData = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
    }

    fetch('http://localhost:3000/monsters', configData)
    .then(response => response.json())
    .then(json => {
        newMonster = addNewMonster(json)
        monsterContainer = document.getElementById('monster-container')
        monsterContainer.prepend(newMonster)
    })
    
}

function nextPage(event) {
	page++
	changeMonsters(page)
}

function backPage(event) {
	if (page > 1) {
		page--
		changeMonsters(page)
	}
}

function changeMonsters(page) {
	let oldMonsters = document.getElementsByClassName("card")
	for (i = 0; i <oldMonsters.length; i++) {
		oldMonsters[i].style.display = 'none'
	}
	fetchMonsters(page)
}