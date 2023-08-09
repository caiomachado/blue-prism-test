import { useRef, FormEvent } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { Schedule } from '../../../types/schedules'
import { Container } from './ScheduleCard/styles'
import { api } from '../../../server/api'
import { Button } from '../../../components/Button'
import { theme } from '../../../utils'
import { Loader } from '../../../components/Loader'
import { toast } from 'react-toastify'

type ScheduleCardProps = {
    closeAddition: () => void
}

type FormDataValues = Omit<Schedule, 'id' | 'dayOfWeek' | 'dayOfMonth'>

export const CardNewSchedule = ({ closeAddition }: ScheduleCardProps) => {
    const queryClient = useQueryClient()
    const formRef = useRef<HTMLFormElement | null>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData) as unknown as FormDataValues

        const payload = {
            id: new Date().getTime(),
            name: data.name,
            description: data.description,
            isRetired: data.isRetired,
            tasksCount: data.tasksCount,
            startPoint: new Date(data.startPoint).toISOString(),
            endPoint: new Date(data.endPoint).toISOString(),
            dayOfWeek: new Date(data.startDate).getDay(),
            dayOfMonth: new Date(data.startDate).getDate(),
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
            intervalType: data.intervalType,
            timePeriod: data.timePeriod,
        }
 
        createSchedule(payload)
    }

    const { mutate: createSchedule, isLoading } = useMutation<Schedule, Error, Schedule>({
        mutationFn: async (newSchedule: Schedule): Promise<Schedule> => {
            const response = await api.post('schedules', newSchedule)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['schedules'])
            formRef?.current?.reset()
            closeAddition()
            toast.success(`Schedule has successfully been created.`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    return (
        <Container $isRetired={false} data-testid="NEW_CARD_SCHEDULE">
            <div className="card">
                <form onSubmit={handleSubmit} ref={formRef}>
                    <div className="form-content">
                        <div className="input-block">
                            <label htmlFor="intervalType">Interval Type</label>
                            <select name="intervalType" required>
                                <option value="" disabled>Select an option</option>
                                <option value="Year">Year</option>
                                <option value="Month">Month</option>
                                <option value="Week">Week</option>
                                <option value="Day">Day</option>
                                <option value="Hour">Hour</option>
                                <option value="Minute">Minute</option>
                                <option value="Second">Second</option>
                                <option value="Once">Once</option>
                                <option value="Never">Never</option>
                            </select>
                        </div>
                        <div className="input-block">
                            <label htmlFor="name">Name</label>
                            <input type="text" placeholder="Name" name="name" id="name" required />
                        </div>
                        <div className="input-block">
                            <label htmlFor="description">Description</label>
                            <input type="text" placeholder="Description" name="description" id="description" required />
                        </div>
                        <div className="row-group">
                            <div className="input-block">
                                <label htmlFor="startDate">Start Date</label>
                                <input type="date" name="startDate" id="startDate" required />
                            </div>
                            <div className="input-block">
                                <label htmlFor="endDate">End Date</label>
                                <input type="date" name="endDate" id="endDate" required />
                            </div>
                        </div>
                        <div className="row-group">
                            <div className="input-block">
                                <label htmlFor="startPoint">Start Point</label>
                                <input type="date" name="startPoint" id="startPoint" required />
                            </div>
                            <div className="input-block">
                                <label htmlFor="endPoint">End Point</label>
                                <input type="date" name="endPoint" id="endPoint" required />
                            </div>
                        </div>
                        <div className="checkbox-wrapper">
                            <input 
                                type="checkbox"
                                id="isRetired"
                                name="isRetired"
                            />
                            <label htmlFor="isRetired">Retired</label>
                        </div>
                        <div className="row-group">
                            <div className="input-block">
                                <label htmlFor="timePeriod">Time Period</label>
                                <input type="number" name="timePeriod" id="timePeriod" required />
                            </div>
                            <div className="input-block">
                                <label htmlFor="tasksCount">Tasks Count</label>
                                <input type="number" name="tasksCount" id="tasksCount" required />
                            </div>
                        </div>
                    </div>
                    <div className="form-actions">
                        <Button
                            type='button'
                            variant="secondary"
                            data-testid='CANCEL_BUTTON'
                            mainColor={theme.palette.blue}
                            subColor={theme.palette.white}
                            handleClick={closeAddition}
                            text="Cancel"
                        /> 
                        <Button
                            type='submit'
                            variant="primary"
                            data-testid='CREATE_BUTTON'
                            mainColor={theme.palette.blue}
                            subColor={theme.palette.white}
                            disabled={isLoading}
                            text={isLoading ? <Loader /> : "Create"}
                        />
                    </div>
                </form>
            </div>
        </Container>
    )
}