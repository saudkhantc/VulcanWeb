import React, { useEffect, useRef, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup"
import { httpsCallable } from "firebase/functions";
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { useDispatch, useSelector } from 'react-redux'
import { functions } from "../../../Infrastructure/config";
import { StepsHeader } from '../../Common/StepsHeader/stepsHeader'
import { ShowErrorToast } from '../../Common/Toast/toast'
import { ChoiceTypo, ErrorBlockSmall, QuestionName } from '../styles'
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import { basicStepControl, resetBasicStepValues, incrementCoursesSteps, resetCoursesSteps } from '../../../Infrastructure/States/coursesStepsSlice'
import { StepsFooter } from '../../Common/StepsFooter/stepsFooter';
import { useLocation, useNavigate } from 'react-router-dom';
import { Loader } from '../../Common/loader';
import { cleanCourseState, setCourseDetails } from '../../../Infrastructure/States/courseDetailsSlice';
import useAuthentication from '../../../Infrastructure/States/onAuthStateChange';

export const BasicsStep = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const formikRef = useRef(null);
    const location = useLocation();
    const { user } = useAuthentication();
    const uid = user?.uid;
    const courseId = location.state ? location.state : null;
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state.userData.data)
    const course = useSelector((state) => state.course.courseDetails)
    const courseSteps = useSelector((state) => state.courseSteps.courseSteps)
    const basicStepState = useSelector((state) => state.courseSteps.basicStepState)
    const courseCost = course?.course?.courseDetails?.basics?.cost;
    const courseTitle = course?.course?.courseDetails?.basics?.title;
    const courseSubTitle = course?.course?.courseDetails?.basics?.subTitle;
    const categoryValue = course?.course?.courseDetails?.basics?.category;
    const handleExit = async () => {
        try {
            setIsLoading(true)
            if (basicStepState?.categoryValue && formik.values.courseTitle && formik.values.title && formik.values.courseCost) {
                const updateCategoryStep = httpsCallable(functions, "updatecategorystep");
                await updateCategoryStep({ categoryValue: basicStepState?.categoryValue, courseTitle: formik.values.courseTitle, courseSubTitle: formik.values.courseSubTitle, cost: formik.values.courseCost, status: "in_progress", courseId: course?.courseId });
            }
            navigate('/dashboard');
        } finally {
            setIsLoading(false)
            formik.resetForm();
            dispatch(resetBasicStepValues());
            dispatch(resetCoursesSteps());
            dispatch(cleanCourseState());
        }
    }
    const handleInc = async () => {
        if (courseSteps < 6) {
            dispatch(incrementCoursesSteps())
        }
    }
    const formik = useFormik({
        initialValues: { courseTitle: courseTitle || "", courseSubTitle: courseSubTitle || "", courseCost: course?.course?.courseDetails?.basics?.cost || "" },
        validationSchema: Yup.object().shape({
            courseTitle: Yup.string().required("Course Title Required"),
            courseCost: Yup.string().required("Course Cost Required")

        }),
        onSubmit: async (values) => {
            if (courseSteps >= 1 && courseSteps <= 6) {
                dispatch(basicStepControl({ courseCost: values.courseCost, courseTitle: values.courseTitle, question: "courseTitle", courseSubTitle: values.courseSubTitle }))
                try {
                    setIsLoading(true)
                    const updateCategoryStep = httpsCallable(functions, "updatecategorystep");
                    const res = await updateCategoryStep({ categoryValue: basicStepState?.categoryValue, courseTitle: formik.values.courseTitle, courseSubTitle: formik.values.courseSubTitle, cost: formik.values.courseCost, status: "in_progress", courseId: course?.courseId, });
                    const createdCourseId = res?.data?.courseId;
                    if (course?.courseId) {
                        const newCourse = userData.educator.courses[createdCourseId];
                        dispatch(setCourseDetails({ course: newCourse, courseId: createdCourseId }));
                    } else {
                        dispatch(setCourseDetails({ courseId: createdCourseId }));
                    }
                    handleInc();
                } catch (error) {
                    ShowErrorToast(error)
                }
                finally {
                    setIsLoading(false)
                }
            }
        },
    })
    formikRef.current = formik;
    const options = [
        { name: "development", label: "Development" },
        { name: "business", label: "Business" },
        { name: "financeAndAccounting", label: "Finance And Accounting" },
        { name: "itAndSoftware", label: "IT & Software" },
        { name: "officeProductivity", label: "Office Productivity" },
        { name: "personalDevelopment", label: "Personal Development" },
        { name: "design", label: "Design" },
        { name: "marketing", label: "Marketing" },
        { name: "lifestyle", label: "Lifestyle" },
        { name: "photographyAndVideo", label: "Photography & Video" },
        { name: "healthAndFitness", label: "Health & Fitness" },
        { name: "music", label: "Music" },
        { name: "teachingAndAcademics", label: "Teaching & Academics" },
        { name: "iDontKnowYet", label: "I don't know yet" },
        { name: "notSure", label: "Not Sure" },
    ]
    const handleOptionChange = (e) => {
        let categoryValue = e.target.value;
        dispatch(basicStepControl({ categoryValue, question: "category" }));
    };
    useEffect(() => {
        if (userData && categoryValue) {
            dispatch(basicStepControl({ categoryValue: categoryValue, question: "category" }));
        }
        if (userData && courseCost) {
            dispatch(basicStepControl({ courseTitle: courseCost, question: "courseCost" }));
            formik.setFieldValue("courseCost", courseCost || '');
        }
        if (userData && courseTitle) {
            dispatch(basicStepControl({ courseTitle: courseTitle, question: "courseTitle" }));
            formik.setFieldValue("courseTitle", courseTitle || '');
        }
        if (userData && courseSubTitle) {
            dispatch(basicStepControl({ courseSubTitle: courseSubTitle, question: "courseTitle" }));
            formik.setFieldValue("courseSubTitle", courseSubTitle || '');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData, dispatch, categoryValue, courseTitle, courseSubTitle, courseCost, formik.setValues])
    useEffect(() => {

        if (courseId && userData && userData.educator && userData.educator.courses) {
            const course = userData.educator.courses[courseId ? courseId : ''];
            if (course) {
                dispatch(setCourseDetails({ course, courseId, instructorId: uid }));
            }
        }
        else if (course?.courseId && userData && userData.educator && userData.educator.courses) {
            let newCourseId = course?.courseId;
            const courseData = userData.educator?.courses[newCourseId ? newCourseId : ''];
            if (courseData) {
                dispatch(setCourseDetails({ course, courseId: newCourseId, instructorId: uid }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleContinueClick = async () => {
        if (formikRef.current) {
            await formikRef.current.handleSubmit();
        }
        if (!userData || !course || !course?.course?.courseDetails) {
            return <Loader />;
        }
    };
    return (
        <Box height={"100vh"}>
            <StepsHeader steps={courseSteps} handleExit={handleExit} />
            <Box height={"100px"}></Box>
            <form onSubmit={formik.handleSubmit} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    isLoading ? <Loader /> :
                        <Box px={{ xs: 2, sm: 2, md: 10, lg: 10, xl: 10 }}>
                            <Grid container spacing={2}>
                                <Grid xs={12} sm={12} md={12} lg={6} xl={6} width="100%">
                                    <QuestionName>
                                        What will be the title of your course?
                                    </QuestionName>
                                    <TextField
                                        name="courseTitle"
                                        label={
                                            formik.touched.courseTitle && Boolean(formik.errors.courseTitle)
                                                ? formik.errors.courseTitle
                                                : "Course Title"
                                        }
                                        error={formik.touched.courseTitle && Boolean(formik.errors.courseTitle)}
                                        variant="outlined"
                                        placeholder="Course Title"
                                        onChange={formik.handleChange}
                                        value={formik.values.courseTitle}
                                        ml={1}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={6} xl={6} width="100%">
                                    <QuestionName>
                                        What will be the cost of your course?
                                    </QuestionName>
                                    <TextField
                                        type='tel'
                                        name="courseCost"
                                        label={
                                            formik.touched.courseCost && Boolean(formik.errors.courseCost)
                                                ? formik.errors.courseCost
                                                : "Course Cost"
                                        }
                                        error={formik.touched.courseCost && Boolean(formik.errors.courseCost)}
                                        variant="outlined"
                                        placeholder="Course Cost"
                                        onChange={formik.handleChange}
                                        value={formik.values.courseCost}
                                        ml={1}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                            inputMode: "numeric",
                                            onKeyPress: (event) => {
                                                if (isNaN(event.key)) {
                                                    event.preventDefault();
                                                }
                                            },
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid xs={12} sm={12} md={12} lg={6} xl={6} width="100%">
                                    <QuestionName>
                                        What will be the Subtitle of your course?
                                    </QuestionName>
                                    <TextField
                                        name="courseSubTitle"
                                        label={
                                            formik.touched.courseSubTitle && Boolean(formik.errors.courseSubTitle)
                                                ? formik.errors.courseSubTitle
                                                : "Course Subtitle (optional)"
                                        }
                                        error={formik.touched.courseSubTitle && Boolean(formik.errors.courseSubTitle)}
                                        variant="outlined"
                                        placeholder="Course Subtitle"
                                        onChange={formik.handleChange}
                                        value={formik.values.courseSubTitle}
                                        ml={1}
                                        InputLabelProps={{
                                            style: { fontSize: 16 },
                                        }}
                                        InputProps={{
                                            style: { fontSize: 18 },
                                        }}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Box mt={4}>
                                <QuestionName variant="h6">
                                    What category does your course best fit in?
                                </QuestionName>
                                <Grid container spacing={3}>
                                    <Grid xs={12} md={6} lg={4} xl={4}>
                                        <FormControl fullWidth>
                                            <RadioGroup onChange={handleOptionChange} value={basicStepState.categoryValue}>
                                                {options.slice(0, 5).map((option, index) => (
                                                    <FormControlLabel
                                                        key={option.name}
                                                        value={option.label}
                                                        control={<Radio size="medium" />}
                                                        label={<ChoiceTypo>{option.label}</ChoiceTypo>}
                                                        sx={{
                                                            width: "100%",
                                                            border: "1px solid #1c1d1f",
                                                            p: 1,
                                                            m: "3px",
                                                            height: "76px",
                                                        }}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} md={6} lg={4} xl={4}>
                                        <FormControl fullWidth>
                                            <RadioGroup onChange={handleOptionChange} value={basicStepState.categoryValue}>
                                                {options.slice(5, 10).map((option, index) => (
                                                    <FormControlLabel
                                                        key={option.name}
                                                        value={option.label}
                                                        control={<Radio size="medium" />}
                                                        label={<ChoiceTypo>{option.label}</ChoiceTypo>}
                                                        sx={{
                                                            width: "100%",
                                                            border: "1px solid #1c1d1f",
                                                            p: 1,
                                                            m: "3px",
                                                            height: "76px",
                                                        }}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                    <Grid xs={12} md={6} lg={4} xl={4}>
                                        <FormControl fullWidth>
                                            <RadioGroup onChange={handleOptionChange} value={basicStepState.categoryValue}>
                                                {options.slice(10, 15).map((option, index) => (
                                                    <FormControlLabel
                                                        key={option.name}
                                                        value={option.label}
                                                        control={<Radio size="medium" />}
                                                        label={<ChoiceTypo>{option.label}</ChoiceTypo>}
                                                        sx={{
                                                            width: "100%",
                                                            border: "1px solid #1c1d1f",
                                                            p: 1,
                                                            m: "3px",
                                                            height: "76px",
                                                        }}
                                                    />
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                }
                <ErrorBlockSmall sx={{ textAlign: "center" }}>
                    {formik.errors.courseTitle}
                </ErrorBlockSmall>
                <StepsFooter handleContinueClick={handleContinueClick} step1Error={formik.errors.courseTitle} />
                <Box height={"100px"}></Box>
            </form>
        </Box>
    )
}
