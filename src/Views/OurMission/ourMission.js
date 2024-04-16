import React from "react";
import "./ourMission.css";
import bringIm from "../../Assets/Images/bringimg.png";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2";
import {
  BannerContainer,
  Header,
  Image,
  Item,
  Paragraph,
  StyledBox,
  TextContainer,
  styles,
} from "./styles";
import image from "../../Assets/Images/teacher.png";
import image2 from "../../Assets/Images/onlineTeacher2.png";

const OurMission = () => {
  const navigate = useNavigate();
  const is_small_screen_val = useMediaQuery("max-width: 390px");
  const is_small_screen = is_small_screen_val.toString();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  return (
    <>
      <BannerContainer>
        <TextContainer sx={{ flex: 1 }}>
          <Header variant="h1" py={2}>
            Our Mission
          </Header>
          <Paragraph variant="body2">
            Connecting learners directly with subject matter experts - in any
            subject.
          </Paragraph>
        </TextContainer>
        <StyledBox sx={{ flex: 1 }}>
          {isMobile ? (
            <Image src={image2} alt="Banner" />
          ) : (
            <Image src={image} alt="Banner" />
          )}
        </StyledBox>
      </BannerContainer>

      <Box m={6}>
        <Typography align="center" variant="h1" color="primary">
          Bringing Education into the 21st century
        </Typography>
      </Box>
      <Grid
        container
        display="flex"
        alignItems="center"
        justifycontent="center"
        sx={styles.mainGrid1}
      >
        <Grid container xs={12} sm={10} md={6} lg={6}>
          <Box display={"flex"} justifycontent={"center"} alignItems={"center"}>
            <img
              src={bringIm}
              className="img-fluid brinaaimg"
              alt="not found"
            />
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6}>
          <Box p={3}>
            <Typography align="left" fontSize={24} variant="paragraph">
              Education is a core pillar of our society. But the current system
              hasn’t been working for everyone. It’s been plagued with ever
              rising costs, long timeframes, unsatisfactory outcomes, and high
              barriers to entry.
            </Typography>

            <Box mt={5}>
              <Typography align="left" fontSize={24} variant="paragraph">
                We asked the question: What would an education system that works
                for everyone look like? The Vulcan Learning platform was the
                answer.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Box mt={10} mb={10}>
        <Typography align="center">Vulcan Learning Platform</Typography>
      </Box>

      <Grid
        container
        displey="flex"
        justifycontent="center"
        alignItems="center"
      >
        <Grid
          xs={12}
          sm={10}
          md={6}
          lg={4}
          display="flex"
          flexDirection="column"
          justifycontent="center"
          alignItems="center"
        >
          <Typography
            variant="body4"
            color="primary.main"
            sx={styles.boxTypoHeading}
          >
            Univeral Access
          </Typography>
          <Item
            sx={styles.boxTypoDescription}
            is_small_screen={is_small_screen}
          >
            No GPA. No SAT. No assessment. No Application. Anyone can enroll in
            a course on the Vulcan Learning platform. We won’t turn our backs on
            learners.
          </Item>
        </Grid>

        <Grid
          xs={12}
          sm={10}
          md={6}
          lg={4}
          display="flex"
          flexDirection="column"
          justifycontent="center"
          alignItems="center"
        >
          <Typography
            variant="body4"
            color="primary.main"
            sx={styles.boxTypoHeading}
          >
            Best Educators
          </Typography>
          <Item
            sx={styles.boxTypoDescription}
            is_small_screen={is_small_screen}
          >
            Our courses are taught by the top educators in a given field.
            Educators are vetted for demonstrated experience, skill, and
            character.
          </Item>
        </Grid>

        <Grid
          xs={12}
          sm={10}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifycontent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body4"
            color="primary.main"
            sx={styles.boxTypoHeading}
          >
            Personalized
          </Typography>
          <Item
            sx={styles.boxTypoDescription}
            is_small_screen={is_small_screen}
          >
            We offer a wide variety of courses with unique Educators, subjects,
            and teaching styles. This allows learners to choose the instructor,
            pace, and level that fits them best.
          </Item>
        </Grid>
      </Grid>
      <Box mt={5} mb={5} onClick={() => navigate("/how-it-works")}>
        <Typography sx={styles.linkText} variant="h4" align="center">
          Learn more about how the Vulcan Learning platform works
        </Typography>
      </Box>
    </>
  );
};

export default OurMission;
