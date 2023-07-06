import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { markNotificationAsViewed } from '../../store/users';
import { useThemeContext } from '../context/colorModeContext';
import moment from 'moment';

import {MenuItem, Avatar, Typography, Badge} from '@mui/material'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import RecommendRoundedIcon from '@mui/icons-material/RecommendRounded';
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp';
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle';
import ChatIcon from '@mui/icons-material/Chat';

import useStyles from './styles'
import MenuWrapper from '../common/MenuWrapper';

function NotifMenu({open, anchorEl, setAnchorEl, notifs}) {

    const navigate = useNavigate()
    const classes = useStyles();
    const dispatch = useDispatch();
    const { theme } = useThemeContext();

    const users = useSelector((state)=> state.users.list);

    const handleClose = () => {
        setAnchorEl(null);
      };
  
      //useMemo 

    const openNotif = (notif) => {
        // mark this notif as viewed
        dispatch(markNotificationAsViewed(notif._id))
        if(notif.type === 'follow') navigate(`/profile/${notif?.user}`)
        else navigate(`/posts/${notif.postId}`)
    }

    const getUser = (id) => {
        return users.find(u => u._id === id)
    }

    const getBadge = (notifType) => {
        return (
            notifType==='follow' ?
            <AccountCircleRoundedIcon  color='notifBadge' /> : notifType==='like_post' ? 
            <FavoriteSharpIcon color='like_btn' />: 
            notifType==='add_post' ? 
            <PlaylistAddCircleIcon /> :
            notifType==='comment_post' ? 
            <ChatIcon color='comment' /> : 
            <RecommendRoundedIcon color='primary' />
        )
    }


  return (

    <MenuWrapper
        anchorEl={anchorEl}
        open={open}
        closeMenu={handleClose}
        scrollable
    >
        {notifs?.length ? notifs?.map(notif=> (
                <MenuItem key={notif?._id} 
                    onClick={() => openNotif(notif)} 
                    className={classes.notifBox} 
                    style={{
                        backgroundColor: notif.viewed ? undefined : theme.palette.notifUnviewed}}
                >
                    <Badge color='notifBadge' overlap="circular" 
                        anchorOrigin={{vertical: 'top', horizontal: 'left'}} variant="dot" size='lg' invisible={notif?.viewed}>
                        <Badge 
                            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} badgeContent={getBadge(notif?.type)} overlap="circular">
                            <Avatar src={getUser(notif.user)?.picture} />
                        </Badge>
                    </Badge>
                    
                    
                    <div className={classes.notifBox_describe}>
                        <Typography className={classes.notifBox_msg} variant='body2'>
                                <span className={classes.notifBox_userName}>
                                    {getUser(notif.user)?.name}
                                </span> 
                                has {
                                    notif.type==='follow'? 'followed you':
                                    notif.type==='like_post'? 'liked your memorie': 
                                    notif.type==='add_post'? 'posted a new memorie' :
                                    notif.type==='comment_post'? 'commented on your memorie': 'liked your comment'
                                } 
                                {notif.type!=='follow' && <span style={{marginLeft: 4, fontWeight: 'bold'}}>{
                                    notif.type==='like_comment'? 
                                    notif.comment?.slice(0, 26) :
                                    notif.postTitle?.slice(0, 16)}
                                    </span> }
                        </Typography>
                        <Typography className={classes.notifBox_time} variant='body2'>
                            {moment(notif?.time).fromNow()}
                        </Typography>
                    </div>
                </MenuItem>)
            
            ): (
                <MenuItem>
                    <Typography variant='body2'>
                        No notification
                    </Typography>
                </MenuItem>
            )
        }
        
    </MenuWrapper>
  )
}

export default NotifMenu
