import React,{ useState, useEffect } from 'react'
import { useApiCall } from '../../hooks'
import { Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CandidatePage from './CandidatePage';
import { FaPlus } from 'react-icons/fa';
import AddCandidateModal from './AddCandidateModal';

export default function Candidates() {
    const navigate = useNavigate();
    const { error, fetchData, isLoading } = useApiCall();
    const [candidates, setCandidates] = useState([]);
    const [open , setOpen] = useState(false);
    const getAllCandidates = async() => {
        const { candidates }  = await fetchData('/candidate/all-candidate', 'get');
        setCandidates(candidates); 
    }
    const onDelete = async (id) => {
    try {
        const response = await fetchData(`/candidate/delete-candidate-by-id`, "delete", '', {id:id} );
        if (response.status === 200) {
            getAllCandidates();
        }
    } catch (error) {
        alert('Error deleting user:', error);
        }
    };
        
    const handleEdit = async (id) => {
        navigate(`/admin/candidate/edit/${id}`);
    }
    const handleModalOpen = () => {
        setOpen(true);
    }
    const handleModalClose = () => {
        setOpen(false);
    }
    const handleAddCandidate = async (candidate) => {
        console.log(candidate);
        try {
            const response = await fetchData('/candidate/add-candidate', 'POST', candidate);
            if (response.status === 200) {
                alert(response.message);
                getAllCandidates();
            } else {
                alert('Failed to add candidate');
            }
        } catch (error) {
            console.error('Error adding candidate:', error);
        }
    }

    useEffect(() => {
        getAllCandidates();
        return () => {
            setCandidates([]);
        }
    }, []);
    return (
        <Container maxWidth="xl" >
            <h1 style={{ color: '#fff', textAlign: 'left', fontFamily: 'sans-serif' }}>Candidate Page</h1>
            <Button variant="contained" color="success" onClick={handleModalOpen} >Add Candidate {"  "} <FaPlus /></Button>
            {open && <AddCandidateModal open={open} handleClose={handleModalClose} handleAddCandidate={handleAddCandidate} />}
              <Grid container spacing={2} sx={{ backgroundColor: 'grey.200', p: 2 , borderRadius: '5px', height: '90vh', scrollBehavior: 'smooth', overflowX: 'auto' }}>
                <Grid item xs={12}>
                   { <CandidatePage candidates={candidates} handleEdit={handleEdit} onDelete={onDelete} isLoading={isLoading} error={error} />}
                </Grid>
              </Grid>
        </Container>
    )
}
