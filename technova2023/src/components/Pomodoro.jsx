import { useState, useEffect } from "react"

export default function Pomodoro() {

    function Reset() {
        setTimerOn(false)
        setSeconds(0)
        setMinutes(25)
    }

    const [minutes, setMinutes] = useState(25)
    const [seconds, setSeconds] = useState(0)
    const [timerOn, setTimerOn] = useState(false)
    const [displayMessage, setDisplayMsg] = useState(false)

    useEffect(() => {
        let interval = null
        if (timerOn) {
            let interval = setInterval(() => {
                clearInterval(interval)
                if (seconds === 0) {
                    if (minutes !== 0) {
                        setSeconds(59)
                        setMinutes(minutes-1)
                    } else {
                        let minutes = displayMessage ? 24 : 4;
                        let seconds = 50;
    
                        setSeconds(seconds)
                        setMinutes(minutes)
                        setDisplayMsg(!displayMessage)
                    }
                } else {
                    setSeconds(seconds - 1)
                }
            }, 1000)
        } else {
            clearInterval(interval)
        } 
    }, [seconds,timerOn])

    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds

    return <div className='Pomodoro'>

        <div className='message'>
            {displayMessage && <div>Break time!</div>}
        </div>
        <div className='timer'>
            {timerMinutes}:{timerSeconds}
        </div>
        <button onClick={() => setTimerOn(true)}>Start</button>
        <button onClick={() => setTimerOn(false)}>Stop</button>
        <button onClick={Reset}>Reset</button>

    </div>
}