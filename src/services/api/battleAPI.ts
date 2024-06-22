import axios from "./axios";
import { BattleData, BattleInfo, BattleMemberData, BattleRoomData, BattleRoomId } from "../../pages/BattlePage/types";

export function createBattleRoomApi(level: number, language: string): Promise<BattleRoomId> {
    return axios.post('/battles/wait', { level: level, language: language })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return err.response.data;
        });
}

export function findBattleRoomApi(battleRoomId: number): Promise<BattleRoomData> {
    return axios.get(`/battles/wait/${battleRoomId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return err.response.data;
        });
}

export function startBattleApi(battleRoomId: number): Promise<BattleData> {
    return axios.post(`/battles/start/${battleRoomId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return err.response.data;
        });
}

export function deleteBattleRoomApi(battleRoomId: number): Promise<BattleData> {
    return axios.post(`/battles/cancel/${battleRoomId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return err.response.data;
        });
}

export function findAllBattleResultApi(): Promise<BattleInfo> {
    return axios.get(`/battles/record`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return err.response.data;
        });
}

export function getUserBattleData(userID: string): BattleMemberData {
    // 추후 백엔드에서 userID 사용하여 데이터 조회
    return dummyBattleData
}
const dummyBattleData: BattleMemberData = {
    tier: "Gold",
    score: 950,
    rank: 4083,
    win: 10,
    lose: 5,
    winRatio: (10 / (10 + 5) * 100).toFixed(2),
}