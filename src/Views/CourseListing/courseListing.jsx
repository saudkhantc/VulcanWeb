import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import DoneIcon from '@mui/icons-material/Done';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Box, Rating, Typography, Button } from '@mui/material'
import { specialFont } from '../../Infrastructure/Theme/fontFamily'
import courseVector from '../../Assets/Images/courseVector.png'
import profileVector from '../../Assets/Images/vector.png'
import { Loader } from '../Common/loader';
import { FaArrowLeft } from 'react-icons/fa';
import { cleanCourseState, setCourseDetails } from '../../Infrastructure/States/courseDetailsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import useAuthentication from '../../Infrastructure/States/onAuthStateChange';

export const CourseListing = ({ live, dashboardState, setCourse, isCoursePage }) => {
    const data = useParams()
    const theme = useTheme()
    const boxRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userId } = useAuthentication()
    const paramsTitle = data && data?.title && data?.title.replaceAll('-', ' ')
    const coursesData = useSelector((state) => state.userData.coursesData)
    const userData = useSelector((state) => state.userData.data)
    const loading = useSelector((state) => state.userData.loading)
    const course = useSelector((state) => state.course.courseDetails)
    const isEnrolled = Object.values(userData?.student?.courses ?? {}).some(course => {
        return course.courseId === course?.courseId;
    }) ? "enrolled" : "notEnrolled";
    const avatar = course?.course?.user?.profile?.avatar ? course?.course?.user?.profile?.avatar : userData?.educator?.profile?.avatar
    const firstName = course?.course?.user?.account?.first_name ? course?.course?.user?.account?.first_name : userData?.account?.first_name
    const lastName = course?.course?.user?.account?.last_name ? course?.course?.user?.account?.last_name : userData?.account?.last_name
    const title = course?.course?.courseDetails?.basics?.title
    const cost = course?.course?.courseDetails?.basics?.cost
    const classSchedule = course?.course?.courseDetails?.class_schedule;
    const firstClassScheduleKey = classSchedule && Object.keys(classSchedule)[0];
    const firstClassSchedule = classSchedule && classSchedule[firstClassScheduleKey];
    const first_class = firstClassSchedule?.first_class
    const duration = firstClassSchedule?.duration
    const courseClassTimes = firstClassSchedule?.times
    const objectives = course?.course?.courseDetails?.intended_learner?.objectives
    const prerequisites = course?.course?.courseDetails?.intended_learner?.prerequisites
    const intended_learner = course?.course?.courseDetails?.intended_learner?.description
    const courseImage = course?.course?.courseDetails?.details?.course_image
    const description = course?.course?.courseDetails?.details?.description
    const curriculum = course?.course?.courseDetails?.curriculum?.sections
    const timestampInMilliseconds = first_class && first_class * 1000
    const date = first_class && new Date(timestampInMilliseconds)
    const stripeAccId = course?.course?.user?.stripe?.stripe_account_id
    const instructor = course?.course?.user?.account?.first_name + " " + course?.course?.user?.account?.last_name
    const instructorId = course?.course?.instructorId
    const firstClassKey = classSchedule && Object.keys(classSchedule)[0];
    const firstClassCohort = classSchedule && classSchedule[firstClassKey]?.cohort;

    const courseId = course?.courseId
    const handleClick = () => {
        boxRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const weekday = first_class && new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
    }).format(date);
    const month = first_class && new Intl.DateTimeFormat('en-US', {
        month: 'numeric',
    }).format(date);
    const formatSchedule = () => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (courseClassTimes) {
            const dayGroups = {};
            Object.entries(courseClassTimes).forEach(([day, { start, end }]) => {
                const formattedStart = convertToLocalStartTime(start, timezone);
                const formattedEnd = convertToLocalEndTime(end, timezone);
                const hasMinutes = formattedStart.includes(':') || formattedEnd.includes(':');
                const formattedTime = hasMinutes
                    ? `${formattedStart}-${formattedEnd}`
                    : `${formattedStart.split(':')[0]}-${formattedEnd.split(':')[0]}`;
                if (!dayGroups[day]) {
                    dayGroups[day] = [];
                }
                dayGroups[day].push(formattedTime);
            });
    
            // Sort the days (keys) of dayGroups
            const sortedDays = Object.keys(dayGroups).sort((dayA, dayB) => {
                const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
            });
    
            const formattedSchedule = sortedDays.map(day => {
                const capitalizedDay = day.substring(0, 3).toUpperCase();
                const scheduleForDay = dayGroups[day].join(' / ');
                return `${capitalizedDay}: ${scheduleForDay}`;
            });
    
            return formattedSchedule;
        }
        return ['No schedule available'];
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
    const classScheduleFunction = () => {
        const classSchedulesJSX = [];
        classSchedule && Object.entries(classSchedule).forEach(([classId, classDetails]) => {
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            // Extract class details and set timing
            const { first_class, times } = classDetails;
            const timestampInMilliseconds = first_class && first_class * 1000
            const date = first_class && new Date(timestampInMilliseconds);
            const weekday = first_class && new Intl.DateTimeFormat('en-US', {
                day: 'numeric',
            }).format(date);
            const month = first_class && new Intl.DateTimeFormat('en-US', {
                month: 'numeric',
            }).format(date);

            const formattedTimes = [];
            const dayOrderMap = {
                'monday': 1,
                'tuesday': 2,
                'wednesday': 3,
                'thursday': 4,
                'friday': 5,
                'saturday': 6,
                'sunday': 7
            };

            Object.entries(times).forEach(([day, { start, end }]) => {
                const formattedStart = convertToLocalStartTime(start, timezone);
                const formattedEnd = convertToLocalEndTime(end, timezone);
                formattedTimes.push([day, `${formattedStart} - ${formattedEnd}`]);
            });

            // Sort the formattedTimes array based on the day order
            formattedTimes.sort(([dayA], [dayB]) => {
                return dayOrderMap[dayA] - dayOrderMap[dayB];
            });

            // Construct JSX element for the class schedule
            const classScheduleJSX = (
                <Box key={classId} display={'flex'} flexDirection={{ xs: 'column', sm: 'row' }} width={'100%'} alignItems={'center'} py={3} gap={4} borderBottom={'2px solid lightgray'} >
                    <Box display={'flex'} flexDirection={'column'} gap={2} width={{ sm: '60%' }}>
                        <Typography textTransform={'capitalize'} variant="h6" color={'primary'} sx={{ fontWeight: '500', fontSize: '22px' }}>Start Date: <span style={{ fontWeight: '800' }}> {weekday}/{month} </span></Typography>
                        {formattedTimes.map((time, index) => (
                            <Box textTransform={'capitalize'} key={index}>
                                <Typography component="span" textTransform={'capitalize'} variant="h6" sx={{ fontWeight: '900', fontSize: '20px' }}>
                                    {time[0]}
                                </Typography>
                                :
                                <Typography component="span" textTransform={'capitalize'} variant="h6" sx={{ fontWeight: '600', fontSize: '18px' }}>
                                    {time[1]}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                    <Box width={{ sm: '40%' }}>
                        <Button variant="contained" color="primary"
                            sx={{
                                '&:hover': {
                                    cursor: live ? 'pointer' : 'not-allowed',
                                },
                                pointerEvents: live ? 'auto' : 'none',
                            }}
                            // onClick={isEnrolled === "enrolled" ? null : handleEnroll}
                            onClick ={handleEnroll}
                        >
                            {isEnrolled === "enrolled" ? "Already Enrolled" : "Enroll Now"}
                        </Button>
                    </Box>
                </Box>
            );
            classSchedulesJSX.push(classScheduleJSX);
        });
        return classSchedulesJSX;
    }
    const classTimes = formatSchedule()
    const orderData = {
        stripe_acc_id: stripeAccId,
        cohort_id: firstClassCohort,
        duration: duration,
        start_date: first_class,
        times: courseClassTimes,
        course_title: title,
        student_id: userId,
        course_id: courseId,
        instructor: instructor,
        instructorId,
        cost
    }
    const handleEnroll = () => {
        navigate(`/enroll`, { state: orderData });
    }
    useEffect(() => {
        if (course?.courseId && userData && userData.educator && userData.educator.courses) {
            let newCourseId = course?.courseId;
            const courseData = userData.educator?.courses[newCourseId ? newCourseId : ''];
            if (courseData) {
                dispatch(setCourseDetails({ course: courseData, courseId: newCourseId }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        if (paramsTitle && coursesData && Object.keys(coursesData).length > 0) {
            const foundCourse = Object.values(coursesData).find(course => course?.courseDetails?.basics?.title === paramsTitle)
            if (foundCourse) {
                const courseId = Object.keys(coursesData).find(key => coursesData[key] === foundCourse)
                dispatch(setCourseDetails({ course: foundCourse, courseId: courseId }));
            } else {
                navigate('*')
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coursesData, paramsTitle])

    return (
        <Box minHeight={'100vh'}>
            {
                loading ? <Loader /> :
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: {
                                xs: 'column',
                                sm: 'column',
                                md: 'row',
                                lg: 'row',
                                xl: 'row',
                            },
                            alignItems: { xs: "center", sm: "center", md: "start" },
                            position: 'relative',
                            mx: { xs: 1, sm: 1, md: 0, lg: 0, xl: 0 },
                            pb: 2,
                            minHeight: "100vh"
                        }}
                    >
                        <Box
                            position={dashboardState ? { md: "sticky", lg: "sticky", xl: "sticky" } : { md: 'fixed', lg: "fixed", xl: "fixed" }}
                            top={dashboardState ? '0px' : { md: '97px', lg: '97px', xl: '97px' }}
                            left={dashboardState ? '0px' : { md: '40px', lg: '40px', xl: '40px' }}
                        >
                            {
                                dashboardState &&
                                <Box sx={{ cursor: 'pointer', display: 'inline-block', width: "100%" }}><FaArrowLeft
                                    onClick={() => { setCourse(null); dispatch(cleanCourseState()); }}
                                /></Box>
                            }
                            <Box
                                sx={{
                                    mb: 2,
                                    mt: dashboardState ? 3 : 0,
                                    border: `3px solid ${theme.palette.primary.main}`,
                                    borderRadius: { xl: 10, lg: 10, md: 10, sm: 10, xs: 4 },
                                    borderBottom: `3px solid ${theme.palette.primary.main}`,
                                    overflow: 'hidden',
                                    width: { xl: 375, sm: 390, md: 400, lg: 430 },
                                }}
                            >
                                <Box
                                    borderBottom={`3px solid ${theme.palette.primary.main}`}
                                    borderRadius={{ lg: 8, md: 8, sm: 8, xs: 4 }}
                                    overflow="hidden"
                                    height={200}
                                    width={{ xl: 375, sm: 390, md: 400, lg: 430 }}
                                    sx={{ background: "grey" }}
                                >
                                    <img
                                        src={courseImage || courseVector}
                                        alt="not found"
                                        style={{
                                            objectFit: 'cover',
                                            maxHeight: '100%',
                                            width: '100%',
                                            aspectRatio: "16 / 9"
                                        }}
                                    />
                                </Box>
                                <Box px={2} display="flex" flexDirection="column" gap={3} sx={{ wordBreak: "break-word" }}>
                                    <Typography variant="h1" sx={{ fontSize: '18px' }} color={"primary"} mt={2} fontFamily={specialFont} textTransform={'capitalize'}>{title}</Typography>
                                    <Box sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}
                                        onClick={isCoursePage ? () => navigate(`/educators/${firstName}${lastName.charAt(0).toUpperCase()}`) : null}
                                    >
                                        <img
                                            src={avatar || profileVector}
                                            width={'50px'}
                                            height={'50px'}
                                            alt=""
                                            style={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: '50%', objectFit: 'cover', }}
                                        />
                                        <Box>
                                            <Typography sx={{ fontWeight: '700', fontSize: "18px", textTransform: 'capitalize' }}>By {firstName}{" "}{lastName}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyItems: 'start' }}>
                                                <Rating
                                                    sx={{ fontSize: '1.2rem' }}
                                                    name="star-rating"
                                                    value={5}
                                                    precision={0.5}
                                                    readOnly
                                                />
                                                <Typography variant="h6" sx={{ fontSize: '11px', fontWeight: "bold" }} ml={"3px"} mt={"auto"}>
                                                    {live && 5.00}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, }}>
                                        <Box>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '18px', color: theme.palette.primary.main }} mb={1}>Next Cohort starting on {weekday}/{month} </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                {classTimes.map((time, index) => (
                                                    <Typography key={index} variant="h6" sx={{ fontWeight: '700', fontSize: '18px' }}>
                                                        {time}
                                                    </Typography>
                                                ))}
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: '900', pt: 1, fontSize: '18px', }}>
                                                Duration: {duration} Weeks
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: '900', pt: 1, fontSize: '18px', }}>
                                                Cost: ${cost || 0}
                                            </Typography>
                                        </Box>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{
                                                '&:hover': {
                                                    cursor: live ? 'pointer' : 'not-allowed',
                                                },
                                                pointerEvents: live ? 'auto' : 'none',
                                            }}
                                            onClick={isEnrolled === "enrolled" ? null : handleEnroll}
                                        >
                                            {isEnrolled === "enrolled" ? "Already Enrolled" : "Enroll Now"}
                                        </Button>

                                        <Typography
                                            sx={{
                                                color: "blue",
                                                fontSize: '18px',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                cursor: live ? 'pointer' : 'not-allowed',
                                                pointerEvents: live ? 'auto' : 'none',
                                            }}
                                            onClick={handleClick}

                                        >
                                            See More Cohort Schedule
                                        </Typography>

                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            marginLeft: { xs: 0, sm: 0, md: dashboardState ? '20px' : '500px' },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: { xs: '30px', sm: '30px', md: '30px' },
                            pr: dashboardState ? null : { md: 6, lg: 6, xl: 6 },
                            width: dashboardState ? { md: "70%", lg: "70%", xl: "70%" } : '100%'
                        }}>
                            {objectives && <Box
                                pb={3}
                                pl={3}
                                pr={3}
                                width={"100%"}
                                sx={{
                                    mt: dashboardState ? 6 : isCoursePage ? 4.5 : 0,
                                }}
                            >
                                <Typography variant="h6" fontFamily={specialFont} color={'primary'}
                                    sx={{ fontWeight: '700', }} pb={3}>
                                    Learning Objectives
                                </Typography>
                                <Box
                                    display='flex'
                                    flexDirection='row'
                                    flexWrap='wrap'
                                    gap={2}
                                >
                                    {Object.keys(objectives).map((key) => (
                                        objectives[key] && (
                                            <Box key={key} display={'flex'} width={{ lg: "48%" }} alignItems={"start"}>
                                                <DoneIcon sx={{ color: theme.palette.primary.main, fontSize: 20, marginRight: 1 }} />
                                                <Typography
                                                    key={key}
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: '400',
                                                        wordBreak: 'break-word',
                                                        fontSize: "18px"
                                                    }}
                                                >
                                                    {objectives[key]}
                                                </Typography>
                                            </Box>
                                        )
                                    ))}
                                </Box>
                            </Box>}
                            {curriculum && <Box
                                p={3}
                                width={"100%"}
                            >
                                <Typography variant="h6" color={'primary'} fontFamily={specialFont} fontWeight={'700'} pb={3}>
                                    Curriculum
                                </Typography>
                                {curriculum.map((item, index) => (
                                    <Accordion key={index} sx={{ wordBreak: "break-word" }}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls={`panel${index + 1}-content`}
                                            id={`panel${index + 1}-header`}
                                        >
                                            <Typography variant="subtitle1" fontSize={18}>
                                                {item.title}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="subtitle2" fontSize={18}>{item.description}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>}
                            {prerequisites && <Box
                                p={3}
                                width={"100%"}
                                sx={{ wordBreak: "break-word" }}
                            >
                                <Typography variant="h6" pb={3} fontFamily={specialFont} color={'primary'} fontWeight='700'>
                                    Requirements
                                </Typography>
                                <ul style={{ listStyleType: 'disc', }}>
                                    {Object.keys(prerequisites).map((key) => (
                                        <li key={key} style={{ fontSize: '18px', }}>
                                            {prerequisites[key]}
                                        </li>
                                    ))}
                                </ul>
                            </Box>}
                            {description && <Box
                                p={3}
                                width={"100%"}
                                sx={{ wordBreak: "break-word" }}
                            >
                                <Typography variant="h6" pb={3} color={'primary'} sx={{ fontWeight: '700', }} fontFamily={specialFont} >Description</Typography>
                                <Box fontSize='18px' dangerouslySetInnerHTML={{ __html: description }} />
                            </Box>}
                            {intended_learner && <Box
                                p={3}
                                width={"100%"}
                                sx={{ wordBreak: "break-word" }}
                            >
                                <Typography variant="h6" pb={3} color={'primary'} fontFamily={specialFont} sx={{ fontWeight: '700' }}>Intended Learner</Typography>
                                <p style={{ fontSize: "18px" }}>{intended_learner}</p>
                            </Box>}
                            <Box
                                ref={boxRef}
                                pb={3}
                                pl={3}
                                pr={3}
                                width={"100%"}
                                sx={{
                                    mt: dashboardState ? 6 : isCoursePage ? 4.5 : 0,
                                }}
                            >
                                <Typography variant="h6" fontFamily={specialFont} color={'primary'}
                                    sx={{ fontWeight: '700', }} pb={3}>
                                    Cohort Schedule
                                </Typography>
                                <Box
                                    display='flex'
                                    flexDirection='column'
                                    flexWrap='wrap'
                                    gap={2}
                                >
                                    {classScheduleFunction()}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
            }
        </Box>
    )
}