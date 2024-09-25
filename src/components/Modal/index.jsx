import React, { useState } from 'react';
import { Button, Modal, Typography, Box } from '@mui/material';

const index = ({
  open,
  handleClose,
  children,
  title,
  subTitle,
  description,
  buttonText,
  buttonFunction,
}) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="fingerprint-modal-title"
        aria-describedby="fingerprint-modal-description"
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" id="fingerprint-modal-title" gutterBottom>
            {title}
          </Typography>
          <Typography
            variant="body1"
            id="fingerprint-modal-description"
            gutterBottom
          >
            {subTitle}
          </Typography>
          <Typography variant="body1" id="fingerprint-modal-description">
            {description}
          </Typography>
          <Box
            sx={{
              marginTop: '20px',
              minHeight: '400px',
              minWidth: '560px',
              bgcolor: '#F8F9FA',
            }}
          >
            {children}
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            style={{ marginTop: '20px' }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={buttonFunction}
            style={{ marginTop: '20px', marginLeft: '10px' }}
          >
            {buttonText}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default index;
