import axios from "axios";

export const updateAddressInfo = async (data) => {
  const response = await axios.post(
    `https://trendz-backend.onrender.com/api/v1/auth/address-info`,
    data,
    {
      withCredentials: true,
    }
  );
  console.log("Address API Response:", response.data);
  return response.data;
};
