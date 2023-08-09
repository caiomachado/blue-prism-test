import { styled } from "styled-components";
import { theme } from "../../utils";

export const StyledButton = styled.button<{ $variant: string; $mainColor: string; $subColor: string; }>`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 16px;
    border: 1px solid ${props => props.$variant === 'primary' ? props.$subColor : props.$mainColor};
    background: ${props => props.$variant === 'primary' ? props.$mainColor : props.$subColor};
    color: ${props => props.$variant === 'primary' ? props.$subColor : props.$mainColor};
    transition: all 0.2s ease-in-out;
    border-radius: 4px;
    font-weight: bold;
    cursor: pointer;

    svg path {
        stroke: ${props => props.$variant === 'primary' ? props.$subColor : props.$mainColor};
    }

    &:hover {
        border-color: ${props => props.$variant === 'primary' ? props.$mainColor : props.$subColor};
        background: ${props => props.$variant === 'primary' ? props.$subColor : props.$mainColor};
        color: ${props => props.$variant === 'primary' ? props.$mainColor : props.$subColor};

        svg path {
            stroke: ${props => props.$variant === 'primary' ? props.$mainColor : props.$subColor};
        }
    }

    &:disabled {
        opacity: 0.4;
        pointer-events: none;
    }

    @media (max-width: ${theme.breakpoints.sm}px) {
        width: 100%;
    }
`