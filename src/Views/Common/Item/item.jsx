import { Box, Button, Typography } from "@mui/material"
import { ClassCard, CourseCard } from "../../EducatorDashboard/styles"

export const Item = ({ courseTitle, classItem, status, onClick, classDetails }) => {
  const coursetimes = classDetails?.times
  const first_class = classDetails?.first_class
  const courseDuration = classDetails?.duration
  const timestampInMilliseconds = first_class && first_class * 1000
  const date = first_class && new Date(timestampInMilliseconds);
  const statusLabels = {
    'in_progress': 'In Progress',
    'archived': 'Archived',
    'pending': 'Pending',
    'active': 'Active',
    'denied': 'Denied',
  };
  const buttonLabels = {
    'in_progress': 'Resume',
    'archived': classItem ? 'Details' : 'Summary',
    'pending': classItem ? 'Details' : 'Summary',
    'active': classItem ? 'Details' : 'Summary',
    'denied': classItem ? 'Details' : 'Summary',
  };
  const weekday = first_class && new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
  }).format(date);
  const month = first_class && new Intl.DateTimeFormat('en-US', {
    month: 'numeric',
  }).format(date);
  const formatSchedule = () => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const scheduleArray = [];
    // if (coursetimes) {
    //   Object.entries(coursetimes).forEach(([day, { start, end }]) => {
    //     const formattedStart = convertToLocalStartTime(start, timezone);
    //     const formattedEnd = convertToLocalEndTime(end, timezone);
    //     const hasMinutes = formattedStart.includes(':') || formattedEnd.includes(':');
    //     const formattedTime = hasMinutes
    //       ? `${formattedStart}-${formattedEnd}`
    //       : `${formattedStart.split(':')[0]}-${formattedEnd.split(':')[0]}`;
    //     const dayName = day.substring(0, 1).toUpperCase() + day.substring(1);
    //     scheduleArray.push({
    //       time: `${dayName} @ ${formattedTime}`,
    //       days: [dayName]
    //     });
    //   });
    //   return scheduleArray;
    // }
    if (coursetimes) {
      const orderedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
      orderedDays.forEach(day => {
        if (Object.prototype.hasOwnProperty.call(coursetimes, day)) {
          const { start, end } = coursetimes[day];
          const formattedStart = convertToLocalStartTime(start, timezone);
          const formattedEnd = convertToLocalEndTime(end, timezone);
          const hasMinutes = formattedStart.includes(':') || formattedEnd.includes(':');
          const formattedTime = hasMinutes
            ? `${formattedStart}-${formattedEnd}`
            : `${formattedStart.split(':')[0]}-${formattedEnd.split(':')[0]}`;
          const dayName = day.substring(0, 1).toUpperCase() + day.substring(1);
          scheduleArray.push({
            time: `${dayName} @ ${formattedTime}`,
            days: [dayName]
          });
        }
      });
    
      return scheduleArray;
    }
    

    return [];
  };
  const convertToLocalStartTime = (timestamp, userTimezone) => {
    const date = new Date(timestamp * 1000);
    const options = { hour12: true, hour: 'numeric', minute: 'numeric', timeZone: userTimezone };
    return date.toLocaleString('en-US', options);
  };
  const convertToLocalEndTime = (timestamp, userTimezone) => {
    const date = new Date(timestamp * 1000);
    const options = { hour12: true, hour: 'numeric', minute: 'numeric', timeZoneName: 'short', timeZone: userTimezone };
    return date.toLocaleString('en-US', options);
  };
  const timesScheduled = formatSchedule()
  return (
    <>
      {classItem ?
        (<ClassCard position='relative' >
          <Box>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", textTransform: 'capitalize' }} color={'secondary'}>{courseTitle}</Typography>
          </Box>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} color={'primary'}>{statusLabels[status]}</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} color={'primary'}>First Class: {weekday}/{month}</Typography>
          <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} color={'primary'}>Course Duration: {courseDuration}</Typography>
          {timesScheduled.map((data) => (
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} color={'primary'}>{data.time}</Typography>
          ))}
          {status !== '' && (
            <Button variant='contained' type='button' sx={{ textTransform: 'capitalize', mt: 2 }} onClick={onClick}>{buttonLabels[status]}</Button>
          )}
        </ClassCard>
        ) : (
          <CourseCard position='relative'>
            <Box>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold", textTransform: 'capitalize' }} color={'secondary'}>{courseTitle}</Typography>
            </Box>
            <Typography sx={{ fontSize: "16px", fontWeight: "bold" }} color={'primary'}>{statusLabels[status]}</Typography>

            {status !== '' && (
              <Button variant='contained' type='button' sx={{ textTransform: 'capitalize' }} onClick={onClick}>{buttonLabels[status]}</Button>
            )}
          </CourseCard>)
      }
    </>
  )
}