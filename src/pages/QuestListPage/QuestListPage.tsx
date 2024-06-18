import React, { FormEvent, useEffect, useState } from 'react'
import { IoSearch } from "react-icons/io5";

import { Quest, Tag } from './types';
import { OptionBoxes } from '../../components/OptionBox/types';
import { findAllQuest } from '../../services/api/questAPI';
import OptionBox from '../../components/OptionBox/OptionBox';
import QuestList from './components/QuestList';
import TagBox from './components/TagBox';

import styled from 'styled-components'
import SideStatus from './components/SideStatus';


const QuestListPage = () => {
    const questList: Quest[] = findAllQuest();
    const searchOptionBoxes = Object.values(OptionBoxes);

    const [searchText, setSearchText] = useState<string>("");
    const [tagList, setTagList] = useState<Tag[]>([]);
    const [levelList, setLevelList] = useState<string[]>([]);
    const [stateList, setStateList] = useState<(string | null)[]>([]);
    const [searchResult, setSearchResult] = useState<Quest[]>(questList);

    useEffect(() => {
        search(null, searchText, questList);
    }, [tagList])

    function setTag(type: string, checked: boolean, tagValue: string): void {
        if (checked) {
            setTagList(pre => [...pre, tagValue]);
            if (type == "난이도") setLevelList(pre => [...pre, tagValue]);
            if (type == "상태") setStateList(pre => [...pre, tagValue]);
        } else {
            removeTag(tagValue);
        }
    }

    function removeTag(tagValue: string): void {
        const checkBox = document.getElementById(tagValue)
        if (checkBox instanceof HTMLInputElement) checkBox.checked = false;

        setTagList(pre => pre.filter(tag => tag !== tagValue));
        setLevelList(pre => pre.filter(tag => tag !== tagValue));
        setStateList(pre => pre.filter(tag => tag !== tagValue));
    }

    function search(e: React.FormEvent<HTMLFormElement> | null, searchText: string, questList: Quest[]): void {
        if (e) e.preventDefault();

        const searchResult: Quest[] = questList.filter(quest => {
            let state: string = "";
            if (quest.state == "T") state = "푼 문제";
            if (quest.state == "F") state = "풀고 있는 문제";
            if (quest.state == null) state = "안 푼 문제";
            const nonBlankSearchText = removeBlank(searchText);
            const nonBlankQuestTitle = removeBlank(quest.title);
            if (!levelList.length && !stateList.length) return nonBlankQuestTitle.includes(nonBlankSearchText)
            if (!levelList.length && stateList.length) return nonBlankQuestTitle.includes(nonBlankSearchText) && stateList.includes(state);
            if (levelList.length && !stateList.length) return nonBlankQuestTitle.includes(nonBlankSearchText) && levelList.includes(quest.level);
            return nonBlankQuestTitle.includes(nonBlankSearchText) && levelList.includes(quest.level) && stateList.includes(state);
        });
        setSearchResult(searchResult);
    }

    // 문장 띄어쓰기 제거
    function removeBlank(text: string): string {
        return text.replace(/\s+/g, '');
    }

    return (
        <QuestListContainer >
            <SearchAndListContainer>
                <SearchContainer>
                    <SearchFrom onSubmit={(e) => { search(e, searchText, questList) }}>
                        <input type="search"
                            placeholder="풀고 싶은 문제 제목 검색"
                            onChange={(e) => { setSearchText(e.target.value) }} />
                        <button type="submit"><IoSearch /></button>
                    </SearchFrom>
                    <div className="search-select">
                        {searchOptionBoxes.map((type) => (
                            <OptionBox boxType={type} setValue={setTag} />
                        ))}

                    </div>

                    <TagBox tagList={tagList} removeTag={removeTag} />
                </SearchContainer>
                <QuestList searchResult={searchResult} />
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
        width: 5%;
        height: 40px;
        font-size: 25px;
        background-color: white;
        border-style: none;
        border-radius: 5px;
        cursor: pointer;
    }
`