import Box from '@mui/material/Box';
import Header from './Header';
// import CreateAutomationModal from './CreateAutomationModal';
// import RunsKPIsInfo from './RunsKPIsInfo';
// import ScheduledRunsInfo from './ScheduledRunsInfo';
import type { AutomationGridItem, KPIData, ScheduledRuns } from '../models/automations';
import RunsKPIsInfo from './RunsKPIsInfo';
import ScheduledRunsInfo from './ScheduledRunsInfo';
import AutomationsTable from './AutomationsTable';
// import AutomationsTable from './AutomationsTable';

interface BaseGridProps {
    allAutomations: AutomationGridItem[];
    kpi: KPIData | null;
    scheduledRuns: ScheduledRuns | null;
    onOpenCreateModal: () => void;
    onOpenConfirmChangesModal: () => void;
    setApplyChangesFunction: (func: ((obj: AutomationGridItem) => void) | null) => void;
    setAutomationToChange: (automation: AutomationGridItem) => void;
}

export default function BaseGrid({
    allAutomations,
    kpi,
    scheduledRuns,
    onOpenCreateModal,
    onOpenConfirmChangesModal,
    setApplyChangesFunction,
    setAutomationToChange
}: BaseGridProps) {

    return (
        <Box className="base-grid" sx={{ flexGrow: 1 }}>
            <Header onOpenModal={onOpenCreateModal} />
            <RunsKPIsInfo
                total_automations={kpi?.total_number_of_automations}
                active_schedules={kpi?.active_schedules}
                success_rate={kpi?.success_rate} />
            <ScheduledRunsInfo scheduled_today={scheduledRuns?.today} run_yesterday={scheduledRuns?.yesterday} />
            <AutomationsTable automations={allAutomations} setApplyChangesFunction={setApplyChangesFunction} setAutomationToChange={setAutomationToChange} onOpenConfirmChangesModal={onOpenConfirmChangesModal} />
        </Box>
    );
}
