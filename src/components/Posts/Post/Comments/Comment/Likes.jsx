import React from 'react'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

function Likes({likes, liked_by, currentUserId}) {
  if(likes>0) {
          return liked_by.find(userId => userId === currentUserId) ? (
            <><ThumbUpAltIcon fontSize='small' className='animate__pulse' />&nbsp;{likes} </>
          ):(
            <><ThumbUpOffAltIcon fontSize='small'/>&nbsp; {likes}</>
          ) 
        }
        return <><ThumbUpOffAltIcon fontSize='small'/>&nbsp; </>
      

}

export default Likes