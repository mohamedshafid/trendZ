import axios from "axios";

export const updateAddressInfo = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/address-info`,
    data,
    {
      withCredentials: true,
    }
  );
  console.log("Address API Response:", response.data);
  return response.data;
};
