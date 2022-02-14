const { request, response } = require('express')
const express = require('express')
const { header } = require('express/lib/request')
const morgan = require('morgan')
const app = express()

app.use(express.json())

app.use(morgan())

const cors = require('cors')
app.use(cors())

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,    
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    },
]


app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`<p1>phonebook has info for ${persons.length} people</p1> <br> <br> <p1>${new Date()}</p1>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
        
    } else {
        response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})
const genID = () => {
    const maxID = persons.length > 0 ? Math.max(...persons.map(person => person.id)) : 0
    return maxID + 1
}
app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
    console.log(request.header)
    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({
            error: "dont use same name dipshit!"
        })
    } else if(!body.number || !body.name){
        return response.status(400).json({
            error: "enter name or number!!!!!!!"
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: genID()

    }
    console.log(person)
    persons = persons.concat(person)
    response.json(person)
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})