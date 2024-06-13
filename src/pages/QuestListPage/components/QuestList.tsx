import React from 'react'
import styled from 'styled-components'
import { Quest, QuestListProps } from '../types'
import { FaCheck } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";



const QuestList: React.FC<QuestListProps> = ({ searchResult }) => {
    return (
        <QuestListContainer>
            <table>
                <thead>
                    <tr>
                        <th style={{ width: '7%' }}>상태</th>
                        <th style={{ width: '53%' }}>제목</th>
                        <th style={{ width: '10%' }}>난이도</th>
                        <th style={{ width: '7%' }}>맞힌 사람</th>
                        <th style={{ width: '10%' }}>정답률</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResult.map((row, index) => (
                        <tr key={index}>
                            <td style={{ textAlign: 'center' }}>
                                {row.state ?
                                    <>
                                        {row.state == "T" ? <FaCheck /> : <BsThreeDots />}
                                    </>
                                    : ''}
                            </td>
                            <td style={{ textAlign: 'left', fontWeight: "bold", cursor: "pointer" }}>{row.title}</td>
                            <td style={{ textAlign: 'center', fontWeight: "bold" }}>{row.level}</td>
                            <td style={{ textAlign: 'right' }}>{row.correctPeople}</td>
                            <td style={{ textAlign: 'center' }}>{row.accuracy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </QuestListContainer>
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
        border: none; /* 세로줄 제거 */
        padding: 8px;
    }

    th {
        font-size: 13px;
        color: #003369;
        height: 25px;
    }

    td {
        font-size: 17px;
        
        /* color: #003369; */
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
`