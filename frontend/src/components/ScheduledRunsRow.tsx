import { Card, CardContent, Typography, Box } from '@mui/material';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

type KPICardProps = {
  name?: string;
  info?: string;
};

export const ScheduledRunsRow = ({ name, info }: KPICardProps) => {
  return (
    <Card sx={{ width: '28rem', height: '2rem', margin: '.5rem' }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          height: '100%',
          alignItems: 'center',
          backgroundColor: '#edf2fa',
          padding: '0',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 1,
            marginLeft: '1rem',
          }}
        >
          <QueryBuilderIcon fontSize="small" />
          <Typography variant="subtitle1" fontSize={12} fontWeight={'bold'}>
            {name}
          </Typography>
        </Box>

        <Typography
          variant="subtitle2"
          fontSize={'.7rem'}
          fontWeight="normal"
          sx={{ marginLeft: 'auto', marginRight: '1rem' }}
        >
          {info}
        </Typography>
      </CardContent>
    </Card>
  );
};
