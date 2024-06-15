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

export type IDName = {
    id: string;
    userName: string;
}

export type UserID = IDName

export type ChatRoom = IDName

// Interface
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