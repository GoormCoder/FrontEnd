import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type Quest = {
    title: string,
    difficulty: string,
    correctPeople: number,
    accuracy: string
}

type Tag = string

interface SelectProps {
    levelDisplay: string,
    languageDisplay: string
}

// 임시 문제 리스트
const questList: Quest[] = [
    { title: '같은 숫자는 싫어', difficulty: 'Level 1', correctPeople: 10, accuracy: '90%' },
    { title: '기능개발', difficulty: 'Level 2', correctPeople: 48, accuracy: '80%' },
    { title: '올바른 괄호', difficulty: 'Level 2', correctPeople: 35, accuracy: '50%' },
    { title: '프로세스', difficulty: 'Level 2', correctPeople: 15, accuracy: '50%' },
    { title: '다리를 지나는 트럭', difficulty: 'Level 2', correctPeople: 77, accuracy: '80%' },
    { title: '주식가격', difficulty: 'Level 2', correctPeople: 5, accuracy: '80%' },
    { title: '체육복', difficulty: 'Level 1', correctPeople: 50, accuracy: '60%' },
    { title: '섬 연결하기', difficulty: 'Level 3', correctPeople: 52, accuracy: '50%' },
    { title: '단속카메라', difficulty: 'Level 3', correctPeople: 95, accuracy: '90%' },
    { title: '큰 수 만들기', difficulty: 'Level 2', correctPeople: 35, accuracy: '50%' },
];

// 임시 유저 이름
const userName: string = "최진수(닉네임)";


