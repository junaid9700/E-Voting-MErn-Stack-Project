import React,{ useState, useEffect } from 'react'
import { useApiCall } from '../../hooks'
import UserPage from './UserPage';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function User() {
    const navigate = useNavigate();
    const { error, fetchData, isLoading } = useApiCall();
    const [users, setUsers] = useState([]);
    const getAllUser = async() => {
        const {users}  = await fetchData('/user/all-user', 'get');
        console.log(users)
        setUsers(users); 
    }
    const onDelete = async (uid) => {
    try {
        console.log(uid);
        const response = await fetchData(`/user/delete/${uid}`, 'delete');
        getAllUser();
    } catch (error) {
        console.error('Error deleting user:', error);
        }
    };
        
    const handleEdit = async (id) => {
        navigate(`/admin/user/edit/${id}`);
        return;
    }
    useEffect(() => {
        getAllUser();
        return () => {
            setUsers([]);
        }
    }, []);
    return (
       <Container maxWidth="xl" >
        <h1 style={{color: '#fff', textAlign: 'left', fontWeight: 'bold', fontFamily: 'sans-serif'}}>Users</h1>
              <Grid container spacing={2} sx={{ backgroundColor: 'grey.200', p: 2 , borderRadius: '5px', height: '90vh', scrollBehavior: 'smooth', overflowX: 'auto' }}>
                <Grid item xs={12}>
                   { <UserPage users={users} handleEdit={handleEdit} onDelete={onDelete} isLoading={isLoading} error={error} />}
                </Grid>
                {/* here we use pagination latter  */}
              </Grid>
        </Container>
    )
}
