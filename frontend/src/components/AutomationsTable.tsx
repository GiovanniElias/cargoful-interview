// AutomationTable.tsx
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import type { AutomationGridItem } from '../models/automations';
import AutomationTableRow from './AutomationTableRow';

interface Props {
  automations: AutomationGridItem[];
  onOpenConfirmChangesModal: () => void;
  onOpenEditModal: (automation: AutomationGridItem) => void;
  setApplyChangesFunction: (
    func: ((obj: AutomationGridItem) => void) | null
  ) => void;
  setAutomationToChange: (automation: AutomationGridItem) => void;
}

export default function AutomationTable({
  automations,
  onOpenConfirmChangesModal,
  onOpenEditModal,
  setApplyChangesFunction,
  setAutomationToChange,
}: Props) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Filter automations by all displayed fields
  const filteredAutomations = automations.filter(automation => {
    const searchTerm = search.toLowerCase();

    const name = automation.name.toLowerCase();
    const status = automation.status ? 'active' : 'inactive';
    const frequency = automation.schedule.frequency.toLowerCase();
    const startDate = new Date(automation.schedule.start_date)
      .toLocaleString()
      .toLowerCase();
    const lastRunTimestamp = automation.last_run.timestamp
      ? new Date(automation.last_run.timestamp).toLocaleString().toLowerCase()
      : '';
    const lastRunStatus = automation.last_run.status ? 'Active' : 'Inactive';
    const nextRun = new Date(automation.next_run)
      .toLocaleString()
      .toLowerCase();

    return (
      name.includes(searchTerm) ||
      status.includes(searchTerm) ||
      frequency.includes(searchTerm) ||
      startDate.includes(searchTerm) ||
      lastRunTimestamp.includes(searchTerm) ||
      lastRunStatus.includes(searchTerm) ||
      nextRun.includes(searchTerm)
    );
  });

  return (
    <Box>
      {/* Header: Title + Search */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6">All Automations</Typography>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          value={search}
          onChange={handleSearchChange}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography fontSize={'small'} color="#6a6a6aff">
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={'small'} color="#6a6a6aff">
                  Status
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={'small'} color="#6a6a6aff">
                  Schedule
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={'small'} color="#6a6a6aff">
                  Last Run
                </Typography>
              </TableCell>
              <TableCell>
                <Typography fontSize={'small'} color="#6a6a6aff">
                  Next Run
                </Typography>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAutomations.map((automation, index) => (
              <AutomationTableRow
                key={index}
                automation={automation}
                setApplyChangesFunction={setApplyChangesFunction}
                setAutomationToChange={setAutomationToChange}
                onOpenConfirmChangesModal={onOpenConfirmChangesModal}
                onOpenEditModal={onOpenEditModal}
              />
            ))}
            {filteredAutomations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No automations found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
