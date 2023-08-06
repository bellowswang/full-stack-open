const express = require('express')
const app = express()

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

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    id: generateId(),
    content: body.content,
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})