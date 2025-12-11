import TitleHeader from './TitleHeader';
import Grid from '@mui/material/Grid';
import CreateAutomationButton from './CreateAutomationButton';

export default function Header({ onOpenModal }: { onOpenModal: () => void }) {
  return (
    <Grid
      flexDirection={'row'}
      container
      sx={{ justifyContent: 'space-between' }}
    >
      <Grid size={6}>
        <TitleHeader />
      </Grid>
      <Grid size={6} sx={{ alignSelf: 'center' }}>
        <CreateAutomationButton onOpenModal={onOpenModal}/>
      </Grid>
    </Grid>
  );
}
