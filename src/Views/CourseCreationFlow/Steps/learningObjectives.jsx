import React, { useRef, useState } from 'react'
import * as Yup from "yup"
import { useFormik } from 'formik'
import { Box, TextField } from '@mui/material'
import { httpsCallable } from "firebase/functions";
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useDispatch, useSelector } from 'react-redux'
import { functions } from "../../../Infrastructure/config";
import { StepsHeader } from '../../Common/StepsHeader/stepsHeader'
import { ErrorBlockSmall, QuestionName } from '../styles'
import { decrementCoursesSteps, incrementCoursesSteps, resetCoursesSteps } from '../../../Infrastructure/States/coursesStepsSlice'
import { StepsFooter } from '../../Common/StepsFooter/stepsFooter';
import { useNavigate } from 'react-router-dom';
import { Loader } from '../../Common/loader';
import { cleanCourseState, setCourseDetails } from '../../../Infrastructure/States/courseDetailsSlice';

export const LearningObjectives = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formikRef = useRef(null)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false);

    const course = useSelector((state) => state.course.courseDetails)
    const userData = useSelector((state) => state.userData.data)
    const courseId = course?.courseId || null

    const prerequisites = course?.course?.courseDetails?.intended_learner?.prerequisites
    const objectives = course?.course?.courseDetails?.intended_learner?.objectives
    const intendedLearner = course?.course?.courseDetails?.intended_learner?.description

    const objective1 = objectives?.objective_1
    const objective2 = objectives?.objective_2
    const objective3 = objectives?.objective_3
    const objective4 = objectives?.objective_4
    const objective5 = objectives?.objective_5
    const prerequisite1 = prerequisites?.prerequisite_1
    const prerequisite2 = prerequisites?.prerequisite_2
    const prerequisite3 = prerequisites?.prerequisite_3
    const prerequisite4 = prerequisites?.prerequisite_4
    const prerequisite5 = prerequisites?.prerequisite_5

    const courseSteps = useSelector((state) => state.courseSteps.courseSteps)
    const handleExit =async () => {
        try {
            setIsLoading(true)
            const updateCourseObjectives = httpsCallable(functions, "updatecourseobjectives")
            await updateCourseObjectives(formik.values)
            dispatch(resetCoursesSteps())
            dispatch(cleanCourseState())
            formik.resetForm()
            navigate('/dashboard')
        } catch (err) {
            //  console.log(err)
        } finally {
            setIsLoading(false)
        }
    }
    const handleDec = async () => {
        if (courseSteps > 1) {
            try {
                setIsLoading(true)
                const updateCourseObjectives = httpsCallable(functions, "updatecourseobjectives")
                await updateCourseObjectives(formik.values)
                if (courseId && userData && userData.educator && userData.educator.courses) {
                    const course = userData?.educator?.courses[courseId ? courseId : ''];
                    if (course) {
                        dispatch(setCourseDetails({ course, courseId }));
                    }
                }
                dispatch(decrementCoursesSteps())
            } catch (err) {
                // console.log(err)
            } finally {
                setIsLoading(false)
            }
        }
    }
    const handleInc = async () => {
        if (courseSteps > 1) {
            dispatch(incrementCoursesSteps())
            const course = userData?.educator?.courses[courseId ? courseId : ''];
            if (course) {
                dispatch(setCourseDetails({ course, courseId }));
            }
        }
    }
    const formik = useFormik({
        initialValues: {
            objective1: objective1 || "",
            objective2: objective2 || "",
            objective3: objective3 || "",
            objective4: objective4 || "",
            objective5: objective5 || "",
            prerequisite1: prerequisite1 || "",
            prerequisite2: prerequisite2 || "",
            prerequisite3: prerequisite3 || "",
            prerequisite4: prerequisite4 || "",
            prerequisite5: prerequisite5 || "",
            intendedLearner: intendedLearner || "",
            status: "in_progress",
            courseId: courseId
        },
        validationSchema: Yup.object().shape({
            intendedLearner: Yup.string().required("Intended Learner Required"),
            objective1: Yup.string().required("Objective 1 is Required"),
            objective2: Yup.string().required("Objective 2 is Required"),
            prerequisite1: Yup.string().required("Prerequisite 1 is Required"),
        }),
        onSubmit: async () => {
            if (courseSteps >= 1 && courseSteps <= 6) {
                try {
                    setIsLoading(true)
                    const updateCourseObjectives = httpsCallable(functions, "updatecourseobjectives")
                    await updateCourseObjectives(formik.values)
                } catch (error) {
                    setError(error.message)
                } finally {
                    setIsLoading(false)
                    handleInc();
                }
            }
        },
    })
    formikRef.current = formik;
    const handleContinueClick = () => {
        if (formikRef.current) {
            formikRef?.current.handleSubmit();
        }
    };
    return (
        <Box height={"100vh"} >
            <StepsHeader steps={courseSteps} handleExit={handleExit} />
            <Box height={"100px"}></Box>

            <form onSubmit={formik.handleSubmit}>
                {
                    isLoading ? <Loader /> :
                        <Grid container spacing={3} px={{ xs: 2, sm: 2, md: 10, lg: 10, xl: 10 }}>
                            <Grid xs={12} md={6} lg={4} xl={4} spacing={2}>
                                <Box height={"100px"}>
                                    <QuestionName variant="h6">
                                        What are some learning objectives that learners can expect to achieve after completing your course?
                                    </QuestionName>
                                </Box>
                                <Box display={"flex"} justifyContent={"start"} alignItems={"center"} flexDirection={"column"} gap={2}>
                                    <TextField
                                        name="objective1"
                                        label={
                                            formik.touched.objective1 && Boolean(formik.errors.objective1)
                                                ? formik.errors.objective1
                                                : "Objective 1"
                                        }
                                        error={formik.touched.objective1 && Boolean(formik.errors.objective1)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.objective1}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="objective2"
                                        label={
                                            formik.touched.objective2 && Boolean(formik.errors.objective2)
                                                ? formik.errors.objective2
                                                : "Objective 2"
                                        }
                                        error={formik.touched.objective2 && Boolean(formik.errors.objective2)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.objective2}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="objective3"
                                        label={
                                            formik.touched.objective3 && Boolean(formik.errors.objective3)
                                                ? formik.errors.objective3
                                                : "Objective 3"
                                        }
                                        error={formik.touched.objective3 && Boolean(formik.errors.objective3)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.objective3}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="objective4"
                                        label={
                                            formik.touched.objective4 && Boolean(formik.errors.objective4)
                                                ? formik.errors.objective4
                                                : "Objective 4"
                                        }
                                        error={formik.touched.objective4 && Boolean(formik.errors.objective4)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.objective4}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="objective5"
                                        label={
                                            formik.touched.objective5 && Boolean(formik.errors.objective5)
                                                ? formik.errors.objective5
                                                : "Objective 5"
                                        }
                                        error={formik.touched.objective5 && Boolean(formik.errors.objective5)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.objective5}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                </Box>

                            </Grid>
                            <Grid xs={12} md={6} lg={4} xl={4}>
                                <Box height={"100px"}>
                                    <QuestionName variant="h6">
                                        Are there any prerequisites or requirements for taking your course?
                                    </QuestionName>
                                </Box>
                                <Box display={"flex"} justifyContent={"start"} alignItems={"center"} flexDirection={"column"} gap={2}>
                                    <TextField
                                        name="prerequisite1"
                                        label={
                                            formik.touched.prerequisite1 && Boolean(formik.errors.prerequisite1)
                                                ? formik.errors.prerequisite1
                                                : "Prerequisite 1"
                                        }
                                        error={formik.touched.prerequisite1 && Boolean(formik.errors.prerequisite1)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.prerequisite1}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="prerequisite2"
                                        label={
                                            formik.touched.prerequisite2 && Boolean(formik.errors.prerequisite2)
                                                ? formik.errors.prerequisite2
                                                : "Prerequisite 2"
                                        }
                                        error={formik.touched.prerequisite2 && Boolean(formik.errors.prerequisite2)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.prerequisite2}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="prerequisite3"
                                        label={
                                            formik.touched.prerequisite3 && Boolean(formik.errors.prerequisite3)
                                                ? formik.errors.prerequisite3
                                                : "Prerequisite 3"
                                        }
                                        error={formik.touched.prerequisite3 && Boolean(formik.errors.prerequisite3)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.prerequisite3}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="prerequisite4"
                                        label={
                                            formik.touched.prerequisite4 && Boolean(formik.errors.prerequisite4)
                                                ? formik.errors.prerequisite4
                                                : "Prerequisite 4"
                                        }
                                        error={formik.touched.prerequisite4 && Boolean(formik.errors.prerequisite4)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.prerequisite4}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                    <TextField
                                        name="prerequisite5"
                                        label={
                                            formik.touched.prerequisite5 && Boolean(formik.errors.prerequisite5)
                                                ? formik.errors.prerequisite5
                                                : "Prerequisite 5"
                                        }
                                        error={formik.touched.prerequisite5 && Boolean(formik.errors.prerequisite5)}
                                        variant="outlined"
                                        onChange={formik.handleChange}
                                        value={formik.values.prerequisite5}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                </Box>
                            </Grid>
                            <Grid xs={12} md={12} lg={4} xl={4} spacing={2}>
                                <Box height={"100px"}>
                                    <QuestionName variant="h6">
                                        Describe the intended learner of your course
                                    </QuestionName>
                                </Box>
                                <Box>
                                    <TextField
                                        name="intendedLearner"
                                        label={
                                            formik.touched.intendedLearner && Boolean(formik.errors.intendedLearner)
                                                ? formik.errors.intendedLearner
                                                : "Intended Learner"
                                        }
                                        error={formik.touched.intendedLearner && Boolean(formik.errors.intendedLearner)}
                                        variant="outlined"
                                        placeholder='Anyone that wants to become fluent in Spanish'
                                        onChange={formik.handleChange}
                                        value={formik.values.intendedLearner}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        multiline
                                        rows={12}
                                        fullWidth
                                    />
                                </Box>

                            </Grid>
                        </Grid>
                }
                <ErrorBlockSmall>
                    {error}
                </ErrorBlockSmall>
                <StepsFooter handleDec={handleDec} handleContinueClick={handleContinueClick} step2Error={error} />
            </form>
            <Box height={"100px"}></Box>
        </Box>
    )
}