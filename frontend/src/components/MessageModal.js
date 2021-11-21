import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const MessageModal = ({ open, onClose, title, msg, type = 'info' }) => {
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
            <ErrorOutlineIcon style={{ width: '60px', height: '60px' }} />
          </div>
          <Typography id="modal-modal-title" variant="h5">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>
          {type === 'warning' && (
            <div className="flex-centered" style={{ marginTop: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: '20px' }}
                onClick={onClose}
              >
                No
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => console.log('Cancel tournament')}
              >
                Yes
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MessageModal;
