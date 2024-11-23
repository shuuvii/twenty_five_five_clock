import React from "react";

interface TimeSetterProps{
    time: number;
    setTime: (time: number) => void;
    min: number;
    max: number;
    interval: number;
    type: "break" | "session";
};

const TimeSetter: React.FC<TimeSetterProps> = ({
    time,
    setTime,
    min,
    max,
    interval,
    type,
})  =>{
    return (
        <div>
            <button onClick={() => (time > min ? setTime(time - interval): null)}
                id={`${type}-decrement`}>
                    Down
            </button>
            <span id={`${type}-length`}>{time / interval}</span>
            <button onClick={() => (time < max ? setTime(time + interval): null)}
                id={`${type}-increment`}>
                    Up
            </button>
        </div>
    )
};

export default TimeSetter;