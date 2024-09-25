import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';

const index = () => {
  const styles = {
    container: {
      padding: '10px',
    },
    card: {
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      backgroundColor: '#f8f8f8',
      marginBottom: '20px',
    },
  };

  return (
    <Grid container justifyContent="center" style={styles.container}>
      <Grid item xs={12} md={8}>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body1" paragraph>
              We are dedicated to revolutionizing the way people vote by
              providing a secure and transparent online voting platform. Our
              goal is to make the voting process easy, convenient, and
              accessible to everyone.
            </Typography>
            <Typography variant="body1" paragraph>
              Our platform ensures the security and integrity of each vote
              through advanced encryption methods and real-time monitoring. We
              prioritize transparency in our election results, providing voters
              with immediate access to accurate and reliable data.
            </Typography>
            <Typography variant="body1" paragraph>
              Whether you're voting for political candidates, deciding on
              organizational leadership, or participating in any other type of
              election, we're here to make the process smooth and trustworthy.
            </Typography>
          </CardContent>
        </Card>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              Our mission is to empower individuals and communities by enabling
              them to participate actively in the democratic process. We believe
              that every voice matters and should be heard.
            </Typography>
            <Typography variant="body1" paragraph>
              By providing a secure and convenient voting platform, we aim to
              increase voter turnout, eliminate barriers to voting, and promote
              inclusivity in decision-making processes.
            </Typography>
          </CardContent>
        </Card>
        <Card style={styles.card}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              Our vision is a future where voting is not only a right but a
              seamless and enjoyable experience for all. We envision a world
              where technology empowers democracy and fosters civic engagement.
            </Typography>
            <Typography variant="body1" paragraph>
              Through innovation and collaboration, we strive to build trust in
              online voting systems, ensuring that they are secure, transparent,
              and accessible to all citizens.
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default index;
