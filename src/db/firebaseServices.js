import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userToken');
 };
  
const login = async (email, password) => {
    const auth = getAuth();
    try {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        return user;
    } catch (error) {
        console.error('Login error:', error);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userToken');
        return error;
    }
  };

const logout = async () => {
    try {
        await handleLogout();
    } catch (error) {
        console.error('Logout error:', error);
        return error;
    }
  };

const signupFirebae = async (email, password) => {
    const auth = getAuth();
    try {
        await createUserWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        return user;
    } catch (error) {
        console.error('Signup error:', error);
        return error;
    }
};
  
export  async function uploadProfilePic  (storage, image, userProfile, setUserProfile, setUrl, preview) {
     console.log(image,preview,storage )
    try {
        const profilePicRef = storageRef(storage, `ProfilePictures/${userProfile.id}`);
        
        const snapshot = await uploadBytes(profilePicRef, image);
        console.log(image)
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log('Download URL:', downloadURL);
        setUrl(downloadURL);

        const updatedProfile = await updateUser({
            ...userProfile,
            profilePic: downloadURL,
        });
        setUserProfile(updatedProfile.data);
    } catch (error) {
        console.log('Error uploading profile picture:', error);
    }
};

export const firebaseServie = { login, logout, signupFirebae, uploadProfilePic };