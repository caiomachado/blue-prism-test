import { useState, FormEvent, useRef, HTMLAttributes } from 'react'
import { ScheduleLog } from "../../../../types/schedules"
import { Container } from "./styles"
import { Button } from "../../../../components/Button"
import { dateFormatter, theme } from "../../../../utils"
import { ConfirmAction } from '../../../../components/ConfirmAction'
import { useMutation, useQueryClient } from 'react-query'
import { api } from '../../../../server/api'
import { Loader } from '../../../../components/Loader'
import { FaRunning } from 'react-icons/fa'
import { MdPending } from 'react-icons/md'
import { AiOutlineException, AiOutlineFileDone } from 'react-icons/ai'
import { LuCalendarOff } from 'react-icons/lu'
import { toast } from 'react-toastify'

type ScheduleLogCardProps = {
    log: ScheduleLog
    isAdding?: boolean
    closeAddition?: () => void
} & HTMLAttributes<HTMLDivElement>

type FormDataValues = Pick<ScheduleLog, 'endTime' | 'startTime' | 'status' | 'serverName'>

export const ScheduleLogCard = ({ log, isAdding, closeAddition }: ScheduleLogCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const queryClient = useQueryClient()
    const formRef = useRef<HTMLFormElement | null>(null)

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData) as FormDataValues
        const payload = {
            ...log,
            ...data,
            startTime: new Date(data.startTime).toISOString(),
            endTime: new Date(data.endTime).toISOString()
        }
        if (isAdding) {
            createScheduleLog(payload)
        } else {
            updateScheduleLog(payload)
        }
    }

    const { mutate: deleteScheduleLog } = useMutation<void, Error>({
        mutationFn: async (): Promise<void> => {
            return await api.delete(`scheduleLogs/${log.id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`schedule-${log.scheduleId}`])
            toast.success(`Log entry has successfully been deleted.`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
    
    const { mutate: updateScheduleLog, isLoading: isUpdateLoading } = useMutation<ScheduleLog, Error, ScheduleLog>({
        mutationFn: async (updatedScheduleLog: ScheduleLog): Promise<ScheduleLog> => {
            const response = await api.put(`scheduleLogs/${log.id}`, updatedScheduleLog)
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries([`schedule-${log.scheduleId}`])
            setIsEditing(false)
            formRef?.current?.reset()
            toast.success(`Log entry ${data.id} has successfully been updated.`)
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })
   
    const { mutate: createScheduleLog } = useMutation<ScheduleLog, Error, ScheduleLog>({
        mutationFn: async (newScheduleLog: ScheduleLog): Promise<ScheduleLog> => {
            const response = await api.post('scheduleLogs', newScheduleLog)
            return response.data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries([`schedule-${log.scheduleId}`])
            formRef?.current?.reset()
            toast.success(`A new log entry has successfully been created for Schedule ${data.scheduleId}.`)
            if (closeAddition) closeAddition()
        },
        onError: (error) => {
            toast.error(error.message)
        }
    })

    const getStatusIcon = (statusName: string) => {
        switch (statusName) {
            case 'Completed':
                return <AiOutlineFileDone size={20} color={theme.palette.green } />;
            case 'Running':
                return <FaRunning size={20} color={theme.palette.green } />;
            case 'Terminated':
                return <LuCalendarOff size={20} color={theme.palette.green } />;
            case 'Exception':
                return <AiOutlineException size={20} color={theme.palette.green } />;
            case 'Pending':
                return <MdPending size={20} color={theme.palette.green } />;
            default:
                break;
        }
    }

    return (
        <Container $isEditing={isAdding ? isAdding : isEditing} data-testid="LOG_CARD">
            <div className="front-face">
                <div className="header">
                    <h3 data-testid="LOG_STATUS_NAME">{log.status}</h3>
                    {getStatusIcon(log.status)}
                </div>
                <div className="log-content">
                    <p>{log.serverName}</p>
                    <p>{dateFormatter(log.startTime)} - {dateFormatter(log.endTime)}</p>
                </div>
                <div className="action-wrapper">
                    <Button
                        type='button'
                        variant="secondary"
                        data-testid='DELETE_BUTTON'
                        mainColor={theme.palette.danger}
                        subColor={theme.palette.white}
                        handleClick={() => {
                            if (isEditing) {
                                setIsEditing(false)
                            } else {
                                setIsDeleting(true)
                            }
                        }}
                        text="Delete"
                    /> 
                    <Button
                        type='button'
                        variant="primary"
                        data-testid='EDIT_BUTTON'
                        mainColor={theme.palette.blue}
                        subColor={theme.palette.white}
                        handleClick={() => {
                            if (isEditing) {
                                setIsEditing(false)
                            } else {
                                setIsEditing(true)
                            }
                        }}
                        text="Edit"
                    />
                </div>
                {isDeleting && (
                    <ConfirmAction 
                        title="Are you sure you want to delete this Log?"
                        primaryButtonAction={() => deleteScheduleLog()}
                        secondaryButtonAction={() => setIsDeleting(false)}
                    />
                )}
            </div>
            {(isEditing || isAdding) && (
                <form className="back-face" onSubmit={handleSubmit} ref={formRef} data-testid="EDIT_LOG_FORM">
                    <div className="form-content">
                        <select name="status" required defaultValue={log.status} data-testid="STATUS_INPUT">
                            <option value="" disabled>Select an option</option>
                            <option value="Completed">Completed</option>
                            <option value="Exception">Exception</option>
                            <option value="Pending">Pending</option>
                            <option value="Terminated">Terminated</option>
                            <option value="Running">Running</option>
                        </select>
                        <div className="input-block">
                            <label htmlFor="serverName">Server Name</label>
                            <input type="text" placeholder="Server Name" defaultValue={log.serverName} name="serverName" id="serverName" maxLength={40} required data-testid="SERVER_NAME_INPUT" />
                        </div>
                        <div className="input-block">
                            <label htmlFor="startTime">Start Time</label>
                            <input type="date" defaultValue={log.startTime.split('T')[0]} name="startTime" id="startTime" required data-testid="START_TIME_INPUT" />
                        </div>
                        <div className="input-block">
                            <label htmlFor="endTime">End Time</label>
                            <input type="date" defaultValue={log.endTime.split('T')[0]} name="endTime" id="endTime" required data-testid="END_TIME_INPUT" />
                        </div>
                    </div>
                    <div className="form-actions">
                        <Button
                            type='button'
                            variant="secondary"
                            data-testid='CANCEL_EDIT'
                            mainColor={theme.palette.blue}
                            subColor={theme.palette.white}
                            handleClick={() => {
                                if (isAdding) {
                                    closeAddition && closeAddition()
                                } else {
                                    if (isEditing) {
                                        formRef?.current?.reset()
                                        setIsEditing(false)
                                    } else {
                                        setIsDeleting(true)
                                    }
                                }
                            }}
                            text="Cancel"
                        /> 
                        <Button
                            type='submit'
                            variant="primary"
                            data-testid='SAVE_EDIT'
                            mainColor={theme.palette.blue}
                            subColor={theme.palette.white}
                            disabled={isUpdateLoading}
                            text={isUpdateLoading ? <Loader /> : isAdding ? "Create" : "Save"}
                        />
                    </div>
                </form>
            )}
        </Container>
    )
}