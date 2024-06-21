import React, { useEffect, useState } from 'react'
import { CurrentPage, DisplayProps, FriendDataProps } from '../types'
import { BsChevronLeft, BsChatDotsFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import styled from 'styled-components';
import Chat from './Chat';
import CheckModal from '../../../components/Modal/CheckModal';
import { CheckModalContainer, ModalText } from '../../../components/Modal/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { createChatRoom } from '../../../store/slices/chatSlice';
const Friend: React.FC<FriendDataProps> = ({ setDisplay, setPage }) => {
    const dispatch = useAppDispatch();
    const { friend } = useAppSelector(state => state.friend);
    const [chatDisplay, setChatDisplay] = useState<boolean>(false);
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [modalValue, setModalValue] = useState<boolean | null>()

    const setAllClose = () => {
        setChatDisplay(false);
        setDisplay(false);
        setPage(CurrentPage.CHAT_LIST)
    }

    useEffect(() => {
        setModalValue(null);
        setModalDisplay(false)
    }, [modalValue])

    const createChat = () => {
        dispatch(createChatRoom(friend.loginId))
        setChatDisplay(true);
    }

    return (
        <FriendContainer>
            <Title>
                <BsChevronLeft onClick={() => setDisplay(false)} />
                {`${friend.name}(${friend.nickname})`}
            </Title>
            <DetailContent>
                <table id="friendTable">
                    <tbody id="friendTableBody">
                        {Object.keys((friend)).map((key) => (
                            <tr>
                                <th>{key.toUpperCase()}</th>
                                <th>{key === "birth" ? (friend as any)[key].toString() : (friend as any)[key]}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DetailContent>
            <ButtonContainer>
                <div className='chat friend-btn' onClick={() => createChat()}>
                    <BsChatDotsFill />
                    <div>1:1채팅</div>
                </div>
                <div className='delete friend-btn' onClick={() => setModalDisplay(pre => !pre)}>
                    <IoMdCloseCircle />
                    <div>친구삭제</div>
                </div>
            </ButtonContainer>
            {chatDisplay ?
                <ChatContainer display={chatDisplay}>
                    <Chat setDisplay={setAllClose} />
                </ChatContainer> : null}

            <CheckModalContainer display={modalDisplay}>
                <CheckModal textType={ModalText.DELETE} setValue={setModalValue} />
            </CheckModalContainer>
        </FriendContainer>
    )
}

export default Friend

const FriendContainer = styled.div`
    padding: 15px 0 15px 0;
    & svg {
        font-size: 22px;
        font-weight: 900;
        cursor: pointer;
    }
`

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 20px;
    font-weight: bold;
    color: #003369;
    border-bottom: 1px solid lightgray;
    padding: 0 10px 10px 10px;

`

const DetailContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 470px;

    & table {
        width: 100%;
        border-collapse: collapse;
    }

    & th, td {
        border: 1px solid #dddddd;
        text-align: left;
    }

    & th {
        font-weight: bold;
    }

    & th {
        padding: 15px;
    }

    & tr:nth-child(5) {
        height: 219px;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    border-top: 1px solid lightgray;
    padding-top: 10px;
    & .friend-btn{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;
        cursor: pointer;
    }

    & .chat{
        & svg {
            font-size: 25px;
            color: #003369;
        }
    }

    & .delete {
        gap: 0px;
        & svg {
            font-size: 30px;
            color: red;
        }
    }
`
const ChatContainer = styled.div<DisplayProps>`
    display: ${props => props.display ? "block" : "none"};
    position: absolute;
    top:0px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: white;
`