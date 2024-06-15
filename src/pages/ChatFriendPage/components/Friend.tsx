import React, { useState } from 'react'
import { CurrentPage, DisplayProps, FriendDataProps } from '../types'
import { BsChevronLeft, BsChatDotsFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";
import styled from 'styled-components';
import { getUser } from '../../../services/api/userAPI';
import Chat from './Chat';
const Friend: React.FC<FriendDataProps> = ({ userID, setDisplay, setPage }) => {

    const user = getUser(userID.id)
    const [chatDisplay, setChatDisplay] = useState<boolean>(false);

    const setAllClose = () => {
        setChatDisplay(false);
        setDisplay(false);
        setPage(CurrentPage.CHAT_LIST)
    }

    return (
        <FriendContainer>
            <Title>
                <BsChevronLeft onClick={() => setDisplay(false)} />
                {`${user.name}(${user.nick})`}
            </Title>
            <DetailContent>
                FriendDetail
            </DetailContent>
            <ButtonContainer>
                <div className='chat btn' onClick={() => setChatDisplay(pre => !pre)}>
                    <BsChatDotsFill />
                    <div>1:1채팅</div>
                </div>
                <div className='delete btn'>
                    <IoMdCloseCircle />
                    <div>친구삭제</div>
                </div>
            </ButtonContainer>
            <ChatContainer display={chatDisplay}>
                <Chat chatRoomData={{ id: "", userName: user.name }} setDisplay={setAllClose} />
            </ChatContainer>
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
    & .btn{
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