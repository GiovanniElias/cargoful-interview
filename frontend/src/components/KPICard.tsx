import { Card, CardContent, Typography } from "@mui/material"
import GridViewIcon from '@mui/icons-material/GridView';

export const KPICard = (data: string) => {
    return (
        <Card sx={{ minWidth: 275, margin: 2, padding: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {data}
                </Typography>
                <GridViewIcon />
            </CardContent>
        </Card>
    )
}