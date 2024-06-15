
export interface optionDisplayProps {
    optionDisplay: string,
}

export interface OptionBoxProps {
    boxType: string;
    setValue: (type: string, checked: boolean, value: string) => void;
}

export interface OptionProps extends OptionBoxProps {
    option: string
}

// enum
export enum OptionBoxes {
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
}