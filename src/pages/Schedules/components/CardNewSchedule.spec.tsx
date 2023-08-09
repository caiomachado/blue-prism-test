import { ReactElement } from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CardNewSchedule } from './CardNewSchedule'

const queryClient = new QueryClient()

const renderWithQueryClient = (children: ReactElement) => render(
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe('CardNewSchedule Component', () => {
    it('should render properly', () => {
        const { getByTestId } = renderWithQueryClient(
            <CardNewSchedule closeAddition={jest.fn()} />
        )

        const card = getByTestId('NEW_CARD_SCHEDULE')
        expect(card).toBeInTheDocument()  
    })

    it('should close CardNewSchedule after clicking on cancel button', () => {
        const { getByTestId } = renderWithQueryClient(
            <CardNewSchedule closeAddition={jest.fn()} />
        )

        const card = getByTestId('NEW_CARD_SCHEDULE')
        const cancelButton = getByTestId('CANCEL_BUTTON')
        fireEvent.click(cancelButton)
        waitFor(() => expect(card).not.toBeInTheDocument())
    })

    it('should create new Schedule and close CardNewSchedule after clicking on create button', () => {
        const { getByTestId } = renderWithQueryClient(
            <CardNewSchedule closeAddition={jest.fn()} />
        )

        const card = getByTestId('NEW_CARD_SCHEDULE')
        const createButton = getByTestId('CREATE_BUTTON')
        fireEvent.click(createButton)
        waitFor(() => expect(card).not.toBeInTheDocument())
    })
})