import { ReactElement } from 'react'
import { render, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Schedules } from '.'

const queryClient = new QueryClient()

const renderWithQueryClient = (children: ReactElement) => render(
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe('Schedules Component', () => {
    it('should render properly', () => {
        const { getByTestId } = renderWithQueryClient(
            <Schedules />
        )

        waitFor(() => {
            const scheduleListComponent = getByTestId('SCHEDULES_LIST_COMPONENT')
            const logListComponent = getByTestId('LOG_LIST_COMPONENT')
            expect(scheduleListComponent).toBeInTheDocument()  
            expect(logListComponent).not.toBeInTheDocument()  
        })
    })
})