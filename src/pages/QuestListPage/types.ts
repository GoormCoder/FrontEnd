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
    CORRECT = "CORRECT",
    WRONG = "WRONG",
    TIME_OVER = "TIME_OVER",
    OUT_OF_MEMORY = "OUT_OF_MEMORY",
    NOT_TRIED_YET = "NOT_TRIED_YET",
    COMPILE_ERROR = "COMPILE_ERROR",
    RUNTIME_ERROR = "RUNTIME_ERROR",
}