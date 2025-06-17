import { useMutation } from "@tanstack/react-query";
import { createStripeSession } from "../api/stripeApi";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const useStripeCheckout = () => {
  return useMutation({
    mutationFn: createStripeSession,
  });
};
