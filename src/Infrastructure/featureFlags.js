import React, { useEffect, useState } from "react";
import useAuthentication from "./States/onAuthStateChange";
import { useSelector } from "react-redux";

export const FeatureFlags = React.createContext({});

export const FeatureFlagsProvider = ({ children }) => {
  const { user } = useAuthentication()
  const [features, setFeatures] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const userData = useSelector((state) => state.userData.data);
  useEffect(() => {
    const emailVerifiedValue = user?.emailVerified;
    const approved = userData?.educator?.approved;
    if (process.env.NODE_ENV === "production") {
      setFeatures({});
    } else {
      setFeatures({
        showCourses: false,
        approved: approved,
        emailVerified: emailVerifiedValue
      });
    }
    setIsLoading(false);
  }, [user, userData]);
  return (
    <FeatureFlags.Provider value={{ features, setFeatures }}>
      {isLoading ? "Loading..." : children}
    </FeatureFlags.Provider>
  );
};
