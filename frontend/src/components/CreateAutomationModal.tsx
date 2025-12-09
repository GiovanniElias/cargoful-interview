// components/CreateAutomationModal.tsx
import { useState } from 'react';
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
  Typography
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void; // optional callback to refresh parent state
}

export default function CreateAutomationModal({ open, onClose, onSuccess }: Props) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(true);
  const [frequency, setFrequency] = useState('Daily');
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Automation</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>

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
        <Button variant="contained" onClick={() => {}} disabled={false}>
          {'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
