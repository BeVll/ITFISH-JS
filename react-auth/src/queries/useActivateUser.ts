import { useMutation } from "@tanstack/react-query";
import { UserService } from "../services/UserService";

export default function useActivateUser() {
  const { mutate } = useMutation({
    mutationFn: async (userId: number) => {
      const response = await UserService.activateUser(userId);
      return response.data;
    },
  });

  return {
    activate: (userId: number) => {
      mutate(userId);
    },
  };
}
