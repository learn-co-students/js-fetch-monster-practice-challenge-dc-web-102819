
document.addEventListener("DOMContentLoaded" , function() {
        loadMonsters() 
})


function loadMonsters() {
    fetch("http://localhost:3000/monsters/?_limit=50&_page=3")
    .then(response => response.json())
    .then(monsterArray => {
        monsterArray.forEach(monster => DisplayMonster(monster))
    })
}


function DisplayMonster(monster) {
    let monsterContainer = document.getElementById("monster-container")
    let monsterCard = document.createElement("div") 
    monsterCard.classList.add("card")
    monsterCard.id = `monster-${monster.id}`
    let monsterName = document.createElement('h3')
    monsterName.innerText = monster.name 
    monsterCard.appendChild(monsterName)
    monsterCard.addEventListener("click", addNewMonster)
    monsterContainer.appendChild(monsterCard) 
    let monsterAge = document.createElement('h3')
    monsterAge.innerText = monster.age 
    monsterName.appendChild(monsterAge)
    monsterContainer.appendChild(monsterCard) 
} 



 