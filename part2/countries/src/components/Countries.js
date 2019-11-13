import React from 'react'

const Countries = ( { countries, showCountry } ) => { 
    const rows = countries.map( c => <div key={ c.alpha2Code }>{c.name} <button onClick={showCountry} value={c.name}>show</button></div>)
    return rows
}


export default Countries