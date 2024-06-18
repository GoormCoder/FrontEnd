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

function FindPwPage() {
    const [Email, setEmail] = useState("");
    const [UserId, setUserId] = useState("");

    const onEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }
    const onUserIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.currentTarget.value);
    }
    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // 비밀번호 찾기 로직 구현
    }

    return (
        <Container>
            <Form onSubmit={onSubmitHandler}>
                <Title>비밀번호 찾기</Title>
                <Label>이메일</Label>
                <Input
                    type='email'
                    value={Email}
                    onChange={onEmailHandler}
                />
                <Label>아이디</Label>
                <Input
                    type='text'
                    value={UserId}
                    onChange={onUserIdHandler}
                />
                <br />
                <SubmitButton type='submit'>비밀번호 찾기</SubmitButton>
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
