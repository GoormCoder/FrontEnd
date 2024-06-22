import React, { FormEvent, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import styled from 'styled-components';

import OptionBox from '../../components/OptionBox/OptionBox';
import QuestList from './components/QuestList';
import TagBox from './components/TagBox';
import SideStatus from './components/SideStatus';

import { setSearchText, setTag, removeTag, search, findAllQuest } from '../../store/slices/questSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { OptionBoxes } from '../../components/OptionBox/types';


const QuestListPage = () => {

    const dispatch = useAppDispatch();
    const { searchText, tagList } = useAppSelector(state => state.quest);

    useEffect(() => {
        dispatch(findAllQuest());
    }, [dispatch]);

    useEffect(() => {
        dispatch(search());
    }, [tagList, dispatch]);

    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(search());
    };


    return (
        <QuestListContainer >
            <SearchAndListContainer>
                <SearchContainer>
                    <SearchFrom onSubmit={handleSearch}>
                        <input type="search"
                            placeholder="풀고 싶은 문제 제목 검색"
                            value={searchText}
                            onChange={(e) => { dispatch(setSearchText(e.target.value)) }} />
                        <button type="submit"><IoSearch /></button>
                    </SearchFrom>
                    <div className="search-select">
                        {Object.values(OptionBoxes).map((type) => (
                            <OptionBox boxType={type} setValue={(type: string, checked: boolean, tagValue: string) => dispatch(setTag({ type, checked, tagValue }))} />
                        ))}
                    </div>
                    <TagBox tagList={tagList} removeTag={(tagValue: string) => dispatch(removeTag(tagValue))} />
                </SearchContainer>
                <QuestList />
            </SearchAndListContainer>
            <SideStatus />
        </QuestListContainer>
    )
}

export default QuestListPage

const QuestListContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 50px;
    width: 100%;
    margin: 100px 0px 80px 0px;

    @media only screen and (max-width: 430px) {
        flex-direction: column-reverse;
        align-items: center;
        gap: 15px;
    }
`
const SearchAndListContainer = styled.div`
    width: 770px;
    @media only screen and (max-width: 430px) {
        width: 90%;
    }
`

const SearchContainer = styled.div`
    & .search-select {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
`

const SearchFrom = styled.form`
    display: flex;
    position: relative;
    align-items: center;

    & input {
        width: 100%;
        height: 45px;
        font-size: 16px;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding-left: 15px;
        cursor: text;
    }

    & input:hover {
        border: 2px solid #003369;
    }

    & ::placeholder {
        color: lightgray;
    }

    & button {
        position: absolute;
        right: 2px;
        width: 40px;
        height: 40px;
        font-size: 25px;
        background-color: white;
        border-style: none;
        border-radius: 5px;
        cursor: pointer;
    }
`