import React from 'react'

import {MenuItem, ListItemIcon, Avatar} from '@mui/material'
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import MenuWrapper from '../common/MenuWrapper'

function AccountMenu({open, anchorEl, setAnchorEl, handleLogout,  profilePicture}) {

    const navigate = useNavigate()

    const handleClose = () => {
        setAnchorEl(null);
      };
  
      
  return (
    <MenuWrapper open={open} anchorEl={anchorEl} closeMenu={handleClose}>
        <MenuItem onClick={() => navigate('/profile')}>
            <Avatar src={profilePicture} /> Profile
        </MenuItem>
        {/* <Divider /> */}
        <MenuItem onClick={handleLogout}>
        <ListItemIcon>
            <Logout fontSize="small" />
        </ListItemIcon>
            Logout
        </MenuItem>
    </MenuWrapper>
  )
}

export default AccountMenu