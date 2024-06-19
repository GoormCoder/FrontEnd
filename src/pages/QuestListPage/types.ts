// Types
export type Quest = {
    id: number,
    state: string | null
    title: string,
    level: number,
    solved: number | null,
    accuracy: number
};

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