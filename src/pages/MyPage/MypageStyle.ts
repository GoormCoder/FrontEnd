import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f0f0f0;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 900px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: #fff;
    margin-top: 50px;
`;

export const Title = styled.h1`
    margin-bottom: 20px;
    text-align: center;
    font-size: 1.8em;
`;

export const LeftColumn = styled.div`
    flex: 3;
    padding-right: 10px;
    border-right: 1px solid #ccc;
`;

export const RightColumn = styled.div`
    flex: 2;
    padding-left: 20px;
`;

export const Row = styled.div`
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
`;

export const RowLabel = styled.div`
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center; /* 세로 가운데 정렬 */
    margin-right: 20px;
`;

export const RowValue = styled.div`
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 240px; /* 수정 */
    margin-bottom: 10px;
    min-height: 16px; /* 빈 값일 때도 일정한 높이 유지 */
    display: flex;
    align-items: center;
    justify-content: center; /* 가로 가운데 정렬 추가 */
    text-align: center; /* 세로 가운데 정렬 */
`;

export const Label = styled.label`
    font-size: 1.1em;
    margin-bottom: 10px;
`;

export const Input = styled.input`
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 240px; /* 수정 */
    margin-bottom: 10px;
`;

export const Select = styled.select`
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
    max-width: 250px;
    margin-bottom: 10px;
`;

export const Button = styled.button`
    padding: 10px 20px;
    font-size: 1em;
    border-radius: 5px;
    border: none;
    background-color: #007BFF;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-left: 20px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const LinksContainer = styled.div`
    margin-top: 10px;
    text-align: center;
`;

export const Link = styled.a`
    margin-right: 8px;
    color: #007BFF;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }

    &:last-child {
        margin-right: 0;
    }
`;

export const ErrorMessage = styled.div`
    margin-top: 15px;
    padding: 10px;
    color: #fff;
    background: #e74c3c;
    border-radius: 5px;
    text-align: center;
`;
