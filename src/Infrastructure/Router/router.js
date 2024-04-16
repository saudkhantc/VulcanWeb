import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import OurMission from "../../Views/OurMission/ourMission";
import BecomeEducator from "../../Views/BecomeEducator/becomeEducator";
import HowItWorks from "../../Views/HowItWorks/howItWorks";
import EducatorFaq from "../../Views/Faq/educatorFaq";
import LearnerFaq from "../../Views/Faq/learnerFaq";
import Privacy from "../../Views/Privacy/privacy";
import Policies from "../../Views//Policies/policies";
import Contact from "../../Views//Contact/contact";
import EducatorAccountMainPage from "../../Views/EducatorOnBoarding/educatorAccountMainPage";
import Navbar from "../../Views/Common/Header/navbar";
import Footer from "../../Views/Common/Footer/footer";
import { FeatureFlags } from "../../Infrastructure/featureFlags";
import { Courses } from "../../Views/CoursesScreen/courses";
import CoursesSoon from "../../Views/CoursesPage/coursesSoon";
import HomeScreen from "../../Views/Home/home";
import { Dashboard } from "../../Views/Dashboard/dashboard.jsx";
import { PrivateOutlet, PrivateOutletEdu } from "./privateRoute";
import Error404 from "../../Views/Common/Error404/error404";
import { Account } from "../../Views/Account/account";
import { getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../States/userDataSlice";
import { EducatorProfiles } from "../../Views/EducatorProfiles/educatorProfiles";
import { CourseCreationFlow } from "../../Views/CourseCreationFlow/courseCreationFlow.jsx";
import { CourseListing } from "../../Views/CourseListing/courseListing.jsx";
import { CheckoutForm } from "../../Views/Checkout/checkout.jsx";
import { Return } from "../../Views/PaymentReturn/return.jsx";

const Router = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const { features } = React.useContext(FeatureFlags);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);
  useEffect(() => {
    if (userId) {
      dispatch(fetchUserData(userId));
    }
  }, [dispatch, userId], fetchUserData);

  return (
    <div>
      {(location.pathname !== "/educator-account") && (location.pathname !== "/create-course") ? <Navbar /> : ""}
      <Routes>
        <Route exact path="/" element={<HomeScreen />} />
        <Route exact path="/about" element={<OurMission />} />
        {features.showCourses ? (
          <Route exact path="/courses" element={<CoursesSoon />} />
        ) : (
          <Route exact path="/courses" element={<Courses />} />
        )}
        <Route
          exact
          path="/become-educator"
          element={<BecomeEducator />}
        ></Route>
        <Route exact path="/how-it-works" element={<HowItWorks />} />
        <Route exact path="/educator-faq" element={<EducatorFaq />} />
        <Route exact path="/learner-faq" element={<LearnerFaq />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route exact path="/policies" element={<Policies />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/courses/:title" element={<CourseListing live={true} isCoursePage={true} />} />
        <Route
          exact
          path="/create-course"
          element={<CourseCreationFlow />}
        />
        <Route element={<PrivateOutlet />}>
          <Route exact path={"/dashboard"} element={<Dashboard />} />
          <Route path={"/account"} element={<Account />} />
        </Route>
        <Route element={<PrivateOutletEdu />}>
          <Route path={"/educator-account"} element={<EducatorAccountMainPage />} />
        </Route>
        <Route element={<PrivateOutlet />}>
          <Route path="/enroll" element={<CheckoutForm />} />
        </Route>
        <Route element={<PrivateOutlet />}>
          <Route path="/enrollment-complete" element={<Return />} />
        </Route>

        <Route path="*" element={<Error404 />} />
        <Route path="/educators/:name" element={<EducatorProfiles />} />
      </Routes>
      {(location.pathname !== "/educator-account") && (location.pathname !== "/create-course") ? <Footer /> : ""}
    </div>
  );
};


export default Router;
