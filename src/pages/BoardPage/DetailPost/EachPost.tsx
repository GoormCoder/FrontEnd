import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BoardDetails } from '../types';
import { getBoardPost, likeBoardPost, unlikeBoardPost, deleteBoardPost } from '../../../services/api/boardAPI';

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

    @media (max-width: 768px) {
        width: 90vw;
        margin: 50px auto;
    }

    @media (max-width: 480px) {
        width: 95vw;
        padding: 15px;
        margin: 20px auto;
    }
`;

const PostHeader = styled.div`
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #eee;

    @media (max-width: 480px) {
        padding: 5px;
    }
`;

const PostTitle = styled.h1`
    font-size: 24px;
    margin-bottom: 10px;

    @media (max-width: 480px) {
        font-size: 20px;
        margin-bottom: 5px;
    }
`;

const PostMeta = styled.div`
    font-size: 14px;
    color: #777;
    display: flex;
    justify-content: space-between;

    @media (max-width: 480px) {
        flex-direction: column;
        gap: 5px;
    }
`;

const PostContent = styled.div`
    padding: 20px;
    width: 100%;
    line-height: 1.6;

    @media (max-width: 480px) {
        padding: 10px;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 10px;
    
    @media (max-width: 480px) {
        flex-direction: column;
        width: 100%;
    }
`;

const LikeButton = styled.button<{ liked: boolean }>`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: ${props => (props.liked ? '#007bff' : '#ff0000')};
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${props => (props.liked ? '#0056b3' : '#cc0000')};
    }

    @media (max-width: 480px) {
        padding: 8px 16px;
        font-size: 14px;
    }
`;

const DeleteButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #dc3545;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #c82333;
    }

    @media (max-width: 480px) {
        padding: 8px 16px;
        font-size: 14px;
    }
`;

const EditButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }

    @media (max-width: 480px) {
        padding: 8px 16px;
        font-size: 14px;
    }
`;

const EachPost: React.FC = () => {
    const { boardId } = useParams<{ boardId?: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BoardDetails | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        if (!boardId) {
            navigate('/board');
            return;
        }

        const fetchPost = async () => {
            try {
                const data = await getBoardPost(parseInt(boardId));
                setPost(data);
                setIsLiked(data.likeCount > 0);
                const currentUserId = localStorage.getItem('userId');
                if (currentUserId && data.member.id.toString() === currentUserId) {
                    setIsEditable(true);
                }
            } catch (error) {
                console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
                navigate('/board');
            }
        };

        fetchPost();
    }, [boardId, navigate]);

    const handleLikeToggle = async () => {
        if (!post) return;

        try {
            if (isLiked) {
                await likeBoardPost(post.boardId);
                setPost({ ...post, likeCount: post.likeCount + 1 });
            } else {
                await unlikeBoardPost(post.boardId);
                setPost({ ...post, likeCount: post.likeCount - 1 });
            }
            setIsLiked(!isLiked);
        } catch (error) {
            console.error('좋아요 상태 변경 중 오류가 발생했습니다:', error);
        }
    };

    const handleDelete = async () => {
        if (boardId && window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            try {
                await deleteBoardPost(Number(boardId));
                alert('게시글이 성공적으로 삭제되었습니다.');
                navigate('/board');
            } catch (error) {
                console.error('게시글 삭제 중 오류가 발생했습니다:', error);
                alert('게시글 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    const handleEdit = () => {
        if (boardId) {
            navigate(`/boards/${boardId}/edit`);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <DetailContainer>
            <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                    <span>작성자: {post.member.nickname}</span>
                    <span>작성일: {new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>좋아요: {post.likeCount}</span>
                </PostMeta>
            </PostHeader>
            <PostContent>
                {post.content || '내용이 없습니다.'}
            </PostContent>
            <ButtonContainer>
                <LikeButton liked={isLiked} onClick={handleLikeToggle}>
                    {isLiked ? '좋아요' : '좋아요 취소'}
                </LikeButton>
                {isEditable && (
                    <>
                        <EditButton onClick={handleEdit}>게시글 수정</EditButton>
                        <DeleteButton onClick={handleDelete}>게시글 삭제</DeleteButton>
                    </>
                )}
            </ButtonContainer>
        </DetailContainer>
    );
};

export default EachPost;
