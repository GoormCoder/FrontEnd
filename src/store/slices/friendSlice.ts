import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FriendData, Requester, User, UserID } from '../../pages/ChatFriendPage/types';
import { findAllMemberByKeywordApi } from '../../services/api/memberAPI';
import { acceptFriendRequestApi, findAllFriendRequestApi, findAllFriendsApi, friendRequestApi } from '../../services/api/friendAPI';


interface FriendState {
    friend: UserID;
    friends: FriendData[]
    requesters: Requester[]
    message: string
}

const initialState: FriendState = {
    friend: { loginId: "", name: "", nickname: "" },
    friends: [],
    requesters: [],
    message: ""
};

export const friendRequest = createAsyncThunk(
    'friend/friendRequest',
    async ({ loginId, receiver }: { loginId: string, receiver: string }) => {
        try {
            const response = await friendRequestApi(loginId, receiver);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const findAllFriendRequest = createAsyncThunk(
    'friend/findAllFriendRequest',
    async (loginId: string,) => {
        try {
            const response = await findAllFriendRequestApi(loginId);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const acceptFriendRequest = createAsyncThunk(
    'friend/acceptFriendRequest',
    async ({ loginId, requester, requestId }: { loginId: string, requester: string, requestId: number }) => {
        try {
            const response = await acceptFriendRequestApi(loginId, requester, requestId);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const findAllFriends = createAsyncThunk(
    'friend/findAllFriends',
    async (loginId: string,) => {
        try {
            const response = await findAllFriendsApi(loginId);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setRequestersEmpty(state) {
            state.requesters = [];
        },
        setFriend(state, action: PayloadAction<UserID>) {
            console.log(action.payload);

            state.friend = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(friendRequest.fulfilled, (state, action) => {
                state.message = action.payload;
            })
            .addCase(findAllFriendRequest.fulfilled, (state, action) => {
                state.requesters = action.payload;
            })
            .addCase(acceptFriendRequest.fulfilled, (state, action) => {
                state.message = action.payload;
            })
            .addCase(findAllFriends.fulfilled, (state, action) => {
                state.friends = action.payload;
            })
    }
});

export const { setRequestersEmpty, setFriend } = friendSlice.actions;

export default friendSlice.reducer;
