import { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControlLabel,
  Switch,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { createAutomationWithErrorHandling, updateAutomation } from '../api/automations';
import type { AutomationGridItem } from '../models/automations';

interface Props {
  open: boolean;
  onClose: () => void;
  onError?: (error: string) => void;
  onOpenConfirmChangesModal: () => void;
  setApplyChangesFunction: (func: ((obj: AutomationGridItem) => void) | null) => void;
  setAutomationToChange: (automation: AutomationGridItem) => void;
  editingAutomation?: AutomationGridItem | null;
}

export default function CreateAutomationModal({ open, onClose, onError, onOpenConfirmChangesModal, setApplyChangesFunction, setAutomationToChange, editingAutomation }: Props) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(true);
  const [frequency, setFrequency] = useState('Daily');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [errors, setErrors] = useState<string | null>(null);

  // Populate form when editing
  useEffect(() => {
    if (editingAutomation && open) {
      setName(editingAutomation.name);
      setStatus(editingAutomation.status);
      setFrequency(editingAutomation.schedule.frequency);
      setStartDate(dayjs(editingAutomation.schedule.start_date));
    } else if (!editingAutomation && open) {
      // Reset to defaults when creating new
      setName('');
      setStatus(true);
      setFrequency('Daily');
      setStartDate(dayjs());
    }
  }, [editingAutomation, open]);

  const resetForm = () => {
    setName('');
    setStatus(true);
    setFrequency('Daily');
    setStartDate(dayjs());
    setErrors(null);
    onClose();
  };

  const handleSubmit = () => {
    const automationData: AutomationGridItem = {
      id: editingAutomation?.id || '-1', // Use existing ID for updates, temporary for creates
      name,
      status,
      schedule: {
        frequency,
        start_date: startDate?.toISOString() ?? new Date().toISOString()
      },
      last_run: editingAutomation?.last_run || { timestamp: null, status: null },
      next_run: startDate?.toISOString() ?? new Date().toISOString()
    };
    setAutomationToChange(automationData);

    if (editingAutomation) {
      // Update mode - use updateAutomation function
      setApplyChangesFunction(() => updateAutomation);
    } else {
      // Create mode - use createAutomationWithErrorHandling function
      setApplyChangesFunction(() => (automation: AutomationGridItem) => 
        createAutomationWithErrorHandling(automation, { 
          setError: (error: string | null) => {
            if (onError && error) {
              onError(error);
            } else {
              setErrors(error);
            }
          },
          onFormReset: resetForm 
        })
      );
    }

    onOpenConfirmChangesModal();
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{editingAutomation ? 'Edit Automation' : 'Create New Automation'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        {errors && <Typography color="error">{errors}</Typography>}
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <FormControlLabel
          control={<Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />}
          label="Active"
        />

        <FormControl fullWidth>
          <InputLabel>Frequency</InputLabel>
          <Select value={frequency} label="Frequency" onChange={(e) => setFrequency(e.target.value)}>
            <MenuItem value="Daily">Daily</MenuItem>
            <MenuItem value="Weekly">Weekly</MenuItem>
            <MenuItem value="Monthly">Monthly</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{
              textField: { fullWidth: true }
            }}
          />
        </LocalizationProvider>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          {editingAutomation ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
