import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Editor } from '@monaco-editor/react';
import Timer from '../../components/Timer/Timer';
import ReactMarkdown from 'react-markdown';
import { createSolve, getSolve } from '../../services/api/solveAPI';
import { findQuestionApi } from '../../services/api/questAPI';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { findQuestion } from '../../store/slices/questSlice';
import { BottomButtonProps, CreateSolveRequest } from './types';
import { SolvedState } from '../QuestListPage/types';
import { setAllBattleDataEmpty, submitBattle } from '../../store/slices/battleSlice';
import { useEffect } from 'react';


const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
    overflow: hidden;
`;

const TopSection = styled.div`
    display: flex;
    flex: 1;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const BottomSection = styled.div`
    background-color: #303030;
    display: flex;
    justify-content: space-between;
    height: 40px;
`;

const LeftButton = styled.div`
    display: flex;
`;

const RightButton = styled.div`
    display: flex;
    margin-right: 10px;
`;

const ProblemSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
    background-color: #222222;
    border-right: 1px solid #ffffff;
    overflow: hidden;
    @media (max-width: 768px) {
        width: 100%;
        border-bottom: 1px solid #ffffff;
    }
`;

const EditSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 70%;
    background-color: #222222;
    overflow: hidden;
    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ProblemTitle = styled.div`
    background-color: #B3B3B3;
    height: 32px;
`;

const ProblemDetail = styled.div`
    flex: 1;
    height: auto;
    color: #b2c0cc;
`;

const BottomButton = styled.button<BottomButtonProps>`
    height: 40px;
    font-size: 16px;
    border: ${props => props.isSubmit ? 'none' : '1px solid lightgray'};
    border-radius: 5px;
    cursor: pointer;
    background-color: ${props => props.isSubmit ? '#003369' : '#D5D5D5'};
    color: ${props => props.isSubmit ? '#ffffff' : '#000000'};
    margin-top: 5px;
    margin-left: 14px;

    &:hover {
        background-color: ${props => props.isSubmit ? '#002244' : '#C5C5C5'};
    }
`;

const ResultSection = styled.div`
    margin-top: 20px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
    color: #333;
