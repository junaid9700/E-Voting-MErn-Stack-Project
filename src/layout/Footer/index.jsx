import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
};

function Footer() {
  return (
    <Toolbar style={styles.footer}> 
      <Typography variant="body1">
        © {new Date().getFullYear()} E-Voting System. All rights reserved.
      </Typography>
    </Toolbar>
  );
}

export default Footer;
