import React from "react";
import "./modal.css";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { TextField, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Unstable_Grid2";
import { styles } from "./styles";

const EmailModal = ({ open, setOpen, coursesModal }) => {
  const handleClose = () => setOpen(false);

  return (
    <>
      <Modal
        justifycontent="center"
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box
          sx={
            coursesModal
              ? styles.styleCoursesScreenModal
              : styles.styleWelcomeBoxModal
          }
        >
          <Grid
            container
            display="flex"
            justifyItems="center"
            alignItems="center"
          >
            <Grid
              xs={10}
              md={10}
              display="flex"
              justifycontent="center"
              alignItems="center"
            >
              <Typography
                display="flex"
                justifycontent="center"
                alignItems="center"
                id="keep-mounted-modal-title"
                variant="h5"
                component="h2"
                sx={styles.typoHeading}
              >
                Join Waitlist
              </Typography>
            </Grid>
            <Grid
              xs={2}
              md={2}
              display="flex"
              justifycontent="center"
              alignItems="center"
            >
              <CloseIcon
                className="cursor-pointer"
                onClick={handleClose}
                color="#212121"
              />
            </Grid>
          </Grid>

          <Box sx={styles.input} component="form" noValidate autoComplete="off">
            <TextField
              className="m-4"
              display="flex"
              justifycontent="center"
              id="standard-basic"
              label="Email"
              InputLabelProps={{
                style: {
                  paddingTop: "5px",
                  fontSize: 16,
                },
              }}
              InputProps={{
                style: {
                  fontSize: 16,
                },
              }}
              variant="standard"
            />
            <Button
              className="btn-width m-4"
              variant="contained"
              style={{ textTransform: "capitalize", width:"180px" }}
            >
              Join
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EmailModal;
