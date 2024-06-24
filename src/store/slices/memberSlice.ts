import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserID } from '../../pages/ChatFriendPage/types';
import { findAllBattleRankApi, findAllMemberByKeywordApi, findAllPraiseRankApi } from '../../services/api/memberAPI';
import { RankData } from '../../pages/RankPage/types';


interface MemberState {
    loginedMember: UserID;
    member: User[];
    memberId: UserID[];
    searchText: string;
    RankData: RankData[];
    PraiseRank: RankData[];
    BattleRank: RankData[];
}

const initialState: MemberState = {
    loginedMember: {
        loginId: localStorage.getItem('loginId') || "",
        name: localStorage.getItem('name') || "",
        nickname: localStorage.getItem('nickname') || ""
    },
    member: [],
    memberId: [],
    searchText: '',
    RankData: [],
    PraiseRank: [],
    BattleRank: []
};

export const findAllBattleRank = createAsyncThunk(
    'member/findAllBattleRank',
    async () => {
        try {
            const response = await findAllBattleRankApi();
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const findAllPraiseRank = createAsyncThunk(
    'member/findAllPraiseRank',
    async () => {
        try {
            const response = await findAllPraiseRankApi();
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const findAllMemberByKeyword = createAsyncThunk(
    'member/findAllByKeyword',
    async ({ keyword, loginId }: { keyword: string, loginId: string }) => {
        try {
            const response = await findAllMemberByKeywordApi(keyword, loginId);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const login = createAsyncThunk(
    'member/login',
    async ({ loginId, password }: { loginId: string, password: string }) => {
        try {
            // const response = await loginApi(loginId, password);
            // return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

const memberSlice = createSlice({
    name: 'member',
    initialState,
    reducers: {
        setLoginedMember(state, action: PayloadAction<UserID>) {
            state.loginedMember = action.payload;
            localStorage.setItem('loginId', action.payload.loginId);
            localStorage.setItem('name', action.payload.name);
            localStorage.setItem('nickname', action.payload.nickname);
        },
        setSearchText(state, action: PayloadAction<string>) {
            state.searchText = action.payload;
        },
        setMemberIdEmpty(state) {
            state.memberId = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(findAllMemberByKeyword.fulfilled, (state, action) => {
                state.memberId = action.payload;
            })
            .addCase(findAllBattleRank.fulfilled, (state, action) => {
                state.RankData = action.payload;
                state.BattleRank = action.payload;
            })
            .addCase(findAllPraiseRank.fulfilled, (state, action) => {
                state.RankData = action.payload;
                state.PraiseRank = action.payload;
            })
            .addCase(login.fulfilled, (state, action) => {
                // state.member = action.payload;
            });
    }
});

export const { setLoginedMember, setSearchText, setMemberIdEmpty } = memberSlice.actions;

export default memberSlice.reducer;
