import { Box, Divider, Rating, Typography } from '@mui/material'
import React from 'react'

export const CourseCard = ({ courseId, cost, title, subTitle, educatorName, stars, reviews, courseImage, onClick, enableFilter, }) => {
    return (
        <Box key={courseId} sx={{ cursor: 'pointer' }} onClick={onClick} mr={3}>
            <Box display="flex" flexDirection={{ sm: "row", xs: "column" }} width={'100%'} gap={3}>
                <Box width={300} height={'auto'} sx={{ border: "3px grey solid" }}>
                    <img width={"100%"} height={'100%'} ratio={'16/9'} src={courseImage} alt='not found' />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: { xs: '100%', sm: enableFilter ? '70%' : '80%' }, gap: '5px' }}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography color="initial" textTransform={'capitalize'} fontSize={'24px'} fontWeight={'600'} sx={{ wordBreak: "break-word" }}>{title}</Typography>
                        <Typography color="initial" textTransform={'capitalize'} fontSize={'24px'} fontWeight={'600'} sx={{ wordBreak: "break-word" }}>${cost}</Typography>
                    </Box>
                    <Typography color="initial" sx={{ fontWeight: '500', wordBreak: "break-word" }} fontSize={'16px'} textTransform={'capitalize'}>{subTitle}</Typography>
                    <Typography color="grey" sx={{ fontWeight: '400', wordBreak: "break-word" }} fontSize={'14px'} textTransform={'capitalize'}>{educatorName}</Typography>
                    <Box display={'flex'} alignItems={'center'} gap={1}>
                        <Typography color="initial" sx={{ fontWeight: '600' }} fontSize={'16px'} textTransform={'capitalize'}>{stars}</Typography>
                        <Rating name="read-only" value={stars} readOnly />
                        <Typography color="grey" sx={{ fontWeight: '600', wordBreak: "break-word" }} fontSize={'16px'} textTransform={'capitalize'}>({reviews})</Typography>
                    </Box>
                </Box>
            </Box>
            <Divider
                sx={{ width: "100%", border: "1px solid lightgray" }}
                pt={4}
            />
        </Box>
    )
}
