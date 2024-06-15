// Types
export type Quest = {
    state: string | null,
    title: string,
    level: string,
    correctPeople: number,
    accuracy: string
};

export type Tag = string;

// Interface
export interface SearchOptionDisplayProps {
    searchOptionDisplay: string,
}

export interface SearchOptionProps {
    boxType: string;
    option: string
    setTag: (type: string, checked: boolean, tagValue: string) => void;
}

export interface SearchOptionBoxProps {
    boxType: string;
    setTag: (type: string, checked: boolean, tagValue: string) => void;
}

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

// enum
export enum SearchOptionBoxes {
    STATE = "상태",
    LEVEL = "난이도",
    LANGUAGE = "언어"
}

export enum OptionByStatus {
    SOLVED = "푼 문제",
    SOLVING = "풀고 있는 문제",
    NOT_SOLVED = "안 푼 문제"
}

export enum OptionByLevel {
    LEVEL_1 = "Lv. 1",
    LEVEL_2 = "Lv. 2",
    LEVEL_3 = "Lv. 3"
}

export enum OptionByLan {
    JAVA = "Java",
    PYTHON = "Python",
    ORACLE = "Oracle"
}