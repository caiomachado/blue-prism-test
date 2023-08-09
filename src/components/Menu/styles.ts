import { styled } from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &.active {
        :nth-child(1) {
            transform: translateY(3px) rotate(50deg);
        }

        :nth-child(2) {
            display: none;
        }

        :nth-child(3) {
            transform: translateY(-5px) rotate(130deg);
        }
    }


    .bar {
        height: 4px;
        width: 100%;
        background-color: black;
        border-radius: 8px;
        transition: all 0.2s ease-in-out;
    }
`