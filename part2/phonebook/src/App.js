import { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Alert'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState('serror')

  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    console.log('button clicked', event.target)

    const person = persons.find(e => e.name === newName)
    if (person) {
      if (window.confirm(newName + ' is already added to phonebook, replace the old number with a new one')) {
        personService
        .update(person.id, person.name, newNumber)
        .then(response => {
          setNewName('')
          setNewNumber('')
          console.log(response)
          personService
          .getAll('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
        })
        .catch(error => {
          setErrorStyle(
            'unserror'
          )
          setErrorMessage(
            'Information of ' + newName + ' has already been removed from server'
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          personService
          .getAll('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
        }
        )
      }
    } else {
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
        console.log(response)
        personService
        .getAll('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
      })
    }

    setErrorMessage(
      'Added ' + newName
    )
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if (window.confirm('Delete ' + person.name)) {
        personService
        .remove(id)
        .then(response => {
          setPersons(persons.filter(n => n.id !== id))
          console.log(response)
        })
    }
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} success={errorStyle} />
      <Filter
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson} />
      <h2>Numbers</h2>
      <div>
        <Person
          persons={persons}
          newFilter={newFilter.toLowerCase()}
          deletePerson={deletePerson} />
      </div>
    </div>
  )
}

export default App