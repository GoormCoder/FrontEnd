import axios from "./axios";
import { UserID } from "../../pages/ChatFriendPage/types";
import { RankData } from "../../pages/RankPage/types";

export function logoutApi(): void {
    axios.post("/members/logout", { token: localStorage.getItem('refreshToken') })
        .then(res => {
            alert("로그아웃이 완료되었습니다.")
            localStorage.clear();
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            alert("[ERROR] 로그아웃 실패. 다시 시도해주세요.")
        });
}

export function findAllMemberByKeywordApi(keyword: string, loginId: string): Promise<UserID[]> {
    return axios.get(`/members/${keyword}/${loginId}`)
        .then(res => {
            const data: UserID[] = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}

export function findAllBattleRankApi(): Promise<RankData[]> {
    return axios.get(`/members/rank/battle`)
        .then(res => {
            const data: RankData[] = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}

export function findAllPraiseRankApi(): Promise<RankData[]> {
    return axios.get(`/members/rank/praise`)
        .then(res => {
            const data: RankData[] = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}
