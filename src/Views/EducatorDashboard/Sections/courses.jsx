import React, { useState } from 'react'
import { MainBox, CoursesBox } from '../styles'
import { Box, Button, Typography } from '@mui/material'
import { Item } from '../../Common/Item/item'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../Common/loader'
import { cleanCourseState, setCourseDetails } from '../../../Infrastructure/States/courseDetailsSlice'
import { CourseListing } from '../../CourseListing/courseListing'
import { resetCoursesSteps } from '../../../Infrastructure/States/coursesStepsSlice'

export const Courses = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [course, setCourse] = useState('');
  const userData = useSelector((state) => state.userData.data)
  const courses = userData?.educator?.courses
  const loading = useSelector((state) => state.userData.loading)
  const coursesArray = courses ? Object.entries(courses) : [];
  const handleCreate = () => {
    dispatch(resetCoursesSteps())
    navigate('/create-course')
    dispatch(cleanCourseState());
  }
  const handleClick = ({ courseId, courseDetails }) => {
    dispatch(resetCoursesSteps())
    setCourse({
      course: courseDetails,
      courseId
    });
    dispatch(setCourseDetails({
      course: courseDetails,
      courseId
    }));
  };
  return (
    <MainBox width={"full"}>
      {course ? '' :
        <Box sx={{ display: 'flex', gap: 8, mb: 5 }}><Typography variant='h1'>Courses</Typography> <Button variant="contained" color="primary" onClick={handleCreate}>
          Create New Course
        </Button>
        </Box>}
      {
        loading ? <Loader /> :
          course ? <CourseListing dashboardState={true} setCourse={setCourse} /> :
            coursesArray.length > 0 ?
              <CoursesBox pb={5}>
                {coursesArray.map(([courseId, courseDetails]) => (
                  <Item
                    key={courseId}
                    courseId={courseId}
                    courseTitle={courseDetails?.courseDetails?.basics?.title}
                    status={courseDetails?.status}
                    onClick={() => courseDetails?.status === 'in_progress' ? navigate(`/create-course`, { state: courseId }) : handleClick({ courseId, courseDetails })}
                  />
                ))}
              </CoursesBox> : <Box display={'flex'} justifyContent={'center'}>
                <Typography variant="h3" color="initial" mt={20}>No courses created yet!</Typography>
              </Box>
      }
    </MainBox>
  )
}
