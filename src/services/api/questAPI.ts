import axios from "./axios";
import { Quest } from "../../pages/QuestListPage/types";



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

export const getQuestion = async (questionId: number): Promise<{ title: string, content: string }> => {
    try {
        const response = await axios.get(`/questions/${questionId}`);
        return response.data;
    } catch (error) {
        console.error('문제를 불러오는 중 오류가 발생했습니다:', error);
        throw error;
    }
};