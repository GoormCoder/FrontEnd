import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Editor } from '@monaco-editor/react';
import Timer from '../../components/Timer/Timer';
import ReactMarkdown from 'react-markdown';
import { BottomButtonProps, Solve } from './types';
import { createSolve, getQuestionSolves, getSolve } from '../../services/api/solveAPI';
import { getQuestion } from '../../services/api/questAPI';

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
    const navigate = useNavigate();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [initialCode, setInitialCode] = useState(
        `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);
    const [currentCode, setCurrentCode] = useState(initialCode);
    const [language, setLanguage] = useState('JAVA'); 
    const [questionId, setQuestionId] = useState(1); 
    const [gradingResult, setGradingResult] = useState<string | null>(null); 
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null); // 맞고 틀림 상태 추가
    const [questionTitle, setQuestionTitle] = useState<string>('');
    const [questionContent, setQuestionContent] = useState<string>('');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const questionData = await getQuestion(questionId);
                setQuestionTitle(questionData.title);
                setQuestionContent(questionData.content);
            } catch (error) {
                console.error('문제를 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        fetchQuestion();
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
            const solveResponse = await createSolve(questionId, solveRequest);
            const result = await getSolve(solveResponse.id); 
            setGradingResult(result.solveResult);
            setIsCorrect(result.solveResult === 'Correct'); 
            alert('풀이 제출이 완료되었습니다.');
        } catch (error) {
            console.error('풀이 제출 중 오류가 발생했습니다:', error);
            alert('풀이 제출 중 오류가 발생했습니다.');
        }
    };

    const handleReset = () => {
        setCurrentCode(initialCode);
        setGradingResult(null);
        setIsCorrect(null);
    };

    const handleQuestionClick = () => {
        navigate('/board');
    };

    const handleGoBack = () => {
        navigate('/quest')
    }

    const handleOtherSolvesClick = async () => {
        try {
            const solves = await getQuestionSolves(questionId);
            console.log('다른 사람의 풀이:', solves);
            navigate(`/questions/${questionId}/solves`);
        } catch (error) {
            console.error('다른 사람의 풀이를 불러오는 중 오류가 발생했습니다:', error);
            alert('다른 사람의 풀이를 불러오는 중 오류가 발생했습니다.');
        }
    };

    return (
        <MainContainer>
            <TopSection>
                <ProblemSection>
                    <ProblemTitle>문제 설명</ProblemTitle>
                    <ProblemDetail>
                        <ReactMarkdown>{questionTitle}</ReactMarkdown>
                    </ProblemDetail>
                    <ProblemTitle>입출력 예</ProblemTitle>
                    <ProblemDetail>
                        <ReactMarkdown>{questionContent}</ReactMarkdown>
                    </ProblemDetail>
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