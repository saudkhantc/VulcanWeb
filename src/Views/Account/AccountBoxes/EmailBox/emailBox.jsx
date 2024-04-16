import { Box, Stack } from '@mui/material'
import React from 'react'
import { TextLabel, TextValue } from '../../styles'
import { useSelector } from 'react-redux';

export const EmailBox = () => {
  const userData = useSelector((state) => state.userData.data);
  const userEmail = userData?.account?.email;
  return (
    <Box px={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={4}
        >
          <TextLabel>Email</TextLabel>
          <TextValue>{userEmail}</TextValue>
          <Box></Box>
        </Stack>
        <hr />
      </Box>
  )
}
