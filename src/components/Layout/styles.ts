import { styled } from 'styled-components'

export const Container = styled.main`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    height: 100%;

    .content {
        display: flex;
        overflow: hidden;
        height: 90%;
        margin-bottom: 6px;
    }
`