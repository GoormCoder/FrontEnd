import React from 'react';
import styled from 'styled-components';
import { IoSearch } from "react-icons/io5";


const SearchBarContainer = styled.form`
    display: flex;
    position: relative;
    align-items: center;
    padding: 5px 0;

    & input {
        width: 100%;
        height: 45px;
        font-size: 16px;
        border: 1px solid lightgray;
        border-radius: 5px;
        padding-left: 15px;
        cursor: text;

        @media (max-width: 768px) {
            height: 40px;
            font-size: 14px;
        }

        @media (max-width: 480px) {
            height: 35px;
            font-size: 12px;
        }
    }

    & input:hover {
        border: 2px solid #003369;
    }

    & ::placeholder {
        color: lightgray;

        @media (max-width: 480px) {
            font-size: 12px;
        }
    }

    & button {
        position: absolute;
        right: 2px;
        width: 40px;
        height: 40px;
        font-size: 25px;
        background-color: white;
        border-style: none;
        border-radius: 5px;
        cursor: pointer;

        @media (max-width: 480px) {
            height: 30px;
            font-size: 20px;
        }
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