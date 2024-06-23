import React, { useState } from 'react';
import styled from 'styled-components';
import { BoardDetails } from '../types';
import { useNavigate } from 'react-router-dom';

const PostItemContainer = styled.tr`
    border-bottom: 1px solid #eee;
    cursor: pointer;

    &:hover {
        background-color: #f9f9f9;
    }
`;

const PostTitle = styled.td`
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const PostMeta = styled.td`
    padding: 10px;
    font-size: 14px;
    color: #777;
`;

interface PostItemProps {
    post: BoardDetails;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const nav = useNavigate();
    const [data, setData] = useState(post)
    const handleClick = () => {
        nav(`/board/1`);
    };

    return (
        <PostItemContainer onClick={handleClick}>
            <PostTitle>{post.title}</PostTitle>
            <PostMeta>{post.member.nickname}</PostMeta>
            <PostMeta>{post.likeCount} Likes</PostMeta>
            <PostMeta>{new Date(post.createdAt).toLocaleDateString()}</PostMeta>
        </PostItemContainer>
    );
};

export default PostItem;