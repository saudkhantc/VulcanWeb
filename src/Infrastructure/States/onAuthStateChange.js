import { useEffect, useState } from "react";
import { auth } from "../config";

const useAuthentication = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserId(user?.uid);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [user]);
  return {
    user,
    userId,
    loading,
  };
};
export default useAuthentication;
