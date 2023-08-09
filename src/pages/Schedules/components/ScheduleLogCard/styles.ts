import { styled } from "styled-components"
import { theme } from "../../../../utils"

export const Container = styled.div<{ $isEditing: boolean }>`
    width: 100%;
    height: 240px;
    background-color: ${theme.palette.white};
    border: 1px solid ${theme.palette.white};
    border-radius: 8px;
    box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.4);
    position: relative;
    transform-style: preserve-3d;
    transition: all 0.5s ease;
    transform: ${props => props.$isEditing ? 'rotateY(180deg)' : 'none'};

    .front-face {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 8px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        padding: 8px 16px;
    }

    .back-face {
        display: flex;
        flex-direction: column;
        gap: 8px;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        transform: rotateY(180deg);
        padding: 8px 16px;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 12px;

        h3 {
            font-size: 18px;
            color: ${theme.palette.darkBlue};
        }

        @media (max-width: ${theme.breakpoints.xs}px) {
            align-items: flex-start;
            flex-direction: row;
        }
    }

    .log-content {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    
    .form-content {
        display: flex;
        flex-direction: column;
        gap: 4px;

        select {
            height: 24px;
            border-radius: 4px;
            outline: none;
            padding-left: 4px;
            border: 1px solid ${theme.palette.blue};
            cursor: pointer;
        }
    }

    .input-block {
        display: flex;
        flex-direction: column;
        gap: 4px;

        label {
            font-size: 14px;
            color: ${theme.palette.blue};
        }
        
        input {
            height: 24px;
            border-radius: 4px;
            outline: none;
            padding-left: 4px;
            border: 1px solid ${theme.palette.blue};
            cursor: pointer;
        }
    }

    .action-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    
    .form-actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: auto;
    }

    .icon {
        cursor: pointer;
    }
`