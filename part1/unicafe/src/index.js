import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    //save clicks of each butotn to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const all = good + neutral + bad
    const average = (all === 0) ? 0 : (good - bad) / all
    const positive = (all === 0) ? 0 : good / all    

    const statistics = [
        {
            name: "good",
            value: good
        },
        {
            name: "neutral",
            value: neutral
        },
        {
            name: "bad",
            value: bad
        },        
        {
            name: "all",
            value: all
        },
        {
            name: "average",
            value: average
        },
        {
            name: "positive",
            value: positive + "%"
        }
    ]

    // console.log(statistics)

    return(
        <div>
            <Header />
            <Button name="good" onClick={() => setGood(good + 1)} />
            <Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
            <Button name="bad" onClick={() => setBad(bad + 1)} />
            <Statistics statistics={statistics} />
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

const Statistics = (props) => {
    let [good, neutral, bad, all, average, positive] = props.statistics

    if(all.value === 0){
        return (
            <>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </>
        )
    }
    else{        
        return (
            <>
                <h1>statistics</h1>
                <table>
                    <tbody>
                        <Statistic statistic={good} />
                        <Statistic statistic={neutral} />
                        <Statistic statistic={bad} />
                        <Statistic statistic={all} />
                        <Statistic statistic={average} />
                        <Statistic statistic={positive} />
                    </tbody>
                </table>
            </>
        )
    }
}

const Statistic = ( {statistic} ) => {
    return (
        <tr>
            <td>
                {statistic.name}
            </td>
            <td>
                {statistic.value}
            </td>
        </tr>
    )    
}




ReactDOM.render(<App />, document.getElementById('root'))