import { Box, Button, Stack, TextField } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";
import { FormBox, Span, TextButton, TextLabel, TextValue } from "../../styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { httpsCallable } from "firebase/functions";
import { functions } from "../../../../Infrastructure/config";
import { ShowErrorToast, ShowSuccessToast } from "../../../Common/Toast/toast";
import { useSelector } from "react-redux";

export const NumberBox = ({ handleOpen, handleClose, showEditNumber }) => {
  const userData = useSelector((state) => state.userData.data);
  const number = userData?.account?.number;
  const numberFormik = useFormik({
    initialValues: {
      number: "",
    },
    validationSchema: Yup.object({
      number: Yup.string().required("Phone number is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { number } = values;
        if (!numberFormik.isValid) {
          return;
        }
        const updateProfile = httpsCallable(functions, "updateaccount");
        const requestData = {
          number: number,
        };
        await updateProfile(requestData);
        ShowSuccessToast("Phone Number updated successfully.");
        handleClose();
      } catch (error) {
        ShowErrorToast("An error occurred while updating the phone number.");
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      {number && (
        <Box pr={3} pl={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            pt={4}
            pb={4}
         >
            <TextLabel>Phone Number</TextLabel>
            <TextValue>{number}</TextValue>
            {!showEditNumber ? (
              <Span
                direction="row"
                alignItems={"center"}
                onClick={() => handleOpen({ prop: "number" })}
              >
                <TextButton curser="pointer">Edit</TextButton>
                <KeyboardArrowDownIcon fontSize="medium" color="primary" />
              </Span>
            ) : (
              <Span
                direction="row"
                alignItems={"center"}
                onClick={() => handleClose()}
              >
                <TextButton curser="pointer">Edit</TextButton>
                <KeyboardArrowUpIcon fontSize="medium" color="primary" />
              </Span>
            )}
          </Stack>
          {showEditNumber && (
            <Box>
              <FormBox
                component="form"
                onSubmit={numberFormik.handleSubmit}
                noValidate
              >
                <Grid container>
                  <Grid lg={5} md={12} sm={12} xs={12}>
                    <Box width="100%" margin="0 auto">
                      <TextField
                        name="number"
                        label="Phone Number"
                        variant="standard"
                        onChange={numberFormik.handleChange}
                        value={numberFormik.values.number}
                        onBlur={numberFormik.handleBlur}
                        error={
                          numberFormik.touched.number &&
                          Boolean(numberFormik.errors.number)
                        }
                        InputLabelProps={{
                          style: { fontSize: 16 },
                        }}
                        InputProps={{
                          style: {
                            fontSize: 18,
                            background: "transparent",
                            width: "100%",
                          },
                        }}
                        fullWidth
                      />
                    </Box>
                  </Grid>
                  <Grid lg={7}></Grid>
                </Grid>
                <Grid container mt={3}>
                  <Grid lg={2} md={2} sm={6} xs={6}>
                    <Box
                      width="90%"
                      margin="0 auto"
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Button variant="contained" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Box>
                  </Grid>
                  <Grid lg={2} md={2} sm={6} xs={6}>
                    <Box
                      width="90%"
                      margin="0 auto"
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Button type="submit" variant="contained">
                        Update
                      </Button>
                    </Box>
                  </Grid>
                  <Grid lg={6} md={6} sm={6} xs={6}></Grid>
                </Grid>
              </FormBox>
            </Box>
          )}
          <hr />
        </Box>
      )}
    </>
  );
};
