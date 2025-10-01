import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/button";
import Inputs from "../../components/inputs";
import image from "../../assets/Logo1.png";
import { showAlert } from "../../utilities/swal";
import { authService } from "../../services/authService";

const SetNewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from query params
  const params = new URLSearchParams(location.search);
  const tokenFromParams = params.get("token");

  const [formData, setFormData] = useState({
    token: tokenFromParams || "",
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      await showAlert({
        type: "error",
        title: "Password Mismatch",
        text: "New password and confirm password must match.",
      });
      return;
    }

    setLoading(true);

    try {
      // Call API to set new password
      const response = await authService.setNewPassword(formData);

      if (response.status) {
        await showAlert({
          type: "success",
          title: "Password Reset Successful",
          text:
            response?.data?.message ||
            "You can now log in with your new password.",
          timer: 3000,
        });

        // Redirect to login after success
        navigate("/login");
      } else {
        await showAlert({
          type: "error",
          title: "Reset Failed",
          text: response.message || "Could not reset password.",
        });
      }
    } catch (error) {
      let message = "Something went wrong.";
      if (error.response) {
        message = error.response.data?.message || "Invalid request.";
      } else if (error.request) {
        message = "Network error. Please check your connection.";
      }

      await showAlert({
        type: "error",
        title: "Reset Failed",
        text: message,
      });
    } finally {
      setLoading(false);
    }
  };

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
          <h2 className="mt-4 text-2xl font-bold text-center primary-text">
            Set New Password
          </h2>
          <p className="text-center text-gray-500">
            Enter your new password for{" "}
            <span className="font-bold">{formData.email}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Inputs
            label="New Password"
            type="password"
            name="new_password"
            value={formData.new_password}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />

          <Inputs
            label="Confirm New Password"
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
          />

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Resetting..." : "Set Password"}
          </Button>
        </form>

        <p
          className="mt-10 font-bold text-center cursor-pointer primary-text"
          onClick={() => navigate(-3)}
        >
          Return to Log in
        </p>
      </div>
    </div>
  );
};

export default SetNewPassword;
