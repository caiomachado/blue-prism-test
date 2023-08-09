import { Container } from "./styles"

type LoaderProps = {
    text?: string;
}

export const Loader = ({ text }: LoaderProps) => {
    return (
        <Container>
            {text && (
                <p>{text}</p>
            )}
            <div className="loading-icon" />
        </Container>
    )
}