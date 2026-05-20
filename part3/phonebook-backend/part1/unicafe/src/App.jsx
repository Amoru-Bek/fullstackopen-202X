import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const Statistics = (props) => {
  return (
    <tr>
      <td>
        {props.name}         
      </td>
      <td>
        {props.value}
    </td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const hadleClick = (setter) => {
    setter((prev) => prev + 1);
    setAll(all + 1);
  };

  return (
    <>
      <h2>give a feedback</h2>
      <Button onClick={() => hadleClick(setGood)} text="good"></Button>
      <Button onClick={() => hadleClick(setNeutral)} text="neutral"></Button>
      <Button onClick={() => hadleClick(setBad)} text="bad"></Button>
      <h2>Statistics</h2>
      {all === 0 && <p>No feedback given</p>}
      {all != 0 && (
        
          <table>
            <tbody>
            <Statistics value={good} name="Good"></Statistics>
            <Statistics value={neutral} name="Nuetral"></Statistics>
            <Statistics value={bad} name="Bad"></Statistics>
            <Statistics value={all} name="All"></Statistics>
            <Statistics value={(good - bad) / all} name="Average"></Statistics>
            <Statistics value={good / all} name="Positive"></Statistics>
            </tbody>
          </table>
        
      )}
    </>
  );
};

export default App;
