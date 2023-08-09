import { useState } from 'react'
import { theme } from "../../../utils"
import { Button } from "../../../components/Button"
import { ScheduleLogCard } from "../components/ScheduleLogCard"
import { api } from "../../../server/api"
import { useQuery } from 'react-query'
import { ScheduleLog } from '../../../types/schedules'
import { ScheduleInfo } from '..'
import { Loader } from '../../../components/Loader'
import { LogsList } from '../styles'
import { toast } from 'react-toastify'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'

type LogListProps = {
    scheduleInfo: ScheduleInfo
}

export const LogList = ({ scheduleInfo }: LogListProps) => {
    const [filterValue, setFilterValue] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const debouncedFilterValue = useDebouncedValue<string>(filterValue)

    const { data: scheduleLogs, isLoading } = useQuery<ScheduleLog[], Error>({ 
        queryKey: `schedule-${scheduleInfo.scheduleId}`,
        queryFn: () => getScheduleLogs(scheduleInfo.scheduleId),
        enabled: !!scheduleInfo.scheduleId,
        onError: (error) => {
            toast.error(error.message)
        }
    })
         
    const filteredLogs = scheduleLogs?.filter(log => {
        return log.serverName.includes(debouncedFilterValue)
    })

    const getScheduleLogs = async (id: number | null): Promise<ScheduleLog[]> => {
        const response = await api.get('scheduleLogs')
        const filteredData = response.data.filter((log: ScheduleLog) => log.scheduleId === id)
        return filteredData
    }

    return (
        <div className="logs-wrapper" data-testid="LOG_LIST_COMPONENT">
            <div className="actions-wrapper">
                <Button
                    type='button'
                    variant="primary"
                    data-testid='ADD_BUTTON'
                    mainColor={theme.palette.blue}
                    subColor={theme.palette.white}
                    disabled={isAdding || scheduleInfo.isScheduleRetired || isLoading}
                    handleClick={() => setIsAdding(true)}
                    text="Add Entry"
                />

                <input
                    name="description"
                    type="text"
                    disabled={isLoading || scheduleInfo.isScheduleRetired || isAdding}
                    placeholder="Filter by server name"
                    value={filterValue} 
                    onChange={(event) => setFilterValue(event.target.value)}
                />
            </div>

            {isLoading ? (
                <Loader text="Loading Log Entries" />
            ) : (
                <LogsList $isListEmpty={filteredLogs?.length === 0 && !isAdding}>
                    {isAdding && (
                        <ScheduleLogCard
                            data-testid="NEW_ENTRY_CARD"
                            log={{
                                scheduleId: scheduleInfo.scheduleId!,
                                serverName: '',
                                startTime: '',
                                endTime: '',
                                status: '',
                                id: new Date().getTime()
                            }}
                            isAdding={isAdding}
                            closeAddition={() => setIsAdding(false)}
                        /> 
                    )}
                    {filteredLogs && filteredLogs.length > 0 ? filteredLogs.reverse().map(log => {
                        return (
                            <ScheduleLogCard
                                role="LIST_ITEM"
                                key={log.id} 
                                log={log}
                            />
                        )
                    }) : (
                        <>
                            {!isAdding && (
                                <div className="empty-block">
                                    <p data-testid="NO_DATA_MESSAGE">There are no log entries for this Schedule</p>
                                </div>
                            )}
                        </>
                    )}
                </LogsList>
            )}
        </div>
    )
}