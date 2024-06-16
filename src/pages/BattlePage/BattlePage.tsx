import React from 'react'
import styled from 'styled-components'
import OptionBox from '../../components/OptionBox/OptionBox'
import { OptionBoxes } from '../../components/OptionBox/types'
import { testLog } from '../../utils/testLog'
import { getUserID } from '../../services/api/userAPI'
import { getUserBattleData } from '../../services/api/battleAPI'

const BattlePage = () => {

    const userID = getUserID("51");
    const userBattleData = getUserBattleData(userID.userID);
    const tierImagePath = require(`../../assets/tier/${userBattleData.tier}_tier.png`);
    const searchOptionBoxes = Object.values(OptionBoxes).slice(1, 3);
    const setValue = (type: string, checked: boolean, value: string) => {

    }

    return (
        <BattleContainer >
            <BattleContentContainer>
                <BattleTierContainer>
                    <BattleTierImage>
                        <img src={tierImagePath} alt="Tier" />
                    </BattleTierImage>
                    <BattleTierInfo>
                        <div>{userID.userName}</div>
                        <div>{userBattleData.tier} {userBattleData.score} {`(${userBattleData.rank}위)`}</div>
                        <div>{userBattleData.win}승 {userBattleData.lose}패 {`(승률 ${userBattleData.winRatio}%)`}</div>
                    </BattleTierInfo>
                </BattleTierContainer>
                <BattlePlayContainer>
                    <BattleOption>
                        {searchOptionBoxes.map((type) => (
                            <OptionBox boxType={type} setValue={setValue} />
                        ))}
                    </BattleOption>
                    <BattleSearch>
                        <button>랜덤 매칭</button>
                    </BattleSearch>
                    <BattleRecentResult>
                        <div className='title'>최근 전적</div>
                        <div className='battle-result-list'>
                            <div>userA VS userB LOSE</div>
                            <div>userA VS userB LOSE</div>
                            <div>userA VS userB LOSE</div>
                            <div>userA VS userB LOSE</div>
                            <div>userA VS userB LOSE</div>
                        </div>
                    </BattleRecentResult>
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
    height: 91.4vh; // 임시
    margin: 0px 0px 0px 0px;
`

const BattleContentContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    width: 1000px;
    height: 100%;
    background-color: white;
`


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

const BattleTierInfo = styled.form`
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

const BattlePlayContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 400px;
`

const BattleOption = styled.div`
    display: flex;
    justify-content: center;
    width: 130%;
    gap: 20px;
`

const BattleSearch = styled.div`
    width: 90%;
    & button{
        width: 100%;
        height: 90px;
        border-radius: 10px;
        font-size: 30px;
        font-weight: bold;
        color: white;
        background-color: #003369;
        border-style: none;
    }
`

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

    & .battle-result-list{
        width: 90%;
        height: 77%;
        background-color: white;
        border-radius: 5px;
        padding: 10px;
    }
`