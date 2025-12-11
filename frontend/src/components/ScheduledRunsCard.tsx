import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import type {
  ScheduledRunToday,
  ScheduledRunYesterday,
} from '../models/automations';
import { ScheduledRunsRow } from './ScheduledRunsRow';

type KPICardProps = {
  data?: Array<ScheduledRunToday> | Array<ScheduledRunYesterday> | undefined;
  label?: string;
  icon?: React.ReactNode;
  yesterday?: boolean; // a bit dirty but needed to distinguish between the two types
};

export const ScheduledRunsCard = ({ data, label, yesterday }: KPICardProps) => {
  return (
    <Card sx={{ minWidth: 275, height: 250 }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Grid container spacing={2} flexDirection={'column'} gap={0}>
          <Grid size={12}>
            <Typography
              variant="h6"
              component="div"
              fontSize={'0.8rem'}
              fontWeight={'bold'}
              textAlign={'left'}
              margin={'.5rem 0'}
            >
              {label}
            </Typography>
            <Box
              sx={{
                maxHeight: '180px',
                overflowY: 'auto',
                padding: '0 0.5rem 0.5rem 0.5rem',
              }}
            >
              {data?.map((run, index) =>
                yesterday ? (
                  <ScheduledRunsRow
                    key={index}
                    name={run.name}
                    info={(run as ScheduledRunYesterday).status}
                  />
                ) : (
                  <ScheduledRunsRow
                    key={index}
                    name={run.name}
                    info={(run as ScheduledRunToday).time}
                  />
                )
              )}
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
