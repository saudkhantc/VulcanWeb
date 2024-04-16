import React, { useEffect, useState } from "react";
import { Loader } from "../Common/loader";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Stack } from "@mui/material";
import Vector from "../../Assets/Images/vector.png";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import { AboutMe, FullName, TitleText } from "../EducatorOnBoarding/styles";
import {
  BioData,
  LinkTag,
  SocialMedia,
  SocialMediaContainer,
  SocialMediaText,
} from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { setCourseDetails } from "../../Infrastructure/States/courseDetailsSlice";

export const EducatorProfiles = ({ edit, setEdit, dashboard }) => {
  const { name } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [educatorData, setEducatorData] = useState(null)
  const userData = useSelector((state) => state.userData.coursesData)
  const loggedUserData = useSelector((state) => state.userData.data)
  const loading = useSelector((state) => state.userData.loading);
  const avatar = useSelector((state) => state.course.avatar)
  const profile = dashboard ? loggedUserData?.educator?.profile : educatorData?.profile;
  const aboutMe = profile?.about_me;
  const youtube = profile?.youtube;
  const linkedin = profile?.linkedin;
  const twitter = profile?.twitter;
  const website = profile?.website;
  const profilePicture = dashboard ? loggedUserData?.educator?.profile?.avatar : educatorData?.profile?.avatar
  const firstName = dashboard ? loggedUserData?.account?.first_name : educatorData?.account?.first_name
  const lastName = dashboard ? loggedUserData?.account?.last_name : educatorData?.account?.last_name
  // Helper function to ensure URLs have a protocol (https://)
  function ensureHttpsProtocol(url) {
    if (url && !url.startsWith("https://")) {
      return "https://" + url;
    }
    return url;
  }
  const websiteUrl = ensureHttpsProtocol(website);
  const youtubeUrl = ensureHttpsProtocol(youtube);
  const linkedinUrl = ensureHttpsProtocol(linkedin);
  const twitterUrl = ensureHttpsProtocol(twitter);
  useEffect(() => {
    if (name && userData && Object.keys(userData).length > 0) {
      const foundUser = Object.values(userData).find(course => {
        const firstName = course?.user?.account?.first_name; // Fixed access to first_name
        const lastNameFirstLetter = course?.user?.account?.last_name?.charAt(0); // Fixed access to last_name
        return `${firstName}${lastNameFirstLetter}` === name; // Added return statement
      });
      if (foundUser) {
        const courseId = Object.keys(userData).find(key => userData[key] === foundUser);
        dispatch(setCourseDetails({ course: foundUser, courseId: courseId }));
      } else {
        navigate('*');
      }
      setEducatorData(foundUser?.user)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, name])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box
          height={"90vh"}
          pt={{ lg: edit ? 8 : 0, md: 6, sm: 3, xs: 2 }}
        >
          <Grid
            container
            display={"flex"}
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Grid
              lg={7}
              md={12}
              sm={12}
              xs={12}
              p={{ lg: 5, md: 5, sm: 5, xs: 5 }}
              mb={6}
              display={{ lg: "flex" }}
              flexDirection={"column"}
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              order={{ lg: 1, md: 2, sm: 2, xs: 2 }}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                sx={{ width: "100%" }}
              >
                <TitleText color={"primary"} pb={2}>
                  Educator
                </TitleText>
                <FullName color={"secondary"}>
                  {firstName} {lastName}
                </FullName>
                {edit ? <AboutMe pt={10} color={"primary"} pb={2}>
                  About Me
                </AboutMe>
                  :
                  <Box display={'flex'} pt={5} pb={2} width={'100%'} justifyContent={'space-between'}>
                    <AboutMe color={"primary"} >
                      About Me
                    </AboutMe>
                    {dashboard && <Button variant="contained" color="primary" onClick={() => setEdit(true)}>
                      Edit
                    </Button>}
                  </Box>}
                <BioData sx={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: aboutMe }} />
              </Box>
            </Grid>
            <Grid
              p={{ lg: 5, md: 5, sm: 5, xs: 5 }}
              lg={5}
              md={12}
              sm={12}
              xs={12}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
              order={{ lg: 2, md: 1, sm: 1, xs: 1 }}
            >
              <Box maxWidth={{ md: "70%", lg: "100%", xlg: "100%" }}>
                <Stack direction="row" spacing={2}>
                  <Box position="relative">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <img
                        src={avatar ? avatar : profilePicture || Vector}
                        height={200}
                        width={200}
                        alt="Preview"
                      />
                    </Box>
                  </Box>
                </Stack>
                <SocialMediaContainer gap={1} mt={3}>
                  {websiteUrl && (
                    <LinkTag href={websiteUrl} target="_blank" rel="noreferrer">
                      <SocialMedia>
                        <InsertLinkIcon fontSize="small" />
                        <SocialMediaText>Website</SocialMediaText>
                      </SocialMedia>
                    </LinkTag>
                  )}
                  {youtubeUrl && (
                    <LinkTag href={youtubeUrl} target="_blank" rel="noreferrer">
                      <SocialMedia>
                        <YouTubeIcon fontSize="small" />
                        <SocialMediaText>Youtube</SocialMediaText>
                      </SocialMedia>
                    </LinkTag>
                  )}
                  {twitterUrl && (
                    <LinkTag href={twitterUrl} target="_blank" rel="noreferrer">
                      <SocialMedia>
                        <TwitterIcon fontSize="small" />
                        <SocialMediaText>Twitter</SocialMediaText>
                      </SocialMedia>
                    </LinkTag>
                  )}
                  {linkedinUrl && (
                    <LinkTag
                      href={linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <SocialMedia>
                        <LinkedInIcon fontSize="small" />
                        <SocialMediaText>Linkedin</SocialMediaText>
                      </SocialMedia>
                    </LinkTag>
                  )}
                </SocialMediaContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};
