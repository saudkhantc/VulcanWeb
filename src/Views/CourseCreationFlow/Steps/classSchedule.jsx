import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Checkbox, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { ShowErrorToast } from '../../Common/Toast/toast';
import { StepsHeader } from '../../Common/StepsHeader/stepsHeader';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ClassScheduleTitle, ErrorBlockSmall } from '../styles';
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { Loader } from '../../Common/loader';
import {
    decrementCoursesSteps,
    incrementCoursesSteps,
    resetCoursesSteps,
} from '../../../Infrastructure/States/coursesStepsSlice';
import { TimePicker, DatePicker } from '@mui/x-date-pickers';
import { StepsFooter } from '../../Common/StepsFooter/stepsFooter';
import { httpsCallable } from '@firebase/functions';
import { functions } from '../../../Infrastructure/config';
import { useTheme } from '@mui/material/styles';
import { setCourseDetails } from '../../../Infrastructure/States/courseDetailsSlice';

export const ClassSchedule = ({ isDashboard = true }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state.userData.data)
    const courses = userData?.educator?.courses
    const coursesArray = courses ? Object.entries(courses) : [];
    const course = useSelector((state) => state.course.courseDetails)
    const courseId = course?.courseId || null
    const classSchedule = course?.course?.courseDetails?.class_schedule;
    const firstClassScheduleKey = classSchedule && Object.keys(classSchedule)[0];
    const firstClassSchedule = classSchedule && classSchedule[firstClassScheduleKey];
    const first_class = firstClassSchedule?.first_class;
    const course_times = firstClassSchedule?.times;

    const utcFirstClass = first_class ? dayjs(first_class.replace(/'/g, '') * 1000) : null;
    const [firstClass, setFirstClass] = useState(utcFirstClass || null);
    const courseSteps = useSelector((state) => state.courseSteps.courseSteps);
    const loading = useSelector((state) => state.userData.loading);
    const course_duration = firstClassSchedule?.duration;
    const [duration, setDuration] = useState(course_duration || '');
    const handleExit = () => {
        try {
            setIsLoading(true)
            saveTimes();
            dispatch(resetCoursesSteps());
            navigate('/dashboard');
        } catch (error) {
            // console.log(error)
        } finally {
            setIsLoading(false)
        }
    };
    const handleDec = async () => {
        if (courseSteps > 1) {
            try {
                setIsLoading(true)
                await saveTimes();
                const course = userData?.educator?.courses[courseId ? courseId : ''];
                if (course) {
                    dispatch(setCourseDetails({ course, courseId }));
                }
                dispatch(decrementCoursesSteps());
            } catch (error) {
                ShowErrorToast(error);
            } finally {
                setIsLoading(false)
            }
        }
    };
    const handleInc = async () => {
        if (courseSteps > 1) {
            setError(null)
            if (
                duration === null || duration === '' ||
                parseInt(duration, 10) === 0 ||
                parseInt(duration, 10) > 26
            ) {
                setError('Duration must be a number between 1 and 26 weeks.');
                return;
            }
            if (firstClass === null || firstClass === '') {
                setError('First class date is required');
                return;
            }
            const isAtLeastOneDaySelected = Object.values(formData).some(
                (day) => day.checked
            );
            if (!isAtLeastOneDaySelected) {
                setError('Please select at least one day.');
                return;
            }
            const firstClassDay = firstClass.format('dddd').toLowerCase();
            const selectedDay = Object.keys(formData).find(
                (day) => formData[day].checked
            );
            if (selectedDay && firstClassDay !== selectedDay) {
                setError('Selected day for times must match the day of the first class.');
                return;
            }
            for (const day in formData) {
                if (
                    formData[day].checked &&
                    (!formData[day].start || !formData[day].end)
                ) {
                    setError(
                        `Fill both start and end times for ${day.charAt(0).toUpperCase() + day.slice(1)
                        }`
                    );
                    return;
                }
                const start = dayjs(formData[day].start);
                const end = dayjs(formData[day].end);
                if (formData[day].checked && end.isBefore(start)) {
                    setError(
                        `End time must be after start time for ${day.charAt(0).toUpperCase() + day.slice(1)
                        }`
                    );
                    return;
                }
                // Check if the gap between start and end times is greater than 30 minutes
                const timeGapHours = end.diff(start, 'hours');
                if (formData[day].checked && timeGapHours > 3) {
                    setError(`Gap between start and end times for ${day.charAt(0).toUpperCase() + day.slice(1)} should not be greater than 3 hours.`);
                    return;
                }
                // Check if the gap between start and end times is greater than 30 minutes
                const timeGapMinutes = end.diff(start, 'minutes');
                if (formData[day].checked && timeGapMinutes < 30) {
                    setError(`Gap between start and end times for ${day.charAt(0).toUpperCase() + day.slice(1)} should not be less than 30 minutes.`);
                    return;
                }

            }
            const times = {};
            const firstClassString = JSON.stringify(firstClass.unix());
            for (const day in formData) {
                if (formData[day].checked) {
                    const unixStartTimeStamp = Math.floor(new Date(formData[day]?.start).getTime() / 1000);
                    const unixEndTimeStamp = Math.floor(new Date(formData[day]?.end).getTime() / 1000);
                    times[day] = {
                        start: unixStartTimeStamp,
                        end: unixEndTimeStamp
                    };
                }
            }
            setError('');
            setIsLoading(true)
            try {
                const updateClassScheduleStep = httpsCallable(
                    functions,
                    'updateclassschedulestep'
                );
                await updateClassScheduleStep({ firstClassString, duration, times, courseId, status: "pending", classId: firstClassScheduleKey, classStatus: "pending" });
                const course = userData?.educator?.courses[courseId ? courseId : ''];
                if (course) {
                    dispatch(setCourseDetails({ course, courseId }));
                }
                setError('');
            } catch (error) {
                setError(`Error: ${error.message}`);

            } finally {
                setIsLoading(false)
                dispatch(incrementCoursesSteps());

            }
        }
    };
    const [formData, setFormData] = useState({
        monday: { start: '', end: '', checked: false },
        tuesday: { start: '', end: '', checked: false },
        wednesday: { start: '', end: '', checked: false },
        thursday: { start: '', end: '', checked: false },
        friday: { start: '', end: '', checked: false },
        saturday: { start: '', end: '', checked: false },
        sunday: { start: '', end: '', checked: false },
    });
    const handleCheckboxChange = (day) => {
        setFormData({
            ...formData,
            [day]: {
                ...formData[day],
                checked: !formData[day].checked,
            },
        });
    }
    const handleTimeChange = (day, field, value) => {
        const formattedValue = value?.format("YYYY-MM-DDTHH:mm");
        setFormData((prevFormData) => ({
            ...prevFormData,
            [day]: {
                ...prevFormData[day],
                [field]: formattedValue,
            },
        }));
    };
    const handleDurationChange = (e) => {
        const newValue = e.target.value.replace(/[^0-9]/g, '');
        const newDuration = newValue ? Math.min(parseInt(newValue, 10), 26) : '';
        setDuration(newDuration);
    };
    const incrementDuration = () => {
        setDuration((prevDuration) => Math.min(prevDuration + 1, 26));
    };
    const decrementDuration = () => {
        setDuration((prevDuration) => Math.max(prevDuration - 1, 1));
    };
    const saveTimes = async () => {
        setError(null)
        if (
            duration === '' ||
            parseInt(duration, 10) === 0 ||
            parseInt(duration, 10) > 26
        ) {
            setError('Duration must be a number between 1 and 26 weeks.');
            return;
        }
        if (firstClass === null || firstClass === '') {
            setError('First class date is required');
            return;
        }
        const isAtLeastOneDaySelected = Object.values(formData).some(
            (day) => day.checked
        );
        if (!isAtLeastOneDaySelected) {
            setError('Please select at least one day.');
            return;
        }
        const firstClassDay = firstClass.format('dddd').toLowerCase();
        const selectedDay = Object.keys(formData).find(
            (day) => formData[day].checked
        );
        if (selectedDay && firstClassDay !== selectedDay) {
            setError('Selected day for times must match the day of the first class.');
            return;
        }
        for (const day in formData) {
            if (
                formData[day].checked &&
                (!formData[day].start || !formData[day].end)
            ) {
                setError(
                    `Fill both start and end times for ${day.charAt(0).toUpperCase() + day.slice(1)
                    }`
                );
                return;
            }
            const start = dayjs(formData[day].start);
            const end = dayjs(formData[day].end);
            if (formData[day].checked && end.isBefore(start)) {
                setError(
                    `End time must be after start time for ${day.charAt(0).toUpperCase() + day.slice(1)
                    }`
                );
                return;
            }
            // Check if the gap between start and end times is greater than 3 hours
            const timeGapHours = end.diff(start, 'hours');
            if (formData[day].checked && timeGapHours > 3) {
                setError(`Gap between start and end times for ${day.charAt(0).toUpperCase() + day.slice(1)} should not be greater than 3 hours.`);
                return;
            }
        }
        const times = {};
        const firstClassString = JSON.stringify(firstClass.unix());
        for (const day in formData) {
            if (formData[day].checked) {
                const unixStartTimeStamp = Math.floor(new Date(formData[day]?.start).getTime() / 1000);
                const unixEndTimeStamp = Math.floor(new Date(formData[day]?.end).getTime() / 1000);
                times[day] = {
                    start: unixStartTimeStamp,
                    end: unixEndTimeStamp
                };
            }
        }

        setError('');
        try {
            const updateClassScheduleStep = httpsCallable(
                functions,
                'updateclassschedulestep'
            );
            await updateClassScheduleStep({ firstClassString, duration, times, courseId, status: "pending", classId: firstClassScheduleKey, classStatus: "pending" });
            setError('');
        } catch (error) {
            setError(`Error: ${error.message}`);
        }
    };
    useEffect(() => {
        first_class && setFirstClass(dayjs(firstClass) || '');
        // Check if course_times exists and is an object
        if (course_times && typeof course_times === 'object') {
            const updatedFormData = { ...formData };
            for (const day in formData) {
                if (course_times[day]) {
                    updatedFormData[day] = {
                        start: dayjs(course_times[day].start * 1000).format('YYYY-MM-DDTHH:mm'),
                        end: dayjs(course_times[day].end * 1000).format('YYYY-MM-DDTHH:mm'),
                        checked: true,
                    };
                }
            }
            setFormData(updatedFormData);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };
    return (
        <Box height={'100vh'}>
            {isDashboard && <StepsHeader steps={courseSteps} handleExit={handleExit} />}

            <Box height={isDashboard ? '100px' : '50px'}></Box>
            <form>
                {loading || isLoading ? (
                    <Loader />
                ) : (
                    <Box>
                        {isDashboard &&
                            <Box
                                px={{ lg: 10, sm: 4, xs: 1 }}
                                sx={{
                                    width: {
                                        lg: '80%',
                                        md: '80%',
                                        sm: '100%',
                                        xs: '100%',
                                    },
                                }}
                            >
                                <ClassScheduleTitle>
                                    Pick the class schedule for your first cohort. You wil be able
                                    to add more cohorts once the course is accepted, You can pick
                                    any times and days that work for you. For most courses, we
                                    recommend 1-2 hours per day, 2-3 days per week, and a duration
                                    of 8-16 weeks. However, choose the schedule that works for you
                                    and fits your course the best.
                                </ClassScheduleTitle>
                            </Box>
                        }
                        <Grid
                            container
                            py={isDashboard && 5}
                            justifyContent={'center'}
                            px={{ lg: isDashboard && 10, sm: 4, xs: 1 }}
                        >
                            <Grid lg={5} md={10} sm={12} xs={12} mb={{ sm: 3, xs: 3, md: 4 }}>
                                <Box
                                    sx={{
                                        display: {
                                            xs: 'flex',
                                            sm: 'flex',
                                            md: 'flex',
                                            lg: 'block',
                                        },
                                        flexDirection: {
                                            xs: 'column',
                                            sm: 'row',
                                            md: 'row',
                                            lg: 'row',
                                        },
                                        justifyContent: {
                                            xs: 'space-between',
                                            sm: 'space-between',
                                            md: 'space-between',
                                        },
                                        width: { xs: '100%', sm: '100%', md: '100%', lg: '50%' },
                                    }}
                                    gap={1}
                                >
                                    <Box pt={3} width={'100%'}>
                                        <Typography variant='body1' color='initial' pb={2}>
                                            Date of first class:
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                variant='outlined'
                                                label='Date of first class'
                                                value={firstClass}
                                                onChange={(newValue) => setFirstClass(newValue)}
                                                disablePast
                                                fullWidth
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                    <Box pt={3} width={'100%'}>
                                        <Typography variant='body1' color='initial' pb={2}>
                                            Course Duration:
                                        </Typography>
                                        <TextField
                                            id='outlined-number'
                                            label='Weeks'
                                            type='number'
                                            fullWidth
                                            variant='outlined'
                                            onChange={handleDurationChange}
                                            value={duration}
                                            InputProps={{
                                                onKeyPress: (event) => {
                                                    if (
                                                        isNaN(event.key) ||
                                                        (event.key === '-' && event.code === 'ArrowDown')
                                                    ) {
                                                        event.preventDefault();
                                                    }
                                                },
                                                endAdornment: (
                                                    <InputAdornment position='end'>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection: 'column',
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                width: '10px',
                                                                height: '30px',
                                                                fontWeight: 'bold',
                                                            }}
                                                        >
                                                            <IoIosArrowUp
                                                                onClick={incrementDuration}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    fontSize: '20px',
                                                                    ':hover': { color: 'secondary' },
                                                                }}
                                                            />
                                                            <IoIosArrowDown
                                                                onClick={decrementDuration}
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    fontSize: '20px',
                                                                    hover: { color: 'primary' },
                                                                }}
                                                            />
                                                        </Box>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Box>
                                    {isDashboard ? '' :
                                        <Box pt={3} width={'100%'}>
                                            <Typography variant='body1' color='initial' pb={2}>
                                                Select Course
                                            </Typography>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-label"
                                                    id="demo-simple-select"
                                                    value={title}
                                                    label="Select Course"
                                                    onChange={handleChange}
                                                >
                                                    {coursesArray.map(([courseId, courseDetails]) => (
                                                        <MenuItem key={courseId} value={courseId}>{courseDetails?.courseDetails?.basics?.title}</MenuItem>
                                                    ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    }

                                </Box>
                            </Grid>
                            <Grid lg={7} md={10} sm={12} xs={12}>
                                <Box>
                                    {Object.keys(formData).map((day) => (
                                        <Box
                                            key={day}
                                            display={'flex'}
                                            alignItems={'center'}
                                            mb={1}
                                            width={'100%'}
                                        >
                                            <Checkbox
                                                checked={formData[day]?.checked}
                                                onChange={() => handleCheckboxChange(day)}
                                                style={{
                                                    height: '30px',
                                                    width: '30px',
                                                    cursor: 'pointer',
                                                    color: theme.palette.primary.main,
                                                }}
                                            />
                                            <Box
                                                display={'flex'}
                                                alignItems={'center'}
                                                justifyContent={'center'}
                                                sx={{
                                                    border: '1px solid',
                                                    flexDirection: {
                                                        xs: 'column',
                                                        md: 'row',
                                                        lg: 'row',
                                                        xl: 'row',
                                                    },
                                                }}
                                                gap={2}
                                                ml={2}
                                                px={1}
                                                width={'100%'}
                                            >
                                                <Box
                                                    sx={{ width: { sm: '100%', md: '20%', lg: '20%' } }}
                                                >
                                                    <Typography
                                                        variant='body1'
                                                        color='initial'
                                                        textAlign={'center'}
                                                        px={2}
                                                    >
                                                        {day.charAt(0).toUpperCase() + day.slice(1)}:
                                                    </Typography>
                                                </Box>
                                                <Box
                                                    display={'flex'}
                                                    justifyContent={'space-between'}
                                                    flexDirection={{
                                                        xs: 'column',
                                                        sm: 'row',
                                                        md: 'row',
                                                        lg: 'row',
                                                    }}
                                                    pb={1}
                                                    sx={{
                                                        width: {
                                                            xs: '100%',
                                                            sm: '80%',
                                                            md: '80%',
                                                            lg: '80%',
                                                        },
                                                        gap: {
                                                            xs: 0,
                                                            sm: 2,
                                                            md: 2,
                                                            lg: 2,
                                                            xl: 2,
                                                        },
                                                    }}
                                                >
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <TimePicker
                                                                label='Start Time'
                                                                value={formData[day]?.start ? dayjs(formData[day].start) : null}
                                                                onChange={(value) =>
                                                                    handleTimeChange(day, 'start', value)
                                                                }
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>

                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer components={['DatePicker']}>
                                                            <TimePicker
                                                                label='End Time'
                                                                value={formData[day]?.end ? dayjs(formData[day].end) : null}
                                                                onChange={(value) =>
                                                                    handleTimeChange(day, 'end', value)
                                                                }
                                                                style={{
                                                                    '& .MuiIconButton-root': { fontSize: '16px' },
                                                                }}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}
                                </Box>
                                <ErrorBlockSmall sx={{ textAlign: 'center' }}>
                                    {error}
                                </ErrorBlockSmall>
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {isDashboard && <StepsFooter
                    handleContinueClick={handleInc}
                    step5Error={error}
                    selectedDates={formData}
                    handleDec={handleDec}
                />
                }
                {isDashboard && <Box height={'100px'}></Box>}
            </form>
        </Box>
    );
};