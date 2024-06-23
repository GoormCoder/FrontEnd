import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatData, ChatRoomData, FriendData, Requester, UserID } from '../../pages/ChatFriendPage/types';
import { createChatRoomApi, deleteChatRoomApi, findAllChatApi, findAllChatRoomApi } from '../../services/api/chatAPI';
import { useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../store';

interface ChatState {
    chatRoom: ChatRoomData;
    chatRooms: ChatRoomData[];
    chats: ChatData[];
    resultMsg: string;
}

const initialState: ChatState = {
    chatRoom: {
        chatRoomId: 0,
        chatRoomName: "",
        lastMessage: {
            messageId: 0,
            message: "",
            createdAt: "",
            sender: {
                id: 0,
                loginId: "",
                name: ""
            }
        },
        hasUnreadMessages: false,
        readAt: ""
    },
    chatRooms: [],
    chats: [],
    resultMsg: ""
}

export const createChatRoom = createAsyncThunk(
    'chat/createChatRoom',
    async (invitedMemberLoginId: string, { getState }) => {
        try {
            const state = getState() as RootState
            const { friend } = state.friend;
            const response = await createChatRoomApi(null, invitedMemberLoginId);
            return { response: response, friend: friend };
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const findAllChatRoom = createAsyncThunk(
    'chat/findAllChatRoom',
    async () => {
        try {
            const response = await findAllChatRoomApi();
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const deleteChatRoom = createAsyncThunk(
    'chat/deleteChatRoom',
    async (chatRoomId: number) => {
        try {
            const response = await deleteChatRoomApi(chatRoomId);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);

export const findAllChat = createAsyncThunk(
    'chat/findAllChat',
    async (chatRoomId: number) => {
        try {
            const response = await findAllChatApi(chatRoomId);
            return response;
        } catch (error) {
            console.error('Error fetching quests:', error);
            throw error;
        }
    }
);


const ChatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatRoom(state, action: PayloadAction<ChatRoomData>) {
            state.chatRoom = action.payload;
        },
        setChatRoomEmpty(state) {
            state.chatRoom = {
                chatRoomId: 0,
                chatRoomName: "",
                lastMessage: {
                    messageId: 0,
                    message: "",
                    createdAt: "",
                    sender: {
                        id: 0,
                        loginId: "",
                        name: ""
                    }
                },
                hasUnreadMessages: false,
                readAt: ""
            }
        },
        setChats(state, action: PayloadAction<{ message: string, loginedMember: { loginId: string, name: string } }>) {
            state.chats.push({
                message: action.payload.message,
                createdAt: new Date(Date.now()),
                sender: {
                    longinId: action.payload.loginedMember.loginId,
                    name: action.payload.loginedMember.name
                }
            })
        },
        setChatsEmpty(state) {
            state.chats = [];
        }
    },
    extraReducers: builder => {
        builder
            .addCase(createChatRoom.fulfilled, (state, action) => {
                if (typeof action.payload.response !== 'string') {
                    console.log(action.payload.response.chatRoomId)
                    state.chatRoom.chatRoomId = action.payload.response.chatRoomId;
                    state.chatRoom.chatRoomName = action.payload.friend.name;
                } else if (action.payload.response == "해당 사용자와의 채팅방이 이미 존재합니다.") {
                    const chatRoom = state.chatRooms.find(chatRoom => chatRoom.chatRoomId === 1) // 아이디 부분 수정 필요
                    if (chatRoom) {
                        state.chatRoom.chatRoomId = chatRoom.chatRoomId
                        state.chatRoom.chatRoomName = chatRoom.chatRoomName
                    }
                }

            })
            .addCase(findAllChatRoom.fulfilled, (state, action) => {
                state.chatRooms = action.payload;
            })
            .addCase(deleteChatRoom.fulfilled, (state, action) => {
                state.resultMsg = action.payload;
                console.log(action.payload);

            })
            .addCase(findAllChat.fulfilled, (state, action) => {
                state.chats = action.payload;
            })
    }
});
export const { setChatRoom, setChatRoomEmpty, setChats, setChatsEmpty } = ChatSlice.actions;

export default ChatSlice.reducer;
