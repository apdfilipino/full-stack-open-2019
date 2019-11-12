import React from 'react'
import Weather from './Weather'

const SpecificCountry = ({ country }) => {
    return (
        <div>
            <h1> {country.name} </h1>
            <div>capital {country.capital} </div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            <ul>
                {country.languages.map( (x, i) => <li key={i}>{x.name}</li>)}
            </ul>
            <img src={country.flag} alt={`Flag of ${country.name}`} height="100" width="200"/>
            <Weather location={country.capital} />
        </div>
    )
}

export default SpecificCountry