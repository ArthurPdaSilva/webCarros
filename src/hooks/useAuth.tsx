import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const useAuth = () => {
  const { signed, user, loadingAuth, handleInfoUser } = useContext(AuthContext);
  return { signed, user, loadingAuth, handleInfoUser };
};

export default useAuth;
