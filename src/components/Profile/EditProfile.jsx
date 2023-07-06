import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../../store/users';
import FileBase64 from 'react-file-base64';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";

import { Typography, Button } from '@mui/material';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import withModal from '../HOCs/withModal';
import Input from '../common/Input'
import useStyles from './styles';

function EditProfile({open, handleOpen, userInfo, userId}){

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const classes =useStyles();

  const userSchema = object({
    name: string().required("Name is required"),
    about: string(),
    location: string(),
    picture: string(),
    password: string(),
  })

  const { register, setValue, handleSubmit, formState: { errors, isDirty, isValid, isSubmitting } } = useForm({
    defaultValues: {
      name: userInfo?.name, about: userInfo?.about|| '', password:'', location: userInfo?.location ||'', picture: userInfo?.picture || '' 
    },
    resolver: yupResolver(userSchema)
  });

  const [showPassword, setShowPassword] = useState(false);
//   const [userData, setUserData] = useState({
//       name: userInfo?.name, about: userInfo?.about|| '', location: userInfo?.location ||'', picture: userInfo?.picture || '', password:''
//   })

//   const handleChange = ({target}) => {
//       const {value, name} = target
//       setUserData(prevValue=> ({...prevValue, [name]: value}))
//   }

  const handleFile = ({base64}) => {
    setValue('picture', base64)
    //   setUserData(prevValue=> ({...prevValue, picture: base64}))
    }

  const onSubmit = (data, e) => {
      e.preventDefault();
      dispatch(updateUser(data, userId))
      navigate('/')
  }

    if(!open) return (
        <Button variant="outlined" color='edit_btn' 
            sx={{ fontWeight: 900 }} onClick={handleOpen}>
            <ModeEditOutlineOutlinedIcon />&nbsp;
            Edit Profile
        </Button>
    )

    return (
    <>
      <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mb: 2, textAlign: 'center'}}>
          Edit Profile
      </Typography>
      <form 
        className={`${classes.root} ${classes.form}`} 
        onSubmit={handleSubmit(onSubmit)} 
        autoComplete='off' 
        noValidate
      >
        <Input 
            name='name' 
            required
            label='Name' 
            register={register} 
            errors={errors} 
            // disabled={authByGoogle}
        />
        <Input 
            name='about' 
            label='About' 
            register={register} 
            errors={errors}
            // disabled={authByGoogle}
        />
        <Input 
            name='location' 
            label='Location' 
            register={register} 
            errors={errors} 
        />
        
        <Input 
              name='password' 
              label='New Password' 
              register={register} 
              errors={errors} 
              type={showPassword?'text':'password'} handleShowPassword={()=>setShowPassword(!showPassword)} />

          <div className={classes.fileInput}>
              <FileBase64
              multiple={false} 
              onDone={handleFile}
              label="Picture"
              />
          </div>
            <Button 
                className={classes.buttonSubmit} 
                disabled={!isValid || isSubmitting}
                variant='contained' 
                color='submit_btn' 
                size='large' 
                type='submit'
            >
                save profile
            </Button>
        </form>
    </>
    )
}

export default withModal(EditProfile)