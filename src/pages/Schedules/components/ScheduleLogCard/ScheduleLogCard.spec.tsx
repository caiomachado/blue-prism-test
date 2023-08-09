import { ReactElement } from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ScheduleLogCard } from '.'

const mockScheduleLog = {
    id: 66908530,
    startTime: "2021-04-23T04:34:08.036Z",
    endTime: "2021-07-19T19:20:27.785Z",
    status: "Exception",
    serverName: "occaecat fugiat Lorem laborum dolore",
    scheduleId: 63463047
}

const queryClient = new QueryClient()

const renderWithQueryClient = (children: ReactElement) => render(
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe('ScheduleLogCard Component', () => {
    it('should render properly', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleLogCard 
                log={mockScheduleLog}
            />
        )

        const card = getByTestId('LOG_CARD')
        expect(card).toBeInTheDocument()  
    })

    it('should render confirm actions when clicking on delete button', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleLogCard 
                log={mockScheduleLog}
            />
        )

        const deleteButton = getByTestId('DELETE_BUTTON')
        fireEvent.click(deleteButton)
        const actionComponent = getByTestId('CONFIRM_ACTION_COMPONENT')
        expect(actionComponent).toBeInTheDocument()
    })
    
    it('should close confirm actions when clicking on the X icon', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleLogCard 
                log={mockScheduleLog}
            />
        )

        const deleteButton = getByTestId('DELETE_BUTTON')
        fireEvent.click(deleteButton)
        const actionComponent = getByTestId('CONFIRM_ACTION_COMPONENT')
        const cancelAction = getByTestId('CANCEL_ACTION')
        fireEvent.click(cancelAction)
        expect(actionComponent).not.toBeInTheDocument()
    })
    
    it('should not have ScheduleLogCard after confirming the action of delete', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleLogCard 
                log={mockScheduleLog}
            />
        )

        const card = getByTestId('LOG_CARD')
        const deleteButton = getByTestId('DELETE_BUTTON')
        fireEvent.click(deleteButton)
        const confirmAction = getByTestId('CONFIRM_ACTION')
        fireEvent.click(confirmAction)
        waitFor(() => expect(card).not.toBeInTheDocument())
    })

    it('should show edit form when clicking on edit button', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleLogCard 
                log={mockScheduleLog}
            />
        )

        const editButton = getByTestId('EDIT_BUTTON')
        fireEvent.click(editButton)
        const editForm = getByTestId('EDIT_LOG_FORM')
        expect(editForm).toBeInTheDocument()
    })
    
    it('should hide edit form when clicking on cancel button', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleLogCard 
                log={mockScheduleLog}
            />
        )

        const editButton = getByTestId('EDIT_BUTTON')
        fireEvent.click(editButton)
        const editForm = getByTestId('EDIT_LOG_FORM')
        const cancelEditButton = getByTestId('CANCEL_EDIT')
        fireEvent.click(cancelEditButton)
        expect(editForm).not.toBeInTheDocument()
    })
    
    it("should successfully edit log's status from Exception to Completed when clicking on save button", () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleLogCard 
                log={mockScheduleLog}
            />
        )
  
        const statusName = getByTestId('LOG_STATUS_NAME')
        expect(statusName).toHaveTextContent('Exception')
        const editButton = getByTestId('EDIT_BUTTON')
        fireEvent.click(editButton)
        const editForm = getByTestId('EDIT_LOG_FORM')
        const selectStatusInput = getByTestId('STATUS_INPUT')
        fireEvent.change(selectStatusInput, { target: { value: 'Completed' } })
        const saveEditButton = getByTestId('SAVE_EDIT')
        fireEvent.click(saveEditButton)
        waitFor(() => {
            expect(editForm).not.toBeInTheDocument()
            expect(statusName).toHaveTextContent('Completed')
        })
    })
})