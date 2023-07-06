import React from 'react'
import { Avatar, Typography, IconButton, Container } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles'
import ModalWrapper from '../common/ModalWrapper';

function ListFollow({open, handleClose, listFollows, title}) {
    const users = useSelector((state)=> state.users.list);
    const navigate = useNavigate();
    const list = listFollows?.map(followId => users.find(user=> String(user._id) === followId))
    const classes = useStyles();

    const handleOpenProfile = (userId) => {
        handleClose();
        navigate(`/profile/${userId}`, {new: true});
    }

    return (
        <ModalWrapper isOpen={open} closeModal={handleClose}>
            <Container sx={{p: 3, pb: 0.6}}>
                <div style={{display: 'flex', justifyContent: 'space-between', p: 3, pb: 0.6}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <IconButton size='md' onClick={handleClose}><CloseOutlinedIcon />
                    </IconButton>
                </div>
                <div className={classes.follow_rows}>
                    {list?.length && list?.map((user)=> (
                        <div key={user?._id} className={classes.follow_row} onClick={()=>handleOpenProfile(user?._id)}>
                            <Avatar src={user?.picture} sx={{mt:1, ml: 3,border: '1px solid #FFC300'}} >{user?.name.charAt(0)}</Avatar>
                            <Typography id="modal-modal-description" color='userName' variant="h6" component="h5"  sx={{'ml':2}}>
                                {user?.name}
                            </Typography>
                        </div>
                    ))}
                </div>
            </Container>
        </ModalWrapper>
    )
}

export default ListFollow;