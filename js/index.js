document.addEventListener('DOMContentLoaded', webIsReady)

function webIsReady() {
  console.log('DOM is loaded')
  getMonsters(50)
  getMonsterForm().addEventListener('submit', sendMonster)
}

function getMonsterForm() {
  return document.querySelector('#monster-form')
}

function getMonsters(number) {
  // console.log('Im going to load something. Number is:' + number);
  fetch(`http://localhost:3000/monsters/?_limit=${number}`)
  .then(response => response.json())
  .then(monsterData => showMonsters(monsterData))
}

function showMonsters(monsterData) {
  monsterData.forEach(
    data => {
      const divMonsterContainer = document.querySelector('#monster-container')
      // creating elements
      let monsterBox = document.createElement('div')
      let h3TagName = document.createElement('h3')
      let h3TagAge = document.createElement('h3')
      let h3TagDescription = document.createElement('h3')
      let pTagDescription = document.createElement('p')

      // seting the data
      h3TagName.innerText = 'Name: ' + data.name
      h3TagAge.innerText = 'Age: ' + data.age
      h3TagDescription.innerText = 'Description:'
      pTagDescription.innerText = data.description

      // appending elements
      divMonsterContainer.appendChild(monsterBox)
      monsterBox.appendChild(h3TagName)
      monsterBox.appendChild(h3TagAge)
      monsterBox.appendChild(h3TagDescription)
      monsterBox.appendChild(pTagDescription)
    }
  )
}

function sendMonster(event) {
  console.log('Im going to send a monster');
  event.preventDefault()
  let monsterName = document.querySelector('#monster-name').value
  let monsterAge = document.querySelector('#monster-age').value
  let monsterDescription = document.querySelector('#monster-description').value
  createMonster(monsterName, monsterAge, monsterDescription)
}

function createMonster(name, age, description) {
  console.log(
    'This is the data to insert in DB. Name: ' + name
  )
  debugger
  let data = {
    'name': name,
    'age': parseInt(age),
    'description': description
  }
  debugger
  let conObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }

  return fetch('http://localhost:3000/monsters', conObj)
  .then(response => response.json())
  .then(postMonster => doSomethingElse(postMonster))
  .catch(err => console.log(err.message))
}

function doSomethingElse(newMonster) {
  console.log(newMonster);
}
