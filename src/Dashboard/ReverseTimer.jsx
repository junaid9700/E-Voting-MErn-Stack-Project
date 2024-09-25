import { useState, useEffect } from 'react';
import { useApiCall } from "../Admin/hooks/index.js";

export function useReverseTimer() {
    const [timeLeft, setTimeLeft] = useState(null);
    const [formattedTime, setFormattedTime] = useState('Loading...');
    const { fetchData } = useApiCall();

    useEffect(() => {
        const fetchEndTime = async () => {
            try {
                const response = await fetchData('/duration/get-duration');
                const data = await response.endTime;

                const endTime = new Date(data);

                // Subtract 5 hours (5 hours * 60 minutes * 60 seconds * 1000 milliseconds)
                const adjustedEndTime = new Date(endTime.getTime() - (5 * 60 * 60 * 1000));
                const initialTimeLeft = calculateTimeLeft(adjustedEndTime);
                setTimeLeft(initialTimeLeft);
            } catch (error) {
                console.error('Error fetching end time:', error);
                setFormattedTime("00:00:00");
                setTimeLeft(null);
            }
        };

        fetchEndTime();
    }, []);

    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0) {
            setFormattedTime('00:00:00');
            return;
        }

        const timerInterval = setInterval(() => {
            const newTimeLeft = timeLeft - 1000;

            if (newTimeLeft <= 0) {
                clearInterval(timerInterval);
                setFormattedTime('00:00:00');
                alert('The countdown has ended!');
            } else {
                setTimeLeft(newTimeLeft);
                setFormattedTime(formatTime(newTimeLeft));
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [timeLeft]);

    return { timer: formattedTime, timeLeft };
}

function calculateTimeLeft(endTime) {
    const currentTime = new Date().getTime();
    const timeLeft = endTime - currentTime;
    return timeLeft > 0 ? timeLeft : 0;
}

function formatTime(timeLeft) {
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return (
        String(hours).padStart(2, '0') + ":" +
        String(minutes).padStart(2, '0') + ":" +
        String(seconds).padStart(2, '0')
    );
}
