import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link,
  Grid,
  Box,
  Card,
  CardMedia,
  Alert,
  Popover,
} from '@mui/material';
import { useAuth } from '../../Auth';
import loginAvatar from '../../assets/LoginAvatar.png';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../db/firebase';
import { Loader } from '../../components/Loader';
import { loginUser } from '../../services/dataService';
import { firebaseServie } from '../../db/firebaseServices';

const Login = () => {
  const { login } = firebaseServie;
  const {loginApproved} = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));
  // const { login, setLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Convert FormData to an object
    const data = Object.fromEntries(formData.entries());

    // Debug: Check the contents of the form data
    console.log('Form Data:', data);

    // Reset errors
    setErrors({});
    setErrorMessage('');

    // Form validation
    const validationErrors = {};

    if (!data.email) {
      validationErrors.email = 'Email is required.';
    }
    if (!data.password) {
      validationErrors.password = 'Password is required.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const  user  = await login(data.email, data.password);
      console.log('User:', user);
      if (user) {
        const response = await loginUser({
          email: data.email,
          uid: user.uid,
        });

        if (response.status === 200) {
          localStorage.setItem('userToken', response.token);
          localStorage.setItem('isLoggedIn', 'true');
          await loginApproved();
          // navigate('/e-voting-system');
        } else {
          console.error('Login failed');
          setErrorMessage('Login failed. Please try again.');
        }
      } else {
        console.error('Login failed');
        setErrorMessage('Login failed. Please try again.');
        navigate('/login');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAlertClose = () => {
    setErrorMessage('');
  };

  return (
    <>
      {isLoading && <Loader type={'circular'} />}
      <Container
        component="main"
        maxWidth="lg"
        sx={{
          mt: 8,
          backgroundColor: '#E9ECEF',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        <Popover
          open={!!errorMessage}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handleAlertClose}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Popover>

        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ padding: '1rem' }}>
            <Typography
              component="h1"
              variant="h3"
              sx={{ marginBottom: '0.5rem', fontWeight: 'bold' }}
            >
              Welcome
            </Typography>
            <Typography variant="body1">
              We are happy to see you back with us
            </Typography>
            <form
              style={{ width: '100%', marginTop: '1rem' }}
              onSubmit={handleSubmit}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ margin: '1rem 0' }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forget-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </Box>
          {isMd && (
            <Box
              sx={{
                m: 2,
                padding: '3rem',
                borderRadius: '10px',
              }}
            >
              <Card>
                <CardMedia
                  component="img"
                  image={loginAvatar}
                  alt="login avatar"
                  sx={{
                    borderRadius: '10px',
                    maxWidth: '500px',
                    maxHeight: '500px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                />
              </Card>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Login;