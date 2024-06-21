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
    
    & form {
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 600px;
        
        & input {
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

const PostDetail: React.FC = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newPost: BoardPost = {
            boardType: 'FREE_BOARD', // 게시판 타입을 적절히 설정하세요
            title,
            content,
            questionId: 1 // 질문 ID를 적절히 설정하세요
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