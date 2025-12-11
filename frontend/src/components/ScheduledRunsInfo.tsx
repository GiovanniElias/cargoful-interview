import Grid from '@mui/material/Grid';
import type {
  ScheduledRunToday,
  ScheduledRunYesterday,
} from '../models/automations';
import { ScheduledRunsCard } from './ScheduledRunsCard';

export default function ScheduledRunsInfo({
  scheduled_today,
  run_yesterday,
}: {
  scheduled_today: Array<ScheduledRunToday> | undefined;
  run_yesterday: Array<ScheduledRunYesterday> | undefined;
}) {
  return (
    <Grid container spacing={2} sx={{ margin: '2rem 0' }}>
      <Grid size={6}>
        <ScheduledRunsCard
          data={scheduled_today}
          label="Today's Schedule"
          icon={undefined}
        />
      </Grid>
      <Grid size={6}>
        <ScheduledRunsCard
          data={run_yesterday}
          label="Yesterday's Schedule"
          icon={undefined}
        />
      </Grid>
    </Grid>
  );
}
