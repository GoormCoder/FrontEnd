import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ChatRoomData } from '../types'
import Chat from './Chat'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { findAllChatRoom, setChatRoom } from '../../../store/slices/chatSlice'
import Alert from '../../../components/Alert/Alert'
import { FaCircle } from "react-icons/fa";

const ChatList = () => {
    const dispatch = useAppDispatch();
    const { chatRooms } = useAppSelector(state => state.chat);
    const { chatdeleteIsOpen } = useAppSelector(state => state.alert);
    const [display, setDisplay] = useState<boolean>(false);
    const setChatDetail = (room: ChatRoomData) => {
        dispatch(setChatRoom(room))
        setDisplay(true)
    }

    useEffect(() => {
        dispatch(findAllChatRoom())
        const intervalId = setInterval(() => {
            dispatch(findAllChatRoom())
        }, 1000);
        return () => {
            clearInterval(intervalId);

        }
    }, [display, chatdeleteIsOpen])



    return (
        <ChatListContainer>
            <List>
                {chatRooms.map((room, index) => {
                    const date = new Intl.DateTimeFormat('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    }).format(new Date(room.lastMessage.createdAt))

                    const nowDate = new Intl.DateTimeFormat('ko-KR', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit',
                    }).format(new Date())

                    const time = new Intl.DateTimeFormat('ko-KR', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }).format(new Date(room.lastMessage.createdAt))
                    return (
                        <ChatContent key={index} onClick={() => setChatDetail(room)}>
                            <div className='content'>
                                <div className='name'>{room.chatRoomName}</div>
                                <div className='last'>{date == nowDate ? time : date}</div>
                            </div>
                            <div className='content'>
                                <div className='last'>
                                    {room.lastMessage.message}
                                </div>
                                <div>
                                    {room.hasUnreadMessages ? <FaCircle /> : null}
                                </div>
                            </div>
                        </ChatContent>
                    )
                })}
            </List>
            {display ? <ChatContainer >
                <Chat setDisplay={setDisplay} />
            </ChatContainer> : null}
            <Alert isOpen={chatdeleteIsOpen} />
        </ChatListContainer>
    )
}

export default ChatList

const ChatListContainer = styled.div`
    height: 100%;
    overflow: auto;
`
const List = styled.div`
    & :hover {
        background-color: whitesmoke;
    }
`

const ChatContent = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
    padding: 20px;
    border-bottom: 1px solid lightgray;
    cursor: pointer;

    & .content{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    & svg{
        color: red;
    }

    & .name {
        font-size: 18px;
        font-weight: bold;
    }

    & .last {
        color: gray
    }
`

const ChatContainer = styled.div`
    display: block;
    position: absolute;
    top:0px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: white;
`