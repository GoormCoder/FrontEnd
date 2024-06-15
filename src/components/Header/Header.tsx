import React, { useState } from 'react'
import main_logo from '../../assets/goorm_coder_logo.png'
import styled, { keyframes } from 'styled-components'
import hamburgerButton from '../../assets/hamburger.png'

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid;
`;
const SidebarMenu = styled.div<{ isOpen: boolean }>`
    position: fixed;
    height: 100vh;
    width: 250px;
    top: 0;
    right: 0;
    display: flex;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: left;
    background-color: rgba(0, 0, 0, 0.5);
    transition: background-color 0.3s;
    transform: translateX(${props => (props.isOpen ? '0%' : '100%')});
    animation: ${props => (props.isOpen ? slideIn : slideOut)} 0.3s forwards;
`;
const slideIn = keyframes`
    from {
        transform: translateX(100%);
        background-color: transparent;
    }
    to {
        transform: translateX(0%);
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0%);
        background-color: rgba(0, 0, 0, 0.5);
    }
    to {
        transform: translateX(100%);
        background-color: transparent;
    }
`;
const LeftSection = styled.div`
    display: flex;
    align-items: center;
    margin-left: 100px;
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
`;
const Logo = styled.img`
    width: 73px;
`;
const LogoText = styled.p`
    margin: 0;
`;
const LoginText = styled.p`
    font-size: x-large;    
    display: flex;    
    margin: 0;  
    margin-right: 20px;
    cursor: pointer;
`;
const SideBarButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    width: 73px; 
    border: 1px solid;
    border-radius: 5px;
    height: 50px;
    width: 50px;
    margin-right: 100px;
    background-color: rgba(217,217,217,0.5);
    cursor: pointer;
`;


const Header = () => {
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setisSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <HeaderContainer>
                <LeftSection>
                    <Logo src={main_logo} alt='main logo' />
                    <LogoText>Goorm Coder</LogoText>
                </LeftSection>
                <RightSection>
                    <LoginText>로그인</LoginText>
                    <SideBarButton onClick={toggleSidebar}>
                        <img src={hamburgerButton} alt='hamburger button' width="30px" />
                    </SideBarButton>
                </RightSection>
            </HeaderContainer>
            <SidebarMenu isOpen={isSidebarOpen}>
                <h2>Menu</h2>
                <button>X</button>
                <a href='#'>Menu Item 1</a>
                <a href='#'>Menu Item 2</a>
                <a href='#'>Menu Item 3</a>
            </SidebarMenu>
        </>
    )
}

export default Header
