import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Inputs from "../../components/inputs";
import image from "../../assets/Logo1.png";
import { showAlert } from "../../utilities/swal";
import { authService } from "../../services/authService";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.resetPassword(formData);

      if (response.status) {
        await showAlert({
          type: "success",
          title: "Reset Link Sent",
          text:
            response?.data?.message || "Check your email for the reset link.",
          timer: 3000,
        });

        // Redirect to verify-code page with email param
        navigate(`/verify-code?email=${encodeURIComponent(formData.email)}`);
      } else {
        await showAlert({
          type: "error",
          title: "Reset Failed",
          text: response.message || "Could not send reset email.",
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
          <h2 className="mt-4 text-2xl font-bold text-center primary-text">
            Reset Password
          </h2>
          <p className="text-center text-gray-500">
            Enter your registered email address so we can send you a
            verification code to reset your password
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Inputs
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Registered Email Address"
            required
            autoComplete="email"
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            aria-label="Submit email to reset password"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>

        <p
          className="mt-10 font-bold text-center cursor-pointer primary-text"
          onClick={() => navigate("/login")}
        >
          Return to Log in
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
