(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}]},{},[1]);
