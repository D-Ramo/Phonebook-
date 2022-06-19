const { request, response } = require('express')
const express = require('express')
const { header } = require('express/lib/request')
const morgan = require('morgan')
const app = express()
const PhoneBook = require('./models/phoneBook')
const connectToDataBase = require('./models/Database');
app.use(express.static('../build'))
app.use(express.json())
app.use(morgan())
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
const phoneBook = require('./models/phoneBook')


app.get('/api/persons', (request, response) => {
    PhoneBook.find({}).then(persons => {
        response.json(persons)

    })
})

app.get('/info', (request, response) => {
    response.send(`<p1>phonebook has info for ${PhoneBook.estimatedDocumentCount()} people</p1> <br> <br> <p1>${new Date()}</p1>`)
})

app.get('/api/persons/:id', (request, response) => {
    PhoneBook.findById(request.params.id).then(persons => {
        response.json(persons)

    })
})

app.delete('/api/persons/:id', (request, response) => {
    PhoneBook.findById(request.params.id).remove().then(persons => {
        response.json(persons)
    });
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new PhoneBook({
        name: body.name,
        number: body.phone,
    })
    console.log(person)
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
    response.json(person)
})



const PORT = process.env.PORT || 3001
connectToDataBase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
