import React, { useState } from 'react'
import Friend from './Friend'
import styled from 'styled-components'
import { DisplayProps, SetPageProps, User, UserID } from '../types'
import { getFriendsID } from '../../../services/api/friendAPI'
import { getUser, getUserID } from '../../../services/api/userAPI'

const FriendList: React.FC<SetPageProps> = ({ setPage }) => {
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
                <Friend userID={friendID} setDisplay={setDisplay} setPage={setPage} />
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
    & :hover {
        background-color: whitesmoke;
    }
`

const FriendContent = styled.div`
    padding: 20px;
    border-bottom: 1px solid;
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