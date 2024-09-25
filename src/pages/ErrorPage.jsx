import { Box, Typography } from '@mui/material';
import React from 'react';

const ErrorPage = () => {
  // make a  Error page
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Typography
        variant="h1"
        sx={{ textAlign: 'center', color: 'primary.main' }}
      >
        Page not Found!
      </Typography>
      <Typography
        variant="h2"
        sx={{ textAlign: 'center', mt: 2, color: 'warning.main' }}
      >
        404
      </Typography>
    </Box>
  );
};
export default ErrorPage;
