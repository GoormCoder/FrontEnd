import React, { useState } from 'react';
import Searchbar from './components/Searchbar';
import styled from 'styled-components';
import dummy from './dummy.json';
import dummy2 from './dummy2.json';
import PostList from './components/PostList';
import Pagination from './components/pagination';
import BoardTabs from './components/BoardTab';
import { Post, PostListProps } from './types';

const PageContainer =styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; /* 중앙 정렬 */
    justify-content: center; /* 중앙 정렬 */
    width: 100vh;
`;
const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 80vh;
    margin: 100px 0px 80px 0px;
`;

const BoardPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setcurrentPage] = useState(1);
    const [selectedTab, setselectedTab] = useState('dummy');
    const [searchTerm, setsearchTerm] = useState(''); // 검색어 상태 추가
    const postsPerPage = 10;

    const boards: { [key:string]: Post[]} = {
        dummy: Object.values(dummy),
        dummy2: Object.values(dummy2)
    };
    const posts = boards[selectedTab];
    const filteredPosts = posts.filter(post =>
        post.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.Author.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setsearchTerm(searchQuery);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setcurrentPage(pageNumber);    

    return (
        <PageContainer>
            <BoardContainer>
                <BoardTabs selectedTab={selectedTab} setSelectedTab={setselectedTab} />
                <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
                <PostList posts={currentPosts} />
                <Pagination
                    totalPosts={filteredPosts.length}
                    postsPerPage={postsPerPage}
                    currentPage={currentPage}
                    paginate={paginate}
                />
            </BoardContainer>    
        </PageContainer>
        
    );
};

export default BoardPage;