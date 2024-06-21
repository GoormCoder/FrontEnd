import axios from './axios';
import { BoardPost, BoardDetails } from '../../pages/BoardPage/types';

// 게시글 등록
export function createBoardPost(boardPost: BoardPost): Promise<void> {
    return axios.post('/boards', boardPost)
        .then(response => {
            console.log("게시글이 성공적으로 등록되었습니다.");
        })
        .catch(error => {
            console.error("게시글 등록 중 오류가 발생했습니다:", error);
        });
}

// 게시글 열람
export function getBoardPost(boardId: number): Promise<BoardDetails> {
    return axios.get(`/boards/${boardId}`)
        .then(response => {
            return response.data as BoardDetails;
        })
        .catch(error => {
            console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
            throw error;
        });
}

// 특정 게시글 수정
export function updateBoardPost(boardId: number, title: string, content: string): Promise<void> {
    const requestBody = {
        title,
        content
    };

    return axios.patch(`/boards/${boardId}`, requestBody)
        .then(response => {
            console.log("게시글이 성공적으로 수정되었습니다.");
        })
        .catch(error => {
            console.error("게시글 수정 중 오류가 발생했습니다:", error);
        });
}

// 게시글 조회
export function getAllBoardPosts(): Promise<BoardDetails[]> {
    return axios.get('/boards/all')
        .then(response => {
            return response.data as BoardDetails[];
        })
        .catch(error => {
            console.error("전체 게시글 데이터를 불러오는 중 오류가 발생했습니다:", error);
            throw error;
        });
}