const QuestListPage = () => {
    const levelSelectRef = useRef<HTMLDivElement | null>(null);
    const languageSelectRef = useRef<HTMLDivElement | null>(null);

    const [searchText, setSearchText] = useState<string>("");
    const [tagList, setTagList] = useState<Tag[]>([]);
    const [levelDisplay, setLevelDisplay] = useState<string>('none');
    const [languageDisplay, setLanguageDisplay] = useState<string>('none');
    const [searchResult, setSearchResult] = useState<Quest[]>(questList);




    useEffect(() => {
        function handleClickOutSide(e: MouseEvent) {
            if (levelSelectRef.current && !levelSelectRef.current.contains(e.target as Node)) {
                setLevelDisplay('none');
            }
            if (languageSelectRef.current && !languageSelectRef.current.contains(e.target as Node)) {
                setLanguageDisplay('none');
            }
        }

        document.addEventListener('mouseup', handleClickOutSide);
        return () => {
            document.removeEventListener('mouseup', handleClickOutSide);
        };
    }, [])


    function setTag(checked: boolean, tagValue: string): void {
        if (checked) {
            setTagList(pre => [...pre, tagValue]);
        } else {
            removeTag(tagValue);
        }
    }

    function removeTag(tagValue: string): void {
        const checkBox = document.getElementById(tagValue)
        if (checkBox instanceof HTMLInputElement) checkBox.checked = false;

        setTagList(pre => pre.filter(tag => tag !== tagValue));
    }

    function search(e: any, searchText: string, questList: Quest[]): void {
        e.preventDefault();
        const searchResult: Quest[] = questList.filter(quest => {
            const nonBlankSearchText = removeBlank(searchText);
            const nonBlankQuestTitle = removeBlank(quest.title);
            return nonBlankQuestTitle.includes(nonBlankSearchText);
        });
        setSearchResult(searchResult);
    }

    // 문장 띄어쓰기 제거
    function removeBlank(text: string): string {
        return text.replace(/\s+/g, '');
    }





    const log = (msg: any) => {
        console.log(msg);
    }

    return (
        <QuestListContainer >
            <SearchAndListContainer>
                <SearchContainer levelDisplay={levelDisplay} languageDisplay={languageDisplay}>
                    <form onSubmit={(e) => { search(e, searchText, questList) }}>
                        <input type="search" onChange={(e) => { setSearchText(e.target.value) }} />
                        <input type="submit" value="검색" />
                    </form>
                    <div className="search-input">

                    </div>

                    <div className="search-select">
                        <div className='select-container' ref={levelSelectRef}>
                            <div className='select-title'
                                onClick={() => {
                                    levelDisplay == 'none' ?
                                        setLevelDisplay('block') : setLevelDisplay('none')
                                }}>
                                난이도 선택 박스
                            </div>
                            <div className='select-lists level'>
                                <div>
                                    <input type="checkbox" name="Level 1" id="Level 1" onChange={(e) => (setTag(e.target.checked, e.target.id))} />
                                    <label htmlFor="Level 1">Level 1</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="Level 2" id="Level 2" onChange={(e) => (setTag(e.target.checked, e.target.id))} />
                                    <label htmlFor="Level 2">Level 2</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="Level 3" id="Level 3" onChange={(e) => (setTag(e.target.checked, e.target.id))} />
                                    <label htmlFor="Level 3">Level 3</label>
                                </div>
                            </div>
                        </div>
                        <div className='select-container' ref={languageSelectRef}>
                            <div className='select-title'
                                onClick={() => {
                                    languageDisplay == 'none' ?
                                        setLanguageDisplay('block') : setLanguageDisplay('none')
                                }}>
                                언어 선택 박스
                            </div>
                            <div className='select-lists language'>
                                <div>
                                    <input type="checkbox" name="Java" id="Java" onChange={(e) => (setTag(e.target.checked, e.target.id))} />
                                    <label htmlFor="Java">Java</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="Python" id="Python" onChange={(e) => (setTag(e.target.checked, e.target.id))} />
                                    <label htmlFor="Python">Python</label>
                                </div>
                                <div>
                                    <input type="checkbox" name="Oracle" id="Oracle" onChange={(e) => (setTag(e.target.checked, e.target.id))} />
                                    <label htmlFor="Oracle">Oracle</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="search-tags">
                        {tagList.map((name, index) => (
                            <div className="tag" key={index}>
                                {name}
                                <span className="tag-close-btn" onClick={() => { removeTag(name) }}>X</span>
                            </div>
                        ))}
                    </div>
                </SearchContainer>
                <ListContainer>
                    <table>
                        <thead>
                            <tr>
                                <th>제목</th>
                                <th>난이도</th>
                                <th>맞힌 사람</th>
                                <th>정답률</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchResult.map((row, index) => (
                                <tr key={index}>
                                    <td>{row.title}</td>
                                    <td>{row.difficulty}</td>
                                    <td>{row.correctPeople}</td>
                                    <td>{row.accuracy}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </ListContainer>
            </SearchAndListContainer>
            <SideStatusContainer>
                <div>
                    {userName}
                </div>
                <div>
                    맞춘 문제 수
                </div>
                <div>
                    최근 풀이한 문제
                </div>
            </SideStatusContainer>
        </QuestListContainer>
    )
}

export default QuestListPage

const QuestListContainer = styled.div`
    border: 1px solid black;
    display: flex;
    justify-content: center;
    gap: 50px;
    width: 100%;
    padding-top: 150px;
`
const SearchAndListContainer = styled.div`
    border: 1px solid black;
    width: 70%;
`

const SearchContainer = styled.div<SelectProps>`
    border: 1px solid black;

    & .search-select {
        display: flex;
        gap: 10px;
    }

    & .select-container {
        position: relative;
        border: 1px solid lightgray;
        width: 150px;

    }

    & .select-lists {
        
        position: absolute;
        background-color: lightgray;
        border: 2px solid black;
        width: 150px;
        top: 25px;
        left: 0px;
    }

    & .level {
        display: ${props => props.levelDisplay};
    }

    & .language {
        display: ${props => props.languageDisplay};
    }

    & .search-tags {
        display: flex;
        gap: 10px;
    }

    & .tag {
        text-align: center;
        border: 1px solid black;
        border-radius: 10px;
        width: 70px;
        padding: 5px;
        cursor: default;
    }

    & .tag-close-btn {
        margin-left: 5px;
        font-size: 15px;
        cursor: pointer;
    }
`

const ListContainer = styled.div`
    border: 1px solid black;

`

const SideStatusContainer = styled.div`
    border: 1px solid black;
`