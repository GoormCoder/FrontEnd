import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Editor } from '@monaco-editor/react';
import Timer from '../../components/Timer/Timer';
import dummy from './dummy.json';
import { BottomButtonProps, QuestionSummaryDto } from './types';
import { createSolve } from '../../services/api/solveAPI';

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

const IDEPage: React.FC = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [initialCode, setInitialCode] = useState(
        `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`);
    const [language, setLanguage] = useState('JAVA'); 
    const [questionId, setQuestionId] = useState(1); 

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
                code: initialCode,
                language: language
            };
            const response = await createSolve(questionId, solveRequest);
            alert('풀이 제출이 완료되었습니다.');
            console.log(response);
        } catch (error) {
            console.error('풀이 제출 중 오류가 발생했습니다:', error);
            alert('풀이 제출 중 오류가 발생했습니다.');
        }
    };

    return (
        <MainContainer>
            <TopSection>
                <ProblemSection>
                    <ProblemTitle>문제 설명</ProblemTitle>
                    <ProblemDetail>{dummy.title}</ProblemDetail>
                    <ProblemTitle>입출력 예</ProblemTitle>
                    <ProblemDetail>{dummy.description}</ProblemDetail>
                </ProblemSection>
                <EditSection>
                    <Timer onTimeUp={handleTimeUp}></Timer>
                    <Editor
                        language='java'
                        defaultValue={initialCode}
                        theme='vs-dark'
                        options={{
                            padding: { top: 20, bottom: 20 },
                        }}
                        onChange={(value) => setInitialCode(value || '')} 
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
                    <BottomButton isSubmit ref={buttonRef} onClick={handleButtonClick}>제출 후 채점하기</BottomButton>
                </RightButton>
            </BottomSection>
        </MainContainer>
    );
};

export default IDEPage;