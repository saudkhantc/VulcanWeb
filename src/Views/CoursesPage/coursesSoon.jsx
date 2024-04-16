import React, { useState } from "react";
import "./coursesSoon.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { styles } from "./styles";
import EmailModal from "../CoursesScreen/Modal/joinWaitlistModal";

const CoursesSoon = () => {
  const [open, setOpen] = useState(false);

  const modalHandle = () => {
    setOpen(!open);
  };
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <>
      <EmailModal open={open} setOpen={setOpen} coursesModal={true} />

      <div className="container-fluid">
        <div className="row">
          <div className={`col-12 ${isDesktop ? "courses-bg-img " : null}`}>
            <div className="coming-soon" style={{ marginBottom: "40px" }}>
              <Box>
                <Typography
                  color="primary"
                  align="center"
                  sx={styles.typoHeading}
                >
                  Coming Soon
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    pr: 5,
                    pl: 5,
                    fontWeight: "bold",
                    fontSize: "24px",
                    pb: 5,
                  }}
                >
                  We’re in the process of partnering with the best Educators to
                  offer a wide variety of educational classes. Check back soon.
                </Typography>
                <Typography align="center" sx={styles.typoDescription}>
                  {" "}
                  Join the waitlist to be notified when new courses are
                  available
                </Typography>
              </Box>
              <Box className="joinWaitListBox" pb={4}>
                <Button
                  onClick={modalHandle}
                  variant="contained"
                  style={{ textTransform: "capitalize" }}
                >
                  Join Waitlist
                </Button>
              </Box>
            </div>
          </div>
          <div
            className={`col-12 ${!isDesktop ? "courses-bg-img2 " : null}`}
          ></div>
        </div>
      </div>
    </>
  );
};

export default CoursesSoon;
