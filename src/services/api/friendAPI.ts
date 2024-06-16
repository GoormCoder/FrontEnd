import { UserID } from "../../pages/ChatFriendPage/types";
import { dummyUsers } from "./userAPI";

export function getFriendsID(id: string): UserID[] {
    const friendsID: UserID[] = dummyUsers.map((user) => {
        return ({ userID: user.id, userName: user.name + `(${user.nick})` })
    })
    return friendsID.slice(0, 10);
}