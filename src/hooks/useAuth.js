import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../store/authSlice";
import { clearUser } from "../store/userSlice";
import api from "../api/axios"
import Swal from "sweetalert2";

export const useAuth = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const logout = () => {
    dispatch(clearToken());
    dispatch(clearUser());
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    Swal.fire({
      title: "Success!",
      text: "Logged out successfully",
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return {
    token,
    logout,
  };
};
