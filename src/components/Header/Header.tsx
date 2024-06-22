import React, { useState } from 'react'
import main_logo from '../../assets/goorm_coder_logo.gif'
import styled from 'styled-components'
import SideBar from '../SideBar/SideBar';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-bottom: 1px solid #ccc;
    box-shadow: 0px 0px 10px 3px #ccc;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 20;
`;

const LeftSection = styled(Link)`
    display: flex;
    width: fit-content;
    align-items: center;
    margin-left: 80px;
    gap: 10px;
    text-decoration: none;
    cursor: pointer;
    @media only screen and (max-width: 430px) {
        margin-left: 10px;
    }
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
`;
const Logo = styled.img`
    width: 73px;
`;
const LogoText = styled.p`
    display: flex;
    justify-content: center; /* 가로 중앙 정렬 */
    align-items: center; /* 세로 중앙 정렬 */
    font-size: 40px;
    color: #49aaffe4;
    font-family: "cheesecake", sans-serif;
    font-weight: 900;   
    font-style: normal;
    margin: 0;
    text-decoration: none;
`;

const Header = () => {
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    return (
        <>
            <HeaderContainer>
                <LeftSection to="/quest">
                    <Logo src={main_logo} alt='main logo' />
                    <LogoText>Goorm Coder</LogoText>
                </LeftSection>
                <RightSection>
                </RightSection>
            </HeaderContainer>
            <SideBar isOpen={isSidebarOpen} />
        </>
    )
}

export default Header
