import React, {useEffect} from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../store/posts';

import useStyles from '../styles'

function Paginate({page}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {numberOfPages} = useSelector(state=> state.posts)

    useEffect(()=>{
      if(page) dispatch(getPosts(page));
    },[page, dispatch]);

  return (
    <Pagination 
        classes={{ ul: classes.ul }}
        count={numberOfPages}
        page={Number(page) || 1}
        variant='outlined'
        color='primary'
        // onChange={setPage}
        renderItem={(item)=>(   
            <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
        )}
    />
  )
}

export default Paginate