import React from 'react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function PostLikes({likes, liked_by, currentUserId}) {
    if(likes>0) {
        return liked_by?.find(userId => userId === currentUserId)? (
          <><FavoriteIcon fontSize='medium' className='animate__heartBeat' />&nbsp;{likes > 2 ? `You and ${likes-1} others`: likes} </>
        ):(
          <><FavoriteBorderIcon fontSize='medium'/>&nbsp; {likes}</>
        ) 
      }
      return <><FavoriteBorderIcon fontSize='medium'/>&nbsp; </>
  
}

export default PostLikes