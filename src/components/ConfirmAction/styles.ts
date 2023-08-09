import { styled } from "styled-components";
import { theme } from "../../utils";

export const Container = styled.div`
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
`