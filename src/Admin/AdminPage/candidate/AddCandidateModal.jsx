import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AddCandidateModal = ({ open, handleClose, handleAddCandidate }) => {
  const [name, setName] = useState('');
  const [partyName, setPartyName] = useState('');
  const [position, setPosition] = useState('');
//   const [image, setImage] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePartyNameChange = (event) => {
    setPartyName(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

//   const handleImageChange = (event) => {
//     setImage(event.target.files[0]);
//   };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (!image) {
    //   alert('Please select an image.');
    //   return;
    // }

    if (name && partyName && position ) {
      const candidate = {
        name: name,
        party_name: partyName,
        position: position,
        // image: image
      };
      handleAddCandidate(candidate);
      handleClose();
    } else {
      alert('Please fill out all fields and select an image.');
    }
  };

  return (
    <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', bgcolor: 'white', boxShadow: 24, p: 5, borderRadius: '10px' }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Add Candidate
        </Typography>
        <Box
          component="form"
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
          onSubmit={handleSubmit}
        >
          {/* <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="upload-button" /> */}
          {/* <label htmlFor="upload-button">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label> */}
          <TextField label="Name" variant="filled" value={name} onChange={handleNameChange} fullWidth />
          <TextField label="Party Name" variant="standard" value={partyName} onChange={handlePartyNameChange} fullWidth />
          <TextField label="Position" variant="standard" value={position} onChange={handlePositionChange} fullWidth />
          <Button type="submit" variant="contained" color="primary">
            Add Candidate
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddCandidateModal;
