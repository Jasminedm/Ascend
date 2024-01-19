import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>;

const GoodClick = ({ setGood, good }) => setGood(good + 1);

const NeutralClick = ({ setNeutral, neutral }) => setNeutral(neutral + 1);

const BadClick = ({ setBad, bad }) => setBad(bad + 1);

const Statistics = ({ good, neutral, bad }) => (
  <>
  <h2>Statistics</h2>
  <p>Good: {good}</p>
  <p>Neutral: {neutral}</p>
  <p>Bad: {bad}</p>
  </>
);

const App = () => {
  const title = "Give Feedback"
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  
  return (
    <div>
      <Header title={title} />
      <button onClick={() => GoodClick({ setGood, good })}>Good</button>
      <button onClick={() => NeutralClick({ setNeutral, neutral })}>Neutral</button>
      <button onClick={() => BadClick({ setBad, bad })}>Bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  );
};


export default App
