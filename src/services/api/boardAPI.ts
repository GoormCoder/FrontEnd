import axios from './axios';
import { BoardPost, BoardDetails } from '../../pages/BoardPage/types';

// 게시글 타입별 조회
export function getBoardPostsByType(boardType: string): Promise<BoardDetails[]> {
    return axios.get('/boards', {
        params: { boardType }
    })
    .then(response => {
        return response.data as BoardDetails[];
    })
    .catch(error => {
        console.error("게시글을 불러오는 중 오류가 발생했습니다:", error);
        throw error;
    });
}

// 게시글 등록
export function createBoardPost(boardPost: BoardPost): Promise<void> {
    return axios.post('/boards', boardPost)
        .then(response => {
            console.log("게시글이 성공적으로 등록되었습니다.");
        })
        .catch(error => {
            console.error("게시글 등록 중 오류가 발생했습니다:", error.response.data);
            throw error;
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
            throw error;
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

// export function getAllBoardPosts(): Promise<BoardDetails[]> {
//     return axios.get('/boards/all')
//         .then(response => {
//             return response.data as BoardDetails[];
//         })
//         .catch(error => {
//             if (error.response) {
//                 // 서버 응답이 2xx 범위를 벗어날 때
//                 console.error("전체 게시글 데이터를 불러오는 중 오류가 발생했습니다:", error.response.data);
//                 console.error("상태 코드:", error.response.status);
//                 console.error("헤더:", error.response.headers);
//             } else if (error.request) {
//                 // 요청이 이루어졌으나 응답을 받지 못함
//                 console.error("요청이 이루어졌으나 응답을 받지 못했습니다:", error.request);
//             } else {
//                 // 오류를 발생시킨 요청 설정
//                 console.error('요청 설정 중 오류가 발생했습니다:', error.message);
//             }
//             console.error("Axios 설정:", error.config);
//             throw error;
//         });
// }

// 게시글 삭제
export function deleteBoardPost(boardId: number): Promise<void> {
    return axios.delete(`/boards/${boardId}`)
        .then(response => {
            console.log("게시글이 성공적으로 삭제되었습니다.");
        })
        .catch(error => {
            console.error("게시글 삭제 중 오류가 발생했습니다:", error);
            throw error;
        });
}

// 게시글 좋아요 생성
export function likeBoardPost(boardId: number): Promise<void> {
    return axios.post(`/boards/${boardId}/like`)
        .then(response => {
            console.log("게시글 좋아요가 성공적으로 생성되었습니다.");
        })
        .catch(error => {
            console.error("게시글 좋아요 생성 중 오류가 발생했습니다:", error);
            throw error;
        });
}

// 게시글 좋아요 취소
export function unlikeBoardPost(boardId: number): Promise<void> {
    return axios.post(`/boards/${boardId}/unlike`)
        .then(response => {
            console.log("게시글 좋아요가 성공적으로 취소되었습니다.");
        })
        .catch(error => {
            console.error("게시글 좋아요 취소 중 오류가 발생했습니다:", error);
            throw error;
        });
}