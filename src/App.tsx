import {useState,useEffect} from 'react';
import './App.scss';
import { DisplayState } from './helper';
import React from 'react';
import TimeSetter from './TimeSetter.tsx';
import Display from './Display.tsx';


const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

function App() {

  const [breakTime,setBreakTime] = useState(defaultBreakTime);
  const [sessionTime,setSessionTime] = useState(defaultSessionTime);
  const [displayState,setDisplayState] = useState<DisplayState>({
    time: sessionTime,
    timeType: "Session",
    timerRunning: false,
  });

  useEffect(()=>{
    let timerID: number;
    if(!displayState.timerRunning) return;

    if(displayState.timerRunning){
      timerID = window.setInterval(decrementDisplay,1000);
    }

    return () =>{
      window.clearInterval(timerID);
    };
  },[displayState.timerRunning]);

  useEffect(()=>{
    if(displayState.time < 0){
      const audio = document.getElementById("beep") as HTMLAudioElement;
      audio.currentTime  = 2;
      audio.play().catch((err)=>console.log(err));
      setDisplayState((prev)=>({
        ...prev,
        timeType: prev.timeType === "Session" ? "Break" : "Session",
        time: prev.timeType === "Session" ? breakTime : sessionTime
      }));
    }
  },[displayState,breakTime,sessionTime]);

  const reset = () =>{
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
    setDisplayState({
      time: defaultSessionTime,
      timeType: "Session",
      timerRunning: false
    });
    const audio = document.getElementById("beep") as HTMLAudioElement;
    audio.pause();
    audio.currentTime = 0;
  };

  const startStop = () =>{
    setDisplayState((prev)=>({
      ...prev,
      timerRunning: !prev.timerRunning   
    }));
  };

  const changeBreakTime = (time: number) =>{
    if(displayState.timerRunning) return;
    setBreakTime(time);
  };

  const decrementDisplay = () =>{
    setDisplayState((prev)=>({
      ...prev,
      time: prev.time -1
    }));
  };

  const changeSessionTime = (time: number) =>{
    if(displayState.timerRunning) return;
    setSessionTime(time);
    setDisplayState({
      time: time,
      timeType: "Session",
      timerRunning: false,
    });
  };

  return (
    <div className="App">
      <h1>25 + 5 Clock</h1>
      <div className="setters">
        <div id="break">
          <h2 id="break-label">Break length</h2>
          <TimeSetter 
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type={'break'} />
        </div>
        <div id="session">
          <h2 id="session-label">Session length</h2>
          <TimeSetter 
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type={'session'} />
        </div>
      </div>
      <Display 
        displayState={displayState}
        reset={reset}
        startStop={startStop}/>
      <audio id="beep" preload="auto"
       src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" />
    </div>
  );
}

export default App;
