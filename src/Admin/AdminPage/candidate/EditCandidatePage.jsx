import React from 'react';
import { Avatar, Grid, Paper, Typography, Button, TextField, Box, IconButton } from '@mui/material';
import { FaUser, FaIdCard, FaSteam, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';

export const EditCandidatePage = ({
  candidate,
  setIsEditable,
  handleSubmit,
  handleChange,
  editCandidate,
  isEditable,
  imagePreview,
  handleImageChange,
}) => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{ display: 'flex' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ p: 5, borderRadius: '5px', mb: 3, boxShadow: '0 0 10px 5px rgba(0,0,0,0.2)', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', mb: 3 }}>
            {isEditable ? (
              <label htmlFor="upload-button">
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    border: '2px dashed grey',
                    cursor: 'pointer',
                  }}
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt={candidate?.name} height={100} width={100} />
                  ) : (
                    <FaUser />
                  )}
                </Avatar>
              </label>
            ) : (
              <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main' }}>
                {candidate?.image ? (
                  <img src={`http://localhost:3000${candidate?.image}`} alt={candidate?.name} height={100} width={100} />
                ) : (
                  <FaUser />
                )}
              </Avatar>
            )}
            {isEditable && (
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button"
                onChange={handleImageChange}
              />
            )}
            {!isEditable && (
              <IconButton
                sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'primary.main', color: 'primary.contrastText', ':hover': { backgroundColor: 'primary.dark', color: 'primary.contrastText' } }}
                onClick={() => setIsEditable(true)}
              >
                <FaEdit />
              </IconButton>
            )}
          </Box>
          {isEditable ? (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth label="Name" name="name" value={editCandidate.name ?? ''} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Party Name" name="party_name" value={editCandidate.party_name ?? ''} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Position" name="position" value={editCandidate.position ?? ''} onChange={handleChange} sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', ':hover': { backgroundColor: 'primary.dark' } }}>
                  <FaCheck /> Submit
                </Button>
                <Button onClick={() => setIsEditable(false)} sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', ':hover': { backgroundColor: 'secondary.dark' } }}>
                  <FaTimes /> Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <FaUser /> Name: {candidate?.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaIdCard /> Party Name: {candidate?.party_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaSteam /> Position: {candidate?.position}
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
