import React from 'react'
import { Skeleton, Typography, Card, CardMedia, CardContent, CardActions } from '@mui/material'

function CardSpinner() {
  return (
    <Card sx={{borderRadius: '15px'}}>
        <CardMedia>
            <Skeleton variant="rectangular" width="100%" height={160} sx={{ bgcolor: 'grey.400' }} />
        </CardMedia>
        <CardContent style={{'padding': '8px 16px'}}>
            {/* <Box sx={{ pt: 0.5 }}> */}
            <Typography variant="body2">
                <Skeleton width="60%" />
            </Typography>
            <div style={{'margin': '20px 10px 15px'}}>
                <Typography variant="h5">
                    <center>
                        <Skeleton width="50%" />
                    </center>
                </Typography>
            </div>
            <Typography variant="body2">
                <Skeleton />
                <Skeleton width="80%" />
            </Typography>
            <Typography variant="body2">
                <Skeleton width="60%" />
            </Typography>
            <CardActions style={{'marginTop': '15px', 'display': 'flex', 'justifyContent': 'space-between'}}>
                <Typography variant="h3" width="20%"><Skeleton /></Typography>
                <Typography variant="h3" width="20%"><Skeleton /></Typography>
            </CardActions>
            {/* </Bosx> */}
        </CardContent>
    </Card>
  )
}

export default CardSpinner