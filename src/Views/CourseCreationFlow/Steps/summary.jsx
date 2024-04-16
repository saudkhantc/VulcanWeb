import { Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { ShowErrorToast, ShowSuccessToast } from "../../Common/Toast/toast";
import { StepsHeader } from "../../Common/StepsHeader/stepsHeader"
import { StepsFooter } from "../../Common/StepsFooter/stepsFooter";
import { decrementCoursesSteps, resetCoursesSteps } from "../../../Infrastructure/States/coursesStepsSlice";
import { CourseListing } from "../../CourseListing/courseListing";
import { Loader } from "../../Common/loader";
import { useState } from "react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../Infrastructure/config";
import { cleanCourseState, setCourseDetails } from "../../../Infrastructure/States/courseDetailsSlice";

export const Summary = () => {
    const approved = false
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false);
    const course = useSelector((state) => state.course.courseDetails)
    const courseId = course?.courseId || null
    const courseSteps = useSelector((state) => state.courseSteps.courseSteps)
    const userData = useSelector((state) => state.userData.data)

    const handleExit = () => {
        dispatch(resetCoursesSteps())
        dispatch(cleanCourseState())
        navigate('/dashboard')
    }
    const handleDec = async () => {
        if (courseSteps > 1) {
            try {
                setIsLoading(true)
                const course = userData?.educator?.courses[courseId ? courseId : ''];
                if (course) {
                    dispatch(setCourseDetails({ course, courseId }));
                }
                dispatch(decrementCoursesSteps())
            } catch (error) {
                ShowErrorToast(error)
            }finally{
                setIsLoading(false)
            }
        }
    }
    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            const updateCourseStatus = httpsCallable(functions, "updatecoursestatus");
            await updateCourseStatus({ courseId, status: "pending" });
            dispatch(resetCoursesSteps())
            dispatch(cleanCourseState())
            navigate('/dashboard')
            ShowSuccessToast("Course submitted successfully")
        } catch (err) {
            ShowErrorToast("Course isn't submitted successfully")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <StepsHeader steps={courseSteps} handleExit={handleExit} />
            <Box height={"100px"}></Box>
            {
                isLoading ? <Loader /> :
                    <CourseListing live={false} />
            }
            <StepsFooter
                handleContinueClick={handleSubmit}
                status={approved}
                handleDec={handleDec}
            />
            <Box height={"100px"}></Box>
        </>
    );
}