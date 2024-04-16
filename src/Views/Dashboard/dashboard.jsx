import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { EducatorDashboard } from "../EducatorDashboard/educatorDashboard";

export const Dashboard = () => {
  const userData = useSelector((state) => state.userData.data);
  const is_educator = userData?.is_educator
  const loading = useSelector((state) => state.userData.loading);
  return (
    <>
      {
        loading ?
          (<Box
            display="flex"
            height="100vh"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>) :
          <Box maxWidth={'1500px'} mx={'auto'}>
            {
              is_educator ?
                <EducatorDashboard />
                : <Box
                  sx={{
                    height: "100vh",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: 'justify'
                  }}
                  maxWidth={'1500px'}
                  mx={"auto"}
                  px={30}
                  py={15}
                >
                  <Typography variant="h6" color="initial">Student Dashboard</Typography>
                </Box>
            }
          </Box>
      }

    </>
  );
};
