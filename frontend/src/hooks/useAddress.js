// src/hooks/useAddressMutation.js
import { useMutation } from "@tanstack/react-query";
import { updateAddressInfo } from "../api/addressApi";

export const useAddress = () => {
  return useMutation({
    mutationFn: updateAddressInfo,
  });
};
