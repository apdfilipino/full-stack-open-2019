import React, { useState, useEffect } from 'react';

import axios from 'axios';

import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Person from './components/Person';

const App = () => {

  const [ persons, setPersons ] = useState([])
  const [ name, setName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const filteredPersons = persons.filter(f => f.name.includes(filter))

  const addPerson = (event) => {
    event.preventDefault()
    if( persons.filter( person => person.name === name).length > 0){
      alert(`${name} is already added to phonebook`)
    }
    else if( persons.filter( person => person.number === phoneNumber).length > 0 ){
      alert(`${phoneNumber} has already been registered for ${name}`)
    }
    else
    {
      setPersons(persons.concat({
        name: name,
        number: phoneNumber
      }))
    }
    setName('')
    setPhoneNumber('')
  }

  const nameChange = (event) => {
    setName(event.target.value)
  }

  const numberChange = (event) => {
    setPhoneNumber(event.target.value)
  }

  const filtering = (event) => {
    setFilter(event.target.value)
  }

  const initialPersons = () => {
    axios
    .get("http://localhost:3001/persons")
    .then( response => {
      const persons = response.data
      setPersons(persons)
    })
  }

  useEffect(initialPersons, [])

  return (
    <div>

      <h2>Phonebook</h2>
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
      {filteredPersons.map(f => (<Person key={f.name} name={f.name} number={f.number} />))}
    </div>
  )

}

export default App;
