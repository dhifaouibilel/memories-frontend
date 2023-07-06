import React from 'react';
import ModalWrapper from '../common/ModalWrapper';
import Form from '../Form/Form'

export default function EditPost({currentId, setCurrentId, open, handleClose}){

    return (
        <ModalWrapper isOpen={open} closeModal={handleClose}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
        </ModalWrapper>
    )
}