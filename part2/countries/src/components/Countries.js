import React from 'react'

const Countries = ( { countries } ) => {

    if ( countries.length > 10 ) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    else if ( countries.length > 1 && countries.length <= 10 ){
        return (
            countries.map( c => <div key={ c.alpha2Code }>{c.name}</div>)
        )
    }
    else if ( countries.length === 1 ){
        const country = countries[0]
        return (
            <div>
                <h1> {country.name} </h1>
                <div>capital {country.capital} </div>
                <div>population {country.population}</div>
                <h2>languages</h2>
                <ul>
                    {country.languages.map( (x, i) => <li key={i}>{x.name}</li>)}
                </ul>
            </div>
        )
    }
    else {
        return (
            <div></div>
        )
    }

}


export default Countries