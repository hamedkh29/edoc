import React, { useState } from 'react';
import { Button, Modal, Box, Typography } from '@mui/material';

const ShareLinkModal = ({ link, isOpen, onClose }) => {

    const closeModal = () => {
        onClose()
    };

    return (
        <div>
            <Modal open={isOpen} onClose={closeModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h5">Shared Link</Typography>
                    <Box sx={{mt:5}}></Box>
                    <a href={link} _target={"blank"}>{link}</a>
                    <Box sx={{mt:5}}></Box>
                    <Button variant="contained" onClick={closeModal}>
                        Close
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ShareLinkModal;