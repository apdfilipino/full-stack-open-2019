import React from 'react'
import SpecificCountry from './SpecificCountry'

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
            countries.map( c => <div key={ c.alpha2Code }>{c.name} <button>show</button></div>)
        )
    }
    else if ( countries.length === 1 ){
        return (
            <SpecificCountry country={countries[0]} /> 
        )       
    }
    else {
        return (
            <div></div>
        )
    }

}


export default Countries