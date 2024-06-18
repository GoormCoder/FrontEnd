import styled from "styled-components";

export interface ModalProps {
    width?: number;
    height?: number;
    textType: string;
    setValue: (value: boolean) => void;
}

export enum ModalText {
    DELETE = "정말 삭제하시겠습니까?",
    LEAVE = "정말 나가시겠습니까?"
}

export const CheckModalContainer = styled.div<{ display: boolean }>`
    display:${props => props.display ? "block" : "none"};
`