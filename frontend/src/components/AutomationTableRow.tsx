import { TableRow, TableCell } from '@mui/material';
import UpdateAndDeleteButtonGroup from './UpdateAndDeleteButtonGroup'; 
import type { AutomationGridItem } from '../models/automations';

interface AutomationTableRowProps {
    automation: AutomationGridItem;
    onOpenConfirmChangesModal: () => void;
    setApplyChangesFunction: (func: ((obj: AutomationGridItem) => void) | null) => void;
    setAutomationToChange: (automation: AutomationGridItem) => void;
}

const AutomationTableRow = ({
    automation,
    setApplyChangesFunction,
    setAutomationToChange,
    onOpenConfirmChangesModal
}: AutomationTableRowProps) => {
    return (
        <TableRow hover>
            <TableCell>
                <b>{automation.name}</b>
            </TableCell>
            <TableCell>
                {automation.status ? 'Active' : 'Inactive'}
            </TableCell>
            <TableCell>
                {automation.schedule.frequency}
            </TableCell>
            <TableCell>
                {new Date(automation.schedule.start_date).toLocaleString()}
            </TableCell>
            <TableCell>
                {automation.last_run.timestamp
                    ? `${new Date(automation.last_run.timestamp).toLocaleString()} (${automation.last_run.status})`
                    : 'Never'
                }
            </TableCell>
            <TableCell>
                {new Date(automation.next_run).toLocaleString()}
            </TableCell>
            <TableCell>
                <UpdateAndDeleteButtonGroup 
                    automationObject={automation} 
                    setApplyChangesFunction={setApplyChangesFunction} 
                    setAutomationToChange={setAutomationToChange}
                    onOpenConfirmChangesModal={onOpenConfirmChangesModal}
                />
            </TableCell>
        </TableRow>
    );
};

export default AutomationTableRow;