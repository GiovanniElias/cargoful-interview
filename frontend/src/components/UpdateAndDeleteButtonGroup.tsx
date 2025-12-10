import Box from '@mui/material/Box';
import { Button, ButtonGroup } from '@mui/material';
import { deleteAutomation, updateAutomation } from '../api/automations';
import type { AutomationGridItem } from '../models/automations';

interface Props {
    automationObject: AutomationGridItem;
    onOpenConfirmChangesModal: () => void;
    setApplyChangesFunction: (func: ((obj: AutomationGridItem) => void) | null) => void;
    setAutomationToChange: (automation: AutomationGridItem) => void;
}


export default function UpdateAndDeleteButtonGroup({ automationObject, onOpenConfirmChangesModal, setApplyChangesFunction, setAutomationToChange }: Props) {
    const handleChanges = (automationObject: AutomationGridItem, fn:(obj: AutomationGridItem) => void) => {
    onOpenConfirmChangesModal();
    setApplyChangesFunction(() => fn);
    // You can call the updateAutomation function from the API here
    setAutomationToChange(automationObject);
}

    return (
        <Box className="base-grid" sx={{ flexGrow: 1 }}>
            <ButtonGroup variant="contained" aria-label="Basic button group">
                <Button onClick={() => handleChanges(automationObject, updateAutomation)}>Update</Button>
                <Button onClick={() => handleChanges(automationObject, deleteAutomation)}>Delete</Button>
            </ButtonGroup>
        </Box>
    );
}

