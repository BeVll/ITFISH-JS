import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/UserService";

export default function useDeactivateUser() {
  const { mutate } = useMutation({
    mutationFn: async (userId: number) => {
      const response = await UserService.deactivateUser(userId);
      return response.data;
    },
  });

  return {
    deactivate: (userId: number) => {
      mutate(userId);
    },
  };
}
