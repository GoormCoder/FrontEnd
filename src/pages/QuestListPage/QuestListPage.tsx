import React, { useState } from 'react'
import styled from 'styled-components'

const QuestListPage = () => {

    type Quest = {
        title: string,
        difficulty: string,
        correctPeople: number,
        accuracy: string
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

    const [searchText, setSearchText] = useState<string>("");
    const [searchResult, setSearchResult] = useState<Quest[]>(questList);

    function search(e: any, searchText: string, questList: Quest[]): void {
        e.preventDefault();
        const searchResult: Quest[] = questList.filter(quest => {
            const nonBlankSearchText = removeBlank(searchText);
            const nonBlankQuestTitle = removeBlank(quest.title);
            return nonBlankQuestTitle.includes(nonBlankSearchText);
        });
        setSearchResult(searchResult);
        log(searchResult)
    }

    function removeBlank(text: string): string {
        return text.replace(/\s+/g, '');
    }

    const log = (msg: any) => {
        console.log(msg);
    }

    return (
        <QuestListContainer>
            <SearchAndListContainer>
                <SearchContainer>
                    <form onSubmit={(e) => { search(e, searchText, questList) }}>
                        <input type="search" onChange={(e) => { setSearchText(e.target.value) }} />
                        <input type="submit" value="검색" />
                    </form>
                    <div className="search-input">

                    </div>

                    <div className="search-select">
                        <select id="quest-level" value="난이도">
                            <option value="난이도">난이도</option>
                        </select>
                        <select id="quest-language" value="언어">
                            <option value="언어">언어</option>
                        </select>
                    </div>

                    <div className="search-tag">
                        태그
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

const SearchContainer = styled.div`
    border: 1px solid black;
`

const ListContainer = styled.div`
    border: 1px solid black;

`

const SideStatusContainer = styled.div`
    border: 1px solid black;
`