import { styled } from 'styled-components'
import { theme } from '../../../../utils';

export const Container = styled.div<{ $isRetired: boolean }>`
    width: 100%;

    @media (max-width: ${theme.breakpoints.xs}px) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 100%;
        padding: 8px 16px;
        background-color: ${theme.palette.white};
        border: 1px solid ${theme.palette.white};
        border-radius: 8px;
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.4);
        opacity: ${props => props.$isRetired ? 0.6 : 1};
        position: relative;
        
        &.selected {
            border: 1px solid ${theme.palette.blue};
        }
        
        form {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
    
        .form-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
    
            select {
                border-radius: 4px;
                outline: none;
                padding: 8px 16px;
                border: 1px solid ${theme.palette.blue};
                cursor: pointer;
            }
    
            .row-group {
                display: flex;
                width: 100%;
                align-items: center;
                justify-content: space-between;
                gap: 6px;
    
                .input-block {
                    max-width: 50%;
                }
            }
        }
    }

    .form-actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .input-block {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;

        label {
            font-size: 14px;
            color: ${theme.palette.blue};
        }
        
        input {
            border-radius: 4px;
            outline: none;
            padding: 8px 16px;
            border: 1px solid ${theme.palette.blue};
            cursor: pointer;
        }
    }

    .checkbox-wrapper {
        display: flex;
        align-items: center;
        gap: 4px;

        input {
            height: 16px;
            width: 16px;
        }

        label {
            font-size: 14px;
        }
    }

    .header {
        display: flex;
        flex-direction: column;
        gap: 4px;

        .header-actions {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        h3 {
            font-size: 18px;
            color: ${theme.palette.darkBlue};
        }
    }

    .action-wrapper {
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .icon {
        cursor: pointer;
    }

    .safe-check {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        padding: 8px 16px;
        backdrop-filter: blur(5px);
        display: flex;
        flex-direction: column;
        gap: 8px;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: ${theme.palette.black};

        .button-wrapper {
            display: flex;
            align-items: center;
            gap: 12px;
            
            button {
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                background: transparent;
                cursor: pointer;
                transition: all 0.2s ease-in-out;

                &:hover {
                    transform: scale(1.1);
                }
            }
        }
    }
`