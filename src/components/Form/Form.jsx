import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper, Grid, Container } from '@mui/material';
import FileBase64 from 'react-file-base64'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";

import Input from '../common/Input';
import { addPost, updatePost } from '../../store/posts';
import useStyles from './styles'

function Form({currentId, setCurrentId}) {
  
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile')); 

    const initialState = {
      title: '',  message: '', tags: '', selectedFile: ''
    }

    const postToUpdate = useSelector((state)=> currentId? state.posts.list.find(p => p._id === currentId):null)
    

    const postSchema = object({ 
      postData: object({
        title: string().required("Title is required"),
        message: string().required("Message is required"),
        tags: string().required("Tags is required").matches(/^[a-zA-Z]+(?:,[a-zA-Z]+)*$/, {message: 'Tags format is not valid'}),
        selectedFile: string(),
      })
    })

    const { register, setValue, handleSubmit, formState: { errors } } = useForm({
      defaultValues: {postData: initialState},
      // mode: 'all',
      resolver: yupResolver(postSchema)
    });


    useEffect(()=> {
      if(currentId) setValue('postData', {...postToUpdate, tags: postToUpdate.tags.join()})
    }, [currentId, postToUpdate])


    const onSubmit = (data, e) => {
      e.preventDefault();
      if(currentId) dispatch(updatePost({...data.postData, tags: data.postData.tags.split(','), name: user?.result?.name})) 
      else dispatch(addPost({...data.postData, tags: data.postData.tags.split(','), name: user?.result?.name}));
      clearForm();
    }

    const handleFile = ({base64}) => {
      setValue('postData.selectedFile', base64)
      // setPostData(prevValue=> ({...prevValue, selectedFile: base64}))
    }

    const clearForm = () => {
      setValue('postData', {...initialState})
      setCurrentId(null)
    }

    if(!user?.result?.name){
      return (
        <Paper className={classes.paper} elevation={6}>
          <Typography variant='h6' align='center'>
            Please Sign In to Create your own memories and like other's memories.
          </Typography>
        </Paper>
      )
    }

    return (
      <Paper className={classes.paper} elevation={6}>
        <form 
          className={`${classes.root} ${classes.form}`} 
          onSubmit={handleSubmit(onSubmit)} 
          autoComplete='off' 
          noValidate
        >
          <Typography variant='h6'>
            {currentId? 'Editing' : 'Create'} a Memory
          </Typography>
  
          <TextField 
            name='title'  
            label='Title' 
            required
            fullWidth
            {...register('postData.title')}
            error={!!errors.postData?.title}
            helperText={errors.postData?.title && `${errors.postData?.title?.message}.`}
          />
          <TextField 
            name='message' 
            label='Message' 
            required 
            fullWidth
            rows={2}
            multiline
            {...register('postData.message')}
            error={!!errors.postData?.message}
            helperText={errors.postData?.message && `${errors.postData?.message?.message}.`}
          />
          <TextField 
            name='tags' 
            label='Tags (coma separated)' 
            required
            fullWidth
            {...register('postData.tags')}
            error={!!errors.postData?.tags}
            helperText={errors.postData?.tags && `${errors.postData?.tags?.message}.`}
          />
          <div className={classes.fileInput}>
            <FileBase64
              multiple={false} 
              onDone={handleFile}
            />
          </div>
          
          <Button 
            className={classes.buttonSubmit} 
            variant='contained' 
            color='submit_btn' 
            size='large' 
            type='submit' 
            fullWidth
          >
            Submit
          </Button>
          <Button 
            variant='outlined' 
            color='clear_btn' 
            size='small'
            onClick={clearForm} 
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
  )
}

export default Form