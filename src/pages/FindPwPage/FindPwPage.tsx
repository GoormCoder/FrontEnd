import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

import {
    Container,
    Form,
    Title,
    Label,
    Input,
    SubmitButton,
    LinksContainer,
    Link,
    ErrorMessage,
    SuccessMessage,
    LoadingSpinner
} from '../../components/PageStyle';

function FindPwPage() {
    const [Email, setEmail] = useState("");
    const [UserId, setUserId] = useState("");
    const [Error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [Success, setSuccess] = useState("");


    const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }
    const onUserIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.currentTarget.value);
    }
    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axiosInstance.post('/members/findPw', {
                email: Email,
                loginId: UserId
            });

            if (response.status === 200) {
                setSuccess('비밀번호 재설정 페이지로 이동합니다.');
                setTimeout(() => {
                    navigate(`/resetPw/${UserId}`); // 성공 시 비밀번호 재설정 페이지로 이동
                }, 2000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError('비밀번호 찾기 중 문제가 발생했습니다.');
                }
            } else {
                setError('예상치 못한 오류가 발생했습니다.');
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Title>비밀번호 찾기</Title>
                {Error && <ErrorMessage>{Error}</ErrorMessage>}
                {Success && <SuccessMessage>{Success}</SuccessMessage>}            
                <Label>아이디</Label>
                <Input
                    type='text'
                    value={UserId}
                    onChange={onUserIdHandler}
                    required
                />
                <Label>이메일</Label>
                <Input
                    type='email'
                    value={Email}
                    onChange={onEmailHandler}
                    required
                />
                <br />
                <SubmitButton type='submit' disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : '비밀번호 찾기'}
                </SubmitButton>
                <LinksContainer>
                    <Link href="/login">로그인</Link>
                    <Link href="/findId">아이디 찾기</Link>
                    <Link href="/join">회원가입</Link>
                </LinksContainer>
            </Form>
        </Container>
    )
} 

export default FindPwPage;
