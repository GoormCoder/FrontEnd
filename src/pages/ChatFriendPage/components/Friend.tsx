import React from 'react'
import { FriendDataProps } from '../types'
import { BsChevronLeft } from "react-icons/bs";
import styled from 'styled-components';
const Friend: React.FC<FriendDataProps> = ({ userID, setDisplay }) => {
    return (
        <FriendContainer>
            <BsChevronLeft onClick={() => setDisplay(false)} />
            {userID.userName}
            FriendDetail
        </FriendContainer>
    )
}

export default Friend

const FriendContainer = styled.div`
    padding: 10px;
    & svg {
        cursor: pointer;
    }
`
