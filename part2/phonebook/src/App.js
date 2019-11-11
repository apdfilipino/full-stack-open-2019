import React, { useState } from 'react';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import Person from './components/Person';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ name, setName ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  const filteredPersons = persons.filter(f => f.name.includes(filter));

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
