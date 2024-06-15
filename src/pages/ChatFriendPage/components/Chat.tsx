import React from 'react'
import { BsChevronLeft } from "react-icons/bs";
import { ChatRoomDataProps } from '../types';
import styled from 'styled-components';
const Chat: React.FC<ChatRoomDataProps> = ({ chatRoomData, setDisplay }) => {
    return (
        <ChatContainer>
            <BsChevronLeft onClick={() => setDisplay(false)} />
            {chatRoomData.userName}
            ChatDetail
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    padding: 10px;
    & svg {
        cursor: pointer;
    }
`