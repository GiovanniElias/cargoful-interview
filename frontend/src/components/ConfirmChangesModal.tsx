import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import type { AutomationGridItem } from '../models/automations';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  applyChangesFunction: (obj: AutomationGridItem) => void;
  automationToChange: AutomationGridItem;
}

export default function ConfirmChangesModal({ open, onClose, onSuccess, applyChangesFunction, automationToChange }: Props) {
  const handleConfirm = async () => {
    try {
      await applyChangesFunction(automationToChange);
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error applying changes:', error);
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Confirm changes</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            
        <Typography>Are you sure you want to apply the changes?</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button variant="contained" onClick={handleConfirm}>
          'Yes'
        </Button>
      </DialogActions>
    </Dialog>
  );
}
