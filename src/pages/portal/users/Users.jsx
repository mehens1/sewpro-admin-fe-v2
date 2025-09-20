import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReusableTable from "../../../components/ReusableTable";
import { getUsersService, createUserService } from "../../../services/userService";
import Button from "../../../components/button";
import Inputs from "../../../components/inputs";
import { showAlert } from "../../../utilities/swal";

const Users = () => {
  const { searchTerm } = useOutletContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // 🔹 Loader state for Save button

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    user_role: "",
  });

  // 🔹 Validation errors
  const [errors, setErrors] = useState({});

  // 🔹 Fetch Users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsersService();
      setUsers(data.data.users); // adjust if your API shape differs
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Validate input fields
  const validateField = (name, value) => {
    let error = "";

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.com$/i;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email ";
      }
    }

    if (name === "phone_number") {
      // Must be exactly 11 digits
      const phoneRegex = /^[0-9]{11}$/;
      if (!phoneRegex.test(value)) {
        error = "Phone number must be exactly 11 digits.";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow only numbers for phone
    if (name === "phone_number") {
      if (!/^[0-9]*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });
    validateField(name, value); // run validation instantly
  };

  // 🔹 Add New User
  const handleAddUser = async () => {
    const { email, phone_number, user_role } = formData;

    // ✅ Required fields check
    if (!email || !user_role || !phone_number) {
      return showAlert({
        type: "error",
        title: "Missing Fields",
        text: "Email, Role and Phone Number are required",
      });
    }

    // ✅ Stop submission if there are validation errors
    if (Object.values(errors).some((err) => err)) {
      return showAlert({
        type: "error",
        title: "Validation Error",
        text: "Please fix the errors before submitting.",
      });
    }

    setSaving(true); // 🔹 start loader
    try {
      await createUserService(formData);

      // 🔹 Refresh the users list immediately after adding
      await fetchUsers();

      setShowModal(false);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        user_role: "",
      });
      setErrors({}); // reset errors

      await showAlert({ type: "success", title: "User added successfully!" });
    } catch (error) {
      await showAlert({
        type: "error",
        title: "Validation Error",
        text: error.message, // backend validation (duplicate email/phone, etc.)
      });
    } finally {
      setSaving(false); // 🔹 stop loader
    }
  };

  // 🔹 Filter Users by search term
  const filteredUsers = users.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "email", header: "Email", sortable: true, style: { width: "40%" } },
    { field: "user_role", header: "Role", sortable: true, style: { width: "25%" } },
    {
      field: "phone_number",
      header: "Phone Number",
      sortable: true,
      style: {
        width: "25%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      },
    },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="w-full bg-gray-100 text-gray-700 text-center py-2 mb-4 animate-pulse rounded">
          ⏳ Please wait... Loading users data...
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 🔹 Add User Button */}
      <div className="flex justify-end px-4 mb-2">
        <Button
          variant="primary"
          className="!w-auto px-4 py-2 text-sm"
          onClick={() => setShowModal(true)}
        >
          Add User
        </Button>
      </div>

      {/* 🔹 Users Table */}
      <div>
        <h2 className="text-lg text-gray-600">Users</h2>
        <ReusableTable columns={columns} data={filteredUsers} />
      </div>

      {/* 🔹 Add User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Add User</h2>

            <Inputs
              label="First Name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <Inputs
              label="Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <Inputs
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <Inputs
              label="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
            {errors.phone_number && (
              <p className="text-red-500 text-sm">{errors.phone_number}</p>
            )}

            <Inputs
              label="User Role"
              name="user_role"
              value={formData.user_role}
              onChange={handleChange}
            />

            <div className="flex justify-end mt-4 space-x-2">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAddUser}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
