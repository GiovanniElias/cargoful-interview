import Grid from '@mui/material/Grid';
import { KPICard } from './KPICard';
import GridViewIcon from '@mui/icons-material/GridView';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function RunsKPIsInfo({
  total_automations,
  active_schedules,
  success_rate,
}: {
  total_automations: number | undefined;
  active_schedules: number | undefined;
  success_rate: string | undefined;
}) {
  return (
    <Grid container spacing={2} sx={{ margin: '2rem 0' }}>
      <Grid size={4}>
        <KPICard
          data={total_automations?.toString()}
          label="Total Automations"
          icon={<GridViewIcon fontSize="large" />}
        />
      </Grid>
      <Grid size={4}>
        <KPICard
          data={active_schedules?.toString()}
          label="Active Schedules"
          icon={<ElectricBoltIcon fontSize="large" color="secondary" />}
        />
      </Grid>
      <Grid size={4}>
        <KPICard
          data={success_rate}
          label="Success Rate"
          icon={<CheckCircleOutlineIcon fontSize="large" color="success" />}
        />
      </Grid>
    </Grid>
  );
}
