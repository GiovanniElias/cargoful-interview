import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function TitleHeader() {
    return (
        <Box component="section">
            <Typography variant='h5' fontWeight={'bold'} textAlign={'left'}>Good afternoon, User</Typography>
            <Typography fontSize={'.8rem'} textAlign={'left'}>Here's your automation monitoring overview</Typography>
        </Box>
    );
}


