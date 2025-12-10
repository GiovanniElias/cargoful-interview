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
import UpdateAndDeleteButtonGroup from './UpdateAndDeleteButtonGroup';

interface Props {
    automations: AutomationGridItem[];
    onOpenConfirmChangesModal: () => void;
    setApplyChangesFunction: (func: ((obj: AutomationGridItem) => void) | null) => void;
    setAutomationToChange: (automation: AutomationGridItem) => void;
}

export default function AutomationTable({ 
    automations, 
    onOpenConfirmChangesModal,
    setApplyChangesFunction, 
    setAutomationToChange 
}: Props) {
    const [search, setSearch] = useState('');

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    // Filter automations by all displayed fields
    const filteredAutomations = automations.filter((automation) => {
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
                <Typography variant="h6">
                    All Automations
                </Typography>
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
                            <TableCell>Name</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Frequency</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>Last Run</TableCell>
                            <TableCell>Next Run</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredAutomations.map((automation, index) => (
                            <TableRow key={index}>
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
