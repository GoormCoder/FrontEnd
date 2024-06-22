import React, { useEffect, useRef, useState } from 'react'
import { SidebarProps } from './types';
import { FaAnglesRight } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { logoutApi } from '../../services/api/memberAPI';
const SideBar: React.FC<SidebarProps> = ({ isOpen }) => {

    const linkData = [
        { path: "/", value: "로그아웃" },
        { path: "/my", value: "마이페이지" },
        { path: "/quest", value: "코딩테스트" },
        { path: "/board", value: "게시판" },
        { path: "/battle", value: "랜덤대결" },
        { path: "/rank", value: "랭킹" },
    ]

    const chatRef = useRef<HTMLDivElement | null>(null);
    const [isSidebarOpen, setisSidebarOpen] = useState(false);

    const toggleSidebar = (value?: string) => {
        setisSidebarOpen(pre => !pre);
        if (value == "로그아웃") {
            logoutApi();
        }
    };

    useEffect(() => {
        function handleClickOutSide(e: MouseEvent) {
            if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
                setisSidebarOpen(false);
            }
        }

        document.addEventListener('mouseup', handleClickOutSide);
        return () => {
            document.removeEventListener('mouseup', handleClickOutSide);
        };
    }, [])

    return (
        <SidebarMenu isOpen={isSidebarOpen} ref={chatRef}>
            <SideBarButton isOpen={isSidebarOpen} onClick={() => toggleSidebar()}>
                {isSidebarOpen ? <FaAnglesRight /> : <GiHamburgerMenu />}
            </SideBarButton>
            <h2>Menu</h2>
            {linkData.map((data) => (
                <Link to={data.path} onClick={() => toggleSidebar(data.value)}>{data.value}</Link>
            ))}
        </SidebarMenu>
    )
}

export default SideBar

const SidebarMenu = styled.div<SidebarProps>`
    position: fixed;
    height: 100vh;
    width: 200px;
    top: 0;
    right: ${props => (props.isOpen ? '0px' : '-270px')};
    display: flex;
    padding: 20px 20px 20px 50px;
    background-color: ${props => (props.isOpen ? '#98c0f7' : 'none')};
    flex-direction: column;
    align-items: left;
    transition:  0.4s;
    z-index: 30;

    & svg{
        position: absolute;
        font-size: 25px;
        cursor: pointer;
    }

    & h2{
        margin-top: 50px;
    }

    & a{
        text-decoration: none;
        font-size: 20px;
        font-weight: bold;
        color: black;
        margin-bottom: 20px;
        cursor: pointer;
    }
`;

const SideBarButton = styled.div<SidebarProps>`
    position: absolute;
    height: 30px;
    width: 30px;
    left:${props => (props.isOpen ? '15px' : '-100px')};
    transition:  0.3s;
    cursor: pointer;

    & svg{
        font-size: 30px;
    }
    @media only screen and (max-width: 430px) {
        left:${props => (props.isOpen ? '15px' : '-55px')};
    }
`;
