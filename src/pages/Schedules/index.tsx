import { useState } from 'react'
import { Container } from "./styles"
import { ScheduleList } from './components/ScheduleList'
import { LogList } from './components/LogList'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { theme } from '../../utils'

export type ScheduleInfo = {
    scheduleId: number | null;
    isScheduleRetired: boolean;
}

const SCHEDULE_INITIAL_STATE = {
    scheduleId: null,
    isScheduleRetired: false,
}

export const Schedules = () => {
    const [scheduleInfo, setScheduleInfo] = useState<ScheduleInfo>(SCHEDULE_INITIAL_STATE)
    const isMobile = useMediaQuery(theme.breakpoints.xs)

    return (
        <Container>
            <ScheduleList 
                scheduleInfo={scheduleInfo} 
                handleScheduleInfo={(info: ScheduleInfo) => setScheduleInfo(info)}
                data-testid="SCHEDULES_LIST_COMPONENT"
            />

            {scheduleInfo.scheduleId && !isMobile && (
                <LogList scheduleInfo={scheduleInfo} data-testid="LOG_LIST_COMPONENT" />
            )}
        </Container>
    )
}