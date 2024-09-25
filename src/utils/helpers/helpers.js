export const convertTime = (start_time, end_time) => {
    // Convert the start_time and end_time to JavaScript Date objects
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);

    // Extract the date in the required format (YYYY-MM-DD)
    const date = startDate.toISOString().split('T')[0];

    // Extract hours and minutes from start_time
    const startHour = startDate.getUTCHours();
    const startMinute = startDate.getUTCMinutes();

    // Extract hours and minutes from end_time
    const endHour = endDate.getUTCHours();
    const endMinute = endDate.getUTCMinutes();

    // Convert hours to 12-hour format and add AM/PM
    const formatHour = (hour) => {
        const period = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${formattedHour}${period}`;
    };

    return {
        date,
        startHour: formatHour(startHour),
        startMinute: startMinute.toString(),
        endHour: formatHour(endHour),
        endMinute: endMinute.toString(),
    };
};
// Helper function to check end time and calculate time difference
export function getTimeRemaining(endTime) {
    const currentTime = new Date().getTime();

    // If end time is less than the current time, return false
    if (endTime < currentTime) {
        return false;
    }

    // Calculate the difference between end time and current time
    const timeLeft = endTime - currentTime;

    // Return the time difference
    return timeLeft;
}

