import React from 'react'
import styled from 'styled-components'
import { ChatDataProps } from '../types';
import { useAppSelector } from '../../../hooks/reduxHooks';

const MessageBox: React.FC<ChatDataProps> = ({ chatData }) => {
    const { loginedMember } = useAppSelector(state => state.member);
    const state = loginedMember.loginId === chatData.sender.longinId ? true : false
    return (
        <MessageContainer state={state}>
            <div className='text'>
                {chatData.message}
            </div>
            <div className='time'>
                {new Intl.DateTimeFormat('ko-KR', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true
                }).format(new Date(chatData.createdAt))}
            </div>
        </MessageContainer>
    )
}

export default MessageBox

const MessageContainer = styled.div<{ state: boolean }>`
    display: flex;
    flex-direction: ${props => props.state ? "row-reverse" : "row"};
    padding: 5px 10px 5px 10px;
    gap: 10px;

    & .text {
        padding: 12px;
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
