import { useState } from 'react'

// a proper place to define a component
const Statistics = (props) => {
  return (
    <div>{props.name} {props.value}</div>
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
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h1>statistics</h1>
      <Statistics name='good' value={good}/>
      <Statistics name='neutral' value={neutral}/>
      <Statistics name='bad' value={bad}/>
      <Statistics name='all' value={all}/>
      <Statistics name='average' value={average}/>
      <Statistics name='positive' value={positive}/>
    </div>
  )
}

export default App