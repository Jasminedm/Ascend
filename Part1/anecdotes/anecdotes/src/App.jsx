import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const Anecdote = ({ text, votes }) => (
  <>
  <h3>Anecdote Of The Day</h3>
  <p>{text}</p>
  <p>Votes: {votes}</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
// Creating an array of the anecdotes, and replacing each anecdotes 
// length with 0 to create an array of 0's)
  
  const voteAnecdote = () => {
    const newVotes = [...votes]; // Create a copy of the votes array
    newVotes[selected] += 1; // Increment the vote for the selected anecdote
    setVotes(newVotes); // Update the state with the new votes
  };

  const anecdoteHighVote = anecdotes[votes.indexOf(Math.max(...votes))]

  return (
    <div>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="Get Anecdote" />
      <Button onClick={voteAnecdote} text="Vote" />

      <Anecdote text={anecdoteHighVote} votes={Math.max(...votes)} />
    </div>
  )
}

export default App
