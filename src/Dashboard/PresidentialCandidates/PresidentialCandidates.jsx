import {
  Avatar,
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Link,
  Container,
  FormControlLabel,
  Card,
  Icon,
  IconButton,
} from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useParams, useNavigate, useLocation } from 'react-router';
import data from '../PresidentialElection/data.js';
import Modal from '../../components/Modal';
import { getCandidateById, voteCandidate } from '../../services/dataService';
import { Camera, Image } from '@mui/icons-material';
import { Fingerprint } from '@mui/icons-material'; 
import { LuScanFace } from "react-icons/lu";
import { BackNavigation } from '../common/BackNavigation.jsx';
import { useApiCall } from '../../Admin/hooks/index.js';
import * as  faceapi from 'face-api.js';

export const PresidentialCandidates = () => {
  const storedImages = [
    '/myImages/image1.jpg',
    '/myImages/image2.jpg',
    '/myImages/image3.jpg',
  ]
  const { fetchData, isLoading, error } = useApiCall();
  const [isMatched, setIsMatched] = useState(null)
  const navigate = useNavigate();
  const videoRef = useRef();
  const canvasRef = useRef();
  const [candidate, setCandidate] = useState(null);
  const [isVoterAuthPage, setIsVoterAuthPage] = useState(false);
  const params = useParams();
  const { candidateId } = params;  
  const [fingerprintModalOpen, setFingerprintModalOpen] = React.useState(false);
  const [faceScannerModalOpen, setFaceScannerModalOpen] = React.useState(false);
  const { pathname } = useLocation();
  const [videoStarted, setVideoStarted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Presidential Candidates';
  }, []);

  useEffect(() => {
    const getCandidate = async () => {
      try {
        const {candidate} = await getCandidateById(candidateId);
        setCandidate(candidate);
      } catch (error) {
        console.error('Error fetching candidate:', error);
      }
    };

      getCandidate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (videoStarted) {
      loadModels();
    }
    () => {
      stopVideo();
      videoRef.current.srcObject = null;
      videoRef.current.src = null;
    }
  }, [videoStarted]);
  
  const loadModels =  () => {
    Promise.all([
              faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
              faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
              faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
              faceapi.nets.faceExpressionNet.loadFromUri('/models'),
              faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
            ]).then (() => {
                detectMyFace();
            }).catch((err) => {
                 
                console.error('Error loading models:', err);
            });
  };

  const detectMyFace = async () => {
    const canvas = canvasRef.current;
    const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
    faceapi.matchDimensions(canvas, displaySize);
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      console.log(resizedDetections);
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
     
    }, 100);
     
  };
  
  const startVideo = () => {
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
    }
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        videoRef.current.srcObject = stream;  
        setVideoStarted(true);
      })
      .catch((err) => {
        setVideoStarted(false);
        console.error('Error accessing the camera:', err);
      });
  }
  const handleVideoPlay = () => {
            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
                console.log(detections);
            }, 100);
        };
 const stopVideo = () => {
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        videoRef.current.srcObject = null;
        track.stop();
      });
      videoRef.current.srcObject = null;
    }
  };

  const handleVoteCasted = async () => {
    try {
      const { status, message, candidates } = await fetchData( pathname.includes('presidential-election')?'/candidate/vote-to-persident':'/candidate/vote-to-vice','GET', null, {id: candidateId });
      handleFingerPrintModalClose();
      navigate('successfully-voted');

    } catch (error) {
      alert(`Error casting vote: ${error.response.data.message}`);
      navigate(pathname.includes('presidential-election')?'/e-voting-system/presidential-election':'/e-voting-system/vice-presidential-eleciton');
    }
    
  };
  const handleCancel = () => {
    navigate(-1);
  };
  const voterAuthenticationPage = () => {
    setIsVoterAuthPage(true);
  }
  const handleFingerPrintModalOpen = () => {
    setFingerprintModalOpen(true);
  };
  const handleFingerPrintModalClose = () => {
    setFingerprintModalOpen(false);
  };
  const handleFaceScannerModalOpen = () => {
    setFaceScannerModalOpen(true);
  }
  const handleFaceScannerModalClose = () => {
    setVideoStarted(false);
    stopVideo();
    setFaceScannerModalOpen(false);
  }
 
  return (
    <>
      <BackNavigation />
      {isVoterAuthPage && (
          <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold', color: 'grey.200', mt: 8 }}>
                Scan to Cast Vote
          </Typography>
      )}
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        textAlign: 'center',
        bgcolor: '#FFFFFF',
        borderRadius: '10px',
        padding: '3rem',
      }}
    >
      {!isVoterAuthPage && candidate ? (
        <>
          <Avatar
            sx={{
              width: 200,
              height: 200,
              marginBottom: '20px',
            }}
            >
              <img src={`http://localhost:3000${candidate?.image}`} alt={candidate?.name} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
          </Avatar>
          <Typography
            variant="h1"
            sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 'bold' }}
          >
            {candidate.name}
          </Typography>
          <Typography
            variant="h2"
            sx={{ textAlign: 'center', mt: 2, color: 'warning.main' }}
          >
            {candidate.party_name}
          </Typography>
          <Typography
            variant="h4"
            sx={{ textAlign: 'center', mt: 2, color: 'primary.main' }}
          >
            {candidate.position}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              onClick={voterAuthenticationPage}
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                mr: 2,
                padding: '10px 30px',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Vote
            </Button>
            <Button
              sx={{
                bgcolor: 'error.main',
                color: 'white',
                padding: '10px 30px',
                '&:hover': {
                  bgcolor: 'error.dark',
                },
              }}  
              onClick={handleCancel}
            >
              Cancel  
            </Button>
          </Box>
        </>
      ) : (
          <>
            <Grid container spacing={3} justifyContent="center" >
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, bgcolor: 'grey.200' }}>
                  <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Fingerprint Scanner
                  </Typography>
                  <IconButton
                    onClick={handleFingerPrintModalOpen}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 'auto',
                      width: '200px',
                      height: '200px',
                      mt: 2,
                      mb: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '20%',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    <Fingerprint  sx={{ width: '56%', height: '56%' }}/>
                  </IconButton>
                  <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                    Please scan your fingerprint to validate your vote
                  </Typography>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card sx={{ p: 2, bgcolor: 'grey.200' }}>
                  <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                    Face Scanner
                  </Typography>
                     <IconButton
                    onClick={handleFaceScannerModalOpen}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: 'auto',
                      width: '200px',
                      height: '200px',
                      mt: 2,
                      mb: 1,
                      bgcolor: 'primary.main',
                      color: 'white',
                      borderRadius: '20%',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }}
                  >
                    <LuScanFace size={100} />
                   
                  </IconButton>
                  <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                    Please scan your face to validate your vote
                  </Typography>
                </Card>
              </Grid>
            </Grid>

          </>
      )}
          
      {/* fingerprint modal */}
      {fingerprintModalOpen && (
        <Modal
          open={fingerprintModalOpen}
          handleClose={handleFingerPrintModalClose}
          title="Fingerprint"
          subTitle="Please scan your fingerprint"
          description="This will be used to validate your vote"
          buttonText="scan"
          buttonFunction={handleVoteCasted}
        />
      )}
        {faceScannerModalOpen && (
        <Modal
          open={faceScannerModalOpen}
          handleClose={handleFaceScannerModalClose}
          title="Face Scanner"
          subTitle="Please scan your face"
          description="This will be used to validate your vote"
          buttonText="scan"
          buttonFunction={videoStarted? null : startVideo}
          >  
            {
              !videoStarted &&
              <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , margin: 'auto', }}>
                <Camera sx={{ width: '100px', height: '100px', cursor: 'pointer' }} onClick={startVideo}/>
              </Box>
            }
            <div style={{position: 'relative'}}>
              <video crossOrigin='anonymous' ref={videoRef} autoPlay playsInline width={720} height={560}/>
              <canvas ref={canvasRef} width={720} height={560}   style={{position: 'absolute', zIndex: 1000,top: 0,left: 0, backdropFilter: 'blur(5px)'}} />

            </div>
        </Modal>
      )}
      </Container>
    </>
  );
};
export default PresidentialCandidates;
