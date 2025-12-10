import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


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
export default function RunsKPIsInfo({total_automations, active_schedules, success_rate}: {total_automations: number | undefined, active_schedules: number | undefined, success_rate: string | undefined}) {

    return (
        <Grid container spacing={2} sx={{ margin: '2rem 0' }}>
            <Grid size={4}>
                <Item sx={{ height: '3rem' }}>{total_automations}</Item>
            </Grid>
            <Grid size={4}>
                <Item sx={{ height: '3rem' }}>{active_schedules}</Item>
            </Grid>
            <Grid size={4}>
                <Item sx={{ height: '3rem' }}>{success_rate}</Item>
            </Grid>
        </Grid>
    );
}


