const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const createForm = document.querySelector("#create-fruit");
const deleteForm = document.querySelector("#delete-fruit");
fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener("submit", createNewFruit);
deleteForm.addEventListener("submit", deleteFruit);

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

async function deleteFruit(e) {
    e.preventDefault()

    const fruit = e.target.fruitDelete.value.toLowerCase()
    
    const options = {
        method: "DELETE"
    }

    const message = document.querySelector('#deleteMessage')

    const response = await fetch(`https://fruit-api-1-v36t.onrender.com/fruits/${fruit}`, options)

    if (response.ok) {
        e.target.fruitDelete.value = ''
        message.textContent = 'fruit successfully deleted.'

        const image = fruitList.querySelector(`img[alt="${fruit}"]`)
        if (image) {
            cal -= fruitCalories[fruit]
            fruitNutrition.textContent = "total calories: " + cal
            delete fruitCalories[fruit]
            image.remove()
        }

        setTimeout(() => {
            message.textContent = ''
        }, 3000)
    } else {
        e.target.fruitDelete.value = ''
        message.textContent = 'this fruit does not exist. please enter another one.'
        setTimeout(() => {
            message.textContent = ''
        }, 3000)
    }   
}

async function updateFruit(e) {
    e.preventDefault()

    const fruit = e.target.currentName.value.toLowerCase().trim()
    const name = e.target.updatedName.value.toLowerCase().trim()

    const data = {}

    if (name) {
        data.name = name
    }

    const message = document.querySelector('#updateMessage')

    if (Object.keys(data).length === 0) {
        message.textContent = 'please enter a new name to update the fruit.'
        setTimeout(() => {
            message.textContent = ''
        }, 3000)
        return
    }

    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(`https://fruit-api-1-v36t.onrender.com/fruits/${fruit}`, options)
        if (response.ok) {
            message.textContent = 'fruit successfully updated.'
            e.target.reset()
            setTimeout(() => {
                message.textContent = ''
            }, 3000)
        } else {
            message.textContent = 'this fruit does not exist. please enter another one.'
            setTimeout(() => {
                message.textContent = ''
            }, 3000)
        }
    } catch (error) {
        console.error('Error updating fruit:', error)
        message.textContent = 'an error occurred while updating the fruit. please try again later.'
        setTimeout(() => {
            message.textContent = ''
        }, 3000)
    }
}