// Types
export type Quest = {
    state: string | null,
    title: string,
    level: string,
    correctPeople: number,
    accuracy: string
};

export type QuestTest = {
    num: number | null,
    title: string | null,
    level: number | null,
    solved: number | null,
    accuracy: number | null
};

export type Tag = string;

// Interface
export interface QuestListProps {
    searchResult: Quest[]
}

export interface TagBoxProps {
    tagList: string[];
    removeTag: (tagValue: string) => void;
}

export interface RnakInfoProps {
    rankInfoDisplay: boolean;
    setRankInfoDisplay?: (isOpend: boolean) => void
}