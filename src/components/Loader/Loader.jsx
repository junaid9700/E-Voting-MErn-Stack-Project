import React from 'react';
import { CircularProgress, LinearProgress, Box } from '@mui/material';

const Loader = ({ type }) => {
  if (type === 'circular') {
    return (
      <Box
        position={"absolute"}
        zIndex={999}
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        height="100vh"
        width='100vw'
        sx={{backgroundColor: 'rgba(255,255,255,0.5)'}}
      >
        <CircularProgress />
      </Box>
    );
  } else if (type === 'linear') {
    return <LinearProgress />;
  } else {
    return null;
  }
};

export default Loader;
