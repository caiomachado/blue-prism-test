import { keyframes, styled } from 'styled-components'
import { theme } from '../../utils'

const slideDown = keyframes`
    0% {
        height: 0%;
        opacity: 0;
    }
    
    25% {
        height: 25%;
        opacity: 0.25
    }

    50% {
        height: 50%;
        opacity: 0.5;
    }

    75% {
        height: 75%;
        opacity: 0.75;
    }

    100% {
        height: 100%;
        opacity: 1;
    }
`

export const Container = styled.div`
    display: flex;
    gap: 16px;
    width: 100%;
    height: 100%;

    .empty-block {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
 
        p {
            font-size: 18px;
            font-weight: bold;
            color: ${theme.palette.darkBlue};
        }
    }

    .actions-wrapper {
        display: flex;
        align-items: center;
        gap: 16px;
        width: 100%;

        input {
            width: 60%;
            padding: 8px 16px;
            outline: none;
            border-radius: 4px;
            border: 1px solid ${theme.palette.blue};
            cursor: pointer;
        }

        @media (max-width: ${theme.breakpoints.sm}px) {
            flex-direction: column;
            gap: 8px;

            input {
                width: 100%;
            }
        }
    }

    .schedules-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 30%;
        height: 100%;
        padding: 24px 16px;

        .schedule-list {
            width: 100%;
            height: 100%;
            padding: 6px 12px;
            overflow-x: hidden;

            & > div:not(:last-of-type) {
                margin-bottom: 16px;
            }
    
            &::-webkit-scrollbar {
                width: 12px;
            }
                
            &::-webkit-scrollbar-thumb {
                background-color: ${theme.palette.darkBlue};
                border-radius: 8px;
            }
        }

        @media (max-width: ${theme.breakpoints.lg}px) {
            width: 35%;
        }

        @media (max-width: ${theme.breakpoints.md}px) {
            width: 40%;
            padding: 12px 8px;
        }

        @media (max-width: ${theme.breakpoints.sm}px) {
            width: 100%;
            padding: 12px 8px;
        }
    }


    .logs-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 70%;
        height: 100%;
        padding: 24px 16px;

        @media (max-width: ${theme.breakpoints.lg}px) {
            width: 65%;
        }

        @media (max-width: ${theme.breakpoints.md}px) {
            width: 60%;
            padding: 12px 8px;
        }

        @media (max-width: ${theme.breakpoints.sm}px) {
            width: 100%;
            padding: 12px 8px;
        }

        @media (max-width: ${theme.breakpoints.xs}px) {
            padding: 24px 8px;
            animation: ${slideDown} 0.5s linear forwards;
            border-radius: 0 0 8px 8px;
            box-shadow: 0 4px 6px 2px rgba(0, 0, 0, 0.4);
            width: 95%;
        }
    }
`

export const LogsList = styled.div<{ $isListEmpty: boolean }>`
    display: ${props => props.$isListEmpty ? 'flex' : 'grid'};
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    width: 100%;
    height: auto;
    padding: 12px;
    overflow-x: hidden;

    &::-webkit-scrollbar {
        width: 12px;
    }
        
    &::-webkit-scrollbar-thumb {
        background-color: ${theme.palette.darkBlue};
        border-radius: 8px;
    }

    @media (max-width: ${theme.breakpoints.lg}px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: ${theme.breakpoints.md}px) {
        grid-template-columns: repeat(2, 1fr);
        padding: 8px;
    }
    
    @media (max-width: ${theme.breakpoints.sm}px) {
        grid-template-columns: 1fr;
        padding: 8px;
    }
    
    @media (max-width: ${theme.breakpoints.xs}px) {
        grid-template-columns: 1fr;
        padding: 8px;
        overflow-y: hidden;
    }
`