import { useMutation } from "@tanstack/react-query";
import { createStripeSession } from "../api/stripeApi";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51Rb1J5FJpHv400rwD8tbHwnWWQ5iS4c8dHpyacQvEaNatluLrxGL4GICGqg2E5UFzQUmHTPxRONx4ZXW72clprMW00uFd3SzuH"
);

export const useStripeCheckout = () => {
  return useMutation({
    mutationFn: createStripeSession,
  });
};
