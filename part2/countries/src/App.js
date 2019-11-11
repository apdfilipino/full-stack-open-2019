import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  const getCountries = () => {
    if( filter === '')
      return 

    axios
      .get(`https://restcountries.eu/rest/v2/name/${filter}`)
      .then( response => {
        const restCountries = response.data
        setCountries(restCountries)
      })
  }

  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(getCountries, [filter])

  return (
    <div>
      find countries <input onChange={filterChange} />
      <Countries countries={countries} />
    </div>
  )
}

export default App
