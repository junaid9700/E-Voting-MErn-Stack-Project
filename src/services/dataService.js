//services-userServices.js
import axios from 'axios';

const API_URL = 'http://localhost:3000';
export const getUser = async (X) => {
  try {
    const response = await axios.get(`${API_URL}/user/get-user`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${X}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const updateUser = async (data) => {
  try {
    const T = localStorage.getItem('userToken');
    const response = await axios.post(`${API_URL}/user/update`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${T}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export const uploadUserProfilePic = async (imageUrl, token) => {
  try {
    const formData = new FormData();
    formData.append('file', imageUrl);
    const response = await axios.post(
      'http://localhost:3000/user/upload-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};
export const signup = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getAllCandidates = async (candidate) => {
  try {
    const T = localStorage.getItem('userToken');
    const response = await axios.get(`${API_URL}/candidate/all-candidate`, {
      params: {
        position: candidate,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${T}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const getCandidateById = async (id) => {
  try {
    const T = localStorage.getItem('userToken');
    const response = await axios.get(
      `${API_URL}/candidate/get-candidate-by-id`,
      {
        params: { id },
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${T}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const voteCandidate = async (id) => {
  try {
    const T = localStorage.getItem('userToken');
    const response = await axios.get(`${API_URL}/candidate/vote-to-candidate`, {
      params: { id },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${T}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
