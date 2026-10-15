(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const fruitForm = document.querySelector('#inputSection form')
const fruitList = document.querySelector('#fruitSection ul')
fruitForm.addEventListener('submit', extractFruit)
fruitList.addEventListener('click', function(e) {
    if (e.target.tagName === 'LI') {
        e.target.remove()
    }
})

function extractFruit(e) {
    e.preventDefault()
    if (e.target.fruitInput.value === '') {
        alert('Please enter a fruit')
        return
    }
    addFruit(e.target.fruitInput.value)
    e.target.fruitInput.value = ''
}

function addFruit(fruit) {
    const li = document.createElement('li')
    li.textContent = fruit
    fruitList.appendChild(li)
}
},{}]},{},[1]);
