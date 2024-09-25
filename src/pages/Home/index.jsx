import React from 'react';
import {
  Grid,
  Typography,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  Button,
  Avatar,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  useTheme,
  Box,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  SecurityRounded,
  ThumbUpAlt,
} from '@mui/icons-material';
import { TypeAnimation } from 'react-type-animation';
import homeVote from '../../assets/homeVote.png';
import { HiCubeTransparent } from 'react-icons/hi';
import {
  RiAccountCircleLine,
  RiLoginBoxLine,
  RiUserSearchLine,
  RiCheckboxCircleLine,
  RiFileSearchLine,
  RiNotificationLine,
  RiUserStarLine,
  RiArrowRightUpFill,
} from 'react-icons/ri';
import { useNavigate } from 'react-router';

const index = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const styles = {
    mainSection: {
      minHeight: '100vh',
      with: '100%',
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: '#fffff',
      textAlign: 'left',
      // padding: '50px',
      // margin: '110px 0',
    },
    featureSection: {
      padding: '50px',
      backgroundColor: '#f0f0f0',
    },
    card: {
      padding: '3rem',
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      transition: 'all 0.3s ease',
    },
    flowSection: {
      padding: '50px',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
    },
    faqSection: {
      padding: '50px',
      backgroundColor: '#f0f0f0',
    },
    accordion: {
      width: '100%',
    },
    contactSection: {
      padding: '3rem ',
      marginBottom: '3rem',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    featrueStepper: {
      display: 'flex',
      alignItems: 'center',
      padding: '1rem',
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#336766',
    },
    stepperIcons: {
      fontSize: '2rem',
      height: '2rem',
      color: '#336766',
    },
    stepperTitle: {
      fontSize: '1rem',
      fontWeight: 'bold',
      color: '#336766',
    },
    stepperDescription: {
      fontSize: '0.8rem',
      paddingLeft: '2rem',
      color: '#336766',
    },
    getStartedButton: {
      // left align this button

      marginTop: '2rem',
      marginRight: 'auto',
      marginLeft: 'auto',
      padding: '1rem 2rem',
      borderRadius: '30px',
      fontWeight: 'bold',
      fontSize: '1rem',
      textTransform: 'none',
      color: '#ffffff',
      backgroundColor: '#336766',
      '&:hover': {
        backgroundColor: '#336766',
        color: '#ffffff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        borderRadius: '30px',
        fontWeight: 'bold',
        fontSize: '1rem',
      },
    },
  };

  const features = [
    {
      title: 'Easy to Use',
      description: 'Intuitive interface for effortless voting experience',
      icon: ThumbUpAlt,
    },
    {
      title: 'Secure',
      description: 'Encrypted data transmission to ensure your vote is safe',
      icon: SecurityRounded,
    },
    {
      title: 'Transparent Results',
      description: 'Access transparent and real-time election results',
      icon: HiCubeTransparent,
    },
  ];

  const faqs = [
    {
      question: 'Is my vote secure?',
      answer: 'Yes, we use the latest encryption methods to secure your vote.',
    },
    {
      question: 'Can I change my vote?',
      answer: 'No, once you submit your vote, it cannot be changed.',
    },
    {
      question: 'How do I view my vote results?',
      answer: 'You can view your vote results in the "Results" section.',
    },
    {
      question: 'Can I vote for multiple candidates?',
      answer: 'No, you can not vote for multiple candidates.',
    },
    {
      question: 'How do I know my vote is counted correctly?',
      answer:
        'This question addresses transparency in the voting process. Users may want to know how their votes are recorded and verified to ensure accuracy.',
    },
    {
      question: 'What measures are in place to prevent voter fraud?',
      answer:
        'Users may be concerned about the potential for voter fraud in online voting systems. They may want to know about the security measures implemented to prevent unauthorized access or manipulation of votes.',
    },
    {
      question: 'What if I encounter technical difficulties while voting?',
      answer:
        'Users may have concerns about technical issues such as website crashes or connectivity problems while voting. This question addresses how such issues are handled and ensures that users can still exercise their right to vote.',
    },

    // Add more FAQs here
  ];

  const steps = [
    {
      label: 'Step 1: Register',
      description: 'Create an account to get started',
      icons: <RiAccountCircleLine style={styles.stepperIcons} />,
    },
    {
      label: 'Step 2: Login',
      description: 'Login to your account to start voting',
      icons: <RiLoginBoxLine />,
    },
    {
      label: 'Step 3: Vote',
      description: 'Vote for your favorite candidates',
      icons: <RiCheckboxCircleLine />,
    },
    {
      label: 'Step 4: Results',
      description: 'View the election results',
      icons: <RiFileSearchLine />,
    },
    {
      label: 'Step 5: Notifications',
      description: 'Get notified when your vote is successful',
      icons: <RiNotificationLine />,
    },
    {
      label: 'Step 6: Share',
      description: 'Share your vote with friends and family',
      icons: <RiUserStarLine />,
    },
    {
      label: 'Step 7: Vote Again',
      description: 'Vote for your favorite candidates again',
      icons: <RiUserSearchLine />,
    },
  ];

  return (
    <div>
      <Grid container alignItems="center" style={styles.mainSection}>
        <Grid item xs={12} md={6}>
          <img
            src={homeVote}
            alt="Animated image"
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'contain',
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
           width: '100%',
            padding: {
              xs: '1rem',
              sm: '1rem',
            },
            textAlign: 'left',
          }}
        >
          <Typography
            component="div"
            gutterBottom
            variant="h3"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 'bold',
              color: '#336766',
              textAlign: 'left',
              lineHeight: '1.2',
              marginBottom: '1rem',
            }}
          >
            VOTE ONLINE AND STOP BEING IN A QUEUE
          </Typography>
          <Box sx={{ height: '50px' }}>
            <TypeAnimation
              sequence={[
                'VOTE ONLINE AND STOP BEING IN A QUEUE',
                500,
                'VOTE CONVENIENTLY FROM ANYWHERE WITH OUR E-VOTING SYSTEM',
                500,
              ]}
              cursor={true}
              speed={60}
              repeat={5}
              style={{
                textAlign: {
                  xs: 'center',
                  sm: 'left',
                },
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            style={styles.getStartedButton}
            endIcon={<RiArrowRightUpFill />}
            onClick={() => navigate('/login')}
          >
            Get Started
          </Button>
        </Grid>
      </Grid>

      {/* Feature Section */}
      <Grid
        container
        style={styles.featureSection}
        spacing={4}
        justify="center"
      >
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card style={styles.card}>
              <Avatar sx={{ bgcolor: 'primary.main', p: 2, m: 'auto' }}>
                <feature.icon style={{ fontSize: '3rem' }} />
              </Avatar>
              <Typography
                variant="h5"
                sx={{ fontWeight: 'bold', p: 2, textAlign: 'center' }}
                gutterBottom
              >
                {feature.title}
              </Typography>
              <Typography variant="body2">{feature.description}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Application Flow Section */}
      <Grid
        container
        style={styles.flowSection}
        justify="center"
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography
          variant={'h4'}
          gutterBottom
          sx={{ textAlign: 'center', fontWeight: 'bold' }}
        >
          Application Flow
        </Typography>
        <Stepper orientation="vertical">
          {steps.map((step, index) => (
            <Step completed={true} key={index}>
              <StepLabel icon={step.icons} style={styles.featrueStepper}>
                <Typography variant="body1" sx={styles.stepperTitle}>
                  {step.label}
                </Typography>
              </StepLabel>
              <Typography variant="body2" style={styles.stepperDescription}>
                {step.description}
              </Typography>
            </Step>
          ))}
        </Stepper>
      </Grid>

      {/* FAQs Section */}
      <Grid container style={styles.faqSection} justify="center">
        <Typography variant="h4" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion key={index} style={styles.accordion}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>

      {/* Contact Us Section */}
      <Grid container style={styles.contactSection} justify="start">
        <Typography variant="h4" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1">
          If you have any questions or concerns, please contact us.
        </Typography>
        <Grid item xs={12} sm={6}>
          <TextField label="Your Name" fullWidth margin="normal" />
          <TextField label="Your Email" fullWidth margin="normal" />
          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" fullWidth>
            Send Message
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default index;
