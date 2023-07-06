import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, getPostsBySearch } from '../../store/posts';
import { getUsers } from '../../store/users';
import moment from 'moment';
import { Avatar, Paper, Typography, Divider, ImageList, ImageListItem, ImageListItemBar, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Loader from './Loader'; 
import CommentSection from './CommentSection';

import useStyles from './styles';

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const theme = useTheme();

  const isBelowSm = useMediaQuery(theme.breakpoints.between("xs", "sm"));
  const isSmAndUp = useMediaQuery(theme.breakpoints.up("sm"));

  const {list: posts, post, loading} = useSelector(state => state.posts)
  const creator = useSelector((state)=> state.users.list.find(user=>user._id===post?.creator));
  const creatorName = creator?.name
  // const post = useSelector(state => state.posts.list).find(post => post._id === id)

  useEffect(()=>{ 
    dispatch(getPost(id))
    dispatch(getUsers())
  },[dispatch, id])

  useEffect(()=>{
    if(post) dispatch(getPostsBySearch({search: 'none', tags: post?.tags?.join(',')}))
  },[dispatch, post])

  const openPost = (_id) => navigate(`/posts/${_id}`)

  const recommendedPosts = posts?.filter(post =>post._id !== id);

  if(!post) return null;
  if(loading) return <Loader />
  
  return (
    <Paper style={{padding: '20px', borderRadius: '15px', marginBottom: '30px'}} elevation={6}>
      <div className={classes.card}> 
        <div className={classes.section}>
          <Typography variant="h3" component="h2" style={{fontSize: isSmAndUp ? "3rem" : "2rem", }}>{post?.title}</Typography>

          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post?.message}
          </Typography>
          <Typography variant="h6" sx={{mt: 2}}>Created by: </Typography>
          <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={()=>navigate(`/profile/${post?.creator}`)}>
          <Avatar src={creator?.picture} sx={{mt: 1, mb: 1, border: '1px solid #FFC300'}} >{creator?.name.charAt(0)}</Avatar>
          <Typography variant="h6" color='userName' sx={{ml: 1}}>
          {creatorName}
          </Typography>
          </div>
          <Typography variant="body1">
            {moment(post?.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
      {/* RECOMMENDED POSTS */}
      {recommendedPosts?.length ? (
        <div className={classes.section}>
          <Typography variant='h5' gutterBottom>You might also like:</Typography>
          <Divider />
          <ImageList sx={{ width: '100%', height: 340 }} cols={isBelowSm ? 1 :
        isSmAndUp ? 4 : 2} gap={22}>
            {recommendedPosts.map(({title, message, name, likeCounter, selectedFile, _id})=> (
              <ImageListItem key={_id} style={{cursor: 'pointer'}} onClick={()=> openPost(_id)}>
                <img
                  src={selectedFile}
                  alt={title}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={title}
                  subtitle={<span>by: {name}</span>}
                  position="below"
                />
                  <Typography variant='subtitle2' color='textSecondary' gutterBottom>{message.slice(0, 85)}...</Typography>
                  <Typography variant='subtitle2' gutterBottom>Likes: {likeCounter}</Typography>
              </ImageListItem>
            ))}
          </ImageList>
        </div>
      ): ''}
    </Paper>
  )
}
    
  


export default PostDetails