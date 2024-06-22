// Types
export type Quest = {
    id: number,
    state: string | null
    title: string,
    level: number,
    solved: number | null,
    accuracy: number
};

export type QuestDetail = {
    id: number,
    level: number,
    title: string,
    content: string
}
export type SolveData = {
    questionSummaryDto: {
        id: number,
        level: number,
        title: string,
        tags: [
            {
                id: number,
                name: string
            }
        ]
    },
    memberSummaryDto: {
        id: number,
        loginId: string,
        nick: string
    },
    solveResult: string
}

export type Tag = string;

// Interface

export interface TagBoxProps {
    tagList: string[];
    removeTag: (tagValue: string) => void;
}

export interface RnakInfoProps {
    rankInfoDisplay: boolean;
    setRankInfoDisplay?: (isOpend: boolean) => void
}

// enum
export enum SolvedState {
    CORRECT = "정답",
    WRONG = "오답",
    TIME_OVER = "시간 초과",
    OUT_OF_MEMORY = "메모리 초과",
    NOT_TRIED_YET = "시도하지 않음",
    COMPILE_ERROR = "컴파일 에러",
    RUNTIME_ERROR = "런타임 에러",
}