import React, { useState, useEffect } from 'react'
import { LeftBox, MainBox, RightBox } from './styles'
import { Box, Typography } from '@mui/material'
import { Courses } from './Sections/courses'
import { Classes } from './Sections/classes'
import { Profile } from './Sections/profile'
import { Earnings } from './Sections/earnings'
import { useSelector } from 'react-redux'

export const EducatorDashboard = () => {
    const [tab, setTab] = useState("courses");
    const userData = useSelector((state) => state.userData.data);
    const educatorApproved = userData?.educator?.approved
    useEffect(() => {
        const hash = window.location.hash.substring(1);
        if (hash) {
            setTab(hash);
        }
    }, []);

    const handleTabChange = (newTab) => {
        if (tab !== newTab) {
            setTab(newTab);
            window.location.hash = newTab;
        }
    }

    return (
        educatorApproved ?
            <MainBox px={5} pt={5} display={'flex'} flexDirection={{ xs: 'column', sm: "column", md: 'row', lg: "row", xl: 'row' }} gap={2}>
                <Box width={{ xs: "100%", sm: "100%", md: "20%" }} height={{ md: "auto" }}>
                    <LeftBox>
                        <Typography variant="h6" color={tab === 'courses' && "primary"} sx={{ cursor: "pointer" }} onClick={() => handleTabChange('courses')}>Courses</Typography>
                        <Typography variant="h6" color={tab === 'classes' && "primary"} sx={{ cursor: "pointer" }} onClick={() => handleTabChange('classes')}>Classes</Typography>
                        <Typography variant="h6" color={tab === 'profile' && "primary"} sx={{ cursor: "pointer" }} onClick={() => handleTabChange('profile')}>Profile</Typography>
                        <Typography variant="h6" color={tab === 'earnings' && "primary"} sx={{ cursor: "pointer" }} onClick={() => handleTabChange('earnings')}>Earnings</Typography>
                    </LeftBox>
                </Box>
                <RightBox sx={{
                    overflowY: 'scroll',
                    '::-webkit-scrollbar': {
                        display: 'none'
                    }
                }} height={'90vh'}>
                    {tab === 'courses' ? (
                        <Courses />
                    ) : tab === 'classes' ? (
                        <Classes />
                    ) : tab === 'profile' ? (
                        <Profile />
                    ) : tab === 'earnings' ? (
                        <Earnings />
                    ) : null}
                </RightBox>
            </MainBox>
            :
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: 'justify'
                }}
                maxWidth={'1500px'}
                mx={"auto"}
                px={30}
                py={15}
            >
                <Typography variant="h6" color="initial">Your educator application has been submitted and you will be notified via email once review is complete. In the meantime, keep an eye out for any follow-up emails or calls requesting further information.</Typography>
            </Box>
    )
}
