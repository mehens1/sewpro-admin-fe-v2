import { apiV1 } from "../api/axios";

// Get all users (admin use-case maybe)
export const getUsersService = async () => {
  try {
    const response = await apiV1.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUserService = async (formData) => {
  try {
    const response = await apiV1.post("/users", formData);
    return response.data;
  } catch (error) {
    let message = "Adding user failed.";

    if (error.response) {
      const res = error.response.data;

      // 🔹 Validation errors (422)
      if (error.response.status === 422 && res.errors) {
        const errorMessages = Object.values(res.errors).flat();
        message = errorMessages.join("\n");
      }
      // 🔹 Handle backend 500 with SQL error inside res.errors.error
      else if (error.response.status === 500 && res.errors?.error) {
        const backendError = res.errors.error.toLowerCase();

        if (backendError.includes("users_email_unique")) {
          message = "Email already exists.";
        } else if (backendError.includes("users_phone_number_unique")) {
          message = "Phone number already exists.";
        } else if (backendError.includes("duplicate entry")) {
          message = "Duplicate entry detected.";
        } else {
          message = res.errors.error; // fallback to raw SQL error
        }
      }
      // 🔹 Generic backend error
      else {
        message = res.message || "Request failed.";
      }
    } else if (error.request) {
      message = "Network error. Please check your connection.";
    } else {
      message = error.message;
    }

    throw new Error(message);
  }
};


export const updateCurrentUser = async (formData) => {
  try {
    const response = await apiV1.post("/user/me", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};

export const changePassword = async (data) => {
  try {
    const response = await apiV1.post("/user/password/change", data);
    return response.data;
  } catch (error) {
    let message = "Something went wrong.";

    if (error.response) {
      const res = error.response.data;

      // Validation errors (422)
      if (error.response.status === 422 && res.errors) {
        const errorMessages = Object.values(res.errors).flat();
        message = errorMessages.join("\n");
      }
      // Wrong old password (400 or 401 depending on backend)
      else if (error.response.status === 400 || error.response.status === 401) {
        message = res.message || "Old password is incorrect.";
      } else {
        message = res.message || "Request failed.";
      }
    } else if (error.request) {
      // No response from server (network down or CORS issue)
      message = "Network error. Please check your connection.";
    } else {
      // Other unexpected error
      message = error.message;
    }

    console.error("Error changing password:", message);
    throw new Error(message);
  }
};
