import { Container, Grid,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import React from 'react'
// const users = [
//   {
//     id: 1,
//     name: 'John',
//     lastName: 'Doe',
//     fatherName: 'Michael Doe',
//     cnic: '12345-6789012-3',
//     email: 'john.doe@example.com',
//     number: '1234567890',
//     isAuthorized: true,
//     votedForPresidentialCandidates: 'Candidate A',
//     votedForVicePresidentialCandidates: 'Candidate B',
//   },
//   {
//     id: 2,
//     name: 'Jane',
//     lastName: 'Smith',
//     fatherName: 'Robert Smith',
//     cnic: '23456-7890123-4',
//     email: 'jane.smith@example.com',
//     number: '0987654321',
//     isAuthorized: false,
//     votedForPresidentialCandidates: 'Candidate C',
//     votedForVicePresidentialCandidates: '',
//   },
//   // Add more users as needed
// ];
const AdminPage = () => {
  return (
      <>
        <Container maxWidth="lg" >
        <h1 style={{color: '#fff'}}>Admin</h1>
              {/* here we will add users table to display all users edit them and delete them USING MUI*/}
              <Grid container spacing={2} sx={{ backgroundColor: 'grey.200', p: 2 , borderRadius: '5px', height: '80vh' }}>
                  <Grid item xs={12}>
                    <TableContainer component={Paper} sx={{  maxWidth: '100%', overflowX: 'auto',}}>
                        <Table stickyHeader>
                            <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Father's Name</TableCell>
                                <TableCell>CNIC</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Is Authorized</TableCell>
                                <TableCell>Voted for Presidential Candidates</TableCell>
                                <TableCell>Voted for Vice Presidential Candidates</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {users?.map((user) => (
                                <TableRow key={user?.id}>
                                <TableCell>{user?.id}</TableCell>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{user?.lastName}</TableCell>
                                <TableCell>{user?.fatherName}</TableCell>
                                <TableCell>{user?.cnic}</TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{user?.number}</TableCell>
                                <TableCell>{user?.isAuthorized ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{user?.votedForPresidentialCandidates}</TableCell>
                                <TableCell>{user?.votedForVicePresidentialCandidates}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleEdit(user.id)}>Edit</Button>
                                    </TableCell>
                                 <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                                </TableCell>    
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                  </Grid>
              </Grid>
              
          </Container>
      </>
  )
}

export default AdminPage