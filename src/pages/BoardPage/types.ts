export interface BoardPost {
    boardType: string;
    title: string;
    content: string;
    questionId: number;
}

export interface BoardDetails {
    boardId: number;
    boardType: string;
    title: string;
    content: string;
    createdAt: string;
    likeCount: number;
    member: {
        id: number;
        loginId: string;
        nickname: string;
    };
    question: {
        id: number;
        level: number;
        title: string;
    };
}
export interface PostListProps {
    posts: BoardDetails[];
}