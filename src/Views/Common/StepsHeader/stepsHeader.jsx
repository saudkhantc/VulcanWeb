import React from 'react'
import { ExitTypo, Header, LogoTypo, Span, StepsTypo, StepsValue } from '../../CourseCreationFlow/styles'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Box } from '@mui/material'
import ProgressBar from '../ProgressBar/progressbar'

export const StepsHeader = ({ handleExit, steps }) => {
  return (
    <div>
      <Header alignItems={"center"}>
        <Grid
          container
          display={"flex"}
          alignItems={"center"}
          justifyContent="space-between"
        >
          <Grid lg={2} md={2} sm={3} xs={3}>
            <Box
              sx={{
                borderRight: "1px solid rgba(128, 128, 128, 0.5)",
                height: "70px",
              }}
              display={"Flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Span>
                <LogoTypo color={"primary"} variant="h4" onClick={handleExit}>
                  Vulcan
                </LogoTypo>
              </Span>
            </Box>
          </Grid>
          <Grid
            display={"flex"}
            justifyContent={{
              lg: "flex-start",
              sm: "center",
              xs: "center",
            }}
            alignItems={"center"}
            lg={7}
            md={6}
            sm={6}
            xs={6}
          >
            <StepsTypo variant="h6">Step {steps} of 6: <StepsValue sx={{ color: (theme) => theme.palette.primary.main }} ml={2} style={{ paddingLeft: "10px" }}>{steps === 1 ? "Basics" : (steps === 2 ? "Intended Learner" : (steps === 3 ? "Curriculum" : (steps === 4 ? "Details" : (steps === 5 ? "Class Schedule" : (steps === 6 ? "Summary" : "")))))}</StepsValue></StepsTypo>
          </Grid>
          <Grid
            lg={2}
            md={2}
            sm={2}
            xs={2}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Span>
              <ExitTypo variant="h6" color="primary" onClick={handleExit}>
                Exit
              </ExitTypo>
            </Span>
          </Grid>
        </Grid>
        <ProgressBar />
      </Header>
    </div>
  )
}
