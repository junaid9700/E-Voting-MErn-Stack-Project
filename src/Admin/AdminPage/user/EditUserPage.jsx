import { Avatar, Grid, Paper, Typography, Button, TextField, Box, Switch, IconButton } from '@mui/material';
import React from 'react';
import { FaPhone, FaUser, FaEnvelope, FaAddressCard, FaIdCard, FaVoteYea, FaEdit, FaLock, FaCheck, FaTimes } from 'react-icons/fa';

export const EditUserPage = ({ user, setIsEditable, setEditUser, handleSubmit, handleChange, error, isLoading, editUser, isEditable }) => {
  return (
    <Grid container justifyContent="center" alignItems="center" sx={{  display: 'flex' }}>
      <Grid item xs={12} sm={8} md={6} lg={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper sx={{ p: 5, borderRadius: '5px', mb: 3, boxShadow: '0 0 10px 5px rgba(0,0,0,0.2)', width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', mb: 3 }}>
            <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', cursor: 'pointer' }}>
              {user?.photo ? <img src={`http://localhost:3000${user?.photo}`} alt={user?.name} height={100} width={100} /> : <FaUser />}
            </Avatar>
            {!isEditable && (
              <IconButton
                sx={{ position: 'absolute', top: 10, right: 10, backgroundColor: 'primary.main', color: 'primary.contrastText', ":hover": { backgroundColor: 'primary.dark', color: 'primary.contrastText' } }}
                onClick={() => setIsEditable(true)}
              >
                <FaEdit />
              </IconButton>
            )}
          </Box>
          {isEditable ? (
            <Box component="form" onSubmit={handleSubmit}>
              <TextField fullWidth label="First Name" name="first_name" value={editUser.first_name ?? ""} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Last Name" name="last_name" value={editUser.last_name ?? ""} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="CNIC" name="cnic" value={editUser.cnic ?? ""} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Email" name="email" value={editUser.email ?? ""} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Number" name="number" value={editUser.number ?? ""} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Father Name" name="father_name" value={editUser.father_name ?? ""} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Address1" name="address1" value={editUser.address1 ?? "" } onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Address2" name="address2" value={editUser.address2 ?? ""} onChange={handleChange} sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography>Authorized:</Typography>
                <Switch checked={editUser.is_authorized} onChange={(e) => setEditUser({ ...editUser, is_authorized: e.target.checked })} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', ":hover": { backgroundColor: 'primary.dark' } }}>
                  <FaCheck /> Submit
                </Button>
                <Button onClick={() => setIsEditable(false)} sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', ":hover": { backgroundColor: 'secondary.dark' } }}>
                  <FaTimes /> Cancel
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                <FaUser /> {user?.first_name + " " + user?.last_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaIdCard /> CNIC: {user?.cnic}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaEnvelope /> Email: {user?.email}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaPhone /> Number: {user?.number}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaUser /> Father Name: {user?.father_name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaAddressCard /> Address1: {user?.address1}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaAddressCard /> Address2: {user?.address2}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaLock /> Authorized: {user?.is_authorized ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaVoteYea /> Voted for Presidential Candidate: {user?.voted_for_presidential_candidate ? 'Yes' : 'No'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2 }}>
                <FaVoteYea /> Voted for Vice Presidential Candidate: {user?.voted_for_vice_presidential_candidate ? 'Yes' : 'No'}
              </Typography>
            </Box>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};
