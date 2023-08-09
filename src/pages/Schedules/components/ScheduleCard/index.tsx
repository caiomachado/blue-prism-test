import { useState, HTMLAttributes } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Schedule } from '../../../../types/schedules'
import { Container } from './styles'
import { FiTrash2 } from 'react-icons/fi'
import { api } from '../../../../server/api'
import { Button } from '../../../../components/Button'
import { theme } from '../../../../utils'
import { ConfirmAction } from '../../../../components/ConfirmAction'
import { ScheduleInfo } from '../../../Schedules'
import { toast } from 'react-toastify'
import { useMediaQuery } from '../../../../hooks/useMediaQuery'
import { LogList } from '../LogList'

type ScheduleCardProps = {
    schedule: Schedule
    handleShowLogs: () => void
    showingLogs: boolean
    handleOnUpdate: (info: ScheduleInfo) => void
} & HTMLAttributes<HTMLDivElement>

export const ScheduleCard = ({ schedule, handleShowLogs, showingLogs, handleOnUpdate }: ScheduleCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const queryClient = useQueryClient()
    const isMobile = useMediaQuery(theme.breakpoints.xs)

    const { mutate: updateSchedule } = useMutation<Schedule, Error, Schedule>({
        mutationFn: async (updatedSchedule: Schedule): Promise<Schedule> => {
            const response = await api.put(`schedules/${schedule.id}`, updatedSchedule)
            handleOnUpdate({ scheduleId: updatedSchedule.id, isScheduleRetired: updatedSchedule.isRetired })
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['schedules'])
            toast.success(`Schedule ${data.id} has successfully been updated.`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    
    const { mutate: deleteSchedule } = useMutation<void, Error>({
        mutationFn: async (): Promise<void> => {
            return await api.delete(`schedules/${schedule.id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['schedules'])
            toast.success(`Schedule has successfully been deleted.`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return (
        <Container $isRetired={schedule.isRetired}>
            <div className={showingLogs ? 'selected card' : 'card'} data-testid="SCHEDULE_CARD">
                <div className="header">
                    <div className="header-actions">
                        <FiTrash2 size={24} onClick={() => setIsDeleting(true)} className="icon" data-testid="DELETE_ICON" />
                        <div className="checkbox-wrapper">
                            <input 
                                type="checkbox"
                                id={`${schedule.id}`}
                                checked={showingLogs}
                                onChange={handleShowLogs} 
                            />
                            <label htmlFor={`${schedule.id}`}>
                                {showingLogs ? 'Hide logs' : 'Show logs'}
                            </label>
                        </div>
                    </div>
                    <h3>{schedule.name}</h3>
                </div>
                <div className="content">
                    <p>{schedule.description}</p>
                </div>
                <div className="action-wrapper">
                    <Button
                        type='button'
                        data-testid='RETIRE_BUTTON'
                        variant={schedule.isRetired ? 'secondary' : 'primary'}
                        mainColor={theme.palette.blue}
                        subColor={theme.palette.white}
                        handleClick={() => {
                            const payload = {
                                ...schedule,
                                isRetired: schedule.isRetired ? false : true
                            }
                            updateSchedule(payload)
                        }}
                        text={schedule.isRetired ? 'Unretire' : 'Retire'}
                    /> 
                </div>
                {isDeleting && (
                    <ConfirmAction 
                        title="Are you sure you want to delete this Schedule?"
                        primaryButtonAction={() => deleteSchedule()}
                        secondaryButtonAction={() => setIsDeleting(false)}
                    />
                )}
            </div>
            {isMobile && showingLogs && (
                <LogList 
                    scheduleInfo={{ scheduleId: schedule.id, isScheduleRetired: schedule.isRetired }}
                />
            )}
        </Container>
    )
}