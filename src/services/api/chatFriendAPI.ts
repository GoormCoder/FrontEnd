import { ChatRoom, UserID } from "../../pages/ChatFriendPage/types";
import { dummyUsers } from "./userAPI";

// userName -> userId로 추후에 수정하고 백엔드에서 id로 유저 이름 + (닉네임) 형태로 반환
export function getChatRooms(id: string): ChatRoom[] {

    const chatRooms: ChatRoom[] = dummyUsers.map((user) => {
        return ({ id: user.id, userName: user.name + `(${user.nick})` })
    })
    return chatRooms.slice(0, 10)
}

export function getFriendsID(id: string): UserID[] {
    const firendsID: UserID[] = dummyUsers.map((user) => {
        return ({ id: user.id, userName: user.name + `(${user.nick})` })
    })
    return firendsID.slice(0, 10);
}

