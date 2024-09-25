import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import  ElectorialCandidateView  from '../common/ElectorialCandiadateView.jsx';
import { getAllCandidates } from '../../services/dataService';
import { get } from 'firebase/database';
import { useNavigate } from 'react-router';
import { BackNavigation } from '../common/BackNavigation.jsx';

const VicePresidentialElection = () => {
  const navigate = useNavigate();
  const [presidentialCandidates, setPresidentialCandidates] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Presidential Election';
  }, []);
  
 useEffect(() => {
    const getCandidates = async () => {
      try {
        const { candidates } = await getAllCandidates('vice_president');
        setPresidentialCandidates(candidates);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    getCandidates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>

      <BackNavigation />
      {presidentialCandidates!==null ?
        <ElectorialCandidateView Candidates={presidentialCandidates} electionBody="Vice Presidential Election"/> : 
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            mt: 2,
            fontWeight: 'bold',
            color: 'grey.200',
            textTransform: 'uppercase',
          }}
        >
          There is no data
        </Typography>
      }
    
    </>
  )
};



export default VicePresidentialElection;
