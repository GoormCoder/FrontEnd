import { ChatData, ChatRoomID, UserID } from "../../pages/ChatFriendPage/types";
import { dummyUsers } from "./memberAPI";

// userName -> userId로 추후에 수정하고 백엔드에서 id로 유저 이름 + (닉네임) 형태로 반환
export function getChatRooms(id: string): ChatRoomID[] {

    const chatRooms: ChatRoomID[] = dummyUsers.map((user) => {
        return ({ loginId: user.id, name: user.name + `(${user.nick})`, nickname: user.nick, chatRoomID: "" })
    })
    return chatRooms.slice(0, 10)
}

export function getChatData(chatRoomID: string): ChatData[] {
    return dummyChatData;
}

export const dummyChatData: ChatData[] = [
    { userID: "1", message: "안녕하세요 1번 문제 풀이가 궁금해서요", time: "오후 10:42" },
    { userID: "51", message: "안녕하세요! 어떤 부분이 궁금하셨을까요?", time: "오후 10:43" },
    { userID: "1", message: "저는 {코드} 이런식으로 풀이를 했는데 잘안되더라구요", time: "오후 10:44" },
    { userID: "1", message: "혹시 어떻게 풀이하셨나요??", time: "오후 10:44" },
    { userID: "51", message: "아 그렇군요! 저같은 경우는", time: "오후 10:44" },
    { userID: "51", message: "{코드} 이런식으로 풀이를 하였습니다.", time: "오후 10:45" },
    { userID: "51", message: "도움이 됐을까요???", time: "오후 10:45" },
    { userID: "1", message: "잠시만요 직접 작성해보고 다시 말씀드릴게요!", time: "오후 10:46" },
    { userID: "51", message: "네~ 천천히 작성해보세요!", time: "오후 10:46" },
    { userID: "1", message: "오! 정말 잘되네요", time: "오후 11:03" },
    { userID: "51", message: "도움이 됐다니 다행이네요~", time: "오후 11:05" },
    { userID: "1", message: "고민이 많이 됐었는데 정리가 어느정도되네요!", time: "오후 11:05" },
    { userID: "1", message: "너무 감사드립니다. 좋은하루돼세요~", time: "오후 11:05" },
    { userID: "51", message: "네 좋은하루돼세요!", time: "오후 11:06" },
]