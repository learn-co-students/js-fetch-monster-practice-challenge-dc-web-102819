
        document.addEventListener("DOMContentLoaded" , function() {
                loadMonsters() 
                getMonsterForm().addEventListener("submit", addNewMonster)
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
            let monsterName = document.createElement('h3')
            let monsterAge = document.createElement('h3')
            let monsterDesc = document.createElement("p")

            monsterCard.classList.add("card") 
            monsterCard.id = `monster-${monster.id}`

            monsterName.innerText = monster.name 
            monsterAge.innerText = monster.age 
            monsterDesc.innerText = monster.description
            
            monsterContainer.append(monsterCard) 
            monsterCard.append(monsterName)
            monsterCard.append(monsterAge)
            monsterCard.append(monsterDesc) 

            monsterCard.addEventListener("click", addNewMonster)

        } 


        function getMonsterForm() {
            debugger
            return document.getElementById("new-pokemon-form")
        }


        function addNewMonster(e) {
            e.preventDefault()
            let monsterName = document.getElementById("name-input").value
            let monsterAge =  document.getElementById("age-input").value
            let monsterDesc = document.getElementById("description-input").value

            debugger

            const configOptions = {
                method:"POST" , 
                headers: {
                    "Content-Type": "application/json",
                    "Accept":"application/json"
                }, 
                body: { name: monsterName, age: monsterAge, description: monsterDesc }
            }

            fetch("http://localhost:3000/monsters" , configOptions) 
            .then(res => res.json())
            .then(monster =>DisplayMonster(monster) )

        }



 