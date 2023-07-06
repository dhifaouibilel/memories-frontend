import React from 'react'
import { Typography, Avatar, Button, IconButton } from '@mui/material'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Likes from './Likes';
import useStyles from '../../styles';
import moment from 'moment';

function Comment({creator, comment, onDelete, onLike}) {
    const classes = useStyles();
    const user = JSON.parse(localStorage.getItem('profile'))
    
  return (
    <div className={classes.comment}>
      <Avatar src={creator?.picture} size="lg" sx={{'mt':1, border: '1px solid #FFC300'}} >{creator?.name.charAt(0)}</Avatar>
      <div className={classes.comment_details}>
          <div className={classes.comment_creator}>
            <Typography id="modal-modal-description" color='userName' variant="p" component="h5"  sx={{'ml':2}}>
              {creator?.name}
            </Typography>
            <Typography id="modal-modal-description" variant="body2" sx={{ fontSize: '12px', color: "gray" }}>
              {moment(comment?.createdAt).fromNow()}
            </Typography>
          </div>
          <Typography id="modal-modal-description" variant="body1" component="p" className={classes.comment_description} sx={{'ml':2}}>
          {comment?.comment}
          </Typography>
            <div className={classes.comment_actions}>
              <Button size="small" disabled={!user?.result} color='primary' 
                onClick={()=>onLike(comment?._id)}>
                <Likes likes={comment?.likes} liked_by={comment?.liked_by} currentUserId={user?.result?.sub || user?.result?._id} />
              </Button>
            {user?.result?._id=== creator?._id&& 
              <IconButton onClick={()=> onDelete(comment?._id)}>
                <DeleteForeverRoundedIcon fontSize='small' color='delete_btn' />
              </IconButton>
            }
          </div>
          
      </div>
    </div>
  )
}

export default Comment