import React, { useEffect, useRef, useState } from 'react'
import { OptionByLan, OptionByLevel, OptionByStatus, SearchOptionBoxProps, SearchOptionBoxes, SearchOptionDisplayProps } from '../types';
import SearchOption from './SearchOption';
import { TiArrowSortedDown } from "react-icons/ti";
import styled from 'styled-components';



const SearchOptionBox: React.FC<SearchOptionBoxProps> = ({ boxType, setTag }) => {
    const selectRef = useRef<HTMLDivElement | null>(null);
    const [searchOption, setSearchOption] = useState<string[]>([]);

    const [selectDisplay, setSelectDisplay] = useState<string>('none');

    useEffect(() => {
        if (boxType == SearchOptionBoxes.STATE) setSearchOption(Object.values(OptionByStatus))
        if (boxType == SearchOptionBoxes.LEVEL) setSearchOption(Object.values(OptionByLevel))
        if (boxType == SearchOptionBoxes.LANGUAGE) setSearchOption(Object.values(OptionByLan))
    }, [boxType])

    useEffect(() => {
        function handleClickOutSide(e: MouseEvent) {
            if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
                setSelectDisplay('none');
            }
        }

        document.addEventListener('mouseup', handleClickOutSide);
        return () => {
            document.removeEventListener('mouseup', handleClickOutSide);
        };
    }, [])

    return (
        <SearchOptionBoxContainer ref={selectRef}>
            <SearchOptionTitle
                onClick={() => {
                    selectDisplay == 'none' ?
                        setSelectDisplay('block') : setSelectDisplay('none')
                }}>
                <div className='option-title'>{boxType}</div>
                <TiArrowSortedDown />
            </SearchOptionTitle>
            <SearchOptionContainer searchOptionDisplay={selectDisplay}>
                {searchOption.map((option) => (
                    <SearchOption boxType={boxType} option={option} setTag={setTag} />
                ))}
            </SearchOptionContainer>
        </SearchOptionBoxContainer>
    )
}

export default SearchOptionBox

const SearchOptionBoxContainer = styled.div`
    position: relative;
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
    width: 32%;
    height: 32px;
    margin-top: 15px;
    cursor: pointer;
`

const SearchOptionTitle = styled.div`
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

const SearchOptionContainer = styled.div<SearchOptionDisplayProps>`
    display: ${props => props.searchOptionDisplay};
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