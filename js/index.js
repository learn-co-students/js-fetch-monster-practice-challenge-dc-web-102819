console.log("This is the index.js file speaking.");

const starterUrl = 'http://localhost:3000/monsters?_limit=50';
var currentPage = 1;

document.addEventListener('DOMContentLoaded', function() {
    console.log("Your DOM is loaded");
    fetch(starterUrl)
    .then(response => response.json())
    .then(json => list50Monsters(json))
    .then(console.log("We found your monsters"));
    
    appendForm();
    addListeners();
});

function list50Monsters(db) {
    let container = document.getElementById('monster-container');

    db.forEach(monster => {
        monsterBlock = document.createElement('div');
        monsterName = document.createElement('h2');
        monsterName.innerText = monster.name;
        monsterAge = document.createElement('h4');
        monsterAge.innerText = `Age: ${monster.age}`;
        monsterBio = document.createElement('p');
        monsterBio.innerText = `Bio: ${monster.description}`;

        monsterBlock.appendChild(monsterName);
        monsterBlock.appendChild(monsterAge);
        monsterBlock.appendChild(monsterBio);

        container.appendChild(monsterBlock);
    });
}

function appendForm() {
    let container = document.getElementById('create-monster');
    
    let monsterForm = document.createElement('form');
    monsterForm.id = 'create-monster';

    let inputName = document.createElement('input');
    inputName.id = 'name';
    inputName.placeholder = 'name...';

    let inputAge = document.createElement('input');
    inputAge.id = 'age';
    inputAge.placeholder = 'age...';

    let inputBio = document.createElement('input');
    inputBio.id = 'description';
    inputBio.placeholder = 'description...';

    let createBtn = document.createElement('button');
    createBtn.innerText = 'Create';
    createBtn.addEventListener('click', postRequest);

    monsterForm.appendChild(inputName);
    monsterForm.appendChild(inputAge);
    monsterForm.appendChild(inputBio);
    monsterForm.appendChild(createBtn);

    container.appendChild(monsterForm);
}

function postRequest(event) {
    event.preventDefault();
    console.log("You clicked the Button!");
    
    let monsterNameVal = document.getElementById('name').value;
    let monsterAgeVal = document.getElementById('age').value;  
    let monsterBioVal = document.getElementById('description').value;
    
    //make Post request
    let configObj = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            name: monsterNameVal,
            age: monsterAgeVal,
            description: monsterBioVal
        })
    };
    
    fetch('http://localhost:3000/monsters', configObj)
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => {
        alert("There's an error. Check the console");
        console.log(error.message);
    })
    
    //add to page
    let container = document.getElementById('monster-container');

    let monsterBlock = document.createElement('div');
    let monsterName = document.createElement('h2');
    monsterName.innerText = monsterNameVal;
    let monsterAge = document.createElement('h4');
    monsterAge.innerText = `Age: ${monsterAgeVal}`;
    let monsterBio = document.createElement('p');
    monsterBio.innerText = `Bio: ${monsterBioVal}`;

    monsterBlock.appendChild(monsterName);
    monsterBlock.appendChild(monsterAge);
    monsterBlock.appendChild(monsterBio);
    
    container.prepend(monsterBlock);
}

function addListeners() {
    document.getElementById('forward').addEventListener('click', fetchForward);
    document.getElementById('back').addEventListener('click', fetchBackward);
}

function fetchForward(event) {
    console.log("Your forward button is listening");
    event.preventDefault();

    currentPage++

    fetchAgain();
}

function fetchBackward(event) {
    console.log("Your backward button is listening");
    event.preventDefault();

    if (currentPage === 1) {
        currentPage = 1
        alert('No previous monsters')
        return;
    } else {
        currentPage--
    }

    fetchAgain();
}

function fetchAgain() {
    let parent = document.querySelector('body');
    
    let newMonsterDiv = document.createElement('div')
    let monsterDiv = document.getElementById('monster-container');
    
    parent.insertBefore(newMonsterDiv, monsterDiv)
    monsterDiv.remove();
    newMonsterDiv.id = 'monster-container';
    
    let newUrlData = `&_page=${currentPage}`;
    
    let combineUrl = starterUrl + newUrlData;
    
    fetch(combineUrl)
    .then(response => response.json())
    .then(json => list50Monsters(json))
    .then(console.log("We found your monsters"));
}