import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const MessageModal = ({
  open,
  onClose,
  title,
  msg,
  type = 'info',
  buttonAction,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box id="modal">
          <div className="flex-centered">
            <ErrorOutlineIcon id='warning-icon' />
          </div>
          <Typography id="modal-modal-title" variant="h5">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>
          {type === 'cancel' && (
            <div className="flex-centered mt20">
              <Button
                variant="contained"
                className='mr20'
                color="primary"
                onClick={onClose}
              >
                No
              </Button>
              <Button variant="outlined" color="error" onClick={buttonAction}>
                Yes
              </Button>
            </div>
          )}
          {type === 'confirm' && (
            <div className="flex-centered mt20">
              <Button
                variant="contained"
                color="primary"
                className='mr20'
                onClick={buttonAction}
              >
                Yes
              </Button>
              <Button variant="outlined" color="error" onClick={onClose}>
                No
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MessageModal;
