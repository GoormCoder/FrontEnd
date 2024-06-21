
export interface BottomButtonProps {
    isSubmit?: boolean;
}

export interface Tag {
    id: number;
    name: string;
}

export interface QuestionSummaryDto {
    id: number;
    level: number;
    title: string;
    tags: Tag[];
}

export interface MemberSummaryDto {
    id: number;
    loginId: string;
    nick: string;
}

export interface Solve {
    id: number;
    code: string;
    solveResult: string;
    language: string;
    createdAt: string;
    questionSummaryDto: QuestionSummaryDto;
    memberSummaryDto: MemberSummaryDto;
}

export interface CreateSolveRequest {
    code: string;
    language: string;
}