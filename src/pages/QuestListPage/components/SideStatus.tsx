import React from 'react'
import styled from 'styled-components'
import { getUserName } from '../../../services/api/questAPI';
import { BsCheckLg, BsThreeDots } from "react-icons/bs";

const SideStatus = () => {
    const userName: string = getUserName();
    return (
        <SideStatusContainer>
            <div className='user-status'>
                {userName}
            </div>
            <div className='quest-status'>
                <table>
                    <thead>
                        <tr>
                            <th>종합순위</th>
                            <th>종합점수</th>
                            <th>해결한 문제</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>3,837위</td>
                            <td>3,410점</td>
                            <td>140개</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='recent-quest'>
                최근 풀이한 문제
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '30%' }}>상태</th>
                            <th>제목</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><BsCheckLg /></td>
                            <td>같은 숫자는 싫어</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </SideStatusContainer>
    )
}

export default SideStatus

const SideStatusContainer = styled.div`
    border: 1px solid lightgray;
    border-radius: 10px;
    background-color: white;
    width: 18%;
    height: 725px;

    & .user-status{
        padding: 20px 20px 0px 20px;
        font-size: 20px;
        font-weight: bold;
        color: #003369;
        
    }

    & .quest-status{
        padding: 0px 20px 0px 20px;
        border-bottom: 1px solid lightgray;

        table {
            width: 100%;
            margin-bottom: 20px;
        }

        th, td {
            width: 5%;
            text-align: left;
        }

        th {
            font-size: 13px;
            font-weight: bold;
            color: #003369;
            height: 25px;
            
        }

        td{
            font-weight: bold;
            font-size: 15px;
        }
    }

    & .recent-quest{
        padding: 10px 20px 0px 20px;
        font-size: 20px;
        font-weight: bold;
        color: #003369;

        table {
            width: 100%;
            border: 1px solid lightgray;
            text-align: center;
            margin-top: 10px;
        }

        th {
            font-size: 13px;
            font-weight: bold;
            color: #003369;
            height: 25px;
            border-bottom: 1px solid lightgray;
        }

        td{
            font-weight: bold;
            font-size: 15px;
            color: black;
            height: 35px;
        }

        tr {
            border-bottom: 1px solid lightgray;
        }

        tbody tr:last-child {
            border-bottom: none;
        }

    }
`