import React, { useEffect, useRef, useState } from 'react'
import { BsChevronLeft, BsFillSendFill, BsThreeDotsVertical } from "react-icons/bs";
import { ChatData, ChatMessageRequest, ChatRoomDataProps } from '../types';
import styled from 'styled-components';
import { CheckModalContainer, ModalText } from '../../../components/Modal/types';
import CheckModal from '../../../components/Modal/CheckModal';
import MessageBox from './MessageBox';
import { Client, IMessage } from "@stomp/stompjs";
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { deleteChatRoom, findAllChat, findAllChatRoom, setChatRoomEmpty, setChats, setChatsEmpty } from '../../../store/slices/chatSlice';
import { showAlert } from '../../../store/slices/alertSlice';
import { useURL } from '../../../services/api/axios';

const Chat: React.FC<ChatRoomDataProps> = ({ setDisplay }) => {
    const dispatch = useAppDispatch();
    const { chatRoom, chats } = useAppSelector(state => state.chat);
    const { loginedMember } = useAppSelector(state => state.member);
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [message, setMessage] = useState<string>("");
    const [display, setLeaveDisplay] = useState<boolean>(false);
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [modalValue, setModalValue] = useState<boolean | null>(null);
    const messageEndRef = useRef<HTMLDivElement | null>(null);



    useEffect(() => {
        if (chatRoom.chatRoomId) {
            dispatch(findAllChat(chatRoom.chatRoomId));
            const client = new Client({
                brokerURL: `ws://${useURL}:8080/ws`, // 서버 WebSocket URL
                reconnectDelay: 5000,
                connectHeaders: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                onConnect: () => {
                    console.log(`Connected to ChatRoom ${chatRoom.chatRoomId}`);
                    client.subscribe(`/sub/chats/room/${chatRoom.chatRoomId}`, (data: IMessage) => {
                        // console.log(data)
                        // const msg: string = data.body;
                        const msg: ChatData = JSON.parse(data.body);
                        dispatch(setChats({
                            message: msg.message,
                            loginedMember: {
                                // loginId: "jinsu123", name: "최진수"
                                loginId: msg.sender.longinId, name: msg.sender.name
                            }
                        }));
                    });
                },
            });
            client.activate();
            setStompClient(client);
            return () => {
                client.deactivate();
            }
        }
    }, [chatRoom.chatRoomId]);

    const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (stompClient && stompClient.connected) {
            const chatMessage: ChatMessageRequest = {
                chatRoomId: chatRoom.chatRoomId,
                senderLoginId: loginedMember.loginId,
                message: message,
            };
            stompClient.publish({
                destination: `/pub/send`,
                body: JSON.stringify(chatMessage),
            });
            setMessage("");
        }
    };

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats, chatRoom]);

    const closeAndDataEmpty = () => {
        setDisplay(false);
        dispatch(setChatRoomEmpty())
        dispatch(setChatsEmpty());
    }

    useEffect(() => {
        if (modalValue) {
            dispatch(deleteChatRoom(chatRoom.chatRoomId));
            closeAndDataEmpty();
            dispatch(showAlert(null, "chatDelete", "채팅방 삭제가 완료되었습니다."));
        }
        setModalDisplay(false);
        setModalValue(null);
        setLeaveDisplay(false);
    }, [modalValue])

    return (
        <ChatContainer>
            <Title >
                <BsChevronLeft onClick={closeAndDataEmpty} />
                {`${chatRoom.chatRoomName}`}

                <BsThreeDotsVertical onClick={() => { setLeaveDisplay(pre => !pre) }} />
            </Title>
            <LeaveBuuton display={display}>
                <button onClick={() => setModalDisplay(true)}>채팅방 나가기</button>
            </LeaveBuuton>
            <ChatContent>
                {chats.map((data, index) => {
                    let showDate;
                    let display;
                    const date = new Intl.DateTimeFormat('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    }).format(new Date(data.createdAt))

                    const beforeDate = index != 0 && new Intl.DateTimeFormat('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    }).format(new Date(chats[index - 1].createdAt))

                    if (date != beforeDate) {
                        showDate = date;
                        display = true;
                    } else {
                        showDate = "";
                        display = false;
                    }

                    return (
                        <>
                            {display ? <div className='date'>{showDate}</div> : null}
                            <MessageBox chatData={data} />
                        </>
                    )
                })}
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
    position: relative;
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
    height: 470px;
    overflow: auto;
    z-index: -10;

    & .date{
        width: 100%;
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        color: #003369;
        margin: 20px 0 10px 0;
    }
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