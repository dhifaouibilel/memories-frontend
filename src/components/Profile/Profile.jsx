import React, {useState, useEffect, useMemo} from 'react'
import { useParams } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web'
import { useDispatch, useSelector } from 'react-redux';
import { getPostsByCreator } from '../../store/posts';
import { followUser, getUsers } from '../../store/users';

import { Avatar, Typography, Card, Divider, Grid, Skeleton } from '@mui/material';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';


import useStyles from './styles';

import EditProfile from './EditProfile'
import EditPost from './EditPost';
import FollowIcon from './FollowIcon';
import ListFollow from './ListFollow';
import Post from '../Posts/Post/Post';
import Loader from '../Posts/Loader/Loader';

function Profile() {
    const classes =useStyles();
    const dispatch = useDispatch()
    const {id: userId} = useParams();

    const { list: posts, loading }= useSelector((state)=> state.posts)
    const { list: users, loading: loadingUsers }= useSelector((state)=> state.users)

    const user = JSON.parse(localStorage.getItem('profile'))
    const currentUserId = user?.result._id;
    const owner = (userId === currentUserId || !userId)
    // const userInfo = !owner? users?.find(user=>user._id===userId) : user?.result;
    const userInfo = users?.find(user=>user._id===userId||(user._id===currentUserId&&owner))


    const userName = userInfo?.name;
    const picture = userInfo?.picture;
    // const nbLikes = posts?.reduce((acc, post)=> acc+post?.likeCounter,0)
    const nbLikes = useMemo(() => posts?.reduce((acc, post)=> acc+post?.likeCounter,0), [posts]);

    const [followers, setFollowers] = useState({users:userInfo?.followers|| [], nbFollowers:userInfo?.followers?.length||0})
    // const authByGoogle = userInfo?.sub ? true : false;
    
    useEffect(()=>{
        dispatch(getPostsByCreator(userId|| currentUserId))
        dispatch(getUsers())
    }, [dispatch, userId])

    useEffect(() => {
        if (userInfo) {
          setFollowers({
            users: userInfo.followers || [],
            nbFollowers: userInfo.followers?.length || 0,
          });
        }
      }, [userInfo]);
    
    const Number = n => {
        const {number} = useSpring({ from: { number: 0 },
            number: n,
            delay: 200,
            config: { mass: 1, tension: 20, friction: 10 } 
        })

        return <animated.span>{number.to(n => n.toFixed(0))}</animated.span>

    }


    

    const [openModalFollow, setOpenModalFollow] = useState(false);
    const [titleFollow, setTitleFollow] = useState('');
    const [listFollows, setListFollows] = useState([])
    const handleOpenFollow = (title) => {
        setTitleFollow(title);
        if (title==='followers') {
            setListFollows(followers.users)
        } else {
            setListFollows(userInfo?.following)
        }
        setOpenModalFollow(true);
    }
    const handleCloseFollow = () => setOpenModalFollow(false);
    
    
    const [currentId, setCurrentId] = useState(null);
    const [openModalPost, setOpenModalPost] = useState(false);
    const handleOpenPost = () => setOpenModalPost(true);
    const handleClosePost = () => setOpenModalPost(false);
    
    const handleFollow = () => {
        if(!owner){
            if(followers.users.find(userId => userId === currentUserId)){
                setFollowers({nbFollowers: followers.nbFollowers-1, users: followers.users.filter(userId => userId!==currentUserId)})
              } else {
                setFollowers({nbFollowers: followers.nbFollowers+1, users: [...followers.users, currentUserId]})
              }
              dispatch(followUser(userId))
        }
        
    } 

  return (
    <Card className={classes.profile} elevation={6} sx={{width: '80%',borderRadius: 5, }}>
        
        {!owner&&loadingUsers? 
            <Skeleton variant="circular" className={classes.profile_img} width={120} height={120} /> : 
            (picture? 
            <Avatar
                className={classes.profile_img}
                alt={userName}
                src={picture}
            // stretch={true}
                sx={{ width: 120, height: 120 }}
            /> : 
            <Avatar
                alt={userName}
                className={classes.profile_img}
                sx={{ width: 120, height: 120 }}
            >
                {userName?.charAt(0)}
            </Avatar>)}
        
        <div className={classes.profile_header} >
            <div className={classes.userInfo}>
                {!owner&&loadingUsers?
                    <Typography variant="h4">
                        <Skeleton width="150px" />
                    </Typography> : (
                    <Typography id="modal-modal-description" 
                        variant="h4" 
                        component="h4" 
                        color='#FFC300'
                        sx={{ fontSize: '36px', fontWeight: 500 }}>
                        {userName}
                    </Typography>
                   
            
                    )
                }
                
                {userInfo?.about &&
                    <Typography id="modal-modal-description" 
                    variant="h6" component="p">
                        {userInfo?.about}
                    </Typography>
                }
                <Typography id="modal-modal-description" 
                variant="body2" component="p"  
                sx={{pb:1, display: 'flex'}}>
                    {userInfo?.location? <><LocationOnOutlinedIcon />&nbsp;&nbsp;{userInfo.location}</>: ''}
                </Typography>
                {owner? (
                    <EditProfile userInfo={user?.result} userId={user?.result?._id} />
                    
                    ) : loadingUsers? 
                    <Skeleton variant="rectangular" width={80} height={30} sx={{borderRadius: 2}} />
                    : (
                    <FollowIcon follow_by={followers?.users} currentUserId={currentUserId} onFollow={handleFollow} />
                    )
                }
            </div>
            
            <div className={classes.profile_stats}>
                <div className={classes.boxStat}>
                <Typography
                variant="h4" color='#FFC300' className={classes.boxStat_data}>
                    {Number(posts?.length)}
                </Typography>
                <Typography 
                variant="h6" component="p" className={classes.boxStat_title}>
                    Posts
                </Typography>
                </div>

                <div className={classes.boxStat}>
                <Typography
                variant="h4" color='#FFC300' className={classes.boxStat_data} 
                >
                    {Number(nbLikes)}
                </Typography>
                <Typography
                variant="h6" component="p" className={classes.boxStat_title}>
                    Likes
                </Typography>
                </div>
                
                <div className={classes.boxStat} style={{cursor: 'pointer'}} onClick={()=>handleOpenFollow('followers')}>
                <Typography
                variant="h4" color='#FFC300' className={classes.boxStat_data}>
                    {Number(followers.nbFollowers)}
                </Typography>
                <Typography
                variant="h6" component="p" className={classes.boxStat_title}>
                    Followers
                </Typography>
                </div>

                <div className={classes.boxStat} style={{cursor: 'pointer'}} onClick={()=>handleOpenFollow('following')}>
                <Typography
                variant="h4" color='#FFC300' className={classes.boxStat_data} 
                >
                    {Number(userInfo?.following?.length)}
                </Typography>
                <Typography
                variant="h6" component="p" className={classes.boxStat_title} 
                sx={{pb:1}}>
                    Following
                </Typography>
                </div>
            </div>
            <ListFollow open={openModalFollow} handleClose={handleCloseFollow} listFollows={listFollows} title={titleFollow} />

        </div>
        <Divider flexItem style={{ margin: '30px 0' }} >
            <Typography className={classes.posts_section_title} variant="h4" component="h4" >
                {owner? 'Your Memories' : 'His Memories'}
            </Typography>
        </Divider>
        
        {loading? <Loader /> : (
           <Grid className={classes.container} container 
            alignItems='stretch' spacing={3}>
                {posts?.map(post => (
                    <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
                    <Post post={post} setCurrentId={setCurrentId} openEdit={handleOpenPost} />
                    </Grid>
                ))}
            </Grid> 
        )}
        <EditPost currentId={currentId} setCurrentId={setCurrentId} open={openModalPost} handleClose={handleClosePost}/>
    </Card>
  )
}

export default Profile