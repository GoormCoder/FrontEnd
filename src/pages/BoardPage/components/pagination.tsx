import React from 'react';
import styled from 'styled-components';

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 20px 0;
`;

const PageButton = styled.button<{ isActive: boolean }>`
    background-color: ${({ isActive }) => (isActive ? '#007bff' : '#fff')};
    color: ${({ isActive }) => (isActive ? '#fff' : '#007bff')};
    border: 1px solid #007bff;
    border-radius: 5px;
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? '#0056b3' : '#e9ecef')};
    } 
`;

interface PaginationProps {
    totalPosts: number;
    postsPerPage: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, currentPage, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <PaginationContainer>
        {pageNumbers.map(number => (
            <PageButton key={number} isActive={number === currentPage} onClick={() => paginate(number)}>
            {number}
            </PageButton>
        ))}
        </PaginationContainer>
    );
};

export default Pagination;