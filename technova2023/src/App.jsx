/*import './App.css'
import Button from './Button'
import Timer from './Timer'

function App() {

  return (
    <>
      <Button/>
      <Timer maxRange ={59}/>
    </>
  )
}

export default App
*/
import React from 'react';
import CountdownTimer from './CountdownTimer';
import './App.css';

export default function App() {
  const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
 // const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;
  //const dateTimeAfterSevenDays = NOW_IN_MS + SEVEN_DAYS_IN_MS;

  return (
    <div>
      <h1> The Spotify Pomodoro Productivity Tool </h1>

      <h2>Work Smart, Not Hard!</h2>
      <CountdownTimer targetDate={dateTimeAfterThreeDays} />

    </div>
  );
}




