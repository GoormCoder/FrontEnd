import React, { useEffect, useRef, useState } from 'react'

interface SearchOptionProps {
    // setTagList: (tags: string[]) => void,
    setTag: (type: string, checked: boolean, tagValue: string) => void
}
// 
const SearchOption: React.FC<SearchOptionProps> = ({ setTag }) => {

    const selectRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        // setTag("test", true, "test")
    }, [])

    return (
        <div className='select-container' ref={selectRef}>
            {/* <div className='select-title'
                onClick={() => {
                    stateDisplay == 'none' ?
                        setStateDisplay('block') : setStateDisplay('none')
                }}>
                상태 선택 박스
            </div>
            <div className='select-lists state'>
                <div>
                    <input type="checkbox" name="안 푼 문제" id="안 푼 문제" onChange={(e) => (setTag("state", e.target.checked, e.target.id))} />
                    <label htmlFor="안 푼 문제">안 푼 문제</label>
                </div>
                <div>
                    <input type="checkbox" name="풀고 있는 문제" id="풀고 있는 문제" onChange={(e) => (setTag("state", e.target.checked, e.target.id))} />
                    <label htmlFor="풀고 있는 문제">풀고 있는 문제</label>
                </div>
                <div>
                    <input type="checkbox" name="푼 문제" id="푼 문제" onChange={(e) => (setTag("state", e.target.checked, e.target.id))} />
                    <label htmlFor="푼 문제">푼 문제</label>
                </div>
            </div> */}
        </div>
    )
}

export default SearchOption
