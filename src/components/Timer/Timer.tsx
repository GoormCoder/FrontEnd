import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { VscDebugStart } from "react-icons/vsc";
import { TbPlayerPause } from "react-icons/tb";
import { GrPowerReset } from "react-icons/gr";
import { TimerProps } from './types';

const TimerContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #222222;
    color: white;
    border-bottom: 1px solid white;
    padding: 10px;
    gap: 10px;
`;

const TimeDisplay = styled.div`
    font-size: 2rem;
    flex: 1;
    text-align: right;
    margin-right: 20px;
`;

const Button = styled.button`
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 5px;

    &:hover {
        background-color: #45a049;
    }

    &:focus {
        outline: none;
    }
`;

const AddTimeButton = styled(Button)`
    background-color: #2196F3;

    &:hover {
        background-color: #1E88E5;
    }
`;


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
            <Button onClick={handleStart}><VscDebugStart /> Start</Button>
            <Button onClick={handleStop}><TbPlayerPause /> Stop</Button>
            <Button onClick={handleReset}><GrPowerReset /> Reset</Button>
            <AddTimeButton onClick={() => handleAddTime(1)}>Add 1 minute</AddTimeButton>
        </TimerContainer>
    );
};

export default Timer;