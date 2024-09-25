import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Alert, Container, Grid } from '@mui/material';
import { useApiCall } from '../../hooks';
import { BackNavigation } from '../../../Dashboard/common/BackNavigation';
import { getCandidateById } from '../../../services/dataService';
import { EditCandidatePage } from './EditCandidatePage';
import axios from 'axios';
export default function EditCandidate() {
  const { error, fetchData, isLoading } = useApiCall();
  const { id } = useParams();
  const [candidate, setCandidate] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [editCandidate, setEditCandidate] = useState(candidate);
  const [candidateImage, setCandidateImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(candidate?.image ? `http://localhost:3000${candidate.image}` : null);
  const getCandidate = async () => {
      try {
        const { candidate } = await getCandidateById(id);
        setCandidate(candidate);
        setEditCandidate(candidate);
        setImagePreview(`http://localhost:3000${candidate.image}`);
      } catch (error) {
        console.error('Error fetching candidate:', error);
      }
    };
  useEffect(() => {
    
    getCandidate();
    return () => {
      setCandidate({});
    };
  }, [id]);

  const handleChange = (event) => {
    setEditCandidate({ ...editCandidate, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await save(editCandidate);
      setCandidate(editCandidate);
      setIsEditable(false);
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setCandidateImage(file);
      await handleImageUpload(file);
    } else {
      alert('Please select an image');
      setCandidateImage(null);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) {
      return;
    }
  const formData = new FormData();
  formData.append('file', file);
  try {
    const {data: response} = await axios.post(
      'http://localhost:3000/candidate/upload',
      formData,
      {
        params: { candidateId: id },
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        },
      }
    );
    if (response.status === 201) {
      const { image } = response.result.data;
      setEditCandidate({ ...editCandidate, image: image });
      setCandidateImage(null);
      setImagePreview(`http://localhost:3000${image}`);
      alert(response.message);
    } else {
      alert('Image upload failed');
    }
  } catch (error) {
    alert('Error uploading image:', error);
  }
};

  const save = async (editCandidate) => {
    try {
      const response = await fetchData(`/candidate/update-candidate-by-id`, 'POST', editCandidate, {id});
      if (response.status === 200) {
        alert(response.message);
        await getCandidate();
      } else {
        alert('Failed to update candidate');
      }
    } catch (error) {
      console.error('Error updating candidate:', error);
    }
  };

  return (
    <Container maxWidth="xl">
      {error && <Alert sx={{ mb: 2 }} severity="info">{error}</Alert>}
      <BackNavigation path={'/admin/candidate'} />
      <h1 style={{ color: 'white', textAlign: 'left', fontFamily: 'sans-serif' }}>Edit Candidate Page</h1>
      <Grid container spacing={2} sx={{ backgroundColor: 'grey.200', p: 2, borderRadius: '5px', overflowX: 'auto' }}>
        <Grid item xs={12}>
          <EditCandidatePage
            candidate={candidate}
            setIsEditable={setIsEditable}
            setEditCandidate={setEditCandidate}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            error={error}
            isLoading={isLoading}
            editCandidate={editCandidate}
            isEditable={isEditable}
            imagePreview={imagePreview}
            handleImageChange={handleImageChange}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
