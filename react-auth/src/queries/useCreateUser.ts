import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/UserService";
import type { CreateUserRequest } from "../components/users/types";

export default function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      const response = await UserService.createUser(
        data.username,
        data.password,
        data.roleId
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-users"] });
    },
  });

  return {
    createUser: (data: CreateUserRequest) => {
      mutate(data);
    },
  };
}
