import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import SpecificCountry from './components/SpecificCountry'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ component, setComponent ] = useState('')

  const getCountries = () => {
    if( filter === '')
      return 

    axios
      .get(`https://restcountries.eu/rest/v2/name/${filter}`)
      .then( response => {
        const restCountries = response.data
        setCountries(restCountries)
      })

    if ( countries.length > 10 ) {
      setComponent(<div>Too many matches, specify another filter</div>)
    }
    else if(countries.length > 1 && countries.length <= 10){
      setComponent(<Countries countries={countries} showCountry={showCountry} />)
    }
    else if(countries.length === 1){
      setComponent(<SpecificCountry country={countries[0]} />)
    }
  }

  const filterChange = (event) => {
    setFilter(event.target.value)
  }

  const showCountry = (event) => {
    setFilter(event.target.value)
  }

  useEffect(getCountries, [filter, countries])

  return (
    <div>
      find countries <input onChange={filterChange} />
      {component}
    </div>
  )
}

export default App
