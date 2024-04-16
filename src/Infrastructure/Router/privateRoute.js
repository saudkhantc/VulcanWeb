import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  chooseModalEmailVerify,
  chooseModalLogin,
  setSelectedRoute,
} from "../States/authModalsSlice";
import useAuthentication from "../States/onAuthStateChange";
import { Box, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

export const PrivateOutlet = (props) => {
  const dispatch = useDispatch();
  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAuthentication();
  const userData = useSelector((state) => state.userData.data);
  const onboarding_complete = userData?.educator?.onboarding_complete
  if (loading) {
    return (
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }
  if (!user) {
    dispatch(chooseModalLogin());
    return navigate("/");
  } else if (!user.emailVerified && location.pathname === "/dashboard") {
    dispatch(setSelectedRoute(location.pathname));
    dispatch(chooseModalEmailVerify());
    return navigate("/");
  } else if (userData && userData?.is_educator && !onboarding_complete && location.pathname === "/dashboard") {
    return navigate("/educator-account");
  }
  else {
    return (
      <>
        {children}
        <Outlet />
      </>
    );
  }
};

export const PrivateOutletEdu = (props) => {

  const { children } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthentication();
  const loading = useSelector((state) => state.userData.loading);
  const userData = useSelector((state) => state.userData.data);
  const onboardingComplete = userData?.educator?.onboarding_complete;

  if (loading) {
    return (
      <Box
        display="flex"
        height="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  } else if ((user?.emailVerified && onboardingComplete) && location.pathname === "/educator-account") {
    return navigate("/dashboard");
  } else {
    return (
      <>
        {children}
        <Outlet />
      </>
    );
  }
};
