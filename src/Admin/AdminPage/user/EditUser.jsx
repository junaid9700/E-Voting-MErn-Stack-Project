import React,{ useState, useEffect } from 'react'
import { useParams } from 'react-router';
import { Alert, Container, Grid } from '@mui/material';
import { useApiCall } from '../../hooks';
import { EditUserPage } from './EditUserPage';
import { BackNavigation } from '../../../Dashboard/common/BackNavigation';
export default function EditUser() {
    const { error, fetchData, isLoading } = useApiCall();
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [isEditable, setIsEditable] = useState(false);
    const [editUser, setEditUser] = useState(user);
    const handleChange = (event) => {
        setEditUser({...editUser, [event.target.name]: event.target.value});
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(editUser);
      setUser(editUser);
      save(editUser);

        setIsEditable(false);
    };
  
    const getAllUser = async() => {
        const { data } = await fetchData(`/user/get-user/${id}`, 'get');
        setUser(data);
        setEditUser(data);
        console.log(data)
    }
  const save = async (editUser) => {
      try {
        const response = await fetchData(`/user/update/${id}`, 'post', editUser);
        console.log(response);
        response.status === 200 ? alert(response.message) : alert('Failed to update user');
        getAllUser();
      } catch (error) {
        console.error('Error updating user:', error);
      }
  }
  useEffect(() => {
        getAllUser();
        return () => {
            setUser({});
        }
    }, []);
  return (
     <Container maxWidth="xl" >
      {error && <Alert sx={{ mb: 2 }} severity="info">
        {error}
      </Alert>}
      <BackNavigation path={'/admin/user'} />
        <h1 style={{color: '#fff', textAlign: 'left', fontFamily: 'sans-serif' }}>Edit User Page</h1>
              <Grid container spacing={2} sx={{ backgroundColor: 'grey.200', p: 2 , borderRadius: '5px', height: '90vh', scrollBehavior: 'smooth', overflowX: 'auto' }}>
                <Grid item xs={12}>
                  <EditUserPage
                    user={user}
                    setIsEditable={setIsEditable}
                    setEditUser={setEditUser}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    error={error}
                    isLoading={isLoading}
                    editUser={editUser}
                    isEditable={isEditable}
                  />
                </Grid>
                {/* here we use pagination latter  */}
              </Grid>
        </Container>
  )
}
