import { Container,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import React from 'react'
import { Loader } from '../../../components/Loader';

const CandidatePage = ({ candidates, isLoading, error, onDelete, handleEdit }) => {
    const cellStyle = { maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '14px', fontWeight: 'bold', text: "center" };
  return (
      <> 
          {isLoading  ? <Loader type={'circular'} /> :
        
          <TableContainer component={Paper} sx={{  maxWidth: '100%', overflowX: 'auto',}}>
                        <Table stickyHeader>
                            <TableHead>
                          <TableRow >
                                <TableCell sx={cellStyle}>NO</TableCell>
                                <TableCell sx={cellStyle}>ID</TableCell>
                                <TableCell sx={cellStyle}>Candidate Name</TableCell>
                                <TableCell sx={cellStyle}>Party Name</TableCell>
                                <TableCell sx={cellStyle}>Vote Counter</TableCell>
                              <TableCell sx={cellStyle}>Position</TableCell>
                                <TableCell sx={cellStyle}>Actions</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                          {candidates.map((candidate, index) => (
                              <TableRow key={candidate.id}>
                                <TableCell>{ index + 1}</TableCell>
                                <TableCell>{candidate.id}</TableCell>
                                <TableCell>{candidate.name}</TableCell>
                                <TableCell>{candidate.party_name}</TableCell>
                                <TableCell>{candidate.vote_counter}</TableCell>
                                <TableCell>{candidate.position}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(candidate.id)}>Edit</Button>
                                    </TableCell>
                                 <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => onDelete(candidate.id)}>Delete</Button>
                                </TableCell>    
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
          </TableContainer> 
                    }
       
      </>
  )
}

export default CandidatePage;