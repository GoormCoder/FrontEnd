import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
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

function ResetPwPage() {
    const { UserId } = useParams(); // URL 파라미터에서 userId 가져오기
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Error, setError] = useState("");
    const [Success, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const onConfirmPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value);
    }

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        if (Password !== ConfirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post(`/members/resetPw/${UserId}`, {
                password: Password
            });

            if (response.status === 200) {
                setSuccess('비밀번호가 성공적으로 변경되었습니다.');
                setTimeout(() => {
                    navigate('/login'); // 성공 시 로그인 페이지로 이동
                }, 2000);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message);
                } else {
                    setError('비밀번호 재설정 중 문제가 발생했습니다.');
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
                <Title>비밀번호 재설정</Title>
                {Error && <ErrorMessage>{Error}</ErrorMessage>}
                {Success && <SuccessMessage>{Success}</SuccessMessage>}
                <Label>새 비밀번호</Label>
                <Input
                    type='password'
                    value={Password}
                    onChange={onPasswordHandler}
                    required
                />
                <Label>비밀번호 확인</Label>
                <Input
                    type='password'
                    value={ConfirmPassword}
                    onChange={onConfirmPasswordHandler}
                    required
                />
                <br />
                <SubmitButton type='submit' disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : '비밀번호 재설정'}
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

export default ResetPwPage;
