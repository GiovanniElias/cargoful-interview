import Grid from '@mui/material/Grid';
import { Button, Typography } from '@mui/material';
import { createSvgIcon } from '@mui/material/utils';

const PlusIcon = createSvgIcon(
  // credit: plus icon from https://heroicons.com
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />
  </svg>,
  'Plus'
);

export default function CreateAutomationButton({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  return (
    <Grid
      flexDirection={'row'}
      container
      sx={{ justifyContent: 'space-between' }}
    >
      <Button
        variant="contained"
        sx={{ float: 'right', bgcolor: 'black', ml: 'auto' }}
        startIcon={<PlusIcon />}
        onClick={onOpenModal}
      >
        <Typography fontSize={'0.8rem'} textTransform={'none'}>
          Create automation
        </Typography>
      </Button>
    </Grid>
  );
}
