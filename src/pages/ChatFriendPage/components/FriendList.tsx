import React, { useState } from 'react'
import Friend from './Friend'
import styled from 'styled-components'
import { DisplayProps, User, UserID } from '../types'
import { getFriendsID } from '../../../services/api/chatFriendAPI'
import { getUser, getUserID } from '../../../services/api/userAPI'

const FriendList = () => {
    const user = getUser("51")
    const friends = getFriendsID(user.id)
    const littleFriends = friends.slice(0, 5);
    const [friendID, setFriendID] = useState<UserID>(getUserID(user.id));
    const [display, setDisplay] = useState<boolean>(false);

    const setFriendDetail = (userID: UserID) => {
        setFriendID(userID);
        setDisplay(true)
    }

    return (
        <FriendListContainer>
            <List>
                {friends.map((friend, index) => (
                    <FriendContent key={index} onClick={() => setFriendDetail(friend)}>
                        {friend.userName}
                    </FriendContent>
                ))}
            </List>
            <FriendContainer display={display}>
                <Friend userID={friendID} setDisplay={setDisplay} />
            </FriendContainer>

        </FriendListContainer>
    )
}

export default FriendList

const FriendListContainer = styled.div`
    height: 100%;
    overflow: auto;
`
const List = styled.div`
    
`

const FriendContent = styled.div`
    cursor: pointer;
`

const FriendContainer = styled.div<DisplayProps>`
    display: ${props => props.display ? "block" : "none"};
    position: absolute;
    top:0px;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background-color: white;
`