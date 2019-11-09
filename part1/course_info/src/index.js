import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course} />
            <Content contents={[[part1, exercises1],[part2, exercises2],[part3, exercises3]]}/>
            <Total exercises={[exercises1, exercises2, exercises3]} />
        </div>
    )
}


const Header = (props) => {
    return (
        <h1> {props.course} </h1>
    )
}

const Content = (props) => {
    return (
        <>
            <Part name={props.contents[0][0]} exercise={props.contents[0][1]} />
            <Part name={props.contents[1][0]} exercise={props.contents[1][1]} />
            <Part name={props.contents[2][0]} exercise={props.contents[2][1]} />
        </>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.name} {props.exercise}
        </p>
    )
}

const Total = (props) => {
    let total = 0;
    for (let i = 0; i < props.exercises.length; i++){
        total += props.exercises[i];
    }

    return (
        <p>
            Number of Exercises {total}
        </p>
    )
}




ReactDOM.render(<App />, document.getElementById('root'))