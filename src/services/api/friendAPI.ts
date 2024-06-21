import { FriendData, FriendWrapper, Requester, UserID } from "../../pages/ChatFriendPage/types";
import { dummyUsers } from "./memberAPI";
import axios from "./axios";

export function friendRequestApi(loginId: string, receiver: string): Promise<string> {
    return axios.post(`/friends/request/${loginId}`, { receivedLoginId: receiver })
        .then(res => {
            const data: string = res.data
            alert(data)
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return "";
        });
}

export function findAllFriendRequestApi(loginId: string): Promise<Requester[]> {
    return axios.get(`/friends/request/${loginId}`)
        .then(res => {
            const data: Requester[] = res.data
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}

export function acceptFriendRequestApi(loginId: string, requester: string, requestId: number): Promise<string> {
    return axios.post(`/friends/add/${loginId}`, { friendLoginId: requester, requestId: requestId })
        .then(res => {
            const data: string = res.data
            alert(data)
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return "";
        });
}

export function findAllFriendsApi(loginId: string): Promise<FriendData[]> {
    return axios.get(`/friends/${loginId}`)
        .then(res => {
            const data: FriendData[] = (res.data as FriendWrapper[]).map(item => item.friend)
            return data;
        })
        .catch(err => {
            console.error("Error fetching data:", err);
            return [];
        });
}

export function getFriendsID(id: string): UserID[] {
    const friendsID: UserID[] = dummyUsers.map((user) => {
        return ({ loginId: user.id, name: user.name + `(${user.nick})`, nickname: user.nick })
    })
    return friendsID.slice(0, 10);
}