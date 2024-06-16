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

// Interface

export interface UserID {
    userID: string;
    userName: string;
}

export interface ChatRoom extends UserID {
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
    userID: UserID
    setDisplay: (isOpened: boolean) => void;
}

export interface ChatRoomDataProps {
    chatRoomData: ChatRoom
    setDisplay: (isOpened: boolean) => void;
}

// Enum
export enum CurrentPage {
    FRIEND_LIST = "친구",
    FRIEND_DETAIL = "친구상세",
    CHAT_LIST = "채팅",
    CHAT_DETAIL = "채팅상세"
}