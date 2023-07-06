import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from "yup";
import { DevTool } from '@hookform/devtools'
import jwt_decode from 'jwt-decode'

import { signin, signup, signupWithGoogle } from '../../store/auth';
import { Paper, Button, Container, Typography, Grid, Divider } from '@mui/material'

import Input from '../common/Input';

import useStyles from './styles'
import memories from '../../images/logo.png';


function Auth({setAuthenticated}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  
  
  const authSchema = object({
    fName: isSignUp && string().required("First Name is required"),
    lName: isSignUp && string().required("Last Name is required"),
    email: string().email("Email format is not valid").required("Email is required"),
    password: string().required("Password is required"),
    confirmPassword: isSignUp && string().required("Confirm Password is required"),
  })


  const { register, control, watch, handleSubmit, formState: { errors, isDirty, isValid, isSubmitting } } = useForm({
    defaultValues: {
      fName:'', lName:'', email:'', password:'', confirmPassword:''
    },
    mode: 'all',
    resolver: yupResolver(authSchema)
  });

  // const watchAllFields = watch();
  // console.log({isDirty, isValid, isSubmitting});

  // React.useEffect(() => {
  //   const subscription = watch((value, { name, type }) => console.log(value, name, type));
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const onSubmit = async(data, e) => {
    e.preventDefault();
    let response;
    if (isSignUp) {
      response = await dispatch(signup(data));
    } else {
      response = await dispatch(signin(data))
    } 
    if (response) {
      setAuthenticated(true);
      navigate('/');
    }
  } 
  // const onError = (errors: FieldErrors) => console.log(errors);


  const switchMode = () => {
    setIsSignUp((prevIsSignUp)=> !prevIsSignUp)
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        
        <img className={classes.avatar} src={memories} alt="memories" height="50" /> 
        <Typography variant='h5'>{isSignUp? "Create Account": "Sign In"}</Typography>
        <div 
          className={classes.googleButton}>
        <GoogleLogin
          shape="pill"
          text='continue_with'
          logo_alignment="left"
          theme='filled_blue'
          onSuccess={async credentialResponse => {
            // const token = credentialResponse?.credential
            const result = jwt_decode(credentialResponse?.credential)
            try {
              await dispatch(signupWithGoogle(result))
              setAuthenticated(true)
              navigate('/')
            } catch (error) {
              console.log(error)
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />
        </div>
        <Divider flexItem light>OR</Divider>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container className={classes.container} spacing={2}>
            {isSignUp && (
              <>
                <Input  register={register} errors={errors} name='fName' label='First Name' autoFocus half /> 
                <Input register={register} errors={errors} name='lName' label='Last Name' half  />
              </>
            )}
            <Input register={register} errors={errors} label='Email Address' name='email' type='email' />
            <Input register={register} errors={errors} name='password' label='Password' type={showPassword?'text':'password'} handleShowPassword={()=>setShowPassword(!showPassword)} />
            {isSignUp && (
              <Input  register={register} errors={errors} name='confirmPassword' label='Confirm Password' type='password' />
            )}
          </Grid>
          <Button type='submit' disabled={!isDirty|| !isValid || isSubmitting} fullWidth variant='contained' color='primary' className={classes.submit}>{isSignUp?'Sign Up':'Sign In'}</Button>
          {errorMessage && <p style={{textAlign: 'center', color: 'red', margin:0}}>{errorMessage}</p>}
          <Grid container justify='flex-start'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp? 'Already have an account?' : "Don't have an account?"}
              </Button>
              
            </Grid>
          </Grid>
        </form>
        <DevTool control={control} />
      </Paper>
    </Container>
  )
}

export default Auth