import axios from './axios';
import { Solve, CreateSolveRequest, SolveId, SolveList } from '../../pages/IDEPage/types';
import { SolveData } from '../../pages/QuestListPage/types';

// 특정 풀이 열람
export function getSolve(solveId: number): Promise<Solve> {
    return axios.get(`/solves/${solveId}`)
        .then(response => {
            return response.data as Solve;
        })
        .catch(error => {
            console.error("풀이를 불러오는 중 오류가 발생했습니다:", error);
            throw error;
        });
}

// 특정 유저의 모든 풀이 조회
export function getUserSolves(loginId: string): Promise<Solve[]> {
    return axios.get(`/members/${loginId}/solves`)
        .then(response => {
            return response.data as Solve[];
        })
        .catch(error => {
            console.error("사용자의 풀이를 불러오는 중 오류가 발생했습니다:", error);
            throw error;
        });
}

// 특정 문제에 제출된 모든 풀이 id 조회
export function getQuestionSolveId(questionId: number): Promise<SolveId[]> {
    return axios.get(`/questions/${questionId}/solves`)
        .then(response => {
            return response.data as SolveId[];
        })
        .catch(error => {
            console.error("문제의 풀이를 불러오는 중 오류가 발생했습니다:", error);
            throw error;
        });
}

// 특정 문제에 제출된 모든 풀이 조회 
export function getQuestionSolves(solveId: number): Promise<Solve> {
    return axios.get(`/solves/${solveId}`)
        .then(response => {
            return response.data as Solve;
        })
        .catch(error => {
            console.error("문제의 풀이를 불러오는 중 오류가 발생했습니다:", error);
            throw error;
        });
}

// 문제 풀이 생성
export function createSolve(questionId: number, solveRequest: CreateSolveRequest): Promise<SolveList> {
    return axios.post(`/questions/${questionId}/solves`, solveRequest)
        .then(response => {
            return response.data as SolveList;
        })
        .catch(error => {
            console.error("풀이 생성 중 오류가 발생했습니다:", error);
            throw error;
        });
}