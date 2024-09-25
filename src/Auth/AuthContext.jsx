import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Loader } from '../components/Loader';
import { Alert, Box } from '@mui/material';
import { firebaseServie } from '../db/firebaseServices';
import { useApiCall } from '../Admin/hooks';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { logout: logoutFirebase } = firebaseServie;
  const { fetchData } = useApiCall();
  const [loggedIn, setLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true' && localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const loginState = localStorage.getItem('isLoggedIn');
        if (loginState === 'true') {
          setLoggedIn(true);
        }
      } else {
        setLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userToken');
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (loggedIn) {
      getUser();
    }
  }, [loggedIn]);
   
  const getUser = async () => {
    try {
      const response = await fetchData('/user/get-user', 'get');
      if (response.status === 200) {
        const data = response.data;
        setUser(data);
        if (data.isRole === 'ADMIN') {
          setIsAdmin(true);
        }
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  const loginApproved = async () => { 
    setLoggedIn(true);
  }

  const logout = async() => {
    const isLoggedOut = await logoutFirebase();
    setLoggedIn(false);
  };


  return (
    <AuthContext.Provider value={{loggedIn, logout, loading, loginApproved, user, isAdmin }}>
      {loading ? (
        <Loader type={'circular'} />
      ) : (
        <Box>
          {children}
        </Box>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);