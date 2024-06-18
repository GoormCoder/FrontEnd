import axiosInstance from '../axiosInstance';
import React, { useState } from 'react';
import { Container, Form, Title, Label, Input, Select, SubmitButton, LinksContainer, Link } from '../../components/PageStyle';
import { useNavigate } from 'react-router-dom'; 


function JoinPage() {
    const navigate = useNavigate();

    const [UserId, setUserId] = useState("");
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Address, setAddress] = useState("");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const onUserIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    }
    const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }
    const onAgeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAge(event.target.value);
    }
    const onGenderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(event.target.value);
    }
    const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    const onConfirmPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
    }
    const onAddressHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!UserId || !Email || !Name || !Age || !Gender || !Password || !ConfirmPassword || !Address) {
            return alert('모든 입력 필드를 채워주세요.');
        }

        if (Password !== ConfirmPassword) {
            return alert('패스워드를 다시 확인해주세요!!');
        }

        if (Password.length < 6) {
            return alert('비밀번호는 최소 6자리 이상이어야 합니다.');
        }

        axiosInstance.get(`/users/id-duplicated/${UserId}`)
            .then(response => {
                if (response.data) {
                    return alert('이미 존재하는 아이디입니다!!');
                } else {
                    let body = {
                        loginId: UserId,
                        email: Email,
                        name: Name,
                        age: Age,
                        gender: Gender,
                        password: Password,
                        address: Address,
                    }

                    axiosInstance.post('/users/join', body)
                        .then(response => {
                            if (response.data) {
                                setShowSuccessAlert(true);
                                setTimeout(() => {
                                    setShowSuccessAlert(false);
                                    navigate('/login');
                                }, 2000);
                            } else {
                                alert('Registration Failed');
                            }
                        }).catch(error => {
                            if (error.response && error.response.data && error.response.data.message) {
                                alert(error.response.data.message);
                            } else {
                                alert('회원가입 중 오류 발생');
                            }
                            console.error('Error:', error);
                        });
                }
            });
    }

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Title>회원가입</Title>
                <Label>아이디</Label>
                <Input type='text' value={UserId} onChange={onUserIdHandler} />
                <Label>이메일</Label>
                <Input type='email' value={Email} onChange={onEmailHandler} />
                <Label>이름</Label>
                <Input type='text' value={Name} onChange={onNameHandler} />
                <Label>나이</Label>
                <Input type='number' value={Age} onChange={onAgeHandler} />
                <Label>성별</Label>
                <Select value={Gender} onChange={onGenderHandler}>
                    <option value="">선택하세요</option>
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                </Select>
                <Label>비밀번호</Label>
                <Input type='password' value={Password} onChange={onPasswordHandler} />
                <Label>비밀번호 확인</Label>
                <Input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <Label>주소</Label>
                <Input type='text' value={Address} onChange={onAddressHandler} />
                <SubmitButton type='submit'>회원가입</SubmitButton>
                <LinksContainer>
                <Link href="/login">로그인 페이지로 돌아가기</Link>
                </LinksContainer>
            </Form>
            {showSuccessAlert && (
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)', zIndex: '1000' }}>
                    회원가입에 성공했습니다. 로그인 페이지로 이동합니다.
                </div>
            )}
            
        </Container>
    );
}

export default JoinPage;
