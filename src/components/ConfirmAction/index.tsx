import { Container } from "./styles"
import { theme } from "../../utils"
import { GiConfirmed } from "react-icons/gi";
import { AiOutlineCloseCircle } from "react-icons/ai";

type ConfirmActionProps = {
    title: string;
    primaryButtonAction: () => void
    secondaryButtonAction: () => void
}

export const ConfirmAction = ({ title, primaryButtonAction, secondaryButtonAction }: ConfirmActionProps) => {
    return (
        <Container data-testid="CONFIRM_ACTION_COMPONENT">
            <h3>{title}</h3>
            <div className="button-wrapper">
                <button onClick={secondaryButtonAction} type='button' data-testid="CANCEL_ACTION">
                    <AiOutlineCloseCircle size={26} color={theme.palette.danger} />
                </button>
                <button onClick={primaryButtonAction} type='button' data-testid="CONFIRM_ACTION">
                    <GiConfirmed size={26} color={theme.palette.green} />
                </button>
            </div>
        </Container>
    )
}