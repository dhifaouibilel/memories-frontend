import React from 'react';
import { Modal, Card } from '@mui/material';

function ModalWrapper({children, isOpen, closeModal}){


        return(
            
            <Modal
                open={isOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    maxWidth: '90%',
                    height: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                }}>
                    {children}
                </Card>
            </Modal>
        )
    }

export default ModalWrapper