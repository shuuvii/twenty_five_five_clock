import React from "react";
import { DisplayState, formatTime } from "./helper.ts";

interface DisplayProps{
    displayState: DisplayState;
    reset: () => void;
    startStop: (displayState: DisplayState) => void;
}

const Display: React.FC<DisplayProps> = ({
    displayState,
    reset,
    startStop
}) =>{
    return(
        <div className="display">
            <h4 id="timer-label">{displayState.timeType}</h4>
            <span id="time-left" style={{color: `${displayState.timerRunning ? "red" : "white"}`}}>
                {formatTime(displayState.time)}
            </span>
            <div>
                <button id="start_stop" onClick={()=>startStop(displayState)}>{displayState.timerRunning ? "Stop" : "Start"}</button>
                <button id="reset" onClick={reset}>Reset</button>
            </div>
        </div>

    )
}

export default Display;