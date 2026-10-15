const fruitForm = document.querySelector('#inputSection form')
const fruitList = document.querySelector('#fruitSection ul')
fruitForm.addEventListener('submit', extractFruit)

function extractFruit(e) {
    e.preventDefault()
    addFruit(e.target.fruitInput.value)
    e.target.fruitInput.value = ''
}

function addFruit(fruit) {
    const li = document.createElement('li')
    li.textContent = fruit
    li.setAttribute('onclick', 'this.remove()')
    fruitList.appendChild(li)
}