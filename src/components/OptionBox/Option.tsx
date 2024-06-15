import React, { useEffect, useRef, useState } from 'react'
import { OptionProps } from './types'
import styled from 'styled-components'



const Option: React.FC<OptionProps> = ({ boxType, option, setValue }) => {

    return (
        <OptionContainer key={option}>
            <input type="checkbox" name={option} id={option}
                onChange={(e) => (setValue(boxType, e.target.checked, e.target.id))} />
            <label htmlFor={option}>{option}</label>
        </OptionContainer>
    )
}

export default Option

const OptionContainer = styled.div`
    margin: 8px 10px 8px 10px;

    & label{
        font-weight: bold;
        margin-left: 3px;
    }
`