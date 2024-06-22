import React, { useEffect, useState } from 'react'
import { User } from '../../ChatFriendPage/types';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { RankType } from '../types';
import { findAllBattleRank, findAllPraiseRank } from '../../../store/slices/memberSlice';

const RankTable: React.FC<{ rankType: string }> = ({ rankType }) => {
    const dispatch = useAppDispatch();
    const { RankData } = useAppSelector(state => state.member);

    useEffect(() => {
        if (rankType == RankType.PRAISE) dispatch(findAllPraiseRank())
        if (rankType == RankType.BATTLE) dispatch(findAllBattleRank())
        if (rankType == RankType.SOLVED) dispatch(findAllBattleRank())
    }, [rankType])
    return (
        <RankTableContainer>
            <table className="ranking-table">
                <thead>
                    <tr>
                        <th>순위</th>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>점수</th>
                    </tr>
                </thead>
                <tbody>
                    {RankData.map((user) => (
                        <tr key={user.loginId}>
                            <td style={{ width: "10%" }}>{user.type?.rank}</td>
                            <td style={{ width: "30%" }}>{user.name}</td>
                            <td style={{ width: "30%" }}>{user.loginId}</td>
                            <td style={{ width: "30%" }}>{user.type?.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </RankTableContainer>
    );
};

export default RankTable

const RankTableContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    border: 1px solid lightgray;
    border-radius: 0 0 10px 10px;
    background-color: white;
    width: 808px;
    /* height: 60vh; */
    padding: 20px 0 20px 0;

    & table {
        width: 90%;
        text-align: center;
        font-size: 18px;
        margin: 40px 0 40px 0;
    }

    & thead {
        background-color: #75bfffe3;
    }

    & tbody {
        background-color: whitesmoke;
    }

    & tr {
        height: 40px;
    }
`