import React from 'react'
import styled from 'styled-components'
import { ModalProps } from './types'

const CheckModal: React.FC<ModalProps> = ({ width, height, text, textType, setValue }) => {
    return (
        <CheckModalContainer>
            <CheckModalContent width={width} height={height}>
                <div className='text'>{text}님을<br />{textType}</div>
                <div className='modal-btn'>
                    <button className='ok' onClick={() => setValue(true)}>확인</button>
                    <button className='no' onClick={() => setValue(false)}>취소</button>
                </div>
            </CheckModalContent>
        </CheckModalContainer>
    )
}

export default CheckModal
const CheckModalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    z-index: 100;
`

const CheckModalContent = styled.div<{ width?: number, height?: number }>`
    border: 1px solid lightgray;
    border-radius: 10px;
    width: ${props => props.width ? `${props.width}%` : "80%"};
    height: ${props => props.width ? `${props.width}%` : "25%"};
    background-color: white;
    padding: 5% 0 5% 0;

    & .text{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 75%;
        font-size: 20px;
        font-weight: bold;
        text-align: center
    }

    & .modal-btn {
        display: flex;
        justify-content: space-evenly;
        height: 25%;
    }

    & button{
        width: 30%;
        height: 100%;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        color: white;
        border-style: none;
        cursor: pointer;
    }

    & .ok{
        background-color: #003369;
    }

    & .ok:hover{
        background-color: #001730;
    }

    & .ok:active{
        background-color: #003369;
        margin: 1px 0 0 1px;
    }

    & .no{
        background-color: #e05151;
    }

    & .no:hover{
        background-color: #be4c4c;
    }

    & .no:active{
        background-color: #e05151;
        margin: 1px 0 0 1px;
    }
`