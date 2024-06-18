import React from 'react';
import styled from 'styled-components';
import { IoMdSearch } from "react-icons/io";


const SearchBarContainer = styled.div`
    margin: 20px 0;
    text-align: center;   
`;
interface SearchbarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ searchQuery, setSearchQuery }) => {
    return (
    <SearchBarContainer>
        <h2> Board</h2>
        <input 
            type="text" 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search posts..."
        />
        <input type='submit' value='검색'></input>
        {/* 검색버튼 둘중하나 정해서 쓰기 */}
        <button
            type="submit"
        ><IoMdSearch />
        </button>    
    </SearchBarContainer>
    );    
};

export default Searchbar;