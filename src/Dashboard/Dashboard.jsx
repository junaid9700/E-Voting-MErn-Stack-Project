import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApiCall } from '../Admin/hooks';
import {Timer} from "@mui/icons-material";
import {useReverseTimer} from "./ReverseTimer.jsx";
import { blue } from '@mui/material/colors';

const CardItem = ({ title, subtitle, image, onClick }) => (
  <Grid item xs={12} sm={6}>
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.1)',
        borderRadius: '10px', 
        '&:hover': {
          transform: 'scale(1.05)',
          backgroundColor: 'grey.300',
          boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
        },
      }}
      onClick={onClick}
    >
      <CardActionArea component="div" sx={{ px: 2, py: 2 }}>
        <CardMedia
          component="img"
          sx={{
            height: '10rem',
            width: '10rem',
            objectFit: 'contain',
            borderRadius: '50%',
            px: 2, py: 2,
            mx: 'auto', 
            mb: 2,
          }}
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
);

export const Dashboard = () => {
  const navigate = useNavigate();
  const { fetchData } = useApiCall();
  const [isEligible, setIsEligible] = useState(false);
  const {timer,timeLeft} = useReverseTimer()
  useEffect(() => {
    getUserEligibility();
    return () => {
      setIsEligible(false);
    }
  }, []);

  const getUserEligibility = async () => {
    try {
      const { status } = await fetchData('/user/check-eligibility', 'get');
      if (status === 200) { 
        setIsEligible(true);
      }
      else {
        setIsEligible(false);
      }
    } catch (error) {
      console.error('Error fetching user eligibility:', error);
    }
  }

  const cardData = [
    {
      title: 'President',
      subtitle: 'Campus Wise',
      image: "presidential-election.png",
      onClick: () => {
        isEligible ? navigate('presidential-election') : alert("You Are not Authorized")
      },
    },
    {
      title: 'Vice President',
      subtitle: 'Campus Wise',
      image: "vice_president.jpg",
      onClick: () => {
        isEligible ? navigate('vice-presidential-eleciton') : alert("You Are not Authorized")
      },
    },
  ];
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        paddingTop: '20px',
        borderRadius: '2rem',
        paddingBottom: '20px',
        scrollbarColor: 'red',
      }}
    >
        {timeLeft !== null && <Box sx={{
            justifyContent: 'center',
            display: 'flex',
            color: 'white',
            alignItems: 'center',
        }}>
            <Timer sx={{fontSize: "3rem"}}/>
            <Typography variant="h4" color="White" sx={{pl: '2rem'}}>
                { timeLeft>0 ? "Ending in " + timer: 'Voting Ended'}
            </Typography>
        </Box>}
      <Container>
        <Typography
          variant="h2"
          align="center"
          sx={{
            mt: 4,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'white.main',
          }}
        >
          Election 2024
        </Typography>
        <Typography variant="h5" align="center" sx={{ mt: 2, color: 'grey.300' }}>
          Simple Free and Fair Elections <br /> Now in Pakistan
        </Typography>
        <Grid container justifyContent="center" spacing={5} sx={{ mt: 6, mb: 4,   }}>
          <Grid item xs={12} lg={6}>
            <Grid container spacing={4}>
              {cardData.map((card, index) => (
                <CardItem
                  key={index}
                  title={card.title}
                  subtitle={card.subtitle}
                  image={card.image}
                  onClick={card.onClick}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;