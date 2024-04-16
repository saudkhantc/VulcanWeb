
import React, { useEffect, useState } from 'react';
import { Loader } from '../Common/loader';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { Box, Typography, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import dayjs from 'dayjs';
const duration1 = require('dayjs/plugin/duration');
dayjs.extend(duration1);

export const Return = () => {
    const navigate = useNavigate()
    const [firstDay, setFirstDay] = useState(null);
    const [lastDay, setLastDay] = useState(null);
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const session_id = urlParams.get('session_id')
    const userData = useSelector((state) => state.userData.data);
    const loading = useSelector((state) => state.userData.loading);
    const course = userData && userData?.student?.courses[session_id]
    const courseName = course?.course_title
    const times = course?.times
    const duration = course?.duration
    const timestamp = parseInt(course?.start_date);
    const instructor = course?.instructor

    // Function to convert Unix timestamps to human-readable format in a specified timezone
    function timestampToDateTime(timestamp) {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date(timestamp * 1000);
        const options = { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: timeZone };
        return date.toLocaleString('en-US', options)
    }

    useEffect(() => {
        const sortedTimesObject = times && Object.fromEntries(
            Object.entries(times)
                .sort(([dayA], [dayB]) => {
                    const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
                    return dayOrder.indexOf(dayA) - dayOrder.indexOf(dayB);
                })
        );
        const days = sortedTimesObject && Object.keys(sortedTimesObject);
        if (days?.length > 0) {
            setFirstDay({
                day: days[0],
                timing: sortedTimesObject[days[0]]
            });
            setLastDay({
                day: days[days.length - 1],
                timing: sortedTimesObject[days[days?.length - 1]]
            });
        }
    }, [times]);

    function formatDay(day) {
        if (day > 3 && day < 21) return day + 'th';
        switch (day % 10) {
            case 1: return day + "st";
            case 2: return day + "nd";
            case 3: return day + "rd";
            default: return day + "th";
        }
    }
    function calculateClassDates(timestamp, duration, dayOfWeekString) {
        const dayMap = {
            'sunday': 0,
            'monday': 1,
            'tuesday': 2,
            'wednesday': 3,
            'thursday': 4,
            'friday': 5,
            'saturday': 6
        };
        const startDate = dayjs(timestamp * 1000);
        const weeksLater = startDate?.add(duration, 'week');
        const targetDayNumber = dayMap[dayOfWeekString];
        let adjustedToDate = weeksLater?.day() === targetDayNumber
            ? weeksLater
            : weeksLater.add((7 + targetDayNumber - weeksLater.day()) % 7, 'day');
        // Format the dates as specified, e.g., "Tuesday, April 9th"
        const firstClassDate = `${startDate.format('dddd')}, ${startDate.format('MMMM')} ${formatDay(startDate.date())}`;
        const adjustedLastClassDate = `${adjustedToDate.format('dddd')}, ${adjustedToDate.format('MMMM')} ${formatDay(adjustedToDate.date())}`;
        const result = {
            firstClass: {
                date: firstClassDate
            },
            lastClass: {
                date: adjustedLastClassDate
            },
            weeksGap: duration
        };
        return result;
    }
    const classDates = calculateClassDates(timestamp, duration, lastDay?.day);

    if (loading) {
        return <Loader />;
    }
    return (
        <Box height={"100vh"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
            {
                loading ? <Loader /> : (
                    <Box width={{ sm: "80%", md: "50%", lg: "50%" }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
                        <Box>
                            <CheckCircleOutlineIcon color="success" sx={{ fontSize: "96px" }} />
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "start", flexDirection: "column", gap: 5 }}>
                            <Typography sx={{ fontSize: "34px", fontWeight: "bold" }} variant="body1" color="initial" mt={4}>
                                Enrollment Complete
                            </Typography>
                            <Typography sx={{ fontSize: "24px", fontWeight: 500 }} variant="body1" color="initial">
                                <b> {courseName} </b> course  successfully enrolled! Your instructor <b>{instructor}</b>,
                                your first day of class on <b>{classDates.firstClass.date}</b> at <b>{timestampToDateTime(firstDay?.timing?.start)}</b>,
                                last class will be on <b> {classDates.lastClass.date} </b>
                                at <b>{timestampToDateTime(lastDay?.timing?.start)}</b>, and the course duration
                                is <b>{classDates.weeksGap} weeks</b>. You can see and manage your courses in your dashboard.
                            </Typography>
                            <Button sx={{ borderRadius: "5px" }} variant="contained" color="primary" onClick={() => navigate('/dashboard')} >
                                See Dashboard
                            </Button>
                        </Box>
                    </Box>
                )
            }
        </Box>
    )
}