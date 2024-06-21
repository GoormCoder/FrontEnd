import React, { useEffect } from 'react'
import styled from 'styled-components'
import Header from '../../components/Header/Header';
import mainlogo from '../../assets/mainpage_logo.png'
import { Link, useNavigate } from 'react-router-dom';

const MainBackground = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 100px;
    background-color: #ffffff;
    height: 100vh;
    z-index: 30;
`;
const NewMainpageLogo = styled.div`
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    width: 1100px;
    font-size: 200px;
    color: #49aaffe4;
    font-family: "cheesecake", sans-serif;
    font-weight: 900;   
    font-style: normal;
`;
const StartButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; 
    width: 500px;
    height: 170px;
    background-color: #0055b0;
    color: #ffffff;
    border: none;
    border-radius: 10px;
    font-size: 45px;
    font-weight: 900;
    text-decoration: none;
`;

const MainPage = () => {
    const navigate = useNavigate();
    const checkLogin = () => {
        if (localStorage.getItem("accessToken")) {
            navigate('/quest');
        } else {
            navigate('/login');
        }
    }
    return (
        <MainBackground>
            <NewMainpageLogo>Goorm Coder</NewMainpageLogo>
            <StartButton onClick={checkLogin}>
                시작하기
            </StartButton>
        </MainBackground>
    )
}

export default MainPage
