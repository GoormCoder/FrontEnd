import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserID } from '../../pages/ChatFriendPage/types';
import { findAllMemberByKeywordApi } from '../../services/api/memberAPI';


interface MemberState {
    loginedMember: UserID;
    member: User[];
    memberId: UserID[];
    searchText: string;
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
};

export const findAllMemberByKeyword = createAsyncThunk(
    'member/findAllByKeyword',
    async (keyword: string,) => {
        try {
            const response = await findAllMemberByKeywordApi(keyword);
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
            .addCase(login.fulfilled, (state, action) => {
                // state.member = action.payload;
            });
    }
});

export const { setLoginedMember, setSearchText, setMemberIdEmpty } = memberSlice.actions;

export default memberSlice.reducer;
