import React, { useState } from 'react';
import Searchbar from './components/Searchbar';
import styled from 'styled-components';
import dummy from './dummy.json';
import dummy2 from './dummy2.json';
import PostList from './components/PostList';
import Pagination from './components/pagination';
import BoardTabs from './components/BoardTab';
import { Post, PostListProps } from './types';


const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 50px;
    width: 100%;
    margin: 100px 0px 80px 0px;
`;

const BoardPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setcurrentPage] = useState(1);
    const [selectedTab, setselectedTab] = useState('dummy');
    const postsPerPage = 10;

    const boards: { [key:string]: Post[]} = {
        dummy: Object.values(dummy),
        dummy2: Object.values(dummy2)
    };
    const posts = boards[selectedTab];
    const filteredPosts = posts.filter(post =>
        post.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.Author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setcurrentPage(pageNumber);    

    return (
        <BoardContainer>
            <BoardTabs selectedTab={selectedTab} setSelectedTab={setselectedTab} />
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <PostList posts={currentPosts} />
            <Pagination
                totalPosts={filteredPosts.length}
                postsPerPage={postsPerPage}
                currentPage={currentPage}
                paginate={paginate}
            />
        </BoardContainer>
    );
};

export default BoardPage;