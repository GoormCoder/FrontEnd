import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { createBoardPost } from '../../../services/api/boardAPI';
import { BoardPost } from '../types';

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;

    @media (max-width: 768px) {
        margin-top: 50px;
    }
    
    & form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 600px;
        
        @media (max-width: 768px) {
            width: 100%;
        }
        
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

                @media (max-width: 768px) {
                    height: 36px;
                    font-size: 14px;
                }
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
    @media only screen and (max-width: 430px) {
            & form {
                width: 90%;
            }
    }
`;

const PostDetail: React.FC = () => {
    const navigate = useNavigate();
    const [boardType, setBoardType] = useState('FREE_BOARD');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPost: BoardPost = {
            boardType,
            title,
            content,
            questionId: 1
        };

        try {
            await createBoardPost(newPost);
            alert('게시글이 성공적으로 등록되었습니다.');
            navigate('/board');
        } catch (error) {
            console.error('게시글 등록 중 오류가 발생했습니다:', error);
            alert('게시글 등록 중 오류가 발생했습니다.');
        }
    };

    return (
        <PostContainer>
            <h2>게시글 작성</h2>
            <form onSubmit={handleSubmit}>
                <select value={boardType} onChange={(e) => setBoardType(e.target.value)}>
                    <option value="FREE_BOARD">자유 게시판</option>
                    <option value="QUESTION_BOARD">질문 게시판</option>
                </select>
                <input
                    type='text'
                    placeholder='제목'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder='내용'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className="button-group">
                    <button type="button" className="back-button" onClick={() => navigate('/board')}>뒤로가기</button>
                    <button type="submit" className="submit-button">작성 완료</button>
                </div>
            </form>
        </PostContainer>
    );
}

export default PostDetail;