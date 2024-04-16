import React from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { ContinueButton, ErrorBlockLarge, Footer, PreviousButton } from '../../CourseCreationFlow/styles'
import { Box } from '@mui/material'

export const StepsFooter = ({ handleDec, handleContinueClick, step3Error, errorMessage, step2Error, step5Error, step1Error, step4Error, status }) => {
    const courseSteps = useSelector((state) => state.courseSteps.courseSteps)
    const basicStepState = useSelector((state) => state.courseSteps.basicStepState)
    
    return (
        <Footer>
            <Grid container justifyContent={"space-between"} p={2}>
                <Grid>
                    {courseSteps > 1 ? (
                        <PreviousButton variant="contained" onClick={handleDec}>
                            Previous
                        </PreviousButton>
                    ) : (
                        <></>
                    )}
                </Grid>
                <Grid display={"flex"} >
                    <Box
                        display="flex"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        mr={3}
                    >
                        <ErrorBlockLarge>
                            {step1Error && <p style={{ marginBottom: "0px" }}>{step1Error}</p>}
                            {step2Error && <p style={{ marginBottom: "0px" }}>{step2Error}</p>}
                            {step3Error && <p style={{ marginBottom: "0px" }}>{step3Error}</p>}
                            {step5Error && <p style={{ marginBottom: "0px" }}>{step5Error}</p>}
                            {errorMessage && <p style={{ marginBottom: "0px" }}>{errorMessage}</p>}
                        </ErrorBlockLarge>
                    </Box>
                    <ContinueButton variant="contained"
                        disabled={step4Error || !basicStepState.categoryValue}
                        onClick={handleContinueClick}
                    >
                        {/* {courseSteps <= 5 ? "Continue" : "Finish"} */}
                        {courseSteps <= 5 ? "Continue" : status ? "Finish" : "Submit For Approvel"}
                    </ContinueButton>
                </Grid>
            </Grid>
        </Footer >
    )
}
