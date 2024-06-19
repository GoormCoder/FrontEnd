import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

    return (
        <PostContainer>
            <h2>게시글 작성</h2>
            <form>
                <input type='text' placeholder='제목' />
                <textarea placeholder='내용'></textarea>
                <div className="button-group">
                    <button type="button" className="back-button" onClick={() => navigate('/board')}>뒤로가기</button>
                    <button type="submit" className="submit-button">작성 완료</button>
                </div>
            </form>
        </PostContainer>
    );
}

export default PostDetail;
