const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const createForm = document.querySelector("#create-fruit");
fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener("submit", createNewFruit);

let cal = 0;
const fruitCalories = {}
const apiKey = "58058285-b49fe8d3c1b07c247b5fe9ad2";

function extractFruit(e) {
  e.preventDefault();
  fetchFruitData(e.target.fruitInput.value);
  e.target.fruitInput.value = "";
}

function addFruit(fruit, fruitImage) {
    const fruitItem = document.createElement("img")
    fruitItem.classList.add('fruits')
    fruitItem.alt = fruit.name
    fruitItem.src = fruitImage.hits[0].previewURL

    fruitList.appendChild(fruitItem)
    fruitCalories[fruit.name] = fruit.nutritions.calories

    cal += fruit.nutritions.calories 
    fruitNutrition.textContent = "total calories: " + cal

    fruitList.addEventListener('click', removeFruit)
}

async function fetchFruitData(fruit) {
    try {
        const respData = await fetch(`https://fruit-api-1-v36t.onrender.com/fruits/${fruit}`);
        const respImage = await fetch(`https://pixabay.com/api/?q=${fruit}+fruit&key=${apiKey}`);

        if (respData.ok && respImage.ok) {
            const data = await respData.json();
            const imageData = await respImage.json();
            addFruit(data, imageData);
        } else {
            throw `Error: http status code: Data = ${respData.status}, Image = ${respImage.status}`
        }
    } catch (e) {
        console.log(e);
    }
}

function removeFruit(e) {
    const fruitName = e.target.alt;
    cal -= fruitCalories[fruitName]
    fruitNutrition.textContent = "total calories: " + cal

    delete fruitCalories[fruitName]
    e.target.remove()
}

async function createNewFruit(e) {
    e.preventDefault()

    const data = {
        name: e.target.fruitCreate.value
    }

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch(`https://fruit-api-1-v36t.onrender.com/fruits`, options)

    let messageStatus = document.querySelector('#message')

    if (response.status === 201) {
        e.target.fruitCreate.value = ''
        messageStatus.textContent = 'fruit successfully created.'
        setTimeout(() => {
            messageStatus.textContent = ''
        }, 3000)
    } else {
        e.target.fruitCreate.value = ''
        messageStatus.textContent = 'this fruit already exists. please enter another one.'
        setTimeout(() => {
            messageStatus.textContent = ''
        }, 3000)
    }
}