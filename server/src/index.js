const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const userController = require('./controllers/userController')
const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res)=> {
    res.json({info: 'Node, Express, Postgres API'})
}) 

app.get('/users', userController.getUsersHandler)
app.post('/users', userController.createUserHandler)
app.put('/users/:id', userController.updateUserHandler)
app.delete('/users/:id', userController.deleteUserHandler)
app.get("/count", userController.countUsersHandler);

app.listen(port, () => {
    console.log(`App running on: http://localhost:${port}`)
})
