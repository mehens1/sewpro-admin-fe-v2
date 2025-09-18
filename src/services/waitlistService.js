import { baseUrl } from "../api/axios";


export const getWaitlistService = async () => {
  const response = await baseUrl.get("/waitlist");
  return response.data;
};

export const addToWaitlist = async (data) => {
  const response = await baseUrl.post("/waitlist", data);
  return response.data;
};
