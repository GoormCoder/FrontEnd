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
    width: 350px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: #fff;
    margin-top: 50px;
`;

export const Title = styled.h1`
    margin-bottom: 15px;
    text-align: center;
    font-size: 1.8em;
`;

export const Label = styled.label`
    margin-bottom: 10px;
    font-size: 1.1em;
`;

export const Input = styled.input`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const Select = styled.select`
    margin-bottom: 10px;
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
    margin-top: 15px;
    padding: 12px;
    font-size: 1.1em;
    border-radius: 5px;
    border: none;
    background: #007BFF;
    color: #fff;
    cursor: pointer;
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
    margin-bottom: 15px;
    padding: 10px;
    color: #fff;
    background: #e74c3c;
    border-radius: 5px;
    text-align: center;
`;

export const SuccessMessage = styled.div`
    margin-bottom: 15px;
    padding: 10px;
    color: #fff;
    background: #2ecc71;
    border-radius: 5px;
    text-align: center;
`;

export const LoadingSpinner = styled.div`
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #007BFF;
    animation: spin 1s ease-in-out infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;