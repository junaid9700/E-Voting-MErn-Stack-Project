import React,{ useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Container,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  BarChart,
  Bar,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { electionData as data } from './data.js';

import { BackNavigation } from '../../../Dashboard/common/BackNavigation.jsx';
import { useApiCall } from '../../hooks/index.js';

const ElectoralResult = () => {
  const { error, fetchData, isLoading } = useApiCall();
  const [chartData, setChartData] = useState([]);
  const [leadingCandidate, setLeadingCandidate] = useState({});
  const [selectCandidate, setSelectCandidate] = useState('president');

  useEffect(() => {
    getChartData();
    getLeadingCandidate();
  }, [selectCandidate]);

  const getChartData = async () => {
    const { candidates } = await fetchData('/candidate/all-candidate', 'get');
    setChartData(candidates.filter((candidate) => candidate?.position === selectCandidate));
  };
  const getLeadingCandidate = async() => {
    const { candidate } = await fetchData(`/candidate/get-winner-candidte?position=${selectCandidate}`, 'get');
    setLeadingCandidate(candidate);
  };
  
  return (
    <>
      {error && <Alert severity="error">
        {error && error}
      </Alert>}
    <BackNavigation path="/" />
    <Container sx={{ my: 4 }}>
      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Electoral Result Matrix
        </Typography>
          <FormControl  sx={{ marginBottom: 2 }}>
            <InputLabel id="election-body-label">Select Election Body</InputLabel>
            <Select
              sx={{ backgroundColor: 'white', color: 'black', borderRadius: '5px', padding: '5px' }}
              name="position"
              variant='standard'
              labelId="election-body-label"
              id="election-body-select"
              value={selectCandidate}
              label="Select Election Body"
              onChange={(e) => setSelectCandidate(e.target.value)}
            >
              <MenuItem value="president">President</MenuItem>
              <MenuItem value="vice_president">Vice President</MenuItem>
            </Select>
          </FormControl>          
          {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Candidate</TableCell>
                <TableCell align="center">Party</TableCell>
                <TableCell align="center">Votes</TableCell>
                <TableCell align="center">Position</TableCell>  
              </TableRow>
            </TableHead>
            <TableBody>
              {chartData.filter((candidate) => candidate?.position === selectCandidate).map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell align="center">
                    {candidate?.name}
                  </TableCell>
                  <TableCell align="center">
                    {candidate?.party_name}
                  </TableCell>
                  <TableCell align="center">
                    {candidate?.vote_counter}
                  </TableCell>
                  <TableCell align="center">
                    {candidate?.position}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" align="center" sx={{ marginBottom: 2 }}>
          Vote Distribution
        </Typography>
        {/* Chart */}
        <Box
            sx={{
            
            height: 400,
            width: '100%',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
            <BarChart
              style={{ margin: 'auto' }}
              cx={400}
              cy={400}
              width={800}
              height={400}
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
              <Legend />
            <Bar dataKey="party_name" fill="#82ca9d" />
            <Bar dataKey="name" fill="#1cdd7d" />
            <Bar dataKey="vote_counter" fill="#8884d8" />
          </BarChart>
        </Box>
      </Box>

      <Typography variant="h5" align="center" sx={{ marginBottom: 2 }}>
        Leading Candidate: {leadingCandidate?.name?? "nil"} (
        {leadingCandidate?.party_name?? "nil"}) with {leadingCandidate?.vote_counter?? "nil"}{' '}
        votes
      </Typography>
      <Typography variant="h5" align="center">
        Total Votes Cast:{' '}
          {leadingCandidate?.vote_counter?? "nil"}
      </Typography>
      </Container>

    </>
  );
};

export default ElectoralResult;
