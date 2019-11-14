import React, { useState, useEffect } from 'react'

import personService from './services/person'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Person from './components/Person'
import Notif from './components/Notif'

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ name, setName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const [ message, setMessage ] = useState('')
  const [ className, setClassName] = useState('')

  const nameChange = (event) => {
    setName(event.target.value)
  }

  const numberChange = (event) => {
    setPhoneNumber(event.target.value)
  }  

  const initialPersons = () => {
    personService
      .getAll()
      .then(p => setPersons(p))
  }

  const filtering = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (event) => {
    const id = event.target.value
    const name = persons.find(p => p.id == id).name
    if(window.confirm(`Delete ${name}?`)){
      personService
      .remove(id)
      .then(() => {
        greenNotif(`Removed ${name} successfully`)
        setPersons(persons.filter(p => p.id != id))
      })
      .catch(error => {
        errorNotif(`Information of ${name} has already been removed from the server`)
        setPersons(persons.filter(p => p.id != id))
      })
    }
  }
  
  const addPerson = (event) => {
    event.preventDefault()
    const thisName = name.trim()
    const thisNumber = phoneNumber.trim()
    if(name && phoneNumber) //Check if the name has a value and not empty
    {
      const isNameFound = persons.find( person => person.name === thisName)
      if(isNameFound){
        if(window.confirm(`${thisName} is already added to phonebook, replace the old number with a new one?`)){
          updatePerson(isNameFound)
        }
      }
      else
      {
        const newPerson = {
          name: thisName,
          number: thisNumber
        }
        personService
          .create(newPerson)
          .then(created => {
            setPersons(persons.concat(created))
            greenNotif(`Added ${newPerson.name}`)
          })
      }
    }
    else{
      alert("The name and phone number fields cannot be empty")
    }
  }

  const updatePerson = (person) => {
    const newPerson = {
      name: name.trim(),
      number: phoneNumber.trim()
    }
    personService
      .update(person.id, newPerson)
      .then( u => { //u for updated
        greenNotif(`Updated ${newPerson.name}'s number successfully`)
        setPersons(persons.map( p => p.id !== u.id ? p : u))
      })
      .catch(error => {
        errorNotif(`Information of ${name} has already been removed from the server`)
        setPersons(persons.filter(p => p.name !== newPerson.name))
      })
  }

  const showNotif = (message, className) => {
    setMessage(message)
    setClassName(className)
    setTimeout(() => {
      setMessage(null)
      setClassName('supersmall')
    }, 2500)
  }

  const errorNotif = (message) => {
    showNotif(message, 'negative')
  }

  const greenNotif = (message) => {
    showNotif(message, 'positive')
  }

  useEffect(initialPersons, [])

  return (
    <div>

      <h2>Phonebook</h2>
      <Notif message={message} className={className} />
      <Filter value={filter} onChange={filtering} />

      <h3>Add a new</h3>
      <PersonForm 
        name={name} 
        nameChange={nameChange} 
        phoneNumber={phoneNumber}
        numberChange={numberChange}
        addPerson={addPerson} 
      />

      <h2>Numbers</h2>
      { persons.map( p => p.name.includes(filter.trim()) ? (<Person key={p.name} name={p.name} number={p.number} id={p.id} onClick={deletePerson} />) : "" )}
    </div>
  )

}

export default App;
