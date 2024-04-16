import React, { useEffect, useState } from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material"
import FilterListIcon from "@mui/icons-material/FilterList"
import { ExpandMore, Search } from "@material-ui/icons"
import Grid from "@mui/material/Unstable_Grid2/Grid2"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../Common/loader"
import './style.css'
import { CourseCard } from "../Common/CourseCard/courseCard"
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { useNavigate } from "react-router-dom"
import { setCoursesData } from "../../Infrastructure/States/userDataSlice"
import { httpsCallable } from "firebase/functions"
import { functions } from "../../Infrastructure/config"

export const Courses = () => {
  const categories = [
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
  const ratings = [
    {
      value: 5,
    },
    {
      value: 4,
    },
    {
      value: 3,
    },
    {
      value: 3.5,
    },
    {
      value: 2.5,
    },
    {
      value: 2,
    },
    {
      value: 1,
    },
  ]
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [enableFilter, setEnableFilter] = useState(true)
  const [selectedValue, setSelectedValue] = useState("newest")
  const [showMoreRatings, setShowMoreRatings] = useState(false)
  const loading = useSelector((state) => state.userData.loading)
  const coursesData = useSelector((state) => state.userData.coursesData)
  const visibleCategories = showMore ? categories : categories.slice(0, 5);
  const visibleRatings = showMoreRatings ? ratings : ratings.slice(0, 5);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  const toggleShowMoreRatings = () => {
    setShowMoreRatings(!showMoreRatings);
  }
  const handleCategoryChange = (label) => {
    if (selectedCategories.includes(label)) {
      setSelectedCategories(selectedCategories.filter((category) => category !== label));
    } else {
      setSelectedCategories([...selectedCategories, label]);
    }
  };
  const renderCourseCards = () => {
    if (!coursesData) {
      return [];
    }
    return (
      Object.entries(coursesData)
        .filter(([courseId, course]) => {
          const titleMatch = course?.courseDetails?.basics?.title.toLowerCase().includes(searchTerm.toLowerCase());
          const subtitleMatch = course?.courseDetails?.basics?.subTitle.toLowerCase().includes(searchTerm.toLowerCase());
          const firstName = course?.user?.account?.first_name.toLowerCase().includes(searchTerm.toLowerCase());
          const lastName = course?.user?.account?.last_name.toLowerCase().includes(searchTerm.toLowerCase());
          if (selectedCategories.length === 0) {
            return titleMatch || subtitleMatch || firstName || lastName;
          } else {
            return (titleMatch || subtitleMatch || firstName || lastName) && selectedCategories?.includes(course?.courseDetails?.basics?.category);
          }
        })
        .sort(([a], [b]) => {
          if (selectedValue === 'newest') {
            return b - a;
          } else if (selectedValue === 'oldest') {
            return a - b;
          } else {
            return 0;
          }
        })
        .map(([courseId, { courseDetails, user }]) => {
          const educatorName = `${user?.account?.first_name} ${user?.account?.last_name}`;

          return (
            <CourseCard key={courseId} onClick={() => navigate(`/courses/${courseDetails?.basics?.title.replaceAll(' ', '-')}`)} enableFilter={enableFilter} courseId={courseId} cost={courseDetails?.basics?.cost} title={courseDetails?.basics?.title} subTitle={courseDetails?.basics?.subTitle} courseImage={courseDetails?.details?.course_image} educatorName={educatorName} stars={5} reviews={"1"} />
          );
        })
    );
  };
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = httpsCallable(functions, "courses");
        const res = await courses();
        dispatch(setCoursesData(res?.data?.activeCourses));
        setLoadingCourses(false);
      } catch (error) {
        setError(error);
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, [dispatch]);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        maxWidth: '1500px',
        px: { xs: 2, md: 5 },
        py: 3,
        mx: 'auto'
      }}
    >
      <Box sx={{ display: "flex", flexDirection: { md: 'row', xs: 'column' }, width: "100%" }} py={3}>
        <Box width={{ xs: '100%', md: '28%' }} display={'flex'} gap={5}>
          <Button
            color="secondary"
            sx={{
              borderRadius: "0px",
              paddingX: "20px",
              paddingY: "27px",
              textTransform: "capitalize",
            }}
            onClick={() => setEnableFilter(prevState => !prevState)}
            startIcon={<FilterListIcon fontSize="30px" />}
          >
            Filter
          </Button>
          <FormControl fullWidth sx={{ borderRadius: '0px', position: 'relative', p: 0 }}>
            <p
              style={{
                fontSize: "11px", fontWeight: "bold",
                position: 'absolute', top: 10, left: "10px"
              }}
            >Sort by</p>
            <Select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              sx={{
                borderRadius: '0px',
                height: '56px',
                display: 'flex',
                alignItems: 'flex-end',
                p: 0,
                "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
                  padding: '25px 0px 5px 10px',
                },
                "& .MuiSvgIcon-root.MuiSelect-icon": {
                  position: 'absolute',
                  right: '7px',
                  top: '25px',
                },
                "& .MuiInputBase-root.MuiOutlinedInput-root": {
                  borderRadius: '100px',
                }
              }}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box width={{ xs: '100%', md: "73%" }} ml={5}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            sx={{ width: '100%', float: 'right', }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
      <Grid container>
        {
          enableFilter ?
            <Grid xs={12} lg={3.24} height={{ lg: '80vh' }} overflow={'scroll'}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%",
                }}
              >
                <Accordion
                  sx={{
                    borderTop: '2px solid lightgray',
                    boxShadow: 'none',
                    borderRadius: '0px',
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => setShowMoreRatings(false)}
                  >
                    <Typography variant="h6" fontSize={17}>Ratings</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {visibleRatings.map(({ value }, index) => (
                        <FormControlLabel
                          key={index}
                          value={value}
                          control={<Checkbox />}
                          label={<Box display={'flex'} alignItems={'center'}>
                            <Rating name="read-only" value={value} readOnly />
                            <div> {value} & Up (10,000) </div>
                          </Box>}
                        />
                      ))}
                    </FormGroup>
                    {visibleRatings.length > 5 && (
                      <Typography variant="body1" color="primary" onClick={toggleShowMoreRatings} sx={{ cursor: 'pointer' }}>
                        {showMoreRatings ? 'Show less' : 'Show more'}
                        {showMoreRatings ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                  borderTop: '2px solid lightgray',
                  boxShadow: 'none',
                  borderRadius: '0px'
                }}>
                  <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onClick={() => setShowMore(false)}
                  >
                    <Typography variant="h6" fontSize={17}>Categories</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormGroup>
                      {visibleCategories.map(({ name, label }, index) => (
                        <FormControlLabel
                          key={index}
                          control={<Checkbox checked={selectedCategories.includes(label)} onChange={() => handleCategoryChange(label)} />}
                          value={label}
                          label={label}
                        />
                      ))}
                    </FormGroup>
                    {categories.length > 5 && (
                      <Typography variant="body1" color="primary" onClick={toggleShowMore} sx={{ cursor: 'pointer' }}>
                        {showMore ? 'Show less' : 'Show more'}
                        {showMore ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              </Box>
            </Grid> : ""}
        <Grid sm={12} lg={enableFilter ? 8.76 : 12} pl={{ lg: enableFilter ? 5 : 0 }} pt={{ xs: 5, lg: 0 }} width={'100%'} height={loading || loadingCourses ? 'auto' : '80vh'} overflow={'scroll'}>
          {
            loadingCourses || loading ? <Loader /> :
              renderCourseCards()?.length > 0 ? renderCourseCards() :
                <Box height={'50vh'} width={'100%'} textAlign={'center'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <Typography textAlign={'center'} variant="body1">{error ? error : "No courses found."}</Typography>
                </Box>
          }
        </Grid>
      </Grid>
    </Box >
  )
}