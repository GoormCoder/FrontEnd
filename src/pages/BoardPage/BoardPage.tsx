import React, { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar';
import styled from 'styled-components';
import dummy from './dummy.json';
import dummy2 from './dummy2.json';
import PostList from './components/PostList';
import Pagination from './components/pagination';
import BoardTabs from './components/BoardTab';
import { BoardDetails } from './types';
import { getAllBoardPosts } from '../../services/api/boardAPI';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center; 
    width: 100vh;
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 50px;
    width: 80vh;
    margin: 100px 0px 80px 0px;
`;

const SeparatedContainer = styled.div`
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
`;


const BoardPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState('FREE_BOARD');
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState<BoardDetails[]>([]);
    const postsPerPage = 10;

    useEffect(() => {
        getAllBoardPosts()
            .then(data => {
                setPosts(data);
            })
            .catch(error => {
                console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [selectedTab]);
    const filteredPosts = posts.filter(post =>
        (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.member.nickname && post.member.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchTerm(searchQuery);
    };

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <PageContainer>
            <BoardContainer>
                <BoardTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
                <SeparatedContainer>
                    <Searchbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
                    <PostList posts={currentPosts} />
                    <Pagination
                        totalPosts={filteredPosts.length}
                        postsPerPage={postsPerPage}
                        currentPage={currentPage}
                        paginate={paginate}
                    />
                </SeparatedContainer>
            </BoardContainer>
        </PageContainer>
    );
};

export default BoardPage;