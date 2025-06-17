// src/hooks/useCart.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as cartApi from "../api/cartApi";

export const useCart = (options = {}) => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: cartApi.getCart,
    ...options,
  });
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartApi.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cartApi.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });
};
