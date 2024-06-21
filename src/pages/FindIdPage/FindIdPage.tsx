import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import axios from 'axios'; 

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

function FindIdPage() {
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Error, setError] = useState("");
    const [Success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await axiosInstance.post('/members/findId', {
                email: Email,
                name: Name
            });

            if (response.status === 200) {
                setSuccess(`아이디는 " ${response.data} " 입니다.`);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError('아이디 찾기 중 문제가 발생했습니다.');
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
                <Title>아이디 찾기</Title>
                {Error && <ErrorMessage>{Error}</ErrorMessage>}
                {Success && <SuccessMessage>{Success}</SuccessMessage>}
                <Label>이메일</Label>
                <Input
                    type='email'
                    value={Email}
                    onChange={onEmailHandler}
                    required
                />
                <Label>이름</Label>
                <Input
                    type='text'
                    value={Name}
                    onChange={onNameHandler}
                    required
                />
                <br />
                <SubmitButton type='submit' disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : '아이디 찾기'}
                </SubmitButton>
                <LinksContainer>
                    <Link href="/login">로그인</Link>
                    <Link href="/findPw">비밀번호 찾기</Link>
                    <Link href="/join">회원가입</Link>
                </LinksContainer>
            </Form>
        </Container>
    )
}

export default FindIdPage;
