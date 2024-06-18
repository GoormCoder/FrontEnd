import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { RnakInfoProps } from '../types'
import { testLog } from '../../../utils/testLog';



const RankInfo: React.FC<RnakInfoProps> = ({ rankInfoDisplay, setRankInfoDisplay }) => {
    const infoRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        function handleClickOutSide(e: MouseEvent) {
            if (infoRef.current && !infoRef.current.contains(e.target as Node)) {
                setRankInfoDisplay && setRankInfoDisplay(false)
            }
        }

        document.addEventListener('mouseup', handleClickOutSide);
        return () => {
            document.removeEventListener('mouseup', handleClickOutSide);
        };
    }, [])
    return (
        <RankInfoContainer rankInfoDisplay={rankInfoDisplay} ref={infoRef}>
            <div className='title'>종합점수란?</div>
            <div className='content'>구름코더에서 획득 가능한 점수들의 합입니다.</div>
            <div className='content'>(종합점수 = 칭찬점수 + 풀이점수 + 대결점수)</div>
        </RankInfoContainer>
    )
}

export default RankInfo

const RankInfoContainer = styled.div<RnakInfoProps>`
    display: ${props => props.rankInfoDisplay ? "block" : "none"};
    position: absolute;
    top: 45px;
    right: 5px;
    background-color: whitesmoke;
    width: 280px;
    padding: 10px;
    border: 1px solid #003369;
    border-radius: 5px;

    & .title{
        font-size: 18px;
        color: black;
        margin: 5px 0px 5px 0px;
    }

    & .content {
        font-size: 15px;
        margin-bottom: 5px;
    }
`
