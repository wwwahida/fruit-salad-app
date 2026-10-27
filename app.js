const express = require('express')
const cors = require('cors')
const app = express()
const fruits = require('./routes/fruitRoutes')

app.use(cors())
app.use(express.json())
app.use('/fruits', fruits)

app.get('/', (req, res) => {
  res.send('fruit salad app')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

module.exports = app