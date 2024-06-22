import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getBoardPost, updateBoardPost } from '../../../services/api/boardAPI';
import { BoardDetails } from '../types';

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;

    & form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 600px;

        & input, & select {
            width: 100%;
            height: 40px;
            font-size: 16px;
            border: 1px solid lightgray;
            border-radius: 5px;
            padding-left: 15px;
            box-sizing: border-box;
            cursor: text;
        }

        & textarea {
            width: 100%;
            height: 200px;
            font-size: 16px;
            border: 1px solid lightgray;
            border-radius: 5px;
            padding-left: 15px;
            box-sizing: border-box;
            cursor: text;
            resize: none;
        }

        & .button-group {
            display: flex;
            gap: 10px;

            & button {
                flex: 1;
                height: 40px;
                font-size: 16px;
                border: 1px solid lightgray;
                border-radius: 5px;
                cursor: pointer;
                font-weight: bold;
            }

            & .back-button {
                background-color: gray;
                color: #ffffff;
            }

            & .submit-button {
                background-color: #003369;
                color: #ffffff;
            }
        }
    }
`;

const EditPost: React.FC = () => {
    const { boardId } = useParams<{ boardId: string }>();
    const navigate = useNavigate();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    useEffect(() => {
        const loadPost = async () => {
            try {
                const data = await getBoardPost(Number(boardId));
                setTitle(data.title);
                setContent(data.content);
            } catch (error) {
                console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
            }
        };

        if (boardId) {
            loadPost();
        }
    }, [boardId]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!boardId) return;
        try {
            await updateBoardPost(Number(boardId), title, content);
            alert('게시글이 성공적으로 수정되었습니다.');
            navigate(`/boards/${boardId}`);
        } catch (error) {
            alert('게시글 수정 중 오류가 발생했습니다.');
            console.error('게시글 수정 중 오류가 발생했습니다:', error);
        }
    };

    return (
        <PostContainer>
            <h2>게시글 수정</h2>
            <form onSubmit={handleSave}>
                <input 
                    type='text' 
                    placeholder='제목' 
                    value={title} 
                    onChange={handleTitleChange} 
                />
                <textarea 
                    placeholder='내용' 
                    value={content} 
                    onChange={handleContentChange}
                ></textarea>
                <div className="button-group">
                    <button type="button" className="back-button" onClick={() => navigate('/board')}>뒤로가기</button>
                    <button type="submit" className="submit-button">수정 완료</button>
                </div>
            </form>
        </PostContainer>
    );
};

export default EditPost;