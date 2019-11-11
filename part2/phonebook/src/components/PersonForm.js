import React from 'react'

const PersonForm = ({ name, nameChange, phoneNumber, numberChange, addPerson}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value = {name}
            onChange = {nameChange}
          />
        </div>
        <div>
          phone number: 
          <input 
            value = {phoneNumber}
            onChange = {numberChange}
          />
        </div>
        <button type="submit">add</button>
      </form>
    )
}

export default PersonForm