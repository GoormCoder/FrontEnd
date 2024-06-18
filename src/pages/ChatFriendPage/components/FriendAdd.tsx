import React, { useEffect, useState } from 'react'
import { SetPageProps } from '../types'
import styled from 'styled-components'
import { IoSearch } from "react-icons/io5";
import { FaPlusCircle } from "react-icons/fa";
import { testLog } from '../../../utils/testLog';
import { CheckModalContainer, ModalText } from '../../../components/Modal/types';
import CheckModal from '../../../components/Modal/CheckModal';

const FriendAdd: React.FC<SetPageProps> = ({ setPage }) => {
    const [searchText, setSearchText] = useState<string>("");
    const [searchResult, setSearchResult] = useState<string[]>(["test", "test", "test", "test", "test"]);
    const [modalDisplay, setModalDisplay] = useState<boolean>(false);
    const [modalValue, setModalValue] = useState<boolean | null>()

    function search(e: React.FormEvent<HTMLFormElement> | null, searchText: string): void {
        if (e) e.preventDefault();
        testLog(searchText)
    }

    useEffect(() => {
        setModalValue(null);
        setModalDisplay(false)
    }, [modalValue])

    return (
        <FriendAddContainer>
            <SearchFrom onSubmit={(e) => { search(e, searchText) }}>
                <input type="search"
                    placeholder="아이디로 유저 검색"
                    onChange={(e) => { setSearchText(e.target.value) }} />
                <button type="submit"><IoSearch /></button>
            </SearchFrom>
            <SearchResultList>
                {searchResult.map((result, index) => (
                    <>
                        <ResultContent key={index} >
                            {result} <FaPlusCircle onClick={() => setModalDisplay(true)} />

                        </ResultContent>
                        <CheckModalContainer display={modalDisplay}>
                            <CheckModal text={result} textType={ModalText.ADD} setValue={setModalValue} />
                        </CheckModalContainer>
                    </>
                ))}
            </SearchResultList>
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
    height: 380px;
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
`