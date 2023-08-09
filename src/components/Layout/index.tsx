import { Header } from "../Header"
import { Schedules } from "../../pages/Schedules"
import { Container } from "./styles"

export const Layout = () => {
    return (
        <Container>
            <Header />
            <div className="content">
                <Schedules />
            </div>
        </Container>
    )
}