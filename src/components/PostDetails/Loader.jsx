import React from 'react'
import { Skeleton, Typography, Paper, Card, ImageList, ImageListItem } from '@mui/material'
import useStyle from './styles'

const Loader = () => {
    const classes = useStyle();

  return (
    <Paper elevation={6} sx={{padding: '20px', display: 'flex', flexDirection: 'column', borderRadius: '15px'}}>
    <div className={classes.card}> 
        <div className={classes.section}>
        <Typography variant="h3">
                <Skeleton width="60%" />
        </Typography>
        <Typography variant="h6">
                <Skeleton width="45%" />
        </Typography>
        <Typography variant="body2" sx={{mt: 3, mb: 1}}>
                <Skeleton width="88%" />
                <Skeleton width="87%" />
                <Skeleton width="86%" />
                <Skeleton width="87%" />
                <Skeleton width="86%" />
                <Skeleton width="72%" />
        </Typography>
        {/* <Typography variant="h6">
                <Skeleton width="15%" />
        </Typography> */}
        <div style={{display: 'flex', alignItems: 'center', gap: 5, marginBottom: 10, marginTop: 8}}>
            <Skeleton variant="circular" width={40} height={40} />
            <Typography variant="h6">
                    <Skeleton width="100px" />
            </Typography>
        </div>
        <Typography variant="body1" >
                <Skeleton width="20%" />
        </Typography>
        </div>
        <div className={classes.imageSection}>
            <Card sx={{borderRadius: '15px'}} elevation={0}><Skeleton variant="rectangular" width="600px" height='300px' sx={{ bgcolor: 'grey.400' }} /></Card>
            
        </div>
    </div>

    <div className={classes.section} style={{marginTop: 60}}>
        <Typography variant='h5' gutterBottom>
            <Skeleton width="20%" />
        </Typography>
        <ImageList sx={{ width: '100%', mt: 2}} cols={5} gap={10}>
            {['loadingItem1', 'loadingItem2', 'loadingItem3', 'loadingItem4', 'loadingItem5'].map(l=>(
            <ImageListItem key={l}>
                <Skeleton variant="rectangular" width="200px" height='100px' sx={{ bgcolor: 'grey.400', mb: 1 }} />
                <Typography variant='subtitle2'>
                    <Skeleton width="60%" />
                    <Skeleton width="50%" />
                </Typography>
            </ImageListItem>
            ))}    
        </ImageList>
    </div>

    </Paper>
  )
}

export default Loader