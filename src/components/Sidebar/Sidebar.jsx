import React from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FaUser, FaAngleDoubleLeft, FaAngleDoubleRight, FaChartBar,FaPeopleArrows } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';
import { MdDashboardCustomize } from 'react-icons/md';
import { Box, Typography, Button } from '@mui/material';
import theme from '../../../theme';
import { useAuth, } from '../../Auth';
import { Feedback, Poll } from '@mui/icons-material';

const Index = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange, rootStyles, handleFeedbackModalOpen, isAdmin }) => {
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout();
  };
  

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      handleToggleSidebar={handleToggleSidebar}
      rootStyles={{
        '.sidebar-container': {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '3rem',
          padding: '1rem 1rem',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 'bold',cursor: 'pointer' }}  onClick={handleCollapsedChange}> {!isAdmin ? 'Viso E-Booth System': 'Admin pannel'}</Typography>
      </Box>

      <Menu
        style={{marginTop: '2rem', marginBottom: '1rem',}}
        menuItemStyles={{
          button: {
            [`&.active`]: {
              backgroundColor: '#f0f0f0', 
              color: '#000',
            },
          },
        }}
      >
        {!isAdmin &&
          <>
            <MenuItem
              icon={<FaUser />}
              component={<Link to="/e-voting-system/my-profile" />}
            >
              My Profile
            </MenuItem>
            <MenuItem
              icon={<MdDashboardCustomize />}
              component={<Link to="/e-voting-system" />}
            >
              Voting Dashboard
            </MenuItem>
          
          </>
        }

        {isAdmin &&
          <>
            <MenuItem
              icon={<FaUser />}
              component={<Link to="/admin/user" />}
            >
              Users
            </MenuItem>
            <MenuItem
              icon={<FaPeopleArrows />}
              component={<Link to="/admin/candidate" />}
            >
              Candidates
            </MenuItem>
            <MenuItem
              icon={<FaChartBar />}
              component={<Link to="/admin/electorial-matrix" />}
            >
              Result Matrix
            </MenuItem>
            <MenuItem
                icon={<Feedback />}
                component={<Link to="/admin/feedback" />}
              >
                Feedback
            </MenuItem>
            <MenuItem
                icon={<Poll />}
                component={<Link to="/admin/voting-duration" />}
              >
                Voting Duration
            </MenuItem>
          </>
        }

      </Menu>
        

        <Box
          onClick={handleLogout}
        style={{
    
            cursor: 'pointer',
            position: 'absolute',
            bottom: 0,
          padding: '1rem 1rem 1rem 2rem',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: '1rem',
            height: '3rem',
            width: '100%',
            backgroundColor: '#f0f0f0',
            color: '#000',
          }}
      >
          <HiLogout />
          {!collapsed ? 'Logout' : ""}
        </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 100,
          right: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={handleCollapsedChange}
          sx={{ padding: '1rem 0',backgroundColor: '#f0f0f0', color: '#000' }}
        >
          {collapsed ? <FaAngleDoubleRight /> : <FaAngleDoubleLeft />}
        </Button>
        { !isAdmin && <Button
          variant="contained"
          onClick={handleFeedbackModalOpen}
          sx={{ padding: '1rem 0.3rem', backgroundColor: 'primary.main', color: '#fff' }}
        >
          Give us Feedback
        </Button>}
      </Box>
    </Sidebar>
  );
};

export default Index;
