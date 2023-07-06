import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/auth'
import decode from 'jwt-decode';
import useStyles from './styles'
import { AppBar, Avatar, Typography, Toolbar, Tooltip, IconButton, Button, Badge } from '@mui/material';
// import Button from '@mui/material-next/Button';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { useThemeContext } from '../context/colorModeContext';

import AccountMenu from './AccountMenu'
import NotifMenu from './NotifMenu';
import memoriesLogo from '../../images/memories.png';

const Navbar = ({setAuthenticated}) => {
    const classes = useStyles();

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useThemeContext();
    // const theme = useTheme();
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const currentUser = user?.result;

    let notifications = useSelector((state)=> state.users.list.find(user=>user._id === currentUser?._id))?.notifications
    

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const [anchorElNotif, setAnchorElNotif] = useState(null);
    const openNotif = Boolean(anchorElNotif);
    const handleClickNotif = (event) => {
      setAnchorElNotif(event.currentTarget);
    };

    const handleLogout = async() => {
        try { 
          await dispatch(logout());
          setUser(null);
          setAuthenticated(false);
          navigate('/auth', {replace: true});
          // window.location.reload();
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(()=>{
      setUser(JSON.parse(localStorage.getItem('profile')))
      const token = user?.token
      if(token){
        const decodedToken = decode(token)
        if (decodedToken.exp * 1000 < new Date().getTime()) handleLogout()
      }// eslint-disable-next-line
    },[location])


  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
      <Link to='/' >
        <img className={classes.image} src={memoriesLogo} alt="memories" height="60" /> 
      </Link>
      </div>

      <Toolbar className={classes.toolbar}>
        {user? (
          <div className={classes.profile}>
            <Typography className={classes.userName} color='userName' variant='h6'>
              {user.result.name}
            </Typography>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
              >
                <Avatar 
                  className={classes.purple} 
                  alt={user.result.name} 
                  src={user.result.picture}
                  sx={{border: '1px solid #FFC300'}}
                >
                  {user.result.name.charAt(0)}
                </Avatar>              
              </IconButton>
            </Tooltip>
            <AccountMenu open={open} anchorEl={anchorEl} handleLogout={handleLogout} setAnchorEl={setAnchorEl} setUser={setUser} profilePicture={user.result.picture} />
          </div>
          
        ):(
          <Button component={Link} to='/auth' size="large" variant="outlined" sx={{ 
            color: "tertiary.main",
            borderColor:"tertiary.main",
            '&:hover': {borderColor: (theme) => theme.palette.tertiary.main}, 
            borderRadius: 5 }} style={{'fontWeight': 900}}>Sign In</Button>
        )}
        
        {user&&(
          <>
          <Tooltip title="Notifications">
            <IconButton sx={{ ml: 2 }} onClick={handleClickNotif} color="inherit">
              <Badge badgeContent={notifications?.filter(notif=>notif.viewed===false)?.length} overlap="circular" color="notif">
                <CircleNotificationsIcon style={{width:33, height:33}} />
              </Badge>
            </IconButton>
          </Tooltip>
        <NotifMenu open={openNotif} anchorEl={anchorElNotif} setAnchorEl={setAnchorElNotif} notifs={notifications} /></>)
        }

      <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
      </Toolbar>
      

    </AppBar>

    
  )
}

export default Navbar