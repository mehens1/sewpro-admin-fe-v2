import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Inputs from "../../components/inputs";
import image from "../../assets/Logo1.png";
import { showAlert } from "../../utilities/swal";
import { authService } from "../../services/authService";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/authSlice";
import { setUser } from "../../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    from_admin: true,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData); // response = response.data

      if (response.status) {
        const res = response.data;
        dispatch(setToken(res.token));
        dispatch(setUser(res.user));

        await showAlert({
          type: "success",
          title: "Login Successful",
          text: `Welcome back, ${
            res?.user?.first_name ?? res?.user?.email ?? "Admin"
          }!`,
          timer: 2000,
        });

        navigate("/");
      } else {
        await showAlert({
          type: "error",
          title: "Login Failed",
          text: response.message || "Incorrect username or password",
        });
      }
    } catch (error) {
      let message = "Something went wrong.";
      if (error.response) {
        // login-specific 401 or other errors will show here
        message = error.response.data?.message || "Invalid credentials.";
      } else if (error.request) {
        message = "Network error. Please check your connection.";
      }

      await showAlert({
        type: "error",
        title: "Login Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const message = params.get("message");
    const type = params.get("type");

    if (message) {
      showAlert({
        type: type === "logout" ? "success" : "info",
        title: type === "logout" ? "Logged Out" : "Session Expired",
        text: message,
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br primary-bg">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 overflow-hidden rounded-full shadow">
            <img
              src={image}
              alt="logo"
              className="object-contain w-full h-full"
            />
          </div>
          <marquee behavior="scroll" direction="right">
            <h2 className="mt-4 text-2xl font-bold text-center text-gray-800">
              Login to <span className="primary-text">Admin</span> Dash
              <span className="primary-text">board</span>
            </h2>
          </marquee>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Inputs
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
            autoComplete="username"
          />
          <Inputs
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            autoComplete="current-password"
          />
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
