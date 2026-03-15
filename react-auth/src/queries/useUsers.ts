import { useQuery } from "@tanstack/react-query";
import type { UserItem } from "../components/users/types";
import { UserService } from "../services/UserService";

export default function useUsers() {
  const { data, isLoading, isFetching, refetch } = useQuery<UserItem[]>({
    queryKey: ["get-users"],
    queryFn: async () => {
      const response = await UserService.getUsers();
      return response.data;
    },
  });

  return {
    users: data || [],
    isLoading: isLoading || isFetching,
    refetch,
  };
}
