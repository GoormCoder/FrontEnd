import { ChatData, ChatRoomData } from "../../pages/ChatFriendPage/types";
import axios from "./axios";

export function createChatRoomApi(chatRoomName: null, invitedMemberLoginId: string): Promise<string | { chatRoomId: number }> {
    return axios.post('/chats/rooms', { chatRoomName: chatRoomName, invitedMemberLoginId: invitedMemberLoginId })
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return err.response.data;
        });
}

export function findAllChatRoomApi(): Promise<ChatRoomData[]> {
    return axios.get('/chats/rooms')
        .then(res => {
            const data: ChatRoomData[] = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}

export function deleteChatRoomApi(chatRoomId: number): Promise<string> {
    return axios.delete(`/chats/rooms/${chatRoomId}`)
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return err.response.data;
        });
}

export function findAllChatApi(chatRoomId: number): Promise<ChatData[]> {
    return axios.get(`/chats/rooms/${chatRoomId}`)
        .then(res => {
            const data: ChatData[] = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}