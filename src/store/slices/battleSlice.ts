import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import { BattleData, BattleInfo, BattleRoomData } from '../../pages/BattlePage/types';
import { createBattleRoomApi, deleteBattleRoomApi, findAllBattleResultApi, findBattleRoomApi, startBattleApi } from '../../services/api/battleAPI';


interface BattleState {
    battleRoom: BattleRoomData;
    battleData: BattleData;
    battleMember: {
        loginId: string,
        nickname: string
    }
    battleInfo: BattleInfo;
}
const roomId = sessionStorage.getItem("battleRoomId")
const battle = sessionStorage.getItem("battleData")
const member = sessionStorage.getItem("battleMember")

const initialState: BattleState = {
    battleRoom: {
        roomId: roomId != null ? parseInt(roomId) : 0,
        givenMember: {
            id: 0,
            loginId: "",
            nickname: ""
        },
        receivedMember: {
            id: 0,
            loginId: "",
            nickname: ""
        },
        isFull: false
    },
    battleData: {
        battleId: battle != null ? parseInt(JSON.parse(battle).battleId) : 0,
        question: {
            id: battle != null ? parseInt(JSON.parse(battle).question.id) : 0,
            level: 0,
            title: "",
            tags: [
                {
                    id: 0,
                    name: ""
                }
            ]
        }
    },
    battleMember: member != null ?
        {
            loginId: JSON.parse(member).loginId,
            nickname: JSON.parse(member).nickname
        } : {
            loginId: "",
            nickname: ""
        },
    battleInfo: {
        nickname: "",
        battleScore: 0,
        totalResult: "",
        winRate: "",
        battleRecords: [
            {
                givenUser: "",
                receivedUser: "",
                result: ""
            }
        ]
    }
};


export const createBattleRoom = createAsyncThunk(
    'battle/createBattleRoom',
    async ({ level, language }: { level: number, language: string }) => {
        try {
            const response = await createBattleRoomApi(level, language);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const findBattleRoom = createAsyncThunk(
    'battle/findBattleRoom',
    async (battleRoomId: number, { getState }) => {
        try {
            const state = getState() as RootState
            const { loginedMember } = state.member;
            const response = await findBattleRoomApi(battleRoomId);
            return { response: response, loginedMember: loginedMember };
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const startBattle = createAsyncThunk(
    'battle/startBattle',
    async (battleRoomId: number) => {
        try {
            const response = await startBattleApi(battleRoomId);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const deleteBattleRoom = createAsyncThunk(
    'battle/deleteBattleRoom',
    async (battleRoomId: number) => {
        try {
            const response = await deleteBattleRoomApi(battleRoomId);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const findAllBattleResult = createAsyncThunk(
    'battle/findAllBattleResult',
    async () => {
        try {
            const response = await findAllBattleResultApi();
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

const battleSlice = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        setAllBattleDataEmpty(state) {
            sessionStorage.removeItem("battleRoomId")
            sessionStorage.removeItem("battleData")
            sessionStorage.removeItem("battleMember")
            state.battleRoom = emptyState.battleRoom
        },
        setBattleRoomIdEmpty(state) {
            sessionStorage.removeItem("battleRoomId")
            state.battleRoom.roomId = 0
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createBattleRoom.fulfilled, (state, action) => {
                if (typeof action.payload != 'string') {
                    sessionStorage.setItem("battleRoomId", action.payload.roomId.toString())
                    state.battleRoom.roomId = action.payload.roomId;
                    state.battleRoom.isFull = false;
                }
            })
            .addCase(findBattleRoom.fulfilled, (state, action) => {
                const battleRoom = action.payload.response
                const givenMembers = action.payload.response.givenMember
                const receivedMembers = action.payload.response.receivedMember
                const loginedMember = action.payload.loginedMember

                state.battleRoom = battleRoom;

                if (givenMembers?.id && receivedMembers?.id) {
                    const members = [givenMembers, receivedMembers];
                    const battleMember = members.find(
                        member => member.loginId !== loginedMember.loginId && member.nickname !== loginedMember.nickname
                    )
                    if (battleMember) {
                        sessionStorage.setItem("battleMember", JSON.stringify(battleMember))
                        state.battleMember = battleMember;
                    }
                }

            })
            .addCase(startBattle.fulfilled, (state, action) => {
                sessionStorage.setItem("battleData", JSON.stringify(action.payload))
                state.battleData = action.payload
            })
            .addCase(deleteBattleRoom.fulfilled, (state, action) => {
                sessionStorage.removeItem("battleRoomId")
                sessionStorage.removeItem("battleData")
                sessionStorage.removeItem("battleMember")
                state.battleRoom = emptyState.battleRoom
            })
            .addCase(findAllBattleResult.fulfilled, (state, action) => {
                state.battleInfo = action.payload
            })
    }
});

export const { setAllBattleDataEmpty, setBattleRoomIdEmpty } = battleSlice.actions;

export default battleSlice.reducer;


const emptyState: BattleState = {
    battleRoom: {
        roomId: 0,
        givenMember: {
            id: 0,
            loginId: "",
            nickname: ""
        },
        receivedMember: {
            id: 0,
            loginId: "",
            nickname: ""
        },
        isFull: false
    },
    battleData: {
        battleId: 0,
        question: {
            id: 0,
            level: 0,
            title: "",
            tags: [
                {
                    id: 0,
                    name: ""
                }
            ]
        }
    },
    battleMember: {
        loginId: "",
        nickname: ""
    },
    battleInfo: {
        nickname: "",
        battleScore: 0,
        totalResult: "",
        winRate: "",
        battleRecords: [
            {
                givenUser: "",
                receivedUser: "",
                result: ""
            }
        ]
    }
}