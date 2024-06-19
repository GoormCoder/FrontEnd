import React from 'react'
import styled from 'styled-components'
import { getUser } from '../../../services/api/memberAPI'
import { ChatDataProps } from '../types';

const MessageBox: React.FC<ChatDataProps> = ({ chatData }) => {
    const id = "51";
    const state = id === chatData.userID ? true : false

    return (
        <MessageContainer state={state}>
            <div className='text'>
                {chatData.message}
            </div>
            <div className='time'>
                {chatData.time}
            </div>
        </MessageContainer>
    )
}

export default MessageBox

const MessageContainer = styled.div<{ state: boolean }>`
    display: flex;
    flex-direction: ${props => props.state ? "row-reverse" : "row"};
    padding: 10px;
    gap: 10px;

    & .text {
        padding: 15px;
        max-width: 190px;
        border-radius: 10px;
        background-color: ${props => props.state ? "#49aaffe4" : "whitesmoke"};
        color: ${props => props.state ? "white" : "black"};
        font-weight: 400;
    }

    & .time {
        display: flex;
        align-items: end;
        font-size: 12px;
    }
`
