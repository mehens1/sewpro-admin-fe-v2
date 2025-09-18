// Profile.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../utilities/swal";
import Button from "../../components/button";
import Inputs from "../../components/inputs";
import Textarea from "../../components/textArea";
import { updateCurrentUser, changePassword } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirmPassword, setNewConfirmPassword] = useState("");

  const fill = () => {
    setFirstname(user?.detail?.first_name ?? "");
    setLastname(user?.detail?.last_name ?? "");
    setAddress(user?.detail?.residential_address ?? "");
    setGender(user?.detail?.gender ?? "");
    setBio(user?.detail?.bio ?? "");
    setEmail(user?.email ?? "");
    setPhonenumber(user?.phone_number ?? "");
    setAvatarPreview(user?.detail?.profile_picture ?? "");
  };

  useEffect(() => {
    fill();
  }, []);

  const handleUploadClick = () => fileInputRef.current.click();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("first_name", firstname);
      formData.append("last_name", lastname);
      formData.append("phone_number", phonenumber);
      formData.append("gender", gender);
      formData.append("residential_address", address);
      formData.append("bio", bio);
      if (avatar) {
        formData.append("profile_picture", avatar);
      }

      const updatedUser = await updateCurrentUser(formData);

      let profilePictureUrl = updatedUser.data.user.profile_picture || "";

      dispatch(
        setUser({
          ...updatedUser.data.user,
          profile_picture: profilePictureUrl,
        })
      );

      setAvatarPreview(profilePictureUrl);

      await showAlert({
        type: "success",
        title: "Profile updated!",
        timer: 1500,
      });
    } catch (error) {
      console.error("Failed to update profile:", error);
      await showAlert({
        type: "error",
        title: "Failed to update profile",
      });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Change password handler
const handleChangePassword = async () => {
  // frontend validation before hitting API
  if (newPassword.length < 8) {
    return showAlert({
      type: "error",
      title: "Password must be at least 8 characters.",
    });
  }

  if (newPassword !== newConfirmPassword) {
    return showAlert({
      type: "error",
      title: "Passwords do not match!",
    });
  }

  try {
    setLoading(true);

    await changePassword({
      current_password: currentPassword,
      new_password: newPassword,
      new_password_confirmation: newConfirmPassword,
    });

    await showAlert({
      type: "success",
      title: "Password changed successfully!",
    });

    // Reset modal + fields
    setShowPasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setNewConfirmPassword("");
  } catch (err) {
    // `userService.changePassword` already throws clean error.message
    console.error("Password change failed:", err.message);

    await showAlert({
      type: "error",
      title: "Failed to change password",
      text: err.message,
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex items-center justify-center secondary-bg">
      <div className="p-[2px] bg-gradient-to-r from-[#71AA37] to-red-600 rounded-xl shadow-2xl w-full max-w-lg">
        <div className="primary-bg-white rounded-lg p-4 max-h-[90vh] overflow-y-auto ">
          <h2 className="text-xl font-bold mb-6 text-center primary-text">
            Update Profile
          </h2>

          {/* Profile Avatar */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#71AA37] mb-3 shadow-md">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full primary-text">
                  No Image
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              name="profile_picture"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
            />
            <Button variant="secondary" onClick={handleUploadClick}>
              Upload Picture
            </Button>
          </div>

          {/* Profile Form */}
          <Inputs
            label="First Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Inputs
            label="Last Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <Inputs
            label="Phone Number"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <Inputs label="Email" value={email} disabled />

          <div className="mb-4">
            <label className="block text-sm font-medium primary-text mb-1">
              Gender
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <Textarea
            label="Residential Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Textarea
            label="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <Button
            variant="primary"
            onClick={handleSave}
            disabled={loading}
            className="w-full mt-2 py-2 primary-bg text-white"
          >
            {loading ? "Loading..." : "Save Profile"}
          </Button>

          {/* 🔹 Change Password Link */}
          <p
            onClick={() => setShowPasswordModal(true)}
            className="mt-4 text-sm primary-text font-bold cursor-pointer hover:underline text-center"
          >
            Change Password
          </p>
        </div>
      </div>

      {/* 🔹 Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            <Inputs
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Inputs
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Inputs
              label="Confirm Password"
              type="password"
              value={newConfirmPassword}
              onChange={(e) => setNewConfirmPassword(e.target.value)}
            />

            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleChangePassword}
                disabled={loading}
              >
                {loading ? "Changing..." : "Change"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
