const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const PORT = 3001
const app = express()

const morganToken = (tokens, req, res) => {
    if(tokens.method(req,res) === "POST"){
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
          ].join(' ')
    }
    else{
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms'
          ].join(' ')
    }
}

app.use(bodyParser.json())
app.use(morgan(morganToken))

app.get('/info', (req, res) => {
    const phoneLength = persons.length
    return res.send(`<div>Phonebook has info for ${phoneLength} people</div><div>${new Date()}</div>`)
})


app.get('/api/persons/:id', (req, res) =>{
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    
    if(person){
        return res.json(person)
    }
    else{
        return res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter( p => p.id !== id)
    
    return res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if(!body.name || !body.number){
        return res.status(400).json({
            error: "name/number missing"
        })
    }
    else if(persons.find(p => p.name === body.name)){
        return res.status(400).json({
            error: "name must be unique"
        })
    }
    else{
        console.log("OK")
        const person = {
            name: body.name,
            number: body.number,
            id: generateId()
        }
        persons.push(person)
        return res.json(persons)
    }
})



app.listen(PORT,()=>{
    console.log(`Express running at port ${PORT}`)
})


const generateId = () => {
    return persons.length > 0 ? Math.max(...persons.map(p => p.id)) + 1 : 0
}


const persons = [
    { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
    },
    { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
    },
    { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
    },
    { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
    }
]