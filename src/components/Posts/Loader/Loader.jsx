import React from 'react'
import CardSpinner from './CardSpinner'
import { Grid } from '@mui/material'

function Loader() {
  return (
    <Grid container alignItems='stretch' spacing={3}>
        <Grid item xs={12} sm={12} md={6} lg={4}><CardSpinner /></Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}><CardSpinner /></Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}><CardSpinner /></Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}><CardSpinner /></Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}><CardSpinner /></Grid>
        <Grid item xs={12} sm={12} md={6} lg={4}><CardSpinner /></Grid>
    </Grid>
  )
}

export default Loader