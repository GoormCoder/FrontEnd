import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { getUserBattleData } from '../../../services/api/battleAPI';
import { findAllBattleResult } from '../../../store/slices/battleSlice';
import { Tier } from '../types';

const BattleTierInfo = () => {
    const dispatch = useAppDispatch();
    const { loginedMember } = useAppSelector(state => state.member);
    const { battleInfo } = useAppSelector(state => state.battle);
    const [tier, setTier] = useState<string>(Tier.BRONZE)
    const tierImagePath = require(`../../../assets/tier/${tier}_tier.png`); // 수정

    useEffect(() => {
        if (battleInfo.battleScore >= 2000) {
            setTier(Tier.GOLD)
        }
        else if (battleInfo.battleScore >= 1500) {
            setTier(Tier.SILVER)
        } else if (battleInfo.battleScore >= 1000) {
            setTier(Tier.BRONZE)
        }
    }, [battleInfo])

    return (
        <BattleTierContainer>
            <BattleTierImage>
                <img src={tierImagePath} alt="Tier" />
            </BattleTierImage>
            <BattleTierInfoBox>
                <div>{loginedMember.name}</div>
                <div>{tier} {battleInfo.battleScore}</div>
                <div>{battleInfo.totalResult} {battleInfo.winRate}</div>
            </BattleTierInfoBox>
        </BattleTierContainer>
    )
}

export default BattleTierInfo

const BattleTierContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    width: 400px;
`

const BattleTierImage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;

    & img{
        width: 100%;
    }
`

const BattleTierInfoBox = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 90%;
    font-size: 22px;
    font-weight: bold;
    background-color: lightgray;
    border-radius: 10px;
    padding: 30px 0px 30px 0px;
`