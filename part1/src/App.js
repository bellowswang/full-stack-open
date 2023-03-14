import { useState } from 'react'

const Statisticsline = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.value}</td>
    </tr>
  )
}

// a proper place to define a component
const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <Statisticsline name='good' value={props.good}/>
        <Statisticsline name='neutral' value={props.neutral}/>
        <Statisticsline name='bad' value={props.bad}/>
        <Statisticsline name='all' value={props.all}/>
        <Statisticsline name='average' value={props.average}/>
        <Statisticsline name='positive' value={props.positive}/>
      </tbody>
    </table>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handle}>{props.name}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(updatedGood + neutral + bad)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(updatedNeutral + good + bad)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(updatedBad + good + neutral)
  }

  const average = (good * 1 + neutral * 0 + bad * (-1)) / all

  const positive = good / all * 100 + ' %'

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' handle={handleGood} />
      <Button name='neutral' handle={handleNeutral} />
      <Button name='bad' handle={handleBad} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App