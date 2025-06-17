import axios from "axios";

const BASE_URL = "/api/v1/cart";

export const getCart = async () => {
  const res = await axios.get(BASE_URL, { withCredentials: true });
  return res.data.cart;
};

export const addToCart = async ({ productId, quantity, size }) => {
  const res = await axios.post(
    `${BASE_URL}/add`,
    { productId, quantity, size },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const removeFromCart = async ({ productId, size }) => {
  const res = await axios.delete(`${BASE_URL}/removeFromCart`, {
    data: { productId, size },
    withCredentials: true,
  });
  return res.data.cart;
};
