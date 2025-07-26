import { useUserStore } from "../store/user/user";
import { useEffect } from "react";

const Logout = () => {
  const signOut = useUserStore((state) => state.serverSignOut);
  useEffect(() => {
    signOut();
  }, []);
  return <div>Signin Out...</div>;
};

export default Logout;
