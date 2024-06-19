// src/components/PostItem.tsx
import React from 'react';
import styled from 'styled-components';
import { Post } from '../types';

const PostItemContainer = styled.tr`
    border-bottom: 1px solid #eee;
`;

const PostTitle = styled.td`
    padding: 10px;
    font-size: 16px;
    font-weight: bold;
`;

const PostMeta = styled.td`
    padding: 10px;
    font-size: 14px;
    color: #777;
`;

const PostItem: React.FC<Post> = ({ Title, Author, Likes, Date }) => {
    return (
        <PostItemContainer>
            <PostTitle>{Title}</PostTitle>
            <PostMeta>{Author}</PostMeta>
            <PostMeta>{Likes} Likes</PostMeta>
            <PostMeta>{Date}</PostMeta>
        </PostItemContainer>
    );
};

export default PostItem;