import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { BsCheckLg, BsThreeDots } from "react-icons/bs";
import { FaCircleQuestion } from "react-icons/fa6";
import RankInfo from './RankInfo';
import { User } from '../../ChatFriendPage/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { findMemberSolve } from '../../../store/slices/questSlice';

const SideStatus = () => {
    const dispatch = useAppDispatch();
    const { loginedMember } = useAppSelector(state => state.member);
    const { solveList } = useAppSelector(state => state.quest);
    const [rankInfoDisplay, setRankInfoDisplay] = useState<boolean>(false);

    useEffect(() => {
        dispatch(findMemberSolve(loginedMember.loginId))
    }, [])

    return (
        <SideStatusContainer>
            <div className='user-status'>
                <div>
                    {loginedMember.name + `(${loginedMember.nickname})`}
                </div>
                <FaCircleQuestion onClick={() => setRankInfoDisplay(pre => !pre)} />
                <RankInfo rankInfoDisplay={rankInfoDisplay} setRankInfoDisplay={setRankInfoDisplay} />
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
                            <td>11위</td>
                            <td>100점</td>
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
                        {solveList.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    {row.solveResult ?
                                        <>
                                            {row.solveResult == "T" ? <BsCheckLg /> : <BsThreeDots />}
                                        </>
                                        : ''}
                                </td>
                                <td style={{ textAlign: "left", cursor: "pointer" }}>{row.questionSummaryDto.title}</td>
                            </tr>
                        ))}
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
    width: 310px;
    height: fit-content;
    /* height: 725px; */
    @media only screen and (max-width: 430px) {
        width: 90%;
        height: fit-content;
        & .recent-quest {
            display: none;
        }
    }

    & .user-status{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px 20px 0px 20px;
        font-size: 20px;
        font-weight: bold;
        color: #003369;
        
        & svg {
            font-size: 18px;
            color: lightgray;
            cursor: pointer;
            :hover {
                color:gray;
            }
        }
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
            margin: 10px 0px 25px 0px;
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