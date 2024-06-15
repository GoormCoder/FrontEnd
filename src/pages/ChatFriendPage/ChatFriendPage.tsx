import React, { useState } from 'react'
import styled from 'styled-components'
import { FaUserFriends } from "react-icons/fa";
import { BsChatDotsFill } from "react-icons/bs";
import ChatList from './components/ChatList';
import FriendList from './components/FriendList';
import { CurrentPage, DisplayProps } from './types';
const ChatFriendPage = () => {
    const [currentPage, setCurrentPage] = useState<string>(CurrentPage.FRIEND_LIST)
    const [display, setDisplay] = useState<boolean>(true);

    const setPage = (page: string) => {
        setCurrentPage(page);
        if (page === CurrentPage.FRIEND_LIST) setDisplay(true)
        if (page === CurrentPage.CHAT_LIST) setDisplay(false)
    }

    return (
        <ChatFriendContainer>
            <Title>{currentPage}</Title>
            <FriendListContainer display={display}>
                <FriendList />
            </FriendListContainer>
            <ChatListContainer display={!display}>
                <ChatList />
            </ChatListContainer>
            <NavigationBar>
                <FaUserFriends onClick={() => { setPage(CurrentPage.FRIEND_LIST) }} />
                <BsChatDotsFill onClick={() => { setPage(CurrentPage.CHAT_LIST) }} />
            </NavigationBar>
        </ChatFriendContainer>
    )
}

export default ChatFriendPage

const ChatFriendContainer = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 20px;
    width: 330px;
    height: 570px;
    background-color: white;
    padding: 15px 0px 0px 0px;
`

const Title = styled.div`
    /* border: 1px solid black; */
    height: 40px;
    font-size: 25px;
    font-weight: bold;
    padding-left: 15px;
`

const FriendListContainer = styled.div<DisplayProps>`
    display: ${props => props.display ? "block" : "none"};
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    height: 470px;
`

const ChatListContainer = styled.div<DisplayProps>`
    display: ${props => props.display ? "block" : "none"};
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    height: 470px;
`

const NavigationBar = styled.div`
    /* border: 1px solid black; */
    height: 40px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 8px 0px 8px 0px;

    & svg {
        font-size: 35px;
        cursor: pointer;
    }
`