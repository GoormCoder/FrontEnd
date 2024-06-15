import React, { useEffect, useRef, useState } from 'react'
import { SearchOptionProps } from '../types'
import styled from 'styled-components'



const SearchOption: React.FC<SearchOptionProps> = ({ boxType, option, setTag }) => {

    return (
        <SearchOptionContainer key={option}>
            <input type="checkbox" name={option} id={option}
                onChange={(e) => (setTag(boxType, e.target.checked, e.target.id))} />
            <label htmlFor={option}>{option}</label>
        </SearchOptionContainer>
    )
}

export default SearchOption

const SearchOptionContainer = styled.div`
    margin: 8px 10px 8px 10px;

    & label{
        font-weight: bold;
        margin-left: 3px;
    }
`