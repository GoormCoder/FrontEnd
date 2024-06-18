import React from 'react';
import { PostListProps } from '../types';
import PostItem from './Post';



const PostList: React.FC<PostListProps> = ({ posts }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>제목</th>
                    <th>작성자</th>
                    <th>좋아요 수</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>
                {posts.map((post, index) => (
                    <PostItem
                        key={index}
                        Title={post.Title}
                        Author={post.Author}
                        Likes={post.Likes}
                        Date={post.Date}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default PostList;