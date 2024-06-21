import React, { useState } from 'react'
import styled from 'styled-components'
import ChatFriendPage from '../../pages/ChatFriendPage/ChatFriendPage'
import { DisplayAndOpacityProps } from '../../pages/ChatFriendPage/types'
import { IoMdCloudOutline, IoMdClose } from "react-icons/io";


const ChatIcon = () => {

    const [display, setDisplay] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<boolean>(false);


    const setOpenChat = () => {

        setTimeout(() => {
            display ? setDisplay(pre => !pre) : setOpacity(pre => !pre)
        }, 100)
        display ? setOpacity(pre => !pre) : setDisplay(pre => !pre)
    }

    return (
        <ChatContainer>
            {display ?
                <ChatPageContainer display={display} opacity={opacity}>
                    <ChatFriendPage isOpen={display} />
                </ChatPageContainer> : null}
            {/* <ChatPageContainer display={display} opacity={opacity}>
                <ChatFriendPage isOpen={display} />
            </ChatPageContainer> */}
            <ChatIconContainer onClick={() => { setOpenChat() }}>
                <div>
                    {opacity ? <IoMdClose /> : <IoMdCloudOutline />}
                </div>
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

const ChatPageContainer = styled.div<DisplayAndOpacityProps>`
    position: relative;
    display: ${props => props.display ? "block" : "none"};
    opacity: ${props => props.opacity ? "1" : "0"};
    margin-bottom: ${props => props.opacity ? "0px" : "-25px"};
    transition: 0.2s ease;
`

const ChatIconContainer = styled.div`
    

    & div{
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #49aaffe4;
        width: 60px;
        height: 60px;
        color: white;
        font-size: 30px;
        transition: 0.2s ease;
        box-shadow: 0px 0px 10px 0px gray;
        cursor: pointer;
    }

    & div:active{
        width: 55px;
        height: 55px;
        background-color: #3da5ff;
    }
`