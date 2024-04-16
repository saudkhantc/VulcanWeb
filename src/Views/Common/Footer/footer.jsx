import React, { useContext, useEffect, useState } from "react";
import Logo from "../../../Assets/Images/logoWhite.svg";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Typography,
  Box,
  Modal,
  FormGroup,
  FormControlLabel,
  Switch, Button, FormControl, RadioGroup, Radio,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { FooterContainer, MainBox, styles } from "./styles";
import { Link, useNavigate } from "react-router-dom";
import { ModalBackgroundBox } from "../../Contact/styles";
import { FeatureFlags } from "../../../Infrastructure/featureFlags";
import { httpsCallable } from "firebase/functions";
import { ShowErrorToast, ShowSuccessToast } from "../Toast/toast";
import { functions } from "../../../Infrastructure/config";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, update } from "firebase/database";
import useAuthentication from "../../../Infrastructure/States/onAuthStateChange";
import { setCoursesData } from "../../../Infrastructure/States/userDataSlice";

const Footer = () => {
  const db = getDatabase()
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { user } = useAuthentication();
  const uid = user?.uid;
  const [status, setStatus] = useState(null);
  const currentYear = new Date().getFullYear();
  const [clickCount, setClickCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [coursesModal, setCoursesModal] = useState(false);
  const { features, setFeatures } = useContext(FeatureFlags);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const userData = useSelector((state) => state.userData.data);
  const courses = userData?.educator?.courses
  const coursesArray = courses ? Object.entries(courses) : [];
  const firstName = userData?.account?.first_name;
  const approvedAccount = userData?.educator?.approved;
  const lastNameFirstLetter = userData?.account?.last_name[0];

  // Access the showCourses flag
  const showCourses = features.showCourses;
  const approved = features.approved;
  const emailVerified = features.emailVerified;

  const handleChange = async (event) => {
    try {
      setStatus(event.target.value);
      const updateCourseStatus = httpsCallable(functions, "updatecoursestatus");
      await updateCourseStatus({ courseId: selectedCourseId, status: event.target.value });
      const courses = httpsCallable(functions, "courses")
      const res = await courses();
      dispatch(setCoursesData(res?.data?.activeCourses))
      setStatusModal(false)
      setCoursesModal(true)
      setStatus(null)
    }
    catch (err) {
      // handle error here
    } finally {
      setSelectedCourseId(null)

    }
  };
  const handleClick = () => {
    setClickCount(clickCount + 1);
  };
  const handleClose = () => {
    setModalOpen(false);
    setCoursesModal(false);
    setStatusModal(false);
    setClickCount(0);
  };
  const handleToggleShowCourses = () => {
    // Update the showCourses flag value
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      showCourses: !prevFeatures.showCourses,
    }));
  };
  const handleToggleApproved = async () => {
    // Update the showCourses flag value
    try {
      setFeatures((prevFeatures) => ({
        ...prevFeatures,
        approved: !prevFeatures.approved,
      }));
      const userRef = ref(db, `users/${uid}/educator`);
      await update(userRef, {
        approved: !approved
      });
      if (approved !== true) {
        ShowSuccessToast("Educator Account Approved")
      } else {
        ShowSuccessToast("Educator Account not Approved")
      }
    } catch (err) {
      ShowErrorToast("Something went wrong try again!")
    }
  };
  const handleToggleEmailVerified = async () => {
    try {
      // Update the email Verification flag value
      setFeatures((prevFeatures) => ({
        ...prevFeatures,
        emailVerified: !prevFeatures.emailVerified,
      }));
      const verifyEmail = httpsCallable(functions, "emailverify");
      await verifyEmail();
      ShowSuccessToast("Email Verifications toggled!")
    } catch (err) {
      ShowErrorToast("Email Verifications not toggled!")
    } finally {
      window.location.reload();
    }
  };
  const handleFunction = () => {
    if (approvedAccount) {
      navigate(`/educators/${firstName}${lastNameFirstLetter}`)
      handleClose()
    } else {
      ShowErrorToast("Educator Account is not Approved!")
    }
  }
  const changeStatusFunction = (courseId, courseDetails) => {
    setSelectedCourseId(courseId)
    setStatusModal(true)
    setCoursesModal(false)
    setStatus(courseDetails?.status)
  }
  const handleCoursesModal = () => {
    setCoursesModal(true)
    setModalOpen(false);
  }

  useEffect(() => {
    if (clickCount === 3) {
      setModalOpen(true);
    }
  }, [clickCount]);

  return (
    <>
      {modalOpen && (
        <ModalBackgroundBox>
          <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MainBox display={"flex"} flexDirection={"Column"}>
              <Typography variant="h6" p={5}>
                Flag Features
              </Typography>
              <FormGroup style={{ display: "flex", flexDirection: "column", gap: 2, mx: 2 }}>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} px={5}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={showCourses}
                        onChange={() => handleToggleShowCourses(showCourses)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Show Courses
                      </span>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={approved}
                        onChange={() => handleToggleApproved(approved)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Approved
                      </span>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={emailVerified}
                        onChange={() => handleToggleEmailVerified(emailVerified)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    }
                    label={
                      <span
                        style={{
                          fontSize: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        Email Verified
                      </span>
                    }
                  />
                </Box>

                <Button variant="contained" color="primary" onClick={() => handleFunction()}>
                  Profile Page
                </Button>

                <Button variant="contained" color="primary" onClick={() => handleCoursesModal()}>
                  Change Courses Status
                </Button>
              </FormGroup>
            </MainBox>
          </Modal>
        </ModalBackgroundBox>
      )}
      {coursesModal && (
        <ModalBackgroundBox>
          <Modal
            open={coursesModal}
            onClose={handleClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box display={"flex"} flexDirection={"Column"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                border: "1px solid black",
                borderRadius: "50px",
                minWidth: "300px",
                backgroundColor: "white",
                paddingBottom: 5,
                pt: 2
              }}>
              <Typography variant="h6" p={5}>
                Courses
              </Typography>
              <Box display={'flex'} flexDirection={'column'} gap={2}
                sx={{
                  height: "240px",
                  width:"80%",
                  overflowY: 'scroll',
                 
                }}>
                {coursesArray.map(([courseId, courseDetails]) => (
                  <Button key={courseId} variant="contained" color="primary" onClick={() => changeStatusFunction(courseId, courseDetails)}>
                    {courseDetails?.courseDetails?.basics?.title}
                  </Button>

                ))}
              </Box>
            </Box>
          </Modal>
        </ModalBackgroundBox>
      )}

      {statusModal && (
        <Modal
          open={statusModal}
          onClose={handleClose}
          aria-labelledby="login-modal-title"
          aria-describedby="login-modal-description"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box display={"flex"} flexDirection={"Column"}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              border: "1px solid black",
              borderRadius: "50px",
              minWidth: "300px",
              minHeight: "400px",
              backgroundColor: "white",
              paddingBottom: 5,
              pt: 2,
            }}>
            <Typography variant="h6" p={5}>
              Status Toggle
            </Typography>
            <Box display={'flex'} flexDirection={'column'} gap={2}>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={status}
                  onChange={handleChange}
                >
                  <FormControlLabel value="active" control={<Radio />} label="Active" />
                  <FormControlLabel value="in_progress" control={<Radio />} label="In Progress" />
                  <FormControlLabel value="pending" control={<Radio />} label="Pending" />
                  <FormControlLabel value="archived" control={<Radio />} label="Archived" />
                  <FormControlLabel value="denied" control={<Radio />} label="Denied" />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
        </Modal>
      )}
      <FooterContainer>
        <Grid container spcing={3}>
          {/* Sub Grid 1 */}
          <Grid xs={12} sm={12} md={12} lg={6} sx={{ mb: { xs: 2, sm: 2 } }}>
            <Box sx={styles.subGrid1Box}>
              <Box sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                <img src={Logo} height="50px" alt="" />
              </Box>

              <Typography
                variant="h1"
                sx={styles.subGrid1BoxTypo}
                onClick={handleClick}
              >
                Education for Everyone
              </Typography>
            </Box>
            <Typography
              variant="h1"
              className="container"
              sx={styles.subGrid1Typo}
            >
              © {currentYear} Vulcan Learning Institute LLC
            </Typography>
          </Grid>

          {/* Sub Grid 2 */}
          <Grid
            xs={10}
            sm={11}
            md={11}
            lg={5}
            sx={styles.subGrid2}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Typography
              variant="h6"
              sx={styles.subGrid2Typo}
              onClick={() => navigate("/policies")}
            >
              Policies
            </Typography>

            <Typography
              variant="h6"
              sx={styles.subGrid2Typo}
              onClick={() => navigate("/privacy")}
            >
              Privacy
            </Typography>

            <Typography
              variant="h6"
              sx={styles.subGrid2Typo}
              onClick={() => navigate("/contact")}
            >
              Contact
            </Typography>
          </Grid>

          {/* Sub Grid 3 */}
          <Grid
            xs={2}
            sm={1}
            md={1}
            lg={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Link
              to="https://twitter.com/vulcaninstitute"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon
                fontSize="large"
                className="twticon"
                sx={{ ...styles.subGrid3Icon, color: (theme) => theme.palette.primary.main }}
              />
            </Link>
          </Grid>
        </Grid>
      </FooterContainer>
    </>
  );
};

export default Footer;
