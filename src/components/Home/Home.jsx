import React, {useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { getPostsBySearch } from '../../store/posts'
import { getUsers } from '../../store/users'
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input'

import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Posts/Pagination';
import useStyles from './styles'



function Home() {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') || 1;
  const searchQuery = searchParams.get('searchQuery');
  const tagsQuery = searchParams.get('tags');
  const postsRef = useRef(null);

    
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState((searchQuery!=='none' && searchQuery) ? searchQuery:'');
  const [tags, setTags] = useState(tagsQuery?tagsQuery.split(',') :[])

    const searchPost = async () => {
      if(search.trim() || tags.length){
        postsRef?.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        dispatch(getPostsBySearch({search, tags: tags.join(',')}))
        navigate(`/posts/search?searchQuery=${search||'none'}&tags=${tags.join(',')}`)
      } else {
        navigate('/')
      }
    }

    
    useEffect(()=> {
      const fetchUsers = async () => {
        await dispatch(getUsers());
      }
      fetchUsers();
      if (searchQuery && fetchUsers) searchPost();
      // eslint-disable-next-line
    }, [dispatch, searchQuery])


    const handleKeyDown = (e) => {
      if (e.key ==='Enter'){
        searchPost();
      }
    }

  return (
    <Grow in >
        <Container maxWidth='xl'>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
              <Grid ref={postsRef} item xs={12} md={9} sm={6}>
                  <Posts setCurrentId={setCurrentId}/>
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                  <AppBar 
                    className={classes.AppBarSearch} 
                    position='static' 
                    color='inherit'> 
                    <TextField 
                      name='search' 
                      variant='outlined' 
                      label="Search Memories" 
                      fullWidth
                      value={search}
                      onChange={({target})=>setSearch(target.value)}
                      onKeyDown={handleKeyDown}
                    ></TextField>
                    <MuiChipsInput style={{margin:'10px 0'}} label='Search Tags' value={tags} onChange={(newTag)=>setTags(newTag)} /> 
                    <Button onClick={searchPost} className={classes.searchButton} color='secondary' variant='contained'>Search</Button>
                  </AppBar>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                  {(!search)&&(!tags.length)&&(
                    <Paper className={classes.pagination} elevation={6}>
                      <Pagination page={page} />
                    </Paper>
                  )}
                  
              </Grid> 
            </Grid>
        </Container>
    </Grow>
  )
}

export default Home