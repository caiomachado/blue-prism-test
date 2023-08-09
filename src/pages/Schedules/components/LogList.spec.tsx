import { ReactElement } from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LogList } from './LogList'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const mockScheduleInfo = {
    scheduleId: 63463047,
    isScheduleRetired: false,
}

const mockGetResponse = [
    {
        "id": 66908530,
        "startTime": "2021-04-23T04:34:08.036Z",
        "endTime": "2021-07-19T19:20:27.785Z",
        "status": "Exception",
        "serverName": "occaecat fugiat Lorem laborum dolore",
        "scheduleId": 63463047
    },
    {
        "id": 64965797,
        "startTime": "2021-09-17T00:08:36.283Z",
        "endTime": "2021-12-15T04:43:01.756Z",
        "status": "Pending",
        "serverName": "culpa",
        "scheduleId": 63463047
    },
    {
        "id": 48347487,
        "startTime": "2021-10-08T04:56:26.822Z",
        "endTime": "2021-10-21T21:48:11.489Z",
        "status": "Pending",
        "serverName": "occaecat consequat",
        "scheduleId": 63463047
    },
]

const server = setupServer(
    rest.get('/scheduleLogs', (_, res, ctx) => {
        return res(ctx.json(mockGetResponse))
    }),
)

const queryClient = new QueryClient()

const renderWithQueryClient = (children: ReactElement) => render(
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe('LogList Component', () => {
    it('should render properly', () => {
        const { getByTestId } = renderWithQueryClient(
            <LogList scheduleInfo={mockScheduleInfo} />
        )

        const logListComponent = getByTestId('LOG_LIST_COMPONENT')
        expect(logListComponent).toBeInTheDocument()  
    })

    it('should successfully have data fetched to display', () => {
        server.listen()
        const { findAllByRole } = renderWithQueryClient(
            <LogList scheduleInfo={mockScheduleInfo} />
        )
        
        const listItems = findAllByRole('LIST_ITEM')
        waitFor(() => expect(listItems).toHaveLength(4))
        server.close()
    })

    it('should show a new entry card after clicking on add button', () => {
        server.listen()
        const { getByTestId } = renderWithQueryClient(
            <LogList scheduleInfo={mockScheduleInfo} />
        )
        
        const addButton = getByTestId('ADD_BUTTON')
        fireEvent.click(addButton)
        waitFor(() => {
            const newCard = getByTestId('NEW_ENTRY_CARD')
            expect(newCard).toBeInTheDocument()
        })
        server.close()
    })

    it('should show an empty list message when there are no entries for the selected Schedule', () => {
        const { getByTestId } = renderWithQueryClient(
            <LogList scheduleInfo={{ ...mockScheduleInfo, scheduleId: null }} />
        )

        const noDataMessage = getByTestId('NO_DATA_MESSAGE')
        expect(noDataMessage).toHaveTextContent('There are no log entries for this Schedule')
    })
})