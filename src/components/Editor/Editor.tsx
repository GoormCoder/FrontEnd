import React from 'react'
import styled from 'styled-components'
import { Editor } from '@monaco-editor/react';


const CodeEditor = () => {
    return (
        <Editor
            theme='vs-dark'
            language='java'
            
        />
    )
}

export default CodeEditor