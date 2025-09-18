import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ReusableTable from "../../components/ReusableTable";
import { getWaitlistService } from "../../services/waitlistService";

const WaitList = () => {
  const { searchTerm } = useOutletContext(); // 🔹 Get search value from Topbar
  const [waitlist, setWaitlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getWaitlistService();
        setWaitlist(data.data.data);
      } catch (err) {
        console.error("Failed to fetch waitlist:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🔹 Filter based on Topbar search
  const filteredWaitlist = waitlist.filter(
    (item) =>
      item.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.phone_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { field: "full_name", header: "Name", sortable: true, style: { width: "25%" } },
    { field: "email", header: "Email", sortable: true, style: { width: "40%" } },
    { field: "phone_number", header: "Phone Number", sortable: true, style: { width: "25%" } },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <div className="w-full bg-gray-100 text-gray-700 text-center py-2 mb-4 animate-pulse rounded">
          ⏳ Please wait... Loading waitlist data...
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg my-text">Waitlist</h2>
      <ReusableTable columns={columns} data={filteredWaitlist} />
    </div>
  );
};

export default WaitList;
