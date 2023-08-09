import { ReactElement } from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ScheduleCard } from '.'

const mockSchedule = {
    id: 63463047,
    name: "Random Schedule Name (0.1370242632447487)",
    description: "sit exercitation id enim",
    isRetired: false,
    tasksCount: 4,
    startPoint: "2021-06-05T07:20:55.430Z",
    endPoint: "2021-03-28T01:58:08.144Z",
    dayOfWeek: 5,
    dayOfMonth: 3,
    startDate: "2021-02-24T08:18:01.525Z",
    endDate: "2021-10-23T18:34:49.642Z",
    intervalType: "Never",
    timePeriod: 2
}

const queryClient = new QueryClient()

const renderWithQueryClient = (children: ReactElement) => render(
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe('ScheduleCard Component', () => {
    it('should render properly', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleCard 
                schedule={mockSchedule}
                handleShowLogs={jest.fn()} 
                showingLogs={false}
                handleOnUpdate={jest.fn()} 
            />
        )

        const card = getByTestId('SCHEDULE_CARD')
        expect(card).toBeInTheDocument()  
    })

    it('should render confirm actions when clicking on delete icon', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleCard 
                schedule={mockSchedule}
                handleShowLogs={jest.fn()} 
                showingLogs={false}
                handleOnUpdate={jest.fn()} 
            />
        )

        const deleteIcon = getByTestId('DELETE_ICON')
        fireEvent.click(deleteIcon)
        const actionComponent = getByTestId('CONFIRM_ACTION_COMPONENT')
        expect(actionComponent).toBeInTheDocument()
    })
    
    it('should close confirm actions when clicking on the X icon', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleCard 
                schedule={mockSchedule}
                handleShowLogs={jest.fn()} 
                showingLogs={false}
                handleOnUpdate={jest.fn()} 
            />
        )

        const deleteIcon = getByTestId('DELETE_ICON')
        fireEvent.click(deleteIcon)
        const actionComponent = getByTestId('CONFIRM_ACTION_COMPONENT')
        const cancelAction = getByTestId('CANCEL_ACTION')
        fireEvent.click(cancelAction)
        expect(actionComponent).not.toBeInTheDocument()
    })
    
    it('should not have ScheduleCard after confirming the action of delete', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleCard 
                schedule={mockSchedule}
                handleShowLogs={jest.fn()} 
                showingLogs={false}
                handleOnUpdate={jest.fn()} 
            />
        )

        const card = getByTestId('SCHEDULE_CARD')
        const deleteIcon = getByTestId('DELETE_ICON')
        fireEvent.click(deleteIcon)
        const confirmAction = getByTestId('CONFIRM_ACTION')
        fireEvent.click(confirmAction)
        waitFor(() => expect(card).not.toBeInTheDocument())
    })

    it('should retire schedule properly', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleCard 
                schedule={mockSchedule}
                handleShowLogs={jest.fn()} 
                showingLogs={false}
                handleOnUpdate={jest.fn()} 
            />
        )

        const card = getByTestId('SCHEDULE_CARD')
        const retireButton = getByTestId('RETIRE_BUTTON')
        fireEvent.click(retireButton)
        waitFor(() => {
            expect(card).toHaveStyle('opacity: 0.6')
            expect(retireButton).toHaveTextContent('Unretire')
        })
    })
    
    it('should unretire schedule properly', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleCard 
                schedule={{ ...mockSchedule, isRetired: true }}
                handleShowLogs={jest.fn()} 
                showingLogs={false}
                handleOnUpdate={jest.fn()} 
            />
        )

        const card = getByTestId('SCHEDULE_CARD')
        const retireButton = getByTestId('RETIRE_BUTTON')
        fireEvent.click(retireButton)
        waitFor(() => {
            expect(card).toHaveStyle('opacity: 1')
            expect(retireButton).toHaveTextContent('Retire')
        })
    })
})