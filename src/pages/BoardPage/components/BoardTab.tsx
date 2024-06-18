import React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
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
`;

interface BoardTabsProps {
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}

const BoardTabs: React.FC<BoardTabsProps> = ({ selectedTab, setSelectedTab }) => {
    return (
        <TabsContainer>
        <Tab isActive={selectedTab === 'dummy'} onClick={() => setSelectedTab('dummy')}>
            공지
        </Tab>
        <Tab isActive={selectedTab === 'dummy2'} onClick={() => setSelectedTab('dummy2')}>
            자유
        </Tab>
        </TabsContainer>
    );
};

export default BoardTabs;