import { useState } from 'react'

const Header = (props) => <h1>{props.title}</h1>;

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => (
<p>
  {text}: {value}
</p>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good + neutral + bad)/3;
  const positive = good/(good + neutral + bad)*100;
return(
  <>
  <h2>Statistics</h2>
  <table>
    <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="Bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={average} />
      <StatisticLine text="Posotive Percentage" value={positive} />
    </tbody>
  </table>
  </>
);
};

const App = () => {
  const title = "Give Feedback"
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setALL] = useState(0)
  const statCheck = good + neutral + bad;
  
  return (
    <div>
      <Header title={title} />
      <Button onClick={() => setGood(good + 1)} text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="Nuetral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad"/>
      {statCheck > 0 && <Statistics good={good} neutral={neutral} bad={bad} />}
      
    </div>
  );
};


export default App
