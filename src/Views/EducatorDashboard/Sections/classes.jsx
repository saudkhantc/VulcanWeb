import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { Item } from '../../Common/Item/item'
import { FaArrowLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { CreateClass } from '../../Common/CreateClass/createClass'
import { MainBox } from '../styles'

export const Classes = () => {
  const [newClass, setNewClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showNewCourseForm, setShowNewCourseForm] = useState(false);

  const handleCreateNewCourse = () => {
    setSelectedClass(null)
    setShowNewCourseForm(true);
    setNewClass(true)
  }

  const handleCloseForm = () => {
    setShowNewCourseForm(false);
  }
  const handleClick = (course, courseId, classId, courseClass) => {
    setSelectedClass({ course, courseId, classId, courseClass })
    setShowNewCourseForm(true);
  }
  const userData = useSelector((state) => state.userData.data);
  const courses = userData?.educator?.courses;
  const coursesArray = courses ? Object.entries(courses) : [];
  const activeCourses = coursesArray.filter(([courseId, courseDetails]) => {
    return courseDetails?.status === 'active';
  });
  const buildClassItems = () => {
    const classItems = [];
    for (const [courseId, course] of coursesArray) {
      if (Object.prototype.hasOwnProperty.call(courses, courseId)) {
        // Iterate over the class_schedule of the current course
        for (const classId in course.courseDetails.class_schedule) {
          if (Object.prototype.hasOwnProperty.call(course?.courseDetails?.class_schedule, classId)) {
            const courseClass = course?.courseDetails?.class_schedule[classId];
            const classItem = {
              courseClass,
              courseTitle: course?.courseDetails?.basics?.title,
              course,
              courseId,
              classId,
            };
            classItems.push(classItem);
          }
        }
      }
    }
    return classItems;
  }
  return (
    <MainBox width="full" pb={20}>
      {showNewCourseForm ? (
        <Box sx={{ cursor: 'pointer', pb: 2, display: 'inline-block' }}>
          <FaArrowLeft onClick={() => handleCloseForm(false)} />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 8, mb: 5 }}>
          {
            activeCourses.length > 0 ? <>
              <Typography variant='h1'>Classes</Typography>
              <Button variant="contained" color="primary" onClick={handleCreateNewCourse}>
                Create New Class
              </Button>
            </> : ""}
        </Box>
      )}
      {showNewCourseForm ? (
        <CreateClass activeCourses={activeCourses} isDashboard={true} selectedClass={selectedClass} newClass={newClass} setNewClass={setNewClass} setShowNewCourseForm={setShowNewCourseForm} />
      ) : (
        <Box display="flex" gap={5} flexWrap="wrap" pb={5}>
          {activeCourses.length > 0 && buildClassItems().length > 0 ? (
            buildClassItems().map(({ courseId, classId, course, courseClass, courseTitle }) => (
              <Item
                key={`${courseId}${classId}`}
                courseTitle={courseTitle}
                classItem={true}
                classDetails={courseClass}
                status={courseClass.status}
                onClick={() => handleClick(course, courseId, classId, courseClass)}
              />
            ))
          ) : (
            <Box display="flex" justifyContent="center" width="100%">
              <Typography variant="h4" color="initial" mx={{md:10}} mt={20}>
                {activeCourses.length > 0
                  ? "No classes have been created for active courses yet."
                  : "Classes will appear here once a course has been successfully created"
                }
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </MainBox>

  )
}
