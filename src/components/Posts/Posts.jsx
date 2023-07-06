import React from 'react';
import { Grid } from '@mui/material'
import { useSelector } from 'react-redux';

import Post from './Post/Post'
import Loader from './Loader/Loader';
import useStyles from './styles';


function Posts({setCurrentId}) {
  
  const { list: posts, loading }= useSelector((state)=> state.posts)

  const classes = useStyles();

  if(!posts.length && !loading) return (<h5>No Posts</h5>)
  
  return ( 
    loading? 
        <Loader />
    : 
      <Grid className={classes.container} container alignItems='stretch' spacing={3}>
        {posts?.map(post => (
          <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    
  )
}

export default Posts