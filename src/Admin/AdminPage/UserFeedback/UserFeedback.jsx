import React, { useEffect, useState } from 'react'
import { Container, Grid, Typography, Paper, Avatar } from '@mui/material';
import { useApiCall } from '../../hooks';

const UserFeedback = () => {

    const { error, fetchData, isLoading } = useApiCall();
    const [feedback, setFeedback] = useState([]);
    const getAllFeedback = async() => {
        try {
            const { feedbacks } = await fetchData('/feedback/get-feedback', 'get');
            console.log("hello",feedbacks)
            setFeedback(feedbacks);  
        } catch (error) {
            console.error('Error fetching feedback:', error);
        }
    }

    useEffect(() => {
        getAllFeedback();
        return () => {
            setFeedback([]);
        }
    }, []);
  return (
    <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Users Feedbacks
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ display: 'flex', backgroundColor: 'grey.200', borderRadius: '5px' }}>
          <Grid container spacing={4} >
            {feedback.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper elevation={3} sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: '5px',
                  width: '100%',
                    display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxWidth: '400px',
                }}>
                  <Avatar sx={{ width: 100, height: 100, bgcolor: 'primary.main', mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img src={""/*item.name*/} alt={item.username} height={100} width={100} style={{ maxWidth: '100%', maxHeight: '100%' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 1, textAlign: 'center' }}>
                     @locade002       {/*item.username*/}
                            
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'primary.main', mt: 1, textAlign: 'start' }}>
                    Name: lodccasd {/*item.name*/}
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'primary.main', mt: 1, textAlign: 'start' }}>
                    Feedback: {item.feedback}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
export default UserFeedback