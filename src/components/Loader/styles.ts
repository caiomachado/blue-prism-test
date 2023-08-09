import { styled, keyframes } from "styled-components";
import { theme } from "../../utils";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    p {
        font-size: 18px;
        font-weight: bold;
        color: ${theme.palette.darkBlue};
    }

    .loading-icon {
        padding: 10px;
        border-radius: 50%;
        border-top: 2px solid ${theme.palette.darkBlue};
        animation: ${rotate} 1s linear infinite; 
    }
`