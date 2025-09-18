import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReusableTable from "../../../components/ReusableTable";
import { getUsersService } from "../../../services/userService";
import Button from "../../../components/button";

const Users = () => {
  const { searchTerm } = useOutletContext(); // 🔹 Get search value from Topbar
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getUsersService();
      setUsers(data.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔹 Filter based on Topbar search
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
  {/* <div className="flex justify-end px-4">
  <Button variant="primary" className="px-4 py-2 text-sm">
    Add User
  </Button>
</div> */}

      <div>
        <h2 className="text-lg text-gray-600">Users</h2>
        <ReusableTable columns={columns} data={filteredUsers} />
      </div>
    </>
  );
};

export default Users;
