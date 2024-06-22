import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserBattleData } from '../../services/api/battleAPI'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import BattleSearch from './components/BattleSearch'
import BattleRecentList from './components/BattleRecentList'
import BattleTierInfo from './components/BattleTierInfo'
import { findAllBattleResult } from '../../store/slices/battleSlice'

const BattlePage = () => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(findAllBattleResult())
    }, [])

    return (
        <BattleContainer >
            <BattleContentContainer>
                <BattleTierInfo />
                <BattlePlayContainer>
                    <BattleSearch />
                    <BattleRecentList />
                </BattlePlayContainer>
            </BattleContentContainer>
        </BattleContainer>
    )
}

export default BattlePage

const BattleContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
`

const BattleContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    width: 70%;
    height: 100%;
    background-color: white;
`

const BattlePlayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 400px;
`

