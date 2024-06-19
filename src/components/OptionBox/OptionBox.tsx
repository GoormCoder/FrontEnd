import React, { useEffect, useRef, useState } from 'react'
import { OptionByLan, OptionByLevel, OptionByStatus, OptionBoxProps, OptionBoxes, optionDisplayProps } from './types';
import Option from './Option';
import { TiArrowSortedDown } from "react-icons/ti";
import styled from 'styled-components';



const OptionBox: React.FC<OptionBoxProps> = ({ boxType, setValue }) => {
    const selectRef = useRef<HTMLDivElement | null>(null);
    const [option, setOption] = useState<string[]>([]);

    const [display, setDisplay] = useState<string>('none');

    useEffect(() => {
        if (boxType == OptionBoxes.STATE) setOption(Object.values(OptionByStatus))
        if (boxType == OptionBoxes.LEVEL) setOption([OptionByLevel.LEVEL_1.toString(), OptionByLevel.LEVEL_2.toString(), OptionByLevel.LEVEL_3.toString()])
        if (boxType == OptionBoxes.LANGUAGE) setOption(Object.values(OptionByLan))
    }, [boxType])

    useEffect(() => {
        function handleClickOutSide(e: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setDisplay('none');
            }
        }

        document.addEventListener('mouseup', handleClickOutSide);
        return () => {
            document.removeEventListener('mouseup', handleClickOutSide);
        };
    }, [])

    return (
        <OptionBoxContainer ref={selectRef}>
            <OptionTitle
                onClick={() => {
                    display == 'none' ?
                        setDisplay('block') : setDisplay('none')
                }}>
                <div className='option-title'>{boxType}</div>
                <TiArrowSortedDown />
            </OptionTitle>
            <OptionContainer optionDisplay={display}>
                {option.map((option) => (
                    <Option boxType={boxType} option={option} setValue={setValue} />
                ))}
            </OptionContainer>
        </OptionBoxContainer>
    )
}

export default OptionBox

const OptionBoxContainer = styled.div`
    position: relative;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
    width: 32%;
    height: 32px;
    margin-top: 15px;
    cursor: pointer;
`

const OptionTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: bold;

    & .option-title {
        display: flex;
        align-items: center;
        height: 32px;
        margin-left: 12px;
    }

    & svg {
        font-size: 18px;
        margin-right: 12px;
    }
`

const OptionContainer = styled.div<optionDisplayProps>`
    display: ${props => props.optionDisplay};
    position: absolute;
    background-color: white;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 100%;
    top: 35px;
    left: 0px;
    padding: 10px 0px 10px 0px;

    input {
        cursor: pointer;
    }

    label {
        cursor: pointer;
    }
`