import React, { useEffect, useState } from 'react'
import Friend from './Friend'
import styled from 'styled-components'
import { DisplayProps, FriendData, SetPageProps, User, UserID } from '../types'
import { getUser } from '../../../services/api/memberAPI'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { setFriend } from '../../../store/slices/friendSlice'

const FriendList: React.FC<SetPageProps> = ({ setPage }) => {
    const dispatch = useAppDispatch();
    const { friends, friend } = useAppSelector(state => state.friend);
    const [display, setDisplay] = useState<boolean>(false);
    const setFriendDetail = (friend: FriendData) => {
        setDisplay(true)
        dispatch(setFriend(friend))
    }
    return (
        <FriendListContainer>
            <List>
                {friends.map((data) => (
                    <div className='content-container'>
                        <FriendContent key={data.loginId} onClick={() => setFriendDetail(data)}>
                            {`${data.name}(${data.nickname})`}
                        </FriendContent>
                    </div>
                ))}
            </List>
            <FriendContainer display={display}>
                <Friend friendID={friend} setDisplay={setDisplay} setPage={setPage} />
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
    & .content-container:hover {
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