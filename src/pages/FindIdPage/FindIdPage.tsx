import React, { useState } from 'react';
import {
    Container,
    Form,
    Title,
    Label,
    Input,
    SubmitButton,
    LinksContainer,
    Link
} from '../../components/PageStyle';

function FindIdPage() {
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");

    const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }
    const onNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Console log for testing
        console.log('Email:', Email);
        console.log('Name:', Name);
    }

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Title>아이디 찾기</Title>
                <Label>이메일</Label>
                <Input
                    type='email'
                    value={Email}
                    onChange={onEmailHandler}
                />
                <Label>이름</Label>
                <Input
                    type='text'
                    value={Name}
                    onChange={onNameHandler}
                />
                <br />
                <SubmitButton type='submit'>아이디 찾기</SubmitButton>
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
