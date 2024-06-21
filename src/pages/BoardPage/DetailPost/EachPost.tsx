import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import dummy from '../dummy.json';
import dummy2 from '../dummy2.json';
import { BoardDetails } from '../types';

const DetailContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 80vh;
    padding: 20px;
    margin: 100px auto;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
`;

const PostHeader = styled.div`
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #eee;
`;

const PostTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;
`;

const PostMeta = styled.div`
    font-size: 14px;
    color: #777;
    display: flex;
    justify-content: space-between;
`;

const PostContent = styled.div`
    padding: 20px;
    width: 100%;
    line-height: 1.6;
`;

const LikeButton = styled.button`
    margin-top: 20px;
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

const EachPost: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();
    const [likes, setLikes] = useState<number>(0); // 좋아요 수 상태 추가

    if (!id) {
        navigate('/board');
        return null;
    }

    const postId = parseInt(id);

    const boards: { [key: string]: BoardDetails[] } = {
        dummy: Object.values(dummy),
        dummy2: Object.values(dummy2)
    };

    const allPosts = [...boards.dummy, ...boards.dummy2];
    const post = allPosts.find(post => post.boardId === postId);

    if (!post) {
        return <div>Post not found</div>;
    }

    const handleLike = () => {
        setLikes(likes + 1);
    };

    return (
        <DetailContainer>
            <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                    <span>작성자: {post.member.nickname}</span>
                    <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>좋아요: {post.likeCount + likes}</span>
                </PostMeta>
            </PostHeader>
            <PostContent>
                {post.content || '내용이 없습니다.'}
            </PostContent>
            <LikeButton onClick={handleLike}>좋아요</LikeButton>
        </DetailContainer>
    );
};

export default EachPost;