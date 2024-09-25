import React, { useState } from 'react';
import { AppBar, Container, Toolbar, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { Sidebar } from '../../components';
import Navbar from '../Navbar';
import { FeedbackModal } from '../../components/Modal/feedbackModal';
import { useAuth } from '../../Auth';

const PrivateLayout = ({ children }) => {
  const {isAdmin} = useAuth();
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = () => {
    setToggled(!toggled);
  };
  const handleFeedbackModalOpen = () => {
    console.log('Feedback modal opened');
    setFeedbackModal(true);
  };
 const handleFeedbackModalClose = () => {
    setFeedbackModal(false);
  };


  return (
    <div style={{ display: 'flex', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        isAdmin={isAdmin}
        handleToggleSidebar={handleToggleSidebar}
        handleCollapsedChange={handleCollapsedChange}
        handleFeedbackModalOpen={handleFeedbackModalOpen}
        rootStyles={{
          '.sidebar-container': {
            height: '100%',
            overflowY: 'auto', 
          },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.primary.main,
          position: 'relative', 
          overflow: 'hidden', 
        }}
      >
        {/* //Navbar */}
        <Navbar />

        {/* //Content */}
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            padding: 0,
            margin: 0,
            paddingTop: '1rem', 
          }}
          maxWidth={false}
          
        >
         { !isAdmin && feedbackModal &&
            <FeedbackModal
              open={handleFeedbackModalOpen}
              handleClose={handleFeedbackModalClose}
            />
          }
          {children}
        </Container>
      </Box>
    </div>
  );
};

export default PrivateLayout;
