import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import CodeEditor from '../../components/Editor/Editor'
import { Editor } from '@monaco-editor/react'
import Timer from '../../components/Timer/Timer'
import dummy from './dummy.json'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { findQuestion } from '../../store/slices/questSlice'

interface BottomButtonProps {
    isSubmit?: boolean;
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;
const TopSection = styled.div`
    display: flex;
    flex: 1;
`;
const BottomSection = styled.div`
    background-color: #303030;
    display: flex;
    height: 40px;
`;
const LeftButton = styled.div`
    display: flex;
`;
const RightButton = styled.div`
    display: flex;
        
`;

const ProblemSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    background-color: #222222;
    border-right: 1px solid #ffffff;
`;
const EditSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    background-color: #222222;
`;

const ProblemTitle = styled.div`
    background-color: #B3B3B3;
    height: 32px;
`;
const ProblemDetail = styled.div`
    height: auto;
    color: #b2c0cc;
`;


const BottomButton = styled.button<BottomButtonProps>`
    background-color: ${props => props.isSubmit ? 'blue' : '#D5D5D5'};
    margin-top: 5px;
    margin-left: 14px;
    border-radius: 5px;
`;

const IDEPage = () => {
    const { questDetaile } = useAppSelector(state => state.quest);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const questionId = parseInt(pathParts[pathParts.length - 1]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleTimeUp = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        } else {
            console.error('buttonRef.current is null')
        }
    };

    const handleButtonClick = () => {
        alert('시간종료')
    };

    useEffect(() => {
        dispatch(findQuestion(questionId))
    }, [])

    // const preventGoBack = () => {
    //     // window.history.pushState(null, '', window.location.href); // 이거 유무에 따라 뒤로 못감
    //     alert('뒤로 갈 수 없닭! 🐓');
    // };

    // useEffect(() => {
    //     const handlePopState = () => {
    //         preventGoBack();
    //     };
    //     console.log(window.location.href)
    //     window.history.pushState(null, '', window.location.href);
    //     window.addEventListener('popstate', handlePopState);

    //     return () => {
    //         window.removeEventListener('popstate', handlePopState);
    //     };
    // }, []);

    // window.addEventListener('beforeunload', (event) => {
    //     // 제출버튼을 누른 상황에서는 작동안하게
    //     const checkBattle = sessionStorage.getItem("battleData")
    //     const normalMessage = "변경 사항이 저장되지 않을 수 있습니다. 정말로 떠나시겠습니까?";
    //     const battleMessage = "페이지를 떠날시 패배처리됩니다. 정말로 떠나시겠습니까?";
    //     event.returnValue = checkBattle ? battleMessage : normalMessage
    //     alert(checkBattle ? battleMessage : normalMessage);
    // });

    // window.addEventListener('unload', (event) => {
    //     // 제출버튼을 누른 상황에서는 작동안하게
    //     sessionStorage.removeItem("battleData")
    //     sessionStorage.removeItem("battleMember")
    //     window.location.reload();
    // });

    return (
        <MainContainer>
            <TopSection>
                <ProblemSection>
                    <ProblemTitle>문제 설명</ProblemTitle>
                    <ProblemDetail>{questDetaile.title}</ProblemDetail>
                    <ProblemDetail>{questDetaile.content}</ProblemDetail>
                    <ProblemTitle>입출력 예</ProblemTitle>
                    <ProblemDetail>{dummy.description}</ProblemDetail>
                </ProblemSection>
                <EditSection>
                    <Timer onTimeUp={handleTimeUp}></Timer>
                    <Editor
                        language='java'
                        defaultValue='import React from /n'
                        theme='vs-dark'
                    ></Editor>
                </EditSection>
            </TopSection>

            <BottomSection>
                <LeftButton>
                    <BottomButton>테스트 케이스 추가</BottomButton>
                    <BottomButton>질문하기</BottomButton>
                </LeftButton>
                <RightButton>
                    <BottomButton>다른 사람의 풀이</BottomButton>
                    <BottomButton>초기화</BottomButton>
                    <BottomButton>코드 실행</BottomButton>
                    <BottomButton isSubmit ref={buttonRef} onClick={handleButtonClick} >제출 후 채점하기</BottomButton>
                </RightButton>
            </BottomSection>
        </MainContainer>
    )
}

export default IDEPage