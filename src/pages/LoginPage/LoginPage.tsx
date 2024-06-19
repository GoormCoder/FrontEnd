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
    LoadingSpinner
} from '../../components/PageStyle';

function LoginPage() {
    const navigate = useNavigate();
    const [UserId, setUserId] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);


    const onUserIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.currentTarget.value);
    }

    const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError("");

        if (!UserId || !Password) {
            setError("아이디와 비밀번호를 입력해주세요.");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.post('/members/login', {
                loginId: UserId,
                password: Password
            });

            if (response.status === 200) {
                // 로그인 성공 로직
                // JWT 토큰을 로컬 스토리지에 저장
                localStorage.setItem('token', response.data.token);
                setShowSuccessAlert(true); // 로그인 성공 메시지 표시
                setTimeout(() => {
                    setShowSuccessAlert(false); // 일정 시간 후 메시지 숨기기
                    navigate('/dashboard'); // 로그인 성공 후 리다이렉트
                }, 2000); // 2초 후에 메시지 숨기기
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    // 서버에서 반환된 에러 메시지 사용
                    setError(error.response.data.message);
                } else {
                    // 네트워크 에러 또는 기타 에러 처리
                    setError('로그인 중 문제가 발생했습니다.');
                }
            } else {
                // AxiosError가 아닌 경우의 에러 처리
                setError('예상치 못한 오류가 발생했습니다.');
            }
        }
    }

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Title>로그인</Title>
                {Error && <ErrorMessage>{Error}</ErrorMessage>}
                <Label>아이디</Label>
                <Input
                    type='text'
                    value={UserId}
                    onChange={onUserIdHandler}
                    required
                />
                <Label>비밀번호</Label>
                <Input
                    type='password'
                    value={Password}
                    onChange={onPasswordHandler}
                    required
                />
                <SubmitButton type='submit' disabled={isLoading}>
                    {isLoading ? <LoadingSpinner /> : '로그인'}
                </SubmitButton>
                <LinksContainer>
                    <Link href="/findId">아이디 찾기</Link>
                    <Link href="/findPw">비밀번호 찾기</Link>
                    <Link href="/join">회원가입</Link>
                </LinksContainer>
            </Form>

            {showSuccessAlert && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'white',
                    padding: '20px',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    zIndex: '1000'
                }}>
                    로그인에 성공했습니다. 대시보드 페이지로 이동합니다.
                </div>
            )}

        </Container>
    );
}

export default LoginPage;