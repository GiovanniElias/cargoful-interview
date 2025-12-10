import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import Header from './Header';
import { useState } from 'react';
// import CreateAutomationModal from './CreateAutomationModal';
// import RunsKPIsInfo from './RunsKPIsInfo';
// import ScheduledRunsInfo from './ScheduledRunsInfo';
import type { AutomationGridItem, KPIData, ScheduledRuns } from '../models/automations';
import RunsKPIsInfo from './RunsKPIsInfo';
// import AutomationsTable from './AutomationsTable';

interface BaseGridProps {
    allAutomations: AutomationGridItem[];
    kpi: KPIData | null;
    scheduledRuns: ScheduledRuns | null;
    loading: boolean;
    onOpenCreateModal: () => void;
}

export default function BaseGrid({
    allAutomations,
    kpi,
    scheduledRuns,
    loading,
    onOpenCreateModal,
}: BaseGridProps) {
    const [openModal, setOpenModal] = useState(false);

    return (
        <Box className="base-grid" sx={{ flexGrow: 1 }}>
            <Header onOpenModal={onOpenCreateModal} />
            <RunsKPIsInfo
                total_automations={kpi?.total_number_of_automations}
                active_schedules={kpi?.active_schedules}
                success_rate={kpi?.success_rate} />
            {/* <ScheduledRunsInfo scheduled_today={scheduledRuns?.today} run_yesterday={scheduledRuns?.yesterday} />
            <AutomationsTable automations={allAutomations} />
            <CreateAutomationModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={() => {
                }}
            /> */}
        </Box>
    );
}
