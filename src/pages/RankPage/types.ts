export interface RankData {
    loginId: string;
    name: string;
    type: {
        score: number,
        rank: number
    }
}

// export interface BattleRankData extends RankMemberData {
//     battle: {
//         score: number,
//         rank: number
//     }
// }

// export interface PraiseRankData extends RankMemberData {
//     praise: {
//         score: number,
//         rank: number
//     }
// }

export enum RankType {
    PRAISE = "praise",
    BATTLE = "battle",
    SOLVED = "solved"
}