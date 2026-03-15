import { useQuery } from "@tanstack/react-query";
import type { RoleItem } from "../components/users/types";
import { UserService } from "../services/UserService";

export default function useRoles() {
  const { data, isLoading, isFetching, refetch } = useQuery<RoleItem[]>({
    queryKey: ["get-roles"],
    queryFn: async () => {
      const response = await UserService.getRoles();
      return response.data;
    },
  });

  return {
    roles: data || [],
    isLoading: isLoading || isFetching,
    refetch,
  };
}
