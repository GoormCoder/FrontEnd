import React, { FormEvent, useEffect, useState } from 'react'
import { SetPageProps } from '../types'
import styled from 'styled-components'
import { IoSearch } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { testLog } from '../../../utils/testLog';
import { CheckModalContainer, ModalText } from '../../../components/Modal/types';
import CheckModal from '../../../components/Modal/CheckModal';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { findAllMemberByKeyword, setSearchText } from '../../../store/slices/memberSlice';
import { acceptFriendRequest, findAllFriendRequest, friendRequest, setRequestersEmpty } from '../../../store/slices/friendSlice';
import { ToastContainer, toast } from 'react-toastify';

const FriendAdd: React.FC<SetPageProps> = ({ setPage }) => {
    const dispatch = useAppDispatch();
    const { requesters } = useAppSelector(state => state.friend);
    const { searchText, memberId } = useAppSelector(state => state.member);

    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [modalValue, setModalValue] = useState<boolean | null>()


    useEffect(() => {
        setModalValue(null);
        setModalDisplay(false)
    }, [modalValue])


    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(findAllMemberByKeyword(searchText));
    };

    const handleRequest = (receiver: string) => {
        dispatch(friendRequest({ loginId: "user3", receiver: receiver }))
    }
    // loginId, requester, requestId
    const handleAccept = (loginId: string, requester: string, requestId: number) => {
        dispatch(acceptFriendRequest({ loginId: loginId, requester: requester, requestId: requestId }))
        dispatch(setRequestersEmpty())
    }

    return (
        <FriendAddContainer>
            <SearchFrom onSubmit={handleSearch}>
                <input type="search"
                    placeholder="아이디로 유저 검색"
                    onChange={(e) => { dispatch(setSearchText(e.target.value)) }}
                    value={searchText} />
                <button type="submit"><IoSearch /></button>
            </SearchFrom>
            <SearchResultList>
                {memberId.map((member) => {
                    modalValue && handleRequest(member.loginId)
                    return (
                        <>
                            <ResultContent key={member.loginId} >
                                {`${member.name}(${member.nickname})`} <FaPlusCircle onClick={() => setModalDisplay(true)} />

                            </ResultContent>
                            <CheckModalContainer display={modalDisplay}>
                                <CheckModal text={`${member.name}(${member.nickname})님을`} textType={ModalText.ADD} setValue={setModalValue} />
                            </CheckModalContainer>
                        </>
                    )
                })}
            </SearchResultList>
            <Title>친구요청 내역</Title>
            <RequestList>
                {requesters.map((data) => (
                    <ResultContent key={data.requestId} >
                        {`${data.requester.loginId}(${data.requester.nickname})`} <button className='ok' onClick={() => { handleAccept("user4", data.requester.loginId, data.requestId) }}>수락</button>
                    </ResultContent>
                ))}
            </RequestList>
        </FriendAddContainer>
    )
}

export default FriendAdd

const FriendAddContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0 15px 0;
`

const SearchFrom = styled.form`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    & input {
        width: 93%;
        height: 45px;
        font-size: 16px;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding-left: 15px;
        cursor: text;
    }

    & input:hover {
        border: 2px solid #003369;
    }

    & ::placeholder {
        color: lightgray;
    }

    & button {
        position: absolute;
        right: 15px;
        width: fit-content;
        height: 40px;
        font-size: 25px;
        background-color: white;
        border-style: none;
        border-radius: 5px;
        cursor: pointer;
    }
`
const SearchResultList = styled.div`
    border: 1px solid lightgray;
            border-radius: 5px;
    margin-top: 15px;
    width: 92%;
    height: 160px;
    overflow: auto;
`

const Title = styled.div`
    width: 90%;
    font-size: 20px;
    font-weight: bold;
    margin-top: 20px;
    padding-left: 15px;
`

const RequestList = styled.div`
    border: 1px solid lightgray;
            border-radius: 5px;
    margin-top: 5px;
    width: 92%;
    height: 160px;
    overflow: auto;
`

const ResultContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid;
    

    & svg {
        font-size: 25px;
        color: #003369
    }

    & svg:hover {
        color: #3da5ff;
        cursor: pointer;
    }

    & svg:active{
        font-size: 23px;
        margin: 1px 0 1px 0;
    }

    & .ok{
        background-color: #003369;
        width: 20%;
        height: 30px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        color: white;
        border-style: none;
        cursor: pointer;
    }    
    
    & .ok:hover{
        background-color: #001730;
    }

    & .ok:active{
        background-color: #003369;
        margin: 1px 0 0 1px;
        height: 29px;
    }
`