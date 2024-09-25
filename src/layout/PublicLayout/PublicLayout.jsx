import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Footer, Header } from '../index';
const PublicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {children}
      <Footer />
      </Box>
    </>
  );
};

export default PublicLayout;
