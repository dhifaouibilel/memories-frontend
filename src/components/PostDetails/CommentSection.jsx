import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { addComment, removeComment, likeComment } from '../../store/posts';
import { Typography  } from '@mui/material';

import Comment from '../Posts/Post/Comments/Comment/Comment'

import useStyles from './styles'
import Input from '../common/Input';

const CommentSection = ({post}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const commentsRef = useRef(null);
    
    const users = useSelector((state)=> state.users.list)
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    const [comments, setComments] = useState(post?.comments);
    const [shouldScroll, setShouldScroll] = useState(false);

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {comment: ''},
        // mode: 'all',
      });

    const onSubmit = async (data) => {
        if(data.comment?.trim()) {
            const updatedPost = await dispatch(addComment(post?._id, data))
            setComments(updatedPost?.comments)
            setValue('comment', '')
            setShouldScroll(true)
            // commentsRef.current.scrollIntoView({behavior: 'smooth'})
        }
    }
    
    const handleDelete = async (commentId) => {
        const updatedPost = await dispatch(removeComment(post?._id, commentId))
        setComments(updatedPost?.comments)
    }
    
    const handleLike = async (commentId) => {
        const updatedPost = await dispatch(likeComment(post?._id, commentId))
        setComments(updatedPost?.comments)
    }
    
    const handleKeyDown = (event) => {
        
        if (event.key === 'Enter') {
            // Trigger click event if Enter key is pressed
            handleSubmit(onSubmit)();
        }
    };
    
    useEffect(() => {
        if(shouldScroll){
            commentsRef.current?.lastElementChild?.scrollIntoView({behavior: 'smooth'});
            setShouldScroll(false);
        }
    }, [comments, shouldScroll])
    


  return (
    <div>
        <div className={classes.commentsOuterContainer}>
            <div ref={commentsRef}  className={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6'>Comments</Typography>
                {comments.map(comment => (
                    <Comment key={comment?._id} 
                        comment={comment}
                        creator={users.find(user=> user._id===comment?.creator)} 
                        onDelete={handleDelete}
                        onLike={handleLike}
                    />)
                )}
                
            </div>
            {currentUser?.result?.name &&(
                <div style={{width: '100%'}}>
                <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                <Input 
                    fullWidth 
                    name='comment' 
                    label='Comment'
                    rows={4}
                    multiline
                    register={register}
                    errors={errors}
                    onSubmit={handleSubmit(onSubmit)} 
                    handleKeyDown={handleKeyDown}
                />
            </div>
            )}
        </div>

    </div>
  )
}

export default CommentSection