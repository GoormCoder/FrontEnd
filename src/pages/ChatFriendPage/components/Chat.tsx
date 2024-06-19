import React, { useEffect, useRef, useState } from 'react'
import { BsChevronLeft, BsFillSendFill, BsThreeDotsVertical } from "react-icons/bs";
import { ChatData, ChatRoomDataProps } from '../types';
import styled from 'styled-components';
import { CheckModalContainer, ModalText } from '../../../components/Modal/types';
import CheckModal from '../../../components/Modal/CheckModal';
import MessageBox from './MessageBox';
import { getChatData } from '../../../services/api/chatAPI';
import { getUser } from '../../../services/api/memberAPI';
const Chat: React.FC<ChatRoomDataProps> = ({ chatRoomData, setDisplay }) => {

    const [display, setLeaveDisplay] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<boolean>(false);
    const [chatDatas, setChatDatas] = useState<ChatData[]>(getChatData(chatRoomData.chatRoomID))
    const [message, setMessage] = useState<string>("");
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [modalValue, setModalValue] = useState<boolean | null>()

    const messageEndRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setChatDatas(pre => [...pre, { userID: "51", message: message, time: "오후 11시40분" }])
        setMessage("");
        setTimeout(() => {
            setChatDatas(pre => [...pre, { userID: "1", message: `안녕하세요 저는 ${getUser(chatRoomData.loginId).name}입니다!`, time: "오후 11시41분" }])
        }, 2000)
    }

    useEffect(() => {
        if (modalValue === true) {
            setDisplay(false);
        }
        setModalDisplay(false);
        setModalValue(null);
        setLeaveDisplay(false);
    }, [modalValue])

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatDatas, chatRoomData]);

    return (
        <ChatContainer>
            <Title >
                <BsChevronLeft onClick={() => setDisplay(false)} />
                {`${chatRoomData.name}`}

                <BsThreeDotsVertical onClick={() => { setLeaveDisplay(pre => !pre) }} />
            </Title>
            <LeaveBuuton display={display}>
                <button onClick={() => setModalDisplay(true)}>채팅방 나가기</button>
            </LeaveBuuton>
            <ChatContent>
                {chatDatas.map((data) => (
                    <MessageBox chatData={data} />
                ))}
                <div ref={messageEndRef}></div>
            </ChatContent>
            <SendContainer onSubmit={sendMessage}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button type="submit"><BsFillSendFill /></button>
            </SendContainer>
            <CheckModalContainer display={modalDisplay}>
                <CheckModal textType={ModalText.LEAVE} setValue={setModalValue} />
            </CheckModalContainer>
        </ChatContainer>
    )
}

export default Chat

const ChatContainer = styled.div`
    padding: 15px 0 15px 0;
    & svg {
        cursor: pointer;
    }
`

const Title = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    background-color: white;
    font-size: 20px;
    font-weight: bold;
    color: #003369;
    border-bottom: 1px solid lightgray;
    padding: 0 10px 10px 10px;
    z-index: 5;
`

const LeaveBuuton = styled.div<{ display: boolean }>`
    display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: ${props => props.display ? "50px" : "35px"};
        border-radius: 0 0 20px 20px;
        background-color: lightgray;
        margin-top: 15px;
        position: absolute;
        left: 0;
        top: ${props => props.display ? "35px" : "0px"};
        transition: 0.2s ease;

    & button{
        height: 60%;
        width: 50%;
        border-style: none;
        border-radius: 10px;
        background-color: #e05151;
        color: white;
        font-size: 16px;
        font-weight: bold;
    }

    & button:hover{
        background-color: #be4c4c;
    }

    & button:active{
        background-color: #e05151;
        margin: 1px 0 0 1px;
    }
`

const ChatContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 470px;
    overflow: auto;
    z-index: -10;
`;

const SendContainer = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 60px;
    border-top: 1px solid lightgray;
    gap: 5px;

    & input {
        width: 70%;
        height: 40px;
        border-radius: 5px;
        border: 1px solid lightgray;
        font-size: 18px;
        color: #003369;
        background-color: whitesmoke;
        padding: 0 10px;
        outline: none;
    }

    & button{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 5px;
        font-size: 20px;
        font-weight: bold;
        background-color: #003369;
        color: white;
        border-style: none;
        cursor: pointer;
    }
`