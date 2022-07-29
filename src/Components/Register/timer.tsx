import React, { useState, useEffect } from "react";

// Ref : https://www.codegrepper.com/code-examples/javascript/otp+countdown+timer+in+react

const Timer = (props: any) => {
    const { initialMinute = 0, initialSeconds = 0, handleFinishTimer } = props;
    const [minutes, setMinutes] = useState(initialMinute);
    const [seconds, setSeconds] = useState(initialSeconds);
    useEffect(() => {
        const myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(myInterval);
                    handleFinishTimer();
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div>
            {minutes === 0 && seconds === 0 ? null : (
                <span>{`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</span>
            )}
        </div>
    );
};

export default Timer;
