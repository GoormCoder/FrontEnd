import React from 'react';
import styled from 'styled-components';
import { BoardTabsProps } from '../types';


const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Tab = styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive }) => (isActive ? '#007bff' : '#fff')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#007bff')};
    border: 1px solid #007bff;
    margin: 0 5px;
    padding: 10px 20px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? '#0056b3' : '#e9ecef')};
    }

    @media (max-width: 768px) {
        margin: 5px 0;
        width: 80%;
        padding: 10px;
    }

    @media (max-width: 480px) {
        padding: 8px;
        font-size: 14px;
    }
`;



const BoardTabs: React.FC<BoardTabsProps> = ({ selectedTab, setSelectedTab }) => {
    return (
        <TabsContainer>
            <Tab isActive={selectedTab === 'NOTICE_BOARD'} onClick={() => setSelectedTab('NOTICE_BOARD')}>
                공지
            </Tab>
            <Tab isActive={selectedTab === 'FREE_BOARD'} onClick={() => setSelectedTab('FREE_BOARD')}>
                자유
            </Tab>
        </TabsContainer>
    );
};

export default BoardTabs;