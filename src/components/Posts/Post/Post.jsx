import React, {useState} from 'react'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, deletePost } from '../../../store/posts';

import { Card, CardActions, CardContent,  CardMedia, Button, Typography, Tooltip, IconButton, ButtonBase } from '@mui/material';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import CommentRoundedIcon from '@mui/icons-material/CommentRounded';
import useStyles from './styles';
import 'animate.css';

import PostMenu from './PostMenu';
import Comments from './Comments/Comments';
import PostLikes from './PostLikes';

const Post = ({post, setCurrentId, openEdit}) =>{
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('profile'))
  
  const currentUserId = (user?.result?._id || user?.result?.sub)
  const isCreator = (currentUserId === post.creator);
  const creatorName = useSelector((state)=> state.users.list.find(user=>user._id===post.creator))?.name;

  const [likes, setLikes] = useState({count: post?.likeCounter, users: post?.liked_by})
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

    const handleDelete = (e) => {
      e.stopPropagation();
      dispatch(deletePost(post._id))
      setAnchorEl(null)
    }

    const handleLike = (e) => {
      if(likes.users.find(userId => userId === currentUserId)){
        setLikes({count: likes.count-1, users: likes.users.filter(userId => userId!==currentUserId)})
      } else {
        setLikes({count: likes.count+1, users: [...likes.users, currentUserId]})
      }
      dispatch(likePost(post?._id))
    }

    const handleEdit = (e) => {
      e.stopPropagation();
      setCurrentId(post._id)
      setAnchorEl(null)
      if(openEdit) openEdit()
      else window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
    }

    const openPost = () => navigate(`/posts/${post._id}`)

  return (
      <Card className={`${classes.card} animate__animated animate__fadeIn`} elevation={6} raised sx={{bgColor: 'background.paper'}}>
      <ButtonBase className={classes.cardAction} component='span' name='openPost' onClick={openPost}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile||'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          title={post.title}
          // component="img"
        >
        <div className={classes.overlay}>
          <Typography variant='h6'>{creatorName}</Typography>
          <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
        </div>
        {(isCreator)&&(
          <div className={classes.overlay2}>
            <Tooltip title="Post settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                name='editPost'
                color='settings' 
              >
                <ExpandCircleDownIcon fontSize='medium' />
              </IconButton>
            </Tooltip>
            <PostMenu open={open} anchorEl={anchorEl} setAnchorEl={setAnchorEl} handleDelete={handleDelete} handleEdit={handleEdit} />
          </div>)}
        </CardMedia>
        
          <div className={classes.details}>
            <Typography variant='body2' color='textSecondary'>
              {post.tags.map(tag=> `#${tag} `)}
            </Typography>
          </div>
        
          <Typography className={classes.title} variant='h5' component="h2" gutterBottom>
              {post.title}
          </Typography>
        <CardContent >
        <Typography variant="body2" color="textSecondary" component="p">{post.message.split(' ').splice(0, 20).join(' ')}...</Typography>
          </CardContent>
          
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button size="medium" color='like_btn' disabled={!user?.result} 
          onClick={handleLike}>
          <PostLikes likes={likes.count} liked_by={likes.users} currentUserId={currentUserId} />
        </Button>
        <Button size="medium" color="comment" disabled={!user?.result} onClick={handleOpen}>
          {post.comments.length>0&&post.comments.length}&nbsp;
          <CommentRoundedIcon fontSize='medium' />
        </Button>
        <Comments open={openModal} handleClose={handleClose} comments={post.comments} postId={post._id} />
      </CardActions>
      </Card>
  )
}

export default Post