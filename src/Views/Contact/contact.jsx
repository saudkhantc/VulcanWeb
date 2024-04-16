import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import { FormBox, Heading, MainBox, SendMessage, styles } from "./styles";
import { Box, TextField, Typography } from "@mui/material";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      message: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("First Name"),
      email: Yup.string()
        .email("Invalid Email Address")
        .required("Email Address"),
      phoneNumber: Yup.string(),
      message: Yup.string().required("Message"),
    }),

    onSubmit: (values) => {
      //handle values
    },
  });

  return (
    <Box sx={{ height: "100vh" }}>
      <Box
        sx={styles.main}
        mt={-5}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <MainBox>
          <Heading variant="h1">Contact Us</Heading>

          <FormBox component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              name="fullName"
              label={
                formik.touched.fullName && Boolean(formik.errors.fullName)
                  ? `${formik.errors.fullName}`
                  : "Full Name"
              }
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.fullName}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              InputLabelProps={{
                style: { fontSize: 16 },
              }}
              InputProps={{
                style: { fontSize: 18, background: "transparent" },
              }}
              fullWidth
            />

            <TextField
              name="email"
              sx={{ mt: "6px" }}
              label={
                formik.touched.email && Boolean(formik.errors.email)
                  ? `${formik.errors.email}`
                  : "Email Address"
              }
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              InputLabelProps={{
                style: { fontSize: 16 },
              }}
              InputProps={{
                style: { fontSize: 18 },
              }}
              fullWidth
            />

            <TextField
              name="phoneNumber"
              sx={{ mt: "6px" }}
              label={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
                  ? `${formik.errors.phoneNumber}`
                  : "Phone Number (Optional)"
              }
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              InputLabelProps={{
                style: { fontSize: 16 },
              }}
              InputProps={{
                style: { fontSize: 18 },
              }}
              fullWidth
            />
            <TextField
              name="message"
              multiline
              rows={4}
              mt={5}
              label={
                formik.touched.message && Boolean(formik.errors.message)
                  ? `${formik.errors.message}`
                  : "Message"
              }
              variant="standard"
              onChange={formik.handleChange}
              value={formik.values.message}
              placeholder="Type your message here"
              error={formik.touched.message && Boolean(formik.errors.message)}
              InputLabelProps={{
                style: { fontSize: 16 },
              }}
              InputProps={{
                style: { fontSize: 18 },
              }}
              fullWidth
            />

            <Box
              pt={3}
              sx={{
                pt: {
                  sm: 1,
                },
              }}
            >
              <SendMessage
                type="submit"
                variant="contained"
                sx={{ width: "150px" }}
                onClick={null}
              >
                <Typography style={{ fontSize: "16px" }}>
                  Send Message
                </Typography>
              </SendMessage>
            </Box>
          </FormBox>
        </MainBox>
      </Box>
    </Box>
  );
};

export default Contact;
