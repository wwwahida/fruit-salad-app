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