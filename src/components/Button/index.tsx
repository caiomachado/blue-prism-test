import { ButtonHTMLAttributes, ReactNode } from 'react'
import { StyledButton } from "./styles"

type ButtonProps = {
    text: string | ReactNode;
    mainColor: string;
    subColor: string;
    handleClick?: () => void;
    variant: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({ text, mainColor, subColor, handleClick, variant, ...props }: ButtonProps) => {
    return (
        <StyledButton
            {...props}
            $variant={variant}
            $mainColor={mainColor}
            $subColor={subColor}
            onClick={handleClick}
        >
            {text}
        </StyledButton>
    )
}