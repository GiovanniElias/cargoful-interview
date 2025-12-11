import { Card, CardContent, Grid, Typography } from '@mui/material';

type KPICardProps = {
  data?: string;
  label?: string;
  icon?: React.ReactNode;
};

export const KPICard = ({ data, label, icon }: KPICardProps) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {icon}
        <Grid container spacing={2} flexDirection={'column'} gap={0}>
          <Typography variant="subtitle1" component="div" fontSize={12}>
            {label}
          </Typography>
          <Typography
            variant="h5"
            component="div"
            fontSize={'1.5rem'}
            fontWeight={'bold'}
          >
            {data}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
};
