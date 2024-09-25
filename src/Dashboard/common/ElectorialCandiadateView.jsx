import React, { useEffect } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import presidentialCandidatesData from '../PresidentialElection/data.js';
import useIsMobile from '../../utils/hooks/useIsMobile.js';
import { FaUser } from 'react-icons/fa';

export const CandidateCard = ({ candidate }) => (
  <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
    <Link to={`${candidate.id}`} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0 0 10px 5px rgba(0,0,0,0.2)',
          borderRadius: '10px',
          overflow: 'hidden',
          padding: '20px',
          height: '300px',
          width: '200px',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0 0 10px 5px rgba(0,0,0,0.3)',
            cursor: 'pointer',
            backgroundColor: 'grey.300',
          },
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            marginBottom: '20px',
          }}
        >
          {candidate?.image ? <img
            src={`http://localhost:3000${candidate?.image}` }
            alt={candidate.name}
            style={{ width: '100%', height: '100%' }}
          />: <FaUser />}
        </Avatar>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography gutterBottom variant="h6" component="div">
            {candidate.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {candidate.party_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {candidate.position}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            {candidate.candidatePartyShort}
          </Typography> */}
        </CardContent>
      </Card>
    </Link>
  </Grid>
);

const ElectorialCandiadateView = ({ ...props }) => {

const { Candidates, electionBody } = props;
const isMobile = useIsMobile();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sx={{ textAlign: 'left' }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
               color: 'grey.200',
              textTransform: 'uppercase',
            }}
          >
            {electionBody}
          </Typography>

          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              color: 'grey.200',
              fontWeight: 'bold',
            }}
          >
            General Election 2024
          </Typography>
        </Grid>
        <Grid item xs={12} lg={8} sx={{ p: 4 }}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignContent={'center'}
            alignItems="center"
            margin={'0 auto'}
          >
            {Candidates.length > 0 ? (Candidates.map((candidate) => (
              <CandidateCard key={candidate.id} candidate={candidate} />
            ))):<Typography variant={"h5"}> No Candidate Found! </Typography>}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ElectorialCandiadateView;