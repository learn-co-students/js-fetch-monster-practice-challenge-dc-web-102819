document.addEventListener("DOMContentLoaded" , () => {
   getApi()
   createForm()
  
})

function createForm(){
    
    const monsterDiv = document.querySelector("#create-monster")
    const monsterForm = document.createElement('form')
    monsterForm.setAttribute('id', 'monster-form')
    monsterDiv.appendChild(monsterForm)
    const nameInput = document.createElement('input')
    nameInput.setAttribute('placeholder', "name...")
    nameInput.setAttribute('id', 'name')
    monsterForm.appendChild(nameInput)
    const ageInput = document.createElement('input')
    ageInput.setAttribute('placeholder', 'age...')
    ageInput.setAttribute('id', 'age')
    monsterForm.appendChild(ageInput)
    const descInput = document.createElement('input')
    descInput.setAttribute('placeholder', 'description...')
    descInput.setAttribute('id', 'description')
    monsterForm.appendChild(descInput)
    const createButton = document.createElement('button')
    createButton.innerText = "Create"
    monsterForm.appendChild(createButton)
   createButton.addEventListener('click', createMonster)

}

function createMonster(event){

    event.preventDefault()
   
    let name = document.querySelector('#name').value 
    let age = document.querySelector('#age').value 
    let bio = document.querySelector('#description').value 
    debugger
    let configObject = {

        method: 'POST',
        headers: {
            'Content-Type': "application/json",
            'Accept': "application/json"
    },

    body: JSON.stringify({name: name, age: age, description: bio})
    }
    fetch('http://localhost:3000/monsters/?_limit=51&_page=3', configObject)
    .then(response => response.json())
    .then(monster => {displayMonsters(monster)})
 

}



function getApi(){

    fetch('http://localhost:3000/monsters/?_limit=51&_page=3')
    .then(response => response.json())
    .then(data => {data.forEach((monster) => displayMonsters(monster))})

}

function displayMonsters(event){

    const monsterDiv = document.querySelector("#monster-container")
    const monsterName = document.createElement('h1')
    monsterName.innerText = event.name
    monsterDiv.appendChild(monsterName)
    const monsterAge = document.createElement('h4')
    monsterAge.innerText = `Age: ${event.age}`
    monsterDiv.appendChild(monsterAge)
    const monsterBio = document.createElement('p')
    monsterBio.innerText = `Bio: ${event.description}`
    monsterDiv.appendChild(monsterBio)
   
}
