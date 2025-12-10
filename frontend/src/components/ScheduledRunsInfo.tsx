import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import type { ScheduledRunToday, ScheduledRunYesterday } from '../models/automations';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: (theme.vars ?? theme).palette.text.secondary,
    ...theme.applyStyles?.('dark', {
        backgroundColor: '#1A2027',
    }),
}));


let yesterdayRuns = function(run_yesterday: Array<ScheduledRunYesterday> | undefined) {
    if (run_yesterday === undefined || run_yesterday.length == 0) {
        return (
            <Item sx={{ height: '3rem' }}>No runs yesterday</Item>
        );
    } else {
        return run_yesterday.map((run) => (
            <Item sx={{ height: '3rem' }} key={run.name}>{run.name} - {run.status}</Item>
        ));
    }
}

export default function ScheduledRunsInfo({ scheduled_today, run_yesterday }: { scheduled_today: Array<ScheduledRunToday> | undefined, run_yesterday: Array<ScheduledRunYesterday> | undefined }) {

    return (
        <Grid container spacing={2} sx={{ margin: '2rem 0' }}>
            <Grid size={6}>
                {scheduled_today?.map((run) => (
                    <Item sx={{ height: '3rem' }}>{run.name} - {run.time}</Item>
                ))}
            </Grid>
            <Grid size={6}>
                {yesterdayRuns(run_yesterday)}
            </Grid>
        </Grid>

    );
}
