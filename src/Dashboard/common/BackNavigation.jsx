import React from 'react';
import { useNavigate } from 'react-router';
import { IoMdArrowRoundBack } from "react-icons/io";
import { IconButton } from '@mui/material';

export const BackNavigation = ({ ...props }) => {
  const { path } = props;  
  const navigate = useNavigate();
    const handleBack = () => {
    if (path) {
      navigate(path);
    }else {
        
        navigate(-1);
    }
  };

  return (
    <IconButton onClick={handleBack} sx={{display: 'flex', justifyContent: 'flex-start', width: '40px', height: '40px'}}>
      <IoMdArrowRoundBack color='white'/>
    </IconButton>
  );
};