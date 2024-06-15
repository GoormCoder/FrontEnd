import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styled Components
const TimerContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
    background-color: #222222;
    color: white;
    border: 1px solid white;
`;

const TimeDisplay = styled.div`
    font-size: 2rem;
    margin-bottom: 20px;
    display: flex;
    margin-top: auto;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    margin: 5px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #45a049;
    }
`;

interface TimerProps {
    onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
    const [time, setTime] = useState(60); // 기본값 1분
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (time <= 0) {
            setIsActive(false);
            clearInterval(interval!);
            onTimeUp(); // 타이머가 0이 될 때 콜백 호출
        }

        return () => clearInterval(interval!);
    }, [isActive, time, onTimeUp]);

    const handleStart = () => { 
        setIsActive(true);
    };  

    const handleStop = () => {
        setIsActive(false);
    };

    const handleReset = () => {
        setIsActive(false);
        setTime(60); // 1분으로 재설정
    };

    const handleAddTime = (minutes: number) => {
        setTime(prevTime => prevTime + minutes * 60);
    };

    return (
        <TimerContainer>
            <TimeDisplay>{new Date(time * 1000).toISOString().substr(14, 5)}</TimeDisplay>
            <Button onClick={handleStart}>Start</Button>
            <Button onClick={handleStop}>Stop</Button>
            <Button onClick={handleReset}>Reset</Button>
            <Button onClick={() => handleAddTime(1)}>Add 1 minute</Button>
        </TimerContainer>
    );
};

export default Timer;