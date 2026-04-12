import { useState } from "react";

const Button = (props) => {
  return (
    <button className="btn btn-primary" onClick={props.onClick}>
      {props.text}
    </button>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const votesObject = Object.fromEntries(
    anecdotes.map((anecdotes) => [anecdotes, 0]),
  );

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesObject);

  const selectedAnecdote = anecdotes[selected];
  const votesNumber = votes[selectedAnecdote];

  const handleClick = () => {
    const randomNuber = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNuber);
  };

  const handleVotes = () =>
    setVotes({ ...votes, [selectedAnecdote]: votesNumber + 1 });

  const mostVotedFunc = () => {
    let bigestVotes = 0;
    let mostVotedAnecdote = "";
    for (const [anecdote, count] of Object.entries(votes)) {
      if (count > bigestVotes) {
        bigestVotes = count;
        mostVotedAnecdote = anecdote;
      }
    }
    console.log(mostVotedAnecdote);

    return mostVotedAnecdote;
  };

  return (
    <>
      <h2>Anecdote of the day</h2>
      <div>
        {selectedAnecdote}
        <p>has {votesNumber} votes</p>
      </div>
      <Button onClick={handleClick} text="Show an anecdote"></Button>
      <Button onClick={handleVotes} text="Vote"></Button>
      <h2>Anecdote with most votes</h2>
      <div>
        {mostVotedFunc()}
        <p>has {votes[mostVotedFunc()]} votes</p>
      </div>
    </>
  );
};

export default App;
