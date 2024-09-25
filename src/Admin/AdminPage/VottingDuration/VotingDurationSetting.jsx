import React, { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    TextField,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from '@mui/material';
import { useApiCall } from '../../hooks/index.js';
import { convertTime } from '../../../utils/helpers/helpers.js';

const VotingDurationSetting = () => {
    const [duration, setDuration] = useState(null);
    const [durationId, setDurationId] = useState(null);
    const { fetchData, error, loading } = useApiCall();

    useEffect(() => {
        const fetchDuration = async () => {
            try {
                const res = await fetchData('/duration/get-duration');
                if (res.status === 200) {
                    const { startTime, endTime, id } = res;
                    setDurationId(id);
                    const scheduleTime = convertTime(startTime, endTime);
                    setDuration(scheduleTime);
                } else {
                    setDurationId(null);
                    setDuration(null);
                }
            } catch (error) {
                console.error("Error fetching duration:", error);
            }
        };
        fetchDuration();
    }, []);

    return (
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                        Voting Duration Setting
                    </Typography>
                </Grid>
                <Grid item xs={12} lg={8} sx={{ display: 'flex', backgroundColor: 'grey.200', borderRadius: '5px' }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
                            <Typography variant="h5" align="center" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                                Voting Duration
                            </Typography>
                            <TimeForm duration={duration} setDuration={setDuration} durationId={durationId} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

const TimeForm = ({ duration, setDuration, durationId }) => {
    const { fetchData, error, loading } = useApiCall();
    const [formData, setFormData] = useState({
        date: '',
        startHour: '10AM',
        startMinute: '0',
        endHour: '2PM',
        endMinute: '30',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetchData('/duration/add-duration', 'POST', formData);
            if (res.status === 200) {
                alert('Duration added successfully');
            } else {
                console.error("Failed to add duration:", res.message);
            }
        } catch (error) {
            console.error("Error adding duration:", error);
        }
    };

    const deleteDuration = async (id) => {
        try {
            const res = await fetchData('/duration/delete-duration', 'DELETE', { id });
            if (res.status === 200) {
                alert('Duration deleted successfully');
                setDuration(null); // Clear the duration
                setFormData({ // Clear form data
                    date: '',
                    startHour: '10AM',
                    startMinute: '0',
                    endHour: '2PM',
                    endMinute: '30',
                });
            } else {
                console.error("Failed to delete duration:", res.message);
            }
        } catch (error) {
            console.error("Error deleting duration:", error);
        }
    };

    const handleDeleteDuration = () => {
        if (durationId) {
            deleteDuration(durationId);
        } else {
            alert("No duration to delete");
        }
    };

    useEffect(() => {
        if (duration) {
            setFormData(duration);
        } else {
            setFormData({
                date: '',
                startHour: '10AM',
                startMinute: '0',
                endHour: '2PM',
                endMinute: '30',
            });
        }
    }, [duration]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Schedule Form
            </Typography>
            {loading && <CircularProgress color="secondary" />}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Typography>Date:</Typography>
                        <TextField
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography>Start Hour:</Typography>
                        <Select
                            label="Start Hour"
                            name="startHour"
                            value={formData.startHour}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {generateTimeOptions('AM')}
                            {generateTimeOptions('PM')}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography>Start Minute:</Typography>
                        <Select
                            label="Start Minute"
                            name="startMinute"
                            value={formData.startMinute}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {generateMinuteOptions()}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography>End Hour:</Typography>
                        <Select
                            label="End Hour"
                            name="endHour"
                            value={formData.endHour}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {generateTimeOptions('AM')}
                            {generateTimeOptions('PM')}
                        </Select>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography>End Minute:</Typography>
                        <Select
                            label="End Minute"
                            name="endMinute"
                            value={formData.endMinute}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {generateMinuteOptions()}
                        </Select>
                    </Grid>
                    <Grid item xs={12} lg={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteDuration} sx={{ ml: 2 }}>
                            Delete
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

// Helper functions
const generateTimeOptions = (period) => {
    const options = [];
    for (let i = 1; i <= 12; i++) {
        options.push(
            <MenuItem key={i} value={`${i}${period}`}>
                {i} {period}
            </MenuItem>
        );
    }
    return options;
};

const generateMinuteOptions = () => {
    const options = ['0', '5','10', '15','20','25', '30','35', '40', '45', '50', '55'];
    return options.map((minute) => (
        <MenuItem key={minute} value={minute}>
            {minute.padStart(2, '0')}
        </MenuItem>
    ));
};

export default VotingDurationSetting;