`;

const IDEPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const pathParts = location.pathname.split('/');
    const questionId = parseInt(pathParts[pathParts.length - 1]);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [initialCode, setInitialCode] = useState(
        `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);

    const { battleData, battleMember, battleResult } = useAppSelector(state => state.battle);

    const [currentCode, setCurrentCode] = useState(initialCode);
    const [language, setLanguage] = useState('JAVA');
    const [gradingResult, setGradingResult] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [questionTitle, setQuestionTitle] = useState<string>('');
    const [questionContent, setQuestionContent] = useState<string>('');

    useLayoutEffect(() => {
        const fetchQuestion = async () => {
            try {
                const questionData = await findQuestionApi(questionId);
                setQuestionTitle(questionData.title);
                setQuestionContent(questionData.content);
            } catch (error) {
                console.error('문제를 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchQuestion();

        // ResizeObserver 오류 코드 
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(() => { });
            ro.observe(document.body);
        }
    }, [questionId]);


    const handleTimeUp = () => {
        if (buttonRef.current) {
            buttonRef.current.click();
        } else {
            console.error('error');
        }
    };

    const handleButtonClick = async () => {
        try {
            const solveRequest = {
                code: currentCode,
                language: language
            };
            console.log(solveRequest);
            if (!battleData.battleId) {
                const solveResponse = await createSolve(questionId, solveRequest);
                const result = await getSolve(solveResponse.solveId);
                setGradingResult(result.solveResult);
                setIsCorrect(result.solveResult === SolvedState.CORRECT);

                if (result.solveResult === SolvedState.CORRECT) {
                    alert('정답입니다!');
                    navigate(`/questions/${questionId}/solves`);
                } else {
                    alert(`틀렸습니다.`); // 오류: ${result.errorMessage}
                    // setErrorMessage(result.errorMessage || ''); 
                }
            } else {
                submitBattlehandler(solveRequest);
            }
        } catch (error) {
            console.error('풀이 제출 중 오류가 발생했습니다:', error);
            alert('풀이 제출 중 오류가 발생했습니다.');
        }
    };
    const handleReset = () => {
        setCurrentCode(initialCode);
        setGradingResult(null);
        setIsCorrect(null);
        setErrorMessage(null);
    };

    useLayoutEffect(() => {
        dispatch(findQuestion(questionId));
    }, [dispatch, questionId]);



    const handleQuestionClick = () => {
        if (battleData.battleId) {
            if (window.confirm("대결 진행중!\n다른 페이지로 이동시 다시 입장 불가합니다.\n뒤로 가시겠습니까?")) {
                dispatch(setAllBattleDataEmpty())
                window.location.replace('/board');
            }
        } else {
            navigate('/board');
        }
    };

    const handleGoBack = () => {
        if (battleData.battleId) {
            if (window.confirm("대결 진행중!\n뒤로 이동시 다시 입장 불가합니다.\n뒤로 가시겠습니까?")) {
                dispatch(setAllBattleDataEmpty())
                window.location.replace('/quest');
            }
        } else {
            navigate('/quest');
        }

    };

    const handleOtherSolvesClick = async () => {
        try {
            if (battleData.battleId) {
                alert("대결 중엔 이용하실 수 없습니다!")
            } else {
                navigate(`/questions/${questionId}/solves`);
            }
        } catch (error) {
            console.error('다른 사람의 풀이를 불러오는 중 오류가 발생했습니다:', error);
            alert('다른 사람의 풀이를 불러오는 중 오류가 발생했습니다.');
        }
    };

    const submitBattlehandler = (solveRequest: CreateSolveRequest) => {
        dispatch(submitBattle({ battleId: battleData.battleId, questionId: battleData.question.id, solveRequest }))
        console.log(battleResult);
    }

    useEffect(() => {
        if (battleResult.solveResult == SolvedState.CORRECT) {
            alert(battleResult.battleResult)
            dispatch(setAllBattleDataEmpty())
            navigate('/battle')
        } else if (battleResult.solveResult != "") {
            alert(battleResult.solveResultMessage)
        }
    }, [battleResult])

    return (
        <MainContainer>
            <TopSection>
                <ProblemSection>
                    <ProblemTitle>문제 설명</ProblemTitle>
                    <ProblemDetail><ReactMarkdown>{questionTitle}</ReactMarkdown></ProblemDetail>
                    <ProblemTitle>입출력 예</ProblemTitle>
                    <ProblemDetail><ReactMarkdown>{questionContent}</ReactMarkdown></ProblemDetail>
                </ProblemSection>
                <EditSection>
                    <Timer onTimeUp={handleTimeUp}></Timer>
                    <Editor
                        language='java'
                        value={currentCode}
                        theme='vs-dark'
                        options={{
                            padding: { top: 20, bottom: 20 },
                        }}
                        onChange={(value) => setCurrentCode(value || '')}
                    ></Editor>
                    {gradingResult && (
                        <ResultSection>
                            <div>채점 결과: {gradingResult}</div>
                            <div>{isCorrect ? '정답입니다!' : '틀렸습니다.'}</div>
                            {errorMessage && <div>오류 메시지: {errorMessage}</div>}
                        </ResultSection>
                    )}
                </EditSection>
            </TopSection>

            <BottomSection>
                <LeftButton>
                    <BottomButton onClick={handleGoBack}>뒤로 가기</BottomButton>
                    <BottomButton onClick={handleQuestionClick}>질문하기</BottomButton>
                </LeftButton>
                <RightButton>
                    <BottomButton onClick={handleOtherSolvesClick}>다른 사람의 풀이</BottomButton>
                    <BottomButton onClick={handleReset}>초기화</BottomButton>
                    <BottomButton isSubmit ref={buttonRef} onClick={handleButtonClick}>제출 후 채점하기</BottomButton>
                </RightButton>
            </BottomSection>
        </MainContainer>
    );
};

export default IDEPage;
