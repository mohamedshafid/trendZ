import axios from "axios";

const backend=import.meta.env.VITE_BACKEND_URL ;


export const getCart = async () => {
  const res = await axios.get(`${backend}/api/v1/cart`, {
    withCredentials: true,
  });
  return res.data.cart;
};

export const addToCart = async ({ productId, quantity, size }) => {
  const res = await axios.post(
    `${backend}/api/v1/cart/add`,
    { productId, quantity, size },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const removeFromCart = async ({ productId }) => {
  console.log("removeFromCart called with productId:", productId);
  const res = await axios.delete(
    `${backend}/api/v1/cart/remove?productId=${productId}`,
    {
      withCredentials: true,
    }
  );
  console.log("removeFromCart response:", res.data);
  return res.data.cart;
};
