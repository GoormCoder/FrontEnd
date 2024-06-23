import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { findAllBattleResult } from '../../../store/slices/battleSlice';

const BattleRecentList = () => {

    const { battleInfo } = useAppSelector(state => state.battle);
    return (
        <BattleRecentResult>
            <div className='title'>최근 전적</div>
            <List>
                {battleInfo.battleRecords.map((battle, index) => {
                    if (index > 4) return
                    return (
                        <div>{`${battle.givenUser} VS ${battle.receivedUser} ${battle.result}`}</div>
                    )
                })}
            </List>
        </BattleRecentResult>
    )
}

export default BattleRecentList

const BattleRecentResult = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    height: 300px;
    margin-top: 20px;
    background-color: lightgray;
    border-radius: 10px;

    & .title{
        width: 90%;
        padding: 10px 10px 5px 10px;
        font-size: 20px;
        font-weight: bold;
    }
`

const List = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    height: 70%;
    background-color: white;
    border-radius: 5px;
    padding: 40px 10px 0px 10px;

    & div{
        font-size: 20px;
        font-weight: bold;
        width: 100%;
        height: 40px;
        text-align: center;
    }
`