import { BattleData } from "../../pages/BattlePage/types";

export function getUserBattleData(userID: string): BattleData {
    // 추후 백엔드에서 userID 사용하여 데이터 조회
    return dummyBattleData
}
const dummyBattleData: BattleData = {
    tier: "Gold",
    score: 950,
    rank: 4083,
    win: 10,
    lose: 5,
    winRatio: (10 / (10 + 5) * 100).toFixed(2),
}