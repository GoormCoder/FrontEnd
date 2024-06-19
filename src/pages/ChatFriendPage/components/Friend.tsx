import React, { useEffect, useState } from 'react'
import { CurrentPage, DisplayProps, FriendDataProps } from '../types'
import { BsChevronLeft, BsChatDotsFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import styled from 'styled-components';
import Chat from './Chat';
import CheckModal from '../../../components/Modal/CheckModal';
import { CheckModalContainer, ModalText } from '../../../components/Modal/types';
const Friend: React.FC<FriendDataProps> = ({ friendID, setDisplay, setPage }) => {
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

    return (
        <FriendContainer>
            <Title>
                <BsChevronLeft onClick={() => setDisplay(false)} />
                {`${friendID.name}(${friendID.nickname})`}
            </Title>
            <DetailContent>
                FriendDetail
            </DetailContent>
            <ButtonContainer>
                <div className='chat friend-btn' onClick={() => setChatDisplay(pre => !pre)}>
                    <BsChatDotsFill />
                    <div>1:1채팅</div>
                </div>
                <div className='delete friend-btn' onClick={() => setModalDisplay(pre => !pre)}>
                    <IoMdCloseCircle />
                    <div>친구삭제</div>
                </div>
            </ButtonContainer>
            <ChatContainer display={chatDisplay}>
                <Chat chatRoomData={{ loginId: friendID.loginId, name: friendID.name, nickname: friendID.nickname, chatRoomID: "" }} setDisplay={setAllClose} />
            </ChatContainer>
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