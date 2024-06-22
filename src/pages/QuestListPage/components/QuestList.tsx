import React from 'react'
import styled from 'styled-components'
import { BsCheckLg, BsThreeDots, BsChevronBarLeft, BsChevronBarRight, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useAppSelector } from '../../../hooks/reduxHooks';
import { Link } from 'react-router-dom';
import { SolvedState } from '../types';


const numbers = [1, 2, 3, 4]

const QuestList = () => {
    const { searchResult } = useAppSelector(state => state.quest);
    return (
        <>
            <QuestListContainer>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>상태</th>
                            <th style={{ width: '50%' }}>제목</th>
                            <th style={{ width: '10%' }}>난이도</th>
                            <th style={{ width: '10%' }}>맞힌 사람</th>
                            <th style={{ width: '10%' }}>정답률</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResult.map((row) => (
                            <tr key={row.id}>
                                <td style={{ textAlign: 'center' }}>
                                    {row.state ?
                                        <>
                                            {row.state == SolvedState.CORRECT ? <BsCheckLg /> : <BsThreeDots />}
                                        </>
                                        : ''}
                                </td>

                                <td style={{ textAlign: 'left', fontWeight: "bold" }}>
                                    <Link to={`/quest/${row.id}`}>
                                        {row.title}
                                    </Link>
                                </td>

                                <td style={{ textAlign: 'center', fontWeight: "bold" }}>{row.level}</td>
                                <td style={{ textAlign: 'center' }}>{row.solved}</td>
                                <td style={{ textAlign: 'center' }}>{row.accuracy}</td>
                            </tr>

                        ))}
                    </tbody>
                </table>
            </QuestListContainer>
            <PageNumberContainer>
                <BsChevronBarLeft style={{ fontSize: '20px' }} />
                <BsChevronLeft />
                {numbers.map((num) => (
                    <button>{num}</button>
                ))}
                <BsChevronRight />
                <BsChevronBarRight style={{ fontSize: '20px' }} />
            </PageNumberContainer>
        </>
    )
}

export default QuestList

const QuestListContainer = styled.div`
    border: 1px solid lightgray;
    border-radius: 5px;
    background-color: white;
    margin-top: 15px;

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: none;
        padding: 8px;
    }

    th {
        font-size: 13px;
        font-weight: bold;
        color: #003369;
        height: 25px;
    }

    td {
        font-size: 17px;
        height: 40px;
    }

    tr {
        border-bottom: 1px solid lightgray;
    }

    tbody tr:last-child {
        border-bottom: none;
    }

    svg {
        color: #238dff;
    }

    a{  
        text-decoration: none;
        color: black;
        cursor: pointer;
    }
`

const PageNumberContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
    gap: 5px;

    & button {
        width: 30px;
        height: 30px;
        font-size: 16px;
        color: black;
        border-style: none;
        background-color: lightgrey;
        border-radius: 5px;
        cursor: pointer;
    }

    & svg{
        margin: 0px 5px 0px 5px;
        cursor: pointer;
    }
`;