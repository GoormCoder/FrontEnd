// Types
export type BattleMemberData = {
    tier: string,
    score: number,
    rank: number,
    win: number,
    lose: number,
    winRatio: string
}

export type BattleData = {
    battleId: number,
    question: {
        id: number,
        level: number,
        title: string,
        tags: [
            {
                id: number,
                name: string
            }
        ]
    }
}

export type BattleResult = {
    questionSummryDto: {
        id: number,
        level: number,
        title: string,
        tags: [
            {
                id: number,
                name: string
            }
        ]
    },
    memberSummryDto: {
        id: number,
        loginId: string,
        nick: string
    },
    solveResult: string,
    solveResultMessage: string,
    battleResult: string
}

export type BattleRoomData = {
    roomId: number,
    givenMember: {
        id: number,
        loginId: string,
        nickname: string
    },
    receivedMember: {
        id: number,
        loginId: string,
        nickname: string
    },
    isFull: boolean
}

export type BattleRoomId = {
    roomId: number,
    isFull: boolean
}

export type BattleInfo = {
    nickname: string,
    battleScore: number,
    totalResult: string,
    winRate: string,
    battleRecords: [
        {
            givenUser: string,
            receivedUser: string,
            result: string
        }
    ]
}

// Interface


// enum
export enum Tier {
    BRONZE = "Bronze",
    SILVER = "Silver",
    GOLD = "Gold"
}