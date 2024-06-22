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

// Interface


// enum
export { }