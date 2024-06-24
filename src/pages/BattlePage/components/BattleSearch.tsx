import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { createBattleRoom, deleteBattleRoom, findBattleRoom, setBattleRoomIdEmpty, startBattle } from '../../../store/slices/battleSlice'
import { useNavigate } from 'react-router-dom';

const BattleSearch = () => {
    const dispatch = useAppDispatch();
    const { loginedMember } = useAppSelector(state => state.member);
    const { battleRoom, battleData } = useAppSelector(state => state.battle);
    const nav = useNavigate();

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
        <BattleSearchContainer>
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
            <BattleSearchBox>
                <button onClick={searchBattle}>
                    {btnText}
                    {btnText == "매칭중..." ? <AiOutlineLoading3Quarters /> : null}
                </button>
            </BattleSearchBox>
        </BattleSearchContainer>
    )
}

export default BattleSearch
const BattleSearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    width: 100%;
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

const BattleSearchBox = styled.div`
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