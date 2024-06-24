import React, { useEffect, useState } from 'react';
import axios from 'axios';
import instance from '../../services/api/axios';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/reduxHooks';
import { setLoginedMember } from '../../store/slices/memberSlice';

import {
    Container,
    Form,
    Title,
    Label,
    Input,
    LinksContainer,
    Link,
    ErrorMessage,
    LeftColumn,
    RightColumn,
    Row,
    RowLabel,
    RowValue,
    Button // 추가된 버튼 스타일
} from './MypageStyle';

interface MyPageData {
    loginId: string;
    nick: string;
    name: string;
    birth: string;
    email: string;
    info: string;
    gender: string;
    praiseScore: number;
    battleScore: number;
}

function MyPage() {
    const navigate = useNavigate();
    const loginedMember = useAppSelector((state) => state.member.loginedMember);
    const loginId = loginedMember.loginId;
    const [userData, setUserData] = useState<MyPageData>({
        loginId: '',
        nick: '',
        name: '',
        birth: '',
        email: '',
        info: '',
        gender: '',
        praiseScore: 0,
        battleScore: 0
    });

    const [error, setError] = useState<string | null>(null);

    const fetchUserData = async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setError('로그인 후 이용해 주세요.');
            navigate('/login'); // 토큰이 없으면 로그인 페이지로 이동
            return;
        }

        if (!loginId) {
            setError('로그인 아이디를 찾을 수 없습니다.');
            navigate('/login'); // 로그인 아이디가 없으면 로그인 페이지로 이동
            return;
        }

        try {
            const response = await instance.get(`/mypage/${loginId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUserData(response.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response ? error.response.data.message : '데이터를 가져오는 중 오류가 발생했습니다.');
            } else {
                setError('알 수 없는 오류가 발생했습니다.');
            }
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [loginId]); // loginId가 변경될 때마다 호출

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleUpdateNickname = async () => {
        try {
            await instance.patch(`/mypage/${loginId}/nick`, { newNick: userData.nick }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('닉네임이 성공적으로 변경되었습니다.');
        } catch (error) {
            console.error(error);
            alert('닉네임 변경 중 오류가 발생했습니다.');
        }
    };

    const handleUpdateInfo = async () => {
        try {
            await instance.patch(`/mypage/${loginId}/info`, { newInfo: userData.info }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('정보가 성공적으로 변경되었습니다.');
        } catch (error) {
            console.error(error);
            alert('정보 변경 중 오류가 발생했습니다.');
        }
    };

    const handleUpdateBirth = async () => {
        const newBirth = userData.birth;
        try {
            await instance.patch(`/mypage/${loginId}/birth`, newBirth, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            alert('생일이 성공적으로 변경되었습니다.');
        } catch (error) {
            console.error(error);
            alert('생일 변경 중 오류가 발생했습니다.');
        }
    };

    

    return (
        <Container>
            <Form>
                <Title>마이페이지</Title>
                <Row>
                    <LeftColumn>
                        <Row>
                            <RowLabel>아이디</RowLabel>
                            <RowValue className="boxed">{userData.loginId}</RowValue>
                        </Row>
                        <Row>
                            <RowLabel>닉네임</RowLabel>
                            <Input type='text' name='nick' value={userData.nick} onChange={onInputChange} />
                            <Button onClick={handleUpdateNickname}>수정하기</Button>
                        </Row>
                        <Row>
                            <RowLabel>이름</RowLabel>
                            <RowValue className="boxed">{userData.name}</RowValue>
                        </Row>
                        <Row>
                            <RowLabel>생일</RowLabel>
                            <Input type='date' name='birth' value={userData.birth} onChange={onInputChange} />
                            <Button onClick={handleUpdateBirth}>수정하기</Button>
                        </Row>
                        <Row>
                            <RowLabel>이메일</RowLabel>
                            <RowValue className="boxed">{userData.email}</RowValue>
                        </Row>
                        <Row>
                            <RowLabel>정보</RowLabel>
                            <Input type='text' name='info' value={userData.info} onChange={onInputChange} />
                            <Button onClick={handleUpdateInfo}>수정하기</Button>
                        </Row>
                        <Row>
                            <RowLabel>성별</RowLabel>
                            <RowValue className="boxed">{userData.gender}</RowValue>
                        </Row>
                    </LeftColumn>
                    <RightColumn>
                        <Row>
                            <RowLabel>칭찬 점수</RowLabel>
                            <RowValue className="boxed">{userData.praiseScore}</RowValue>
                        </Row>
                        <Row>
                            <RowLabel>배틀 점수</RowLabel>
                            <RowValue className="boxed">{userData.battleScore}</RowValue>
                        </Row>
                    </RightColumn>
                </Row>
                <LinksContainer>
                    <Link href={`/resetPw/${userData.loginId}`}>비밀번호 변경</Link>
                </LinksContainer>
                {error && (
                    <ErrorMessage>
                        {error}
                    </ErrorMessage>
                )}
            </Form>
        </Container>
    );
}

export default MyPage;
