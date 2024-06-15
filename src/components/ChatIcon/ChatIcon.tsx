import React, { useState } from 'react'
import styled from 'styled-components'
import ChatFriendPage from '../../pages/ChatFriendPage/ChatFriendPage'
import { DisplayProps } from '../../pages/ChatFriendPage/types'
import { IoMdCloudOutline, IoMdClose } from "react-icons/io";


const ChatIcon = () => {

    const [isOpened, setIsOpened] = useState<boolean>(false);

    return (
        <ChatContainer>
            <ChatPageContainer display={isOpened}>
                <ChatFriendPage />
            </ChatPageContainer>
            <ChatIconContainer onClick={() => setIsOpened(pre => !pre)}>
                {isOpened ? <IoMdClose /> : <IoMdCloudOutline />}
            </ChatIconContainer>
        </ChatContainer>
    )
}

export default ChatIcon

const ChatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: end;
    gap: 10px;
    position: fixed;
    bottom: 40px;
    right: 60px;
`

const ChatPageContainer = styled.div<DisplayProps>`
    display: ${props => props.display ? "block" : "none"};;
`

const ChatIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-color: lightgreen;
    width: 60px;
    height: 60px;
    font-size: 30px;
    cursor: pointer;
`