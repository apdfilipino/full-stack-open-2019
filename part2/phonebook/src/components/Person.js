import React from 'react'

const Person = ({ name, number, id, onClick}) => {
    return (
        <div>
            {name} {number} <button value={id} onClick={onClick}>delete</button>
        </div>
    )
}


export default Person