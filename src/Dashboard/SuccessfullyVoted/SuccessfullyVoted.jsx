import React from 'react';
import { Avatar, Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
export const SuccessfullyVoted = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        margin: 'auto',
        bgcolor: '#F8F9FA',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        borderRadius: '10px',
      }}
    >
      <Avatar sx={{ m: 3, bgcolor: 'primary.main', width: 150, height: 150 }}>

        <CheckIcon />
      </Avatar>

      <Typography
        variant="h6"
        sx={{ textAlign: 'center', color: 'primary.main' }}
      >
        You Have Cast Your Voted Successfully!
      </Typography>
      <Typography variant="Body1">
        Thanks for being a Responsiple citizen
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Button sx={{ mt: 3, mb: 2,py:1, px: 2, bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.main', color: 'primary.contrastText' } }}>
          <Link style={{ textDecoration: 'none', color: 'white' }}
            to="/e-voting-system"
          >
            Go Back
          </Link>
        </Button>
      </Box>
    </Container>
  );
};
export default SuccessfullyVoted;
