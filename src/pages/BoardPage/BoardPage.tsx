import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Searchbar from './components/Searchbar';
import styled from 'styled-components';
import PostList from './components/PostList';
import Pagination from './components/pagination';
import BoardTabs from './components/BoardTab';
import { BoardDetails } from './types';
import { getAllBoardPosts, getBoardPostsByType } from '../../services/api/boardAPI';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: flex-start; 
    width: 100vw;
    min-height: 100vh; 
    background-color: #f0f0f0; 
    padding-top: 100px; 
    
`;

const BoardContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;
    max-width: 800px;
    min-height: 600px; /* 컨텐츠가 없을 때 최소 높이를 설정 */
    margin: auto;
    margin-top: 10px; /* 추가 여백으로 위로 이동 */
        @media only screen and (max-width: 430px) {
            width: 80%;
        }
`;

const SeparatedContainer = styled.div`
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 20px;
    width: 100%;
    background-color: white;
    @media only screen and (max-width: 430px) {
            width: 90%;
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
`;

const WriteButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const BoardPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTab, setSelectedTab] = useState('FREE_BOARD');
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState<BoardDetails[]>([]);
    const postsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        getBoardPostsByType(selectedTab)
            .then(data => {
                setPosts(data);
                console.log(data);
            })
            .catch(error => {
                console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
            });
    }, [selectedTab]);

    useEffect(() => {
        getAllBoardPosts()
            .then(data => {
                setPosts(data);
                console.log(data);
            })
            .catch(error => {
                console.error('전체 게시글 데이터를 불러오는 중 오류가 발생했습니다:', error);
            });
    }, []);

    const filteredPosts = posts.filter(post =>
        (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.member.nickname && post.member.nickname.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchTerm(searchQuery);
    };

    const handleWriteButtonClick = () => {
        navigate('/Postwrite');
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
                    <ButtonContainer>
                        <WriteButton onClick={handleWriteButtonClick}>글쓰기</WriteButton>
                    </ButtonContainer>
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