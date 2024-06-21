// Types
export type User = {
    id: string;
    name: string;
    nick: string;
    email: string;
    overallRank: number;
    overallScore: number;
    praiseRank: number;
    praiseScore: number;
    solveRank: number;
    solveScore: number;
    battleRank: number;
    battleScore: number;
}

export type ChatRoomData = {
    chatRoomId: number;
    chatRoomName: string;
    lastMessage: {
        message: string;
        createdAt: string;
    };
    sender: {
        id: number;
        loginId: string;
        name: string;
    }
}

export type ChatData = {
    message: string;
    createdAt: Date;
    sender: {
        longinId: string;
        name: string;
    }
}

export type Requester = {
    requestId: number,
    requester: {
        id: number,
        loginId: string,
        nickname: string
    }
}

export type FriendData = {
    loginId: string;
    name: string;
    nickname: string;
    email: string;
    birth: Date;
    info: string;
}

// Interface

export interface UserID {
    loginId: string;
    name: string;
    nickname: string;
}
export interface FriendWrapper {
    friend: FriendData;
}

export interface ChatDataProps {
    chatData: ChatData;
}

export interface DisplayProps {
    display: boolean;
}

export interface DisplayAndOpacityProps extends DisplayProps {
    opacity: boolean;
}

export interface SetPageProps {
    setPage: (page: string) => void;
}

export interface FriendDataProps extends SetPageProps {
    setDisplay: (isOpened: boolean) => void;
}

export interface ChatRoomDataProps {
    setDisplay: (isOpened: boolean) => void;
}

export interface ChatMessageRequest {
    chatRoomId: number;
    senderLoginId: string;
    message: string;
}

// Enum
export enum CurrentPage {
    FRIEND_LIST = "친구",
    FRIEND_DETAIL = "친구상세",
    FRIEND_ADD = "친구추가",
    FRIEND_ADD_DETAIL = "친구추가상세",
    CHAT_LIST = "채팅",
    CHAT_DETAIL = "채팅상세"
}