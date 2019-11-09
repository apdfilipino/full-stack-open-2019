import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    //save clicks of each butotn to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return(
        <div>
            <Header />
            <Button name="good" onClick={() => setGood(good + 1)} />
            <Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button name="bad" onClick={() => setBad(bad + 1)} />
            <Total values={[good, neutral, bad]} />
        </div>
    )
}

const Header = () => <h1>give feedback</h1>

const Button = ({ name, onClick }) => {
    return (
        <button onClick={onClick}>
            {name}
        </button>
    )
}

const Total = ({values}) => {
    let all = values[0] + values[1] + values[2]
    let average = (all == 0) ? 0 : (values[0] - values[2]) / all
    let positive = (all == 0) ? 0 : values[0] / all

    return (
        <p>
            good {values[0]} <br />
            neutral {values[1]} <br />
            bad {values[2]}  <br />
            all {all} <br />
            average {average} <br />
            positive {positive}%
        </p>
    )
}




ReactDOM.render(<App />, document.getElementById('root'))