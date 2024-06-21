import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ChatRoomData } from '../types'
import Chat from './Chat'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { findAllChatRoom, setChatRoom } from '../../../store/slices/chatSlice'
import Alert from '../../../components/Alert/Alert'

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
    }, [chatdeleteIsOpen])

    return (
        <ChatListContainer>
            <List>
                {chatRooms.map((room, index) => (
                    <ChatContent key={index} onClick={() => setChatDetail(room)}>
                        {room.chatRoomName}
                    </ChatContent>
                ))}
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
    padding: 20px;
    border-bottom: 1px solid;
    cursor: pointer;
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