import React from 'react'
import styled from 'styled-components';
import { TagBoxProps } from '../types';
import { MdClose } from "react-icons/md";



const TagBox: React.FC<TagBoxProps> = ({ tagList, removeTag }) => {
    return (
        <TagBoxContainer>
            {tagList.map((name, index) => (
                <div className="tag" key={index}>
                    {name}
                    <MdClose onClick={() => { removeTag(name) }} />
                </div>
            ))}
        </TagBoxContainer>
    )
}

export default TagBox

const TagBoxContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 5px;

    & .tag {
        display: flex;
        align-items: center;
        text-align: center;
        border: 1px solid black;
        border-radius: 5px;
        background-color: #003369;
        color: white;
        font-weight: bold;
        font-size: 13px;
        width: fit-content;
        padding: 2px 7px 2px 7px;
        cursor: default;
    }

    & svg {
        margin-left: 5px;
        cursor: pointer;
    }
`