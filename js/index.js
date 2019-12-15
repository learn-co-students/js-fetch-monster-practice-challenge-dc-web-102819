var totalMonsters;
var totalPages;
document.addEventListener('DOMContentLoaded', webIsReady)

function webIsReady() {
  console.log('DOM is loaded')
  getMonsters()
  getMonsterForm().addEventListener('submit', sendMonster)
  getBtnBackListener().addEventListener('click', previousPage)
  getBtnNextListener().addEventListener('click', nextPage)
}

function getMonsterForm() {
  return document.querySelector('#monster-form')
}

function getBtnBackListener() {
  return document.querySelector('#previous')
}

function previousPage(e) {
  document.querySelector('#monster-container-remove').innerText = ''
  let page = Number(getCurrentPage().innerText)
  page -= 1
  getMonsters(page)
}

function getBtnNextListener() {
  return document.querySelector('#next')
}

function nextPage(e) {
  let page = Number(getCurrentPage().innerText)
  document.querySelector('#monster-container-remove').innerText = ''
  page += 1
  console.log(page);
  getMonsters(page)
}

function getCurrentPage() {
  return document.querySelector('#current-page')
}

function getMonsters(page=1, limit=1000) {
  getTotalMonsters()
  getCurrentPage().innerText = page

  console.log('Page is: ' + page);
  if (page === 1) {
    document.querySelector('#previous').disabled = true
  } else {
    document.querySelector('#previous').disabled = false
  }
  if (page >= totalPages){
    console.log('page is:' + page + ' totalPages is:' + totalPages);
    document.querySelector('#next').disabled = true
  } else {
    document.querySelector('#next').disabled = false
  }
  fetch(`http://localhost:3000/monsters/?_limit=${limit}&_page=${page}`)
  .then(response => response.json())
  .then(monsterData => monsterData.forEach(
    data => renderMonster(data)
  ))
  .catch(error => console.log(error.message))
}

function getTotalMonsters() {
  fetch('http://localhost:3000/monsters/')
  .then(response => response.json())
  .then(monsterData => {
    totalMonsters = monsterData.length
    totalPages = totalMonsters / 1000
    console.log('totalPages'+totalPages);
  })

}

function sendMonster(event) {
  console.log('Im going to send a monster');
  event.preventDefault()
  let monsterName = document.querySelector('#monster-name').value
  let monsterAge = document.querySelector('#monster-age').value
  let monsterDescription = document.querySelector('#monster-description').value
  if (monsterName === '' || monsterAge === '' || monsterDescription === '' ) {
    alert('Must insert Name, Age and Description')
  } else {
    createMonster(monsterName, monsterAge, monsterDescription)
  }
}

function createMonster(name, age, description) {
  let data = {
    'name': name,
    'age': parseInt(age),
    'description': description
  }

  let conObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(data)
  }

  fetch('http://localhost:3000/monsters', conObj)
  .then(response => response.json())
  .then(newMonster => renderMonster(newMonster))
  .catch(err => console.log(err.message))

  getMonsterForm().reset()
}

function renderMonster(newMonster) {
  let divMonsterContainerRemove = document.createElement('div')
  divMonsterContainerRemove.setAttribute('id', 'monster-container-remove')
  const divMonsterContainer = document.querySelector('#monster-container')
  divMonsterContainer.appendChild(divMonsterContainerRemove)

  divMonsterContainerRemove = document.querySelector('#monster-container-remove')

  let monsterBox = document.createElement('div')
  let h3TagName = document.createElement('h3')
  let h3TagAge = document.createElement('h3')
  let h3TagDescription = document.createElement('h3')
  let pTagDescription = document.createElement('p')

  // seting the data
  h3TagName.innerText = 'Name: ' + newMonster.name
  h3TagAge.innerText = 'Age: ' + newMonster.age
  h3TagDescription.innerText = 'Description:'
  pTagDescription.innerText = newMonster.description

  // appending elements
  divMonsterContainerRemove.appendChild(monsterBox)
  monsterBox.appendChild(h3TagName)
  monsterBox.appendChild(h3TagAge)
  monsterBox.appendChild(h3TagDescription)
  monsterBox.appendChild(pTagDescription)
}
