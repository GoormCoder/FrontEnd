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

export type ChatData = {
    userID: string;
    message: string;
    time: string;
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
}

// Interface

export interface UserID {
    loginId: string;
    name: string;
    nickname: String;
}

export interface ChatRoomID extends UserID {
    chatRoomID: string;
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
    friendID: UserID
    setDisplay: (isOpened: boolean) => void;
}

export interface ChatRoomDataProps {
    chatRoomData: ChatRoomID
    setDisplay: (isOpened: boolean) => void;
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