import React from 'react'
import styled from 'styled-components'
import { getUserName } from '../../../services/api/questAPI';

const SideStatus = () => {
    const userName: string = getUserName();
    return (
        <SideStatusContainer>
            <div>
                {userName}
            </div>
            <div>
                맞춘 문제 수
            </div>
            <div>
                최근 풀이한 문제
            </div>
        </SideStatusContainer>
    )
}

export default SideStatus

const SideStatusContainer = styled.div`
    border: 1px solid black;
    width: 18%;
`