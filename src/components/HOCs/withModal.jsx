import React, {useState} from 'react';
import { Modal, Card } from '@mui/material';

function withModal(Component){
    return (props) => {
        const [isOpen, setIsOpen] = useState(false);

        // const toggleModal = () => {
        // setIsOpen(!isOpen);
        // };

        const openModal = () => {
            setIsOpen(true);
          };
      
        const closeModal = () => {
            setIsOpen(false);
          };

        if(!isOpen) return <Component {...props} open={isOpen} handleOpen={openModal} />

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
                    width: 400,
                    maxWidth: '90%',
                    maxHeight: 500,
                    overflow: 'auto',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    pb: 0.6,
                }}>
                    <Component {...props} open={isOpen} handleOpen={openModal} />
                </Card>
            </Modal>
        )
    }
}

export default withModal