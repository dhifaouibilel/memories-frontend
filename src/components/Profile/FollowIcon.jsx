import React from 'react'

import { Button } from '@mui/material';
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function FollowIcon({follow_by, currentUserId, onFollow}) {
    return follow_by?.find(userId => userId === currentUserId)? (
      <Button variant="contained" color='edit_btn' 
                    sx={{ fontWeight: 900 }} onClick={onFollow}>
        <NotificationsActiveIcon />
      </Button>
    ):(
      <Button variant="outlined" color='edit_btn' 
                    sx={{ fontWeight: 900 }} onClick={onFollow}>
        <NotificationAddOutlinedIcon />
      </Button>
    ) 
}

export default FollowIcon