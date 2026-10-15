const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
fruitForm.addEventListener("submit", extractFruit);

let cal = 0;

function extractFruit(e) {
  e.preventDefault();
  fetchFruitData(e.target.fruitInput.value);
  e.target.fruitInput.value = "";
}

function addFruit(fruit) {
  const li = document.createElement("li");
  li.textContent = fruit.name;
  li.setAttribute("onclick", "this.remove()");
  fruitList.appendChild(li);

  cal += fruit.nutritions.calories;
  fruitNutrition.textContent = cal;
}

async function fetchFruitData(fruit) {
    try {
        const resp = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`);

        if (resp.ok) {
            const data = await resp.json();
            addFruit(data);
        } else {
            throw "Error: http status code = " + resp.status;
        }
    } catch (e) {
        console.log(e);
    }
}