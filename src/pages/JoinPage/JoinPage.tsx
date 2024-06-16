import axios from 'axios';
import React, { useState } from 'react';
import { Container, Form, Title, Label, Input, Select, SubmitButton } from '../../components/PageStyle';

function JoinPage() {
    const [UserId, setUserId] = useState("");
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Age, setAge] = useState("");
    const [Gender, setGender] = useState("");
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Address, setAddress] = useState("");

    const onUserIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.currentTarget.value);
    }
    const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }
    const onAgeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAge(event.currentTarget.value);
    }
    const onGenderHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(event.currentTarget.value);
    }
    const onPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }
    const onConfirmPasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value);
    }
    const onAddressHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.currentTarget.value);
    }

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (Password !== ConfirmPassword) {
            return alert('Passwords do not match!');
        }

        axios.get(`/users/id-duplicated/${UserId}`)
            .then(response => {
                if (response.data) {
                    return alert('User ID already exists');
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

                    axios.post('/users/join', body)
                        .then(response => {
                            if (response.data) {
                                alert('Registration Successful');
                            } else {
                                alert('Registration Failed');
                            }
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
            </Form>
        </Container>
    );
}

export default JoinPage;
