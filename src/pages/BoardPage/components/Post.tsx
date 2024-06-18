// src/components/PostItem.tsx
import React from 'react';
import styled from 'styled-components';


interface PostItemProps {
    title: string;
    author: string;
    likes: number;
    date: string;
}
const PostItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
`;

const PostTitle = styled.h3`
    margin: 0;
    font-size: 16px;
`;

const PostMeta = styled.div`
    display: flex;
    gap: 10px;
    font-size: 14px;
    color: #777;
`;

const PostItem: React.FC<PostItemProps> = ({ title, author, likes, date }) => {
    return (
        <PostItemContainer>
        <PostTitle>{title}</PostTitle>
        <PostMeta>
            <span>{author}</span>
            <span>{likes} Likes</span>
            <span>{date}</span>
        </PostMeta>
        </PostItemContainer>
    );
};

export default PostItem;