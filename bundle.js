(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
fruitForm.addEventListener("submit", extractFruit);

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
        const respData = await fetch(`https://fruit-api-5v0j.onrender.com/fruits/${fruit}`);
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
},{}]},{},[1]);
