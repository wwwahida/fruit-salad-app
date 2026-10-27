const Fruit = require('../models/FruitModel')

const index = async (req, res) => {
    try {
        const fruits = await Fruit.showAll()
        res.status(200).send(fruits)
    } catch (error) {
        res.status(500).send({ error : "server error"})
    }
}

const show = async (req, res) => {
    const name = req.params.name.toLowerCase()

    try {
        const fruit = await Fruit.show(name)
        res.status(200).send(fruit)
    } catch (error) {
        res.status(404).send({ error: "fruit not found" })
    }
}

const update = async (req, res) => {
    const name = req.params.name.toLowerCase()

    try {
        const fruit = await Fruit.show(name)
        const updatedFruit = await fruit.update(newFruit)
        res.status(200).send(updatedFruit)
    } catch (error) {
        res.status(404).send({ error: "fruit not found" })
    }
}

const create = async (req, res) => {
    try {
        const newFruit = await Fruit.create(req.body)
        res.status(201).send(newFruit)
    } catch (error) {
        res.status(409).send({ error: "conflict" })
    }
}

const destroy = async (req, res) => {
    const name = req.params.name.toLowerCase()

    try {
        const fruit = await Fruit.show(name)
        await fruit.destroy()
        res.status(200).send({ message: "deleted" })
    } catch (error) {
        res.status(404).send({ error: "fruit not found" })
    }
}

module.exports = {
    index,
    show,
    update,
    create,
    destroy
}