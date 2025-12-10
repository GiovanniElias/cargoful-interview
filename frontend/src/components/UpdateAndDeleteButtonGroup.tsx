import Box from '@mui/material/Box';
import { Button, ButtonGroup } from '@mui/material';
import { deleteAutomation } from '../api/automations';
import type { AutomationGridItem } from '../models/automations';

interface Props {
    automationObject: AutomationGridItem;
    onOpenConfirmChangesModal: () => void;
    onOpenEditModal: (automation: AutomationGridItem) => void;
    setApplyChangesFunction: (func: ((obj: AutomationGridItem) => void) | null) => void;
    setAutomationToChange: (automation: AutomationGridItem) => void;
}


export default function UpdateAndDeleteButtonGroup({ automationObject, onOpenConfirmChangesModal, onOpenEditModal, setApplyChangesFunction, setAutomationToChange }: Props) {
    const handleDelete = (automationObject: AutomationGridItem, fn:(obj: AutomationGridItem) => void) => {
    onOpenConfirmChangesModal();
    setApplyChangesFunction(() => fn);
    setAutomationToChange(automationObject);
}

    const handleUpdate = (automationObject: AutomationGridItem) => {
        onOpenEditModal(automationObject);
    }

    return (
        <Box className="base-grid" sx={{ flexGrow: 1 }}>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button onClick={() => handleUpdate(automationObject)}>Update</Button>
                <Button onClick={() => handleDelete(automationObject, deleteAutomation)}>Delete</Button>
            </ButtonGroup>
        </Box>
    );
}

