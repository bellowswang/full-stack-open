const express = require('express')
const app = express()

app.use(express.json())

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
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

const numberOfObjects = persons.length

const now = new Date();

function addLeadingZero(number) {
  return number.toString().padStart(2, '0');
}

function timezoneOffsetToTimezoneString(offset) {
  const sign = offset < 0 ? "+" : "-";
  const hours = Math.abs(Math.floor(offset / 60));
  const minutes = Math.abs(offset % 60);
  return `GMT${sign}${addLeadingZero(hours)}${addLeadingZero(minutes)} (Eastern European Standard Time)`;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const dayOfWeek = daysOfWeek[now.getDay()];
const month = monthsOfYear[now.getMonth()];
const day = now.getDate();
const year = now.getFullYear();
const hours = now.getHours();
const minutes = now.getMinutes();
const seconds = now.getSeconds();
const timezoneOffset = now.getTimezoneOffset();
const timezone = timezoneOffsetToTimezoneString(timezoneOffset);

const formattedTime = `${dayOfWeek} ${month} ${day} ${year} ${hours}:${addLeadingZero(minutes)}:${addLeadingZero(seconds)} ${timezone}`;

app.get('/info', (request, response) => {
    response.send(`Phonebook has info for ${numberOfObjects} people <br/> ${formattedTime}`)
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
  const person = {
    id: getRandomInt(10000),
    name: body.name,
    number: body.number
  }

  if (persons.some(p => p.name === person.name)) {
    response.status(400).json( {error: 'name must be unique'} )
  } else {
    persons = persons.concat(person)
    response.json(person)
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})