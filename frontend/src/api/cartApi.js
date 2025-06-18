import axios from "axios";



export const getCart = async () => {
  const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/cart`, {
    withCredentials: true,
  });
  return res.data.cart;
};

export const addToCart = async ({ productId, quantity, size }) => {
  const res = await axios.post(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/cart/add`,
    { productId, quantity, size },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const removeFromCart = async ({ productId }) => {
  console.log("removeFromCart called with productId:", productId);
  const res = await axios.delete(
    `${import.meta.env.VITE_BACKEND_BASE_URL}/cart/remove?productId=${productId}`,
    {
      withCredentials: true,
    }
  );
  console.log("removeFromCart response:", res.data);
  return res.data.cart;
};
