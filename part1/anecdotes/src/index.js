import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const length = props.anecdotes.length
    const [points, setPoints] = useState(Array(length).fill(0))
    const copy = [...points]
    const maxIndex = points.indexOf(Math.max(...points))
    const random = Math.floor(Math.random() * length)

    return (
        <>
            <Anectode title="Anecdote of the day" anecdote = {props.anecdotes[selected]} points= {points[selected]} />
            <br />
            <Button name="vote" onClick={() => {
                copy[selected] += 1
                setPoints(copy)              
            }}  />
            <Button name="next anectode" onClick={() => {setSelected(random)}} />
            <br />
            <Anectode title="Anecdote with most votes" anecdote = {props.anecdotes[maxIndex]} points= {points[maxIndex]} />
        </>
    )
}


const Button = ({ name, onClick }) => {
    return (
        <button onClick={onClick}>
            {name}
        </button>
    )
}

const Anectode = ({ title, anecdote, points }) => {
    return (
        <>
            <h1>
                {title}
            </h1>
            <div>
                {anecdote}
            </div>
            <div>
                has {points} votes.
            </div>
        </>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)