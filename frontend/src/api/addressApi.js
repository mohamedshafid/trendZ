import axios from "axios";

const backend="http://localhost:3000" ;

export const updateAddressInfo = async (data) => {
  const response = await axios.post(
    `${backend}/api/v1/auth/address-info`,
    data,
    {
      withCredentials: true,
    }
  );
  console.log("Address API Response:", response.data);
  return response.data;
};
