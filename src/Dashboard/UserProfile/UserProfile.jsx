import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  Button,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  FaUser,
  FaIdCard,
  FaAddressCard,
  FaEnvelope,
  FaPhone,
  FaVoteYea,
  FaEdit,
} from 'react-icons/fa';
import { MdOutlineHowToVote } from 'react-icons/md';
import { useHandleCookies } from '../../utils/Cookies';
import {
  getUser,
  updateUser,
  uploadUserProfilePic,
} from '../../services/dataService';
import { BackNavigation } from '../common/BackNavigation.jsx';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setToken(token);
      fetchUserProfile(token);
    }
  }, []);

  const fetchUserProfile = async (token) => {
    try {
      const response = await getUser(token);
      setUserProfile(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleFileSelected = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFileUpload = async () => {
    if (image) {
      try {
        const response = await uploadUserProfilePic(image, token);
        setUserProfile((prev) => ({
          ...prev,
          photo: response.result.data.photo,
        }));
        setUrl(response.result.data.photo);
        alert('Profile picture uploaded successfully');
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        alert('Failed to upload profile picture');
      }
    } else {
      alert('Please select an image');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false);
    try {
      console.log({ userProfile });
      const updatedProfile = await updateUser(userProfile);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (event) => {
    setUserProfile({
      ...userProfile,
      is_authorized: event.target.checked,
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setUserProfile(userProfile);
  };
  useEffect(() => {
    setUserProfile(userProfile);
  }, [userProfile]);

  return (
    <>
      <BackNavigation path="/" />
      <div
        style={{
          display: 'flex',
          borderRadius: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '3rem',
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: '20px',
            backgroundColor: '#fff',
            width: '80%',
            borderRadius: '10px',
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4}>
              <div style={{ textAlign: 'start' }}>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  id="fileInput"
                  style={{ display: 'none' }}
                  onChange={handleFileSelected}
                />
                <Tooltip
                  title="Click here to select image and upload"
                  sx={{ left: 0 }}
                >
                  <Avatar
                    onClick={() =>
                      isEditing &&
                      (document.getElementById('fileInput').click(),
                      (document.getElementById('fileInput').value = ''))
                    }
                    style={{
                      width: '100px',
                      height: '100px',
                      cursor: 'pointer',
                    }}
                    src={
                      userProfile.photo
                        ? `http://localhost:3000${userProfile.photo}`
                        : preview
                    }
                  >
                    {!preview && !userProfile.photo && (
                      <FaUser style={{ fontSize: '60px' }} />
                    )}
                  </Avatar>
                </Tooltip>
                {isEditing && (
                  <Button
                    sx={{
                      marginTop: '10px',
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': { bgcolor: 'primary.dark', color: 'white' },
                    }}
                    onClick={handleFileUpload}
                  >
                    Upload
                  </Button>
                )}
              </div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4">
                {userProfile.first_name + ' ' + userProfile.last_name}
              </Typography>
              {isEditing && (
                <>
                  <TextField
                    name="first_name"
                    label="First Name"
                    fullWidth
                    value={userProfile.first_name}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    name="last_name"
                    label="Last Name"
                    fullWidth
                    value={userProfile.last_name}
                    onChange={handleChange}
                    margin="normal"
                  />
                </>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                <FaIdCard /> CNIC
              </Typography>
              <Typography>{userProfile.cnic}</Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h6">
                <FaAddressCard /> Address
              </Typography>
              {isEditing ? (
                <>
                  <TextField
                    name="address1"
                    label="Address 1"
                    fullWidth
                    value={userProfile.address1}
                    onChange={handleChange}
                    margin="normal"
                  />
                  <TextField
                    name="address2"
                    label="Address 2"
                    fullWidth
                    value={userProfile.address2}
                    onChange={handleChange}
                    margin="normal"
                  />
                </>
              ) : (
                <Typography>
                  {userProfile.address1}
                  <br />
                  {userProfile.address2}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">Father's Name</Typography>
              {isEditing ? (
                <TextField
                  name="father_name"
                  label="Father's Name"
                  fullWidth
                  value={userProfile.father_name}
                  onChange={handleChange}
                  margin="normal"
                />
              ) : (
                <Typography>{userProfile.father_name}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                <FaPhone /> Phone
              </Typography>
              {isEditing ? (
                <TextField
                  name="number"
                  label="Phone"
                  fullWidth
                  value={userProfile.number}
                  onChange={handleChange}
                  margin="normal"
                />
              ) : (
                <Typography>{userProfile.number}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6">
                <FaEnvelope /> Email
              </Typography>
              {isEditing ? (
                <TextField
                  name="email"
                  label="Email"
                  fullWidth
                  value={userProfile.email}
                  onChange={handleChange}
                  margin="normal"
                />
              ) : (
                <Typography>{userProfile.email}</Typography>
              )}
            </Grid>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
                width:"100%",
               marginLeft: "2rem",
                flexWrap: "wrap",
                marginTop:"2rem"
              }}
            >
              <Grid item xs={12} md={4}>
                <Typography style={{ fontSize: '16px' }}>
                  <FaIdCard /> Voted for Presidential
                </Typography>
                <Typography>
                  {userProfile.voted_for_presidential_candidates}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography style={{ fontSize: '16px' }}>
                  <FaIdCard /> Voted for Vice Presidential
                </Typography>
                <Typography>
                  {userProfile.voted_for_vice_presidential_candidates}
                </Typography>
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={userProfile.is_authorized}
                      icon={
                        <MdOutlineHowToVote
                          style={{
                            color: userProfile.is_authorized
                              ? '#336766'
                              : 'inherit',
                          }}
                        />
                      }
                      checkedIcon={
                        <FaVoteYea
                          style={{
                            color: userProfile.is_authorized
                              ? '#336766'
                              : 'inherit',
                          }}
                        />
                      }
                      disabled={!isEditing}
                      // onChange={handleCheckboxChange}
                    />
                  }
                  label="Authorized"
                  style={{
                    color: userProfile.is_authorized ? '#336766' : 'inherit',
                  }}
                />
              </Grid>
            </div>
          </Grid>
          {isEditing ? (
            <>
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="error"
                style={{ marginTop: '20px', marginLeft: '10px' }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={handleEdit}
              startIcon={<FaEdit />}
            >
              Edit Profile
            </Button>
          )}
        </Paper>
      </div>
    </>
  );
};

export default ProfilePage;
