import { useState } from 'react'
import { theme } from "../../../utils"
import { Button } from "../../../components/Button"
import { api } from "../../../server/api"
import { useQuery } from 'react-query'
import { Schedule } from '../../../types/schedules'
import { ScheduleCard } from '../components/ScheduleCard'
import { CardNewSchedule } from '../components/CardNewSchedule'
import { ScheduleInfo } from '..'
import { toast } from 'react-toastify'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { Loader } from '../../../components/Loader'

type ScheduleListProps = {
    scheduleInfo: ScheduleInfo
    handleScheduleInfo: (info: ScheduleInfo) => void
}

export const ScheduleList = ({ scheduleInfo, handleScheduleInfo }: ScheduleListProps) => {
    const [filterValue, setFilterValue] = useState('')
    const [isAdding, setIsAdding] = useState(false)
    const debouncedFilterValue = useDebouncedValue<string>(filterValue)
    
    const getAllSchedules = async () => {
        const response = await api.get('schedules')
        return response.data
    }

    const { data: schedules, isLoading } = useQuery<Schedule[], Error>({
        queryKey: 'schedules',
        queryFn: getAllSchedules,
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const filteredSchedules = schedules?.filter(schedule => {
        return (schedule.name.includes(debouncedFilterValue) || schedule.description.includes(debouncedFilterValue))
    })

    return (
        <div className="schedules-wrapper" data-testid="SCHEDULE_LIST_COMPONENT"> 
            <div className="actions-wrapper">
                <Button
                    type='button'
                    variant="primary"
                    data-testid='ADD_SCHEDULE_BUTTON'
                    mainColor={theme.palette.blue}
                    subColor={theme.palette.white}
                    disabled={isAdding || isLoading}
                    handleClick={() => setIsAdding(true)}
                    text="Add Schedule"
                />

                <input
                    name="description"
                    type="text"
                    disabled={isLoading || isAdding}
                    placeholder="Filter by name or description"
                    value={filterValue} 
                    onChange={(event) => setFilterValue(event.target.value)}
                />
            </div>
            {isLoading ? (
                <Loader text="Loading available schedules" />
            ) : (
                <div className="schedule-list">
                    {isAdding && (
                        <CardNewSchedule closeAddition={() => setIsAdding(false)} data-testid="NEW_SCHEDULE_CARD"/> 
                    )}
                    {filteredSchedules && filteredSchedules.length > 0 ? filteredSchedules.reverse().map(schedule => {
                        return (
                            <ScheduleCard
                                role="LIST_ITEM"
                                key={schedule.id}
                                schedule={schedule}
                                showingLogs={scheduleInfo.scheduleId === schedule.id}
                                handleOnUpdate={(updatedInfo: ScheduleInfo) => handleScheduleInfo(updatedInfo)}
                                handleShowLogs={() => {
                                    if (scheduleInfo.scheduleId === schedule.id) {
                                        handleScheduleInfo({ scheduleId: null, isScheduleRetired: false })
                                    } else {
                                        handleScheduleInfo({ scheduleId: schedule.id, isScheduleRetired: schedule.isRetired })
                                    }
                                }}
                            />
                        )
                    }) : (
                        <>
                            {!isAdding && (
                                <div className="empty-block">
                                    <p data-testid="NO_DATA_MESSAGE">There are no available schedules</p>
                                </div>
                            )}
                        </>
                    )}    
                </div>
            )}
        </div>
    )
}