import { styled } from 'styled-components'
import { theme } from '../../utils'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 10%;
    padding: 8px 16px;

    h1 {
        color: ${theme.palette.blue};
    }

    @media (max-width: ${theme.breakpoints.md}px) {
        height: auto;
    }

    @media (max-width: ${theme.breakpoints.xs}px) {
        padding: 4px 8px;
    }
` 