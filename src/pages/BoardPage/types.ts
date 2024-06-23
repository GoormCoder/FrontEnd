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

export interface BoardTabsProps {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}

export interface PaginationProps {
    totalPosts: number;
    postsPerPage: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

export interface PostItemProps {
    post: BoardDetails;
}

export interface SearchbarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}