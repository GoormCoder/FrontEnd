import axios from "./axios";
import { Quest, QuestDetail, SolveData } from "../../pages/QuestListPage/types";



// 문제 전체 조회
export function findAll(): Promise<Quest[]> {
    return axios.get("/questions")
        .then(res => {
            const data: Quest[] = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}

// 문제 열람
export function findQuestionApi(questionId: number): Promise<QuestDetail> {
    return axios.get(`/questions/${questionId}`)
        .then(res => {
            const data: QuestDetail = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return err;
        });
}

// 사용자 풀이 조회
export function findMemberSolveApi(loginId: string): Promise<SolveData[]> {
    return axios.get(`/members/${loginId}/solves`)
        .then(res => {
            const data: SolveData[] = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}