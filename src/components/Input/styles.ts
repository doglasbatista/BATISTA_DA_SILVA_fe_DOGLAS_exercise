import styled from 'styled-components';

export const InputStyled = styled.input`
    display: block;
    border: 1px solid black;
    background: #fff;
    padding: 8px 12px;
    width: 100%;
    max-width: 250px;
    font-size: 16px;
    color: #333;
    border-radius: 4px;
    outline: none;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
        border-color: #007bff;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }

    &::placeholder {
        color: #999;
    }
`;
