import React from 'react'
import styled from 'styled-components'

const QuestListPage = () => {

    const data = [
        { title: '문제 1', difficulty: '쉬움', correctPeople: 10, accuracy: '90%' },
        { title: '문제 2', difficulty: '보통', correctPeople: 8, accuracy: '80%' },
        { title: '문제 3', difficulty: '어려움', correctPeople: 5, accuracy: '50%' },
    ];

    return (
        <QuestListContainer>
            <SearchAndListContainer>
                <SearchContainer>
                    <div className="search-input">
                        <input type="search" />
                        <input type="submit" value="검색" />
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
                            {data.map((row, index) => (
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
                    이름
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
    height: 100%;
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