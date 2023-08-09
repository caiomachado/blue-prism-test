import { useState } from 'react'

import { Container } from "./styles"

export const Menu = () => {
    const [isMenuActive, setIsMenuActive] = useState(false)

    return (
        <Container 
            onClick={() => setIsMenuActive(!isMenuActive)}
            className={isMenuActive ? 'active' : ''}
        >
            <div className="bar" />
            <div className="bar" />
            <div className="bar" />
        </Container>
    )
}