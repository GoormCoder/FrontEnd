import React, { useState } from 'react';
import Searchbar from './components/Searchbar';
import styled from 'styled-components';
import dummy from './dummy.json';
import dummy2 from './dummy2.json';
import PostItem from './components/Post';
import Pagination from './components/pagination';
import BoardTabs from './components/BoardTab';
import { Post } from './types';


const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    border: 1px solid #292929;
    border-radius: 5px;
    padding: 20px;
    margin-top: 20px;
`;

const PostList = styled.div`
    margin-top: 20px;
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
            <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <BoardTabs selectedTab={selectedTab} setSelectedTab={setselectedTab} />
            <PostList>
                {currentPosts.map((post, index) => (
                    <PostItem 
                        key={index}
                        title={post.Title}
                        author={post.Author}
                        likes={post.Likes}
                        date={post.Date}
                    />
                ))}
            </PostList>
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