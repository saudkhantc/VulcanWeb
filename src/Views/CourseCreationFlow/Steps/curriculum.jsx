import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineCancel } from "react-icons/md";
import { httpsCallable } from 'firebase/functions';
import { Box, TextField, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { ShowErrorToast } from '../../Common/Toast/toast';
import { ErrorBlockSmall, SectionQuestion } from '../styles';
import { functions } from '../../../Infrastructure/config';
import { StepsHeader } from '../../Common/StepsHeader/stepsHeader';
import { StepsFooter } from '../../Common/StepsFooter/stepsFooter';
import { decrementCoursesSteps, incrementCoursesSteps, resetCoursesSteps } from '../../../Infrastructure/States/coursesStepsSlice';
import { Loader } from '../../Common/loader';
import { cleanCourseState } from '../../../Infrastructure/States/courseDetailsSlice';
import { setCourseDetails } from '../../../Infrastructure/States/courseDetailsSlice';

export const Curriculum = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showError, setShowError] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const userData = useSelector((state) => state.userData.data)
    const course = useSelector((state) => state.course.courseDetails)
    const sectionsData = course?.course?.courseDetails?.curriculum?.sections
    const courseId = course?.courseId || null
    const defaultSections = sectionsData?.map(section => ({
        title: section?.title || '',
        description: section?.description || '',
    }));
    const [sections, setSections] = useState(defaultSections || [{
        title: '',
        description: '',
    }]);
    const validSections = sections?.filter(section => section?.title && section?.description);
    const courseSteps = useSelector((state) => state.courseSteps.courseSteps);

    const handleExit = async () => {
        try {
            setIsLoading(true)
            const updateCurriculumStep = httpsCallable(functions, "updatecurriculum");
            await updateCurriculumStep({ courseId, sections });
            dispatch(resetCoursesSteps());
            navigate('/dashboard');
        } catch (error) {
            ShowErrorToast(error);
        } finally {
            dispatch(cleanCourseState())
            setIsLoading(false)
        }
    };
    const handleDec = async () => {
        if (courseSteps > 1) {
            try {
                setIsLoading(true)
                const updateCurriculumStep = httpsCallable(functions, "updatecurriculum");
                await updateCurriculumStep({ courseId, sections });
                dispatch(decrementCoursesSteps());
                const course = userData?.educator?.courses[courseId ? courseId : ''];
                if (course) {
                    dispatch(setCourseDetails({ course, courseId }));
                }
            } catch (error) {
                ShowErrorToast(error);
            } finally {
                setIsLoading(false)
            }
        }
    };
    const handleAddSection = () => {
        if (sections.length < 20) {
            setSections(prevSections => [...prevSections, { title: '', description: '' }]);
        } else {
            setShowError("Maximum 20 sections are allowed");
        }
    };
    const handleTitleChange = (index, event) => {
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], title: event.target.value };
        setSections(newSections);
    };
    const handleDescriptionChange = (index, event) => {
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], description: event.target.value };
        setSections(newSections);
    };
    const handleContinueClick = async () => {
        if (courseSteps > 1) {
            try {
                const isEmptySection = sections.some(section => !section.title || !section.description);
                if (!isEmptySection && validSections.length >= 3) {
                    setShowError(false);
                    setIsLoading(true)
                    const updateCurriculumStep = httpsCallable(functions, "updatecurriculum");
                    await updateCurriculumStep({ courseId, sections });
                    dispatch(incrementCoursesSteps());
                } else {
                    if (validSections.length < 3) {
                        setShowError("At least 3 sections required to fill.");
                    } else {
                        setShowError("Title or description are not filled");
                    }
                }
            } catch (error) {
                setShowError("Something went wrong? Try again.");
            } finally {
                setIsLoading(false)
            }
        }
    };
    const handleRemoveSection = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
    };
    return (
        <Box height={'100vh'}>
            <StepsHeader steps={courseSteps} handleExit={handleExit} />
            <Box height={'100px'}></Box>
            {
                isLoading ? <Loader /> :
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'start' }}>
                        <Box my={2} sx={{ width: { xs: "90%", sm: "90%", md: "80%", lg: "70%", xl: "70%" } }}>
                            {sections?.map((section, index) => (
                                <Box key={index} border={1} p={2} my={2}>
                                    <Box display="flex" flexDirection="column">
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}> <SectionQuestion variant="h6">New Section</SectionQuestion>
                                            {sections?.length > 3 ? <MdOutlineCancel style={{ fontSize: '2em', cursor: 'pointer' }} onClick={() => handleRemoveSection(index)} /> : null}
                                        </Box>
                                        <TextField
                                            name="title"
                                            label="Title"
                                            variant="outlined"
                                            onChange={(event) => handleTitleChange(index, event)}
                                            value={section?.title}
                                            InputLabelProps={{
                                                style: { fontSize: 14 },
                                            }}
                                            InputProps={{
                                                style: { fontSize: 14 },
                                            }}
                                            fullWidth
                                        />
                                    </Box>
                                    <Box display="flex" flexDirection="column">
                                        <SectionQuestion variant="h6">Overview of what content will be covered in this section</SectionQuestion>
                                        <TextField
                                            name="description"
                                            label="Description"
                                            variant="outlined"
                                            onChange={(event) => handleDescriptionChange(index, event)}
                                            value={section?.description}
                                            InputLabelProps={{
                                                style: { fontSize: 14 },
                                            }}
                                            InputProps={{
                                                style: { fontSize: 14 },
                                            }}
                                            multiline
                                            rows={2}
                                            fullWidth
                                        />
                                    </Box>
                                </Box>
                            ))}
                            <Button variant="text" color="secondary" sx={{ borderRadius: '0px' }} onClick={handleAddSection}>
                                <AiOutlinePlus /> Section
                            </Button>
                        </Box>
                        {
                            showError && <Box mt={5}>
                                <ErrorBlockSmall>
                                    At least 3 sections required to fill.
                                </ErrorBlockSmall>
                            </Box>
                        }
                    </Box>
            }
            <StepsFooter handleDec={handleDec} handleContinueClick={handleContinueClick} step3Error={showError} />
            <Box height={'100px'}></Box>
        </Box>
    );
};
