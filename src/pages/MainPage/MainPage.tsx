import React from 'react'
import styled from 'styled-components'
import Header from '../../components/Header/Header'
import mainlogo from '../../assets/mainpage_logo.png'

const MainBackground = styled.div`
    background-color: #ffffff;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const MainpageLogo = styled.img`
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    width: 900px;
    margin-top: 150px;
    margin-bottom: 100px;
`;
const StartButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center; 
    width: 500px;
    height: 170px;
    margin-top: 100px;
    background-color: #D9D9D9;
    border: none;
    border-radius: 10px;
    font-size: 36px;
`;

const MainPage = () => {
    return (
        <>
            <Header />
            <MainBackground>
                <MainpageLogo src={mainlogo} alt='mainpage_logo' />
                <StartButton>
                    <a href='/' >시작하기</a>
                </StartButton>
            </MainBackground>
        </>
    )
}

export default MainPage
