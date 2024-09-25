import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import React from 'react';
import { Loader } from '../../../components/Loader';

const UserPage = ({ users, isLoading, error, onDelete, handleEdit }) => {
  const cellStyle = {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    fontWeight: 'bold',
    text: 'center',
  };

  console.log({ users });
  return (
    <>
      {isLoading ? (
        <Loader type={'circular'} />
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: '100%', overflowX: 'auto' }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={cellStyle}>NO</TableCell>
                <TableCell sx={cellStyle}>ID</TableCell>
                <TableCell sx={cellStyle}>First Name</TableCell>
                <TableCell sx={cellStyle}>Last Name</TableCell>
                <TableCell sx={cellStyle}>Father's Name</TableCell>
                <TableCell sx={cellStyle}>CNIC</TableCell>
                <TableCell sx={cellStyle}>Email</TableCell>
                <TableCell sx={cellStyle}>Number</TableCell>
                <TableCell
                  sx={{ fontSize: '14px', fontWeight: 'bold', text: 'center' }}
                >
                  Is Authorized
                </TableCell>
                <TableCell
                  sx={{ fontSize: '14px', fontWeight: 'bold', text: 'center' }}
                >
                  Voted for Presidential Candidates
                </TableCell>
                <TableCell
                  sx={{ fontSize: '14px', fontWeight: 'bold', text: 'center' }}
                >
                  Voted for Vice Presidential Candidates
                </TableCell>
                <TableCell sx={cellStyle}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{user?.id}</TableCell>
                  <TableCell>{user?.first_name}</TableCell>
                  <TableCell>{user?.last_name}</TableCell>
                  <TableCell>{user?.father_name}</TableCell>
                  <TableCell>{user?.cnic}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.number}</TableCell>
                  <TableCell>{user?.is_authorized ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    {user?.voted_for_presidential_candidates ?? 'null'}
                  </TableCell>
                  <TableCell>
                    {user?.voted_for_vice_presidential_candidates ?? 'nill'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleEdit(user.id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => onDelete(user.uid)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UserPage;
