import { ReactElement } from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ScheduleList } from './ScheduleList'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

const mockScheduleInfo = {
    scheduleId: 61389310,
    isScheduleRetired: false,
}

const mockGetResponse = [
    {
        "id": 61389310,
        "name": "Random Schedule Name (0.7115809297401243)",
        "description": "dolore ex deserunt labore",
        "isRetired": true,
        "tasksCount": 9,
        "startPoint": "2021-08-24T02:41:05.745Z",
        "endPoint": "2021-09-22T17:17:20.381Z",
        "dayOfWeek": 5,
        "dayOfMonth": 16,
        "startDate": "2021-07-26T04:45:51.143Z",
        "endDate": "2021-04-07T18:07:13.915Z",
        "intervalType": "Second",
        "timePeriod": 21
    },
    {
        "id": 97906991,
        "name": "Random Schedule Name (0.8204717521981111)",
        "description": "Lorem adipisicing reprehenderit",
        "isRetired": true,
        "tasksCount": 2,
        "startPoint": "2021-06-02T15:18:51.165Z",
        "endPoint": "2021-07-09T06:34:30.078Z",
        "dayOfWeek": 1,
        "dayOfMonth": 13,
        "startDate": "2021-10-12T12:10:35.280Z",
        "endDate": "2021-04-28T23:29:31.543Z",
        "intervalType": "Hour",
        "timePeriod": 8
    },
]

const server = setupServer(
    rest.get('/schedules', (_, res, ctx) => {
        return res(ctx.json(mockGetResponse))
    }),
)

const serverNoData = setupServer(
    rest.get('/schedules', (_, res, ctx) => {
        return res(ctx.json([]))
    }),
)

const queryClient = new QueryClient()

const renderWithQueryClient = (children: ReactElement) => render(
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

describe('ScheduleList Component', () => {
    it('should render properly', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleList scheduleInfo={mockScheduleInfo} handleScheduleInfo={jest.fn()} />
        )

        const scheduleListComponent = getByTestId('SCHEDULE_LIST_COMPONENT')
        expect(scheduleListComponent).toBeInTheDocument()  
    })

    it('should successfully have data fetched to display', () => {
        server.listen()
        const { findAllByRole } = renderWithQueryClient(
            <ScheduleList scheduleInfo={mockScheduleInfo} handleScheduleInfo={jest.fn()} />
        )
        
        const listItems = findAllByRole('LIST_ITEM')
        waitFor(() => expect(listItems).toHaveLength(2))
        server.close()
    })

    it('should show a new schedule card after clicking on add button', () => {
        const { getByTestId } = renderWithQueryClient(
            <ScheduleList scheduleInfo={mockScheduleInfo} handleScheduleInfo={jest.fn()} />
        )
        
        const addButton = getByTestId('ADD_SCHEDULE_BUTTON')
        fireEvent.click(addButton)
        waitFor(() => {
            const newCard = getByTestId('NEW_SCHEDULE_CARD')
            expect(newCard).toBeInTheDocument()
        })
    })

    it('should show an empty list message when there are no schedules available', () => {
        serverNoData.listen()
        const { getByTestId } = renderWithQueryClient(
            <ScheduleList scheduleInfo={mockScheduleInfo} handleScheduleInfo={jest.fn()} />
        )

        waitFor(() => {
            const noDataMessage = getByTestId('NO_DATA_MESSAGE')
            expect(noDataMessage).toHaveTextContent('There are no available schedules')
        })
        serverNoData.close()
    })
})