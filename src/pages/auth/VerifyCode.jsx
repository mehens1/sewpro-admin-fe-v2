import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../components/button";
import Inputs from "../../components/inputs";
import image from "../../assets/Logo1.png";
import { showAlert } from "../../utilities/swal";
import { authService } from "../../services/authService";

const VerifyCode = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract email from query params
  const params = new URLSearchParams(location.search);
  const emailFromParams = params.get("email");

  const [formData, setFormData] = useState({
    email: emailFromParams || "",
    token: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Call API to verify code
      const response = await authService.verifyCode(formData);

      // console.log("response from reset code: ", response);
      // return;
      const token = response.data.token;

      if (response.status) {
        await showAlert({
          type: "success",
          title: "Code Verified",
          text: response?.data?.message || "Verification successful!",
          timer: 3000,
        });

        navigate(`/set-new-password?token=${encodeURIComponent(token)}`);
      } else {
        await showAlert({
          type: "error",
          title: "Verification Failed",
          text: response.message || "Invalid verification code.",
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
        title: "Verification Failed",
        text: message,
      });

      console.log("response.message: ", message);

      if (message == "No reset request found for this email.") {
        navigate(-1);
      }
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
            Verify Code
          </h2>
          <p className="text-center text-gray-500">
            Enter the verification code we sent to your email{" "}
            <span className="font-bold">{formData.email}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Inputs
            label="Verification Code"
            type="number"
            name="token"
            value={formData.token}
            onChange={handleChange}
            placeholder="Enter your code"
            required
          />

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <p
          className="mt-10 font-bold text-center cursor-pointer primary-text"
          onClick={() => navigate(-2)}
        >
          Return to Log in
        </p>
      </div>
    </div>
  );
};

export default VerifyCode;
