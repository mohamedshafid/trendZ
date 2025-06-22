import axios from "axios";



export const getCart = async () => {
  const res = await axios.get(
    `https://trendz-backend.onrender.com/api/v1/cart`,
    {
      withCredentials: true,
    }
  );
  return res.data.cart;
};

export const addToCart = async ({ productId, quantity, size }) => {
  const res = await axios.post(
    `https://trendz-backend.onrender.com/api/v1/cart/add`,
    { productId, quantity, size },
    { withCredentials: true }
  );
  return res.data.cart;
};

export const removeFromCart = async ({ productId }) => {
  console.log("removeFromCart called with productId:", productId);
  const res = await axios.delete(
    `https://trendz-backend.onrender.com/api/v1/cart/remove?productId=${productId}`,
    {
      withCredentials: true,
    }
  );
  console.log("removeFromCart response:", res.data);
  return res.data.cart;
};
