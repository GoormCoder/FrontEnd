import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getUserBattleData } from '../../services/api/battleAPI'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { createBattleRoom, deleteBattleRoom, findBattleRoom, setBattleRoomIdEmpty, startBattle } from '../../store/slices/battleSlice'
const BattlePage = () => {
    const dispatch = useAppDispatch();
    const { loginedMember } = useAppSelector(state => state.member);
    const { battleRoom, battleData } = useAppSelector(state => state.battle);
    const nav = useNavigate();
    const userBattleData = getUserBattleData("userID"); // 수정필요
    const tierImagePath = require(`../../assets/tier/${userBattleData.tier}_tier.png`); // 수정
    const [btnText, setBtnText] = useState<string>("매칭 시작")
    const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);
    const [level, setLevel] = useState<number>(0);
    const [language, setLanguage] = useState<string>("");
    const [beforeStart, setBeforeStart] = useState<boolean>(true);
    const [searchTrigger, setSearchTrigger] = useState<boolean>(true);



    useEffect(() => {
        // 대기방 등록하고 대기방 id 받아서 저장 만약 대기방 id가 존재하면 다음 인터벌때 대기방 생성이 아니라 대기방 조회
        console.log(battleData.question.id, battleRoom.roomId, battleRoom.isFull);

        if (!beforeStart) {
            if (!battleRoom.roomId && !battleRoom.isFull) {
                console.log("대결 생성");
                dispatch(createBattleRoom({ level: level, language: language }))
            } else if (battleRoom.roomId && !battleRoom.isFull) {
                dispatch(findBattleRoom(battleRoom.roomId))
                console.log("대결 조회");
            } else if (battleRoom.roomId && battleRoom.isFull) {
                console.log("대결 시작");
                dispatch(startBattle(battleRoom.roomId))
                dispatch(setBattleRoomIdEmpty())
            }

            if (battleData.question.id && intervalId != null) {
                clearInterval(intervalId);
                nav(`/quest/${battleData.question.id}`) // api 검색에 필요한 id는 해당 페이지에서 세션스토리지에 소유 이동시 삭제
            }
        }
    }, [searchTrigger])

    const searchBattle = () => {
        if (level && language != "") {
            if (btnText === "매칭 시작") {
                setBeforeStart(false);
                setBtnText("매칭중...");
                let cnt = 1;
                const id = setInterval(() => {
                    if (cnt === 15) {
                        cancelBattle(id, "매칭 상대를 찾을 수 없습니다. 다시 시도해주세요.")
                    }
                    setSearchTrigger(pre => !pre)
                    cnt++;
                }, 2000);
                setIntervalId(id);
            } else if (intervalId != null) {
                cancelBattle(intervalId, "매칭이 취소되었습니다.")
            }
        } else {
            alert("난이도와 언어를 선택해주세요.")
        }
    }

    const cancelBattle = (intervalId: NodeJS.Timer, alertText: string) => {
        clearInterval(intervalId);
        dispatch(deleteBattleRoom(battleRoom.roomId))
        setBtnText("매칭 시작");
        setBeforeStart(true);
        alert(alertText);
        setIntervalId(null);
    }

    return (
        <BattleContainer >
            <BattleContentContainer>
                <BattleTierContainer>
                    <BattleTierImage>
                        <img src={tierImagePath} alt="Tier" />
                    </BattleTierImage>
                    <BattleTierInfo>
                        <div>{loginedMember.name}</div>
                        <div>{userBattleData.tier} {userBattleData.score} {`(${userBattleData.rank}위)`}</div>
                        <div>{userBattleData.win}승 {userBattleData.lose}패 {`(승률 ${userBattleData.winRatio}%)`}</div>
                    </BattleTierInfo>
                </BattleTierContainer>
                <BattlePlayContainer>
                    <BattleOption>
                        <select onChange={(e) => setLevel(parseInt(e.target.value))}>
                            <option value={0}>난이도</option>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                        </select>
                        <select onChange={(e) => setLanguage(e.target.value)}>
                            <option value="">언어</option>
                            <option value="Java">Java</option>
                        </select>
                    </BattleOption>
                    <BattleSearch>
                        <button onClick={searchBattle}>
                            {btnText}
                            {btnText == "매칭중..." ? <AiOutlineLoading3Quarters /> : null}
                        </button>
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

    & select{
        width: 32%;
        height: 30px;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
    }
`

const BattleSearch = styled.div`
    width: 90%;
    & button{
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        width: 100%;
        height: 90px;
        border-radius: 10px;
        font-size: 30px;
        font-weight: bold;
        color: white;
        background-color: #003369;
        border-style: none;
        cursor: pointer;
    }

    & button:hover{
        background-color: #003369e2;
    }

    & button:active{
        background-color: #003369;
    }
    & svg {
        animation: spin 2s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
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