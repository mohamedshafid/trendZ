import axios from "axios";

const backend="http://localhost:3000" ;




export const createStripeSession = async ({cartItems}) => {
  console.log("Creating Stripe Session with Cart Items:", cartItems);
  const response = await axios.post(
    `${backend}/api/v1/stripe/create-checkout-session`,
    {
      cartItems,
    }
  );
  console.log("Stripe Session Response:", response.data);
  return response.data;
};
