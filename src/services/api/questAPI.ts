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

