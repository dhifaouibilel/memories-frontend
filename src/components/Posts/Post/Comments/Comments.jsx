import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Typography, Card, Paper, IconButton } from '@mui/material'
import { useForm } from "react-hook-form";
import useStyles from '../styles';
import Input from '../../../common/Input';
import Comment from './Comment/Comment';
import { addComment, removeComment, likeComment } from '../../../../store/posts';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';


function Comments({open, handleClose, comments, postId}) {
  const users = useSelector((state)=> state.users.list)

  const classes = useStyles();
  const dispatch = useDispatch()

  const { register, setValue, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {comment: ''},
    // mode: 'all',
  });

  const onSubmit = (data) => {
    dispatch(addComment(postId, data))
    setValue('comment', '')
  }


  const handleKeyDown = (event) => {

    if (event.key === 'Enter') {
      // Trigger click event if Enter key is pressed
      handleSubmit(onSubmit)();
    }
  };

  const handleDelete = (commentId) => {
    dispatch(removeComment(postId, commentId))
  }

  const handleLike = (commentId) => {
    dispatch(likeComment(postId, commentId))
  }


  return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            maxWidth: '80%',
            overflow: 'auto',
            maxHeight: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 3,
            pb: 0.6,
        }}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Comments
          </Typography>
          <IconButton size='md' onClick={handleClose}><CloseOutlinedIcon /></IconButton>
        </div>
       
        <div className={classes.comments}>
        {comments?.length>0? 
          comments.map((comment)=> (
            <Comment key={comment?._id} 
              comment={comment}
              creator={users.find(user=> user._id===comment?.creator)}  
              onDelete={handleDelete}
              onLike={handleLike}
            />
        )): (
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              you are the first to comment on this awesome memorie
          </Typography>
        )}
        </div>
        <Paper className={classes.comment_entry}>
          <Input 
            name='comment' 
            label='Add your comment ...' 
            register={register}
            errors={errors}
            onSubmit={handleSubmit(onSubmit)} 
            handleKeyDown={handleKeyDown} 
            autoFocus 
          />
        </Paper>
        </Card>
    </Modal>
  )
}

export default Comments