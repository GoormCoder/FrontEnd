import React from 'react';
import styled from 'styled-components';
import { IoSearch } from "react-icons/io5";


const SearchBarContainer = styled.form`
    display: flex;
    position: relative;
    align-items: center;

    & input {
        width: 100%;
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
        right: 2px;
        width: 5%;
        height: 40px;
        font-size: 25px;
        background-color: white;
        border-style: none;
        border-radius: 5px;
        cursor: pointer;
    }   
`;
interface SearchbarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
    return (
    <SearchBarContainer onSubmit={handleSearch}>
        <input 
            type="search" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="검색하고 싶은 게시글 검색"
        />
        <button type="submit"><IoSearch /></button>    
    </SearchBarContainer>
    );    
};

export default Searchbar;