import React from 'react'
import {MenuItem, ListItemIcon} from '@mui/material'

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';

import MenuWrapper from '../../common/MenuWrapper';

function AccountMenu({open, anchorEl, setAnchorEl, handleDelete,  handleEdit}) {

    const handleClose = () => {
        setAnchorEl(null);
      };
  
      
  return (
    <MenuWrapper
        anchorEl={anchorEl}
        open={open}
        closeMenu={handleClose}
    >
        <MenuItem onClick={handleEdit}>
            <ListItemIcon>
                <EditRoundedIcon />
            </ListItemIcon> 
            Edit
        </MenuItem>
        {/* <Divider /> */}
        <MenuItem onClick={handleDelete}>
            <ListItemIcon>
                <DeleteForeverRoundedIcon fontSize="small" />
            </ListItemIcon>
            Delete
        </MenuItem>
    </MenuWrapper>
  )
}

export default AccountMenu