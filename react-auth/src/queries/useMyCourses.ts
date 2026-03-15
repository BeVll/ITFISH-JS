import { CourseService } from "../services/CourseService";
import type { CourseItem } from "../services/types";
import { useQuery } from "@tanstack/react-query";

export default function useMyCourses() {
  const { data, isLoading, isFetching, refetch } = useQuery<CourseItem[]>({
    queryKey: ["get-my-courses"],
    queryFn: async () => {
      const response = await CourseService.getMyCourses();
      return response.data;
    },
  });

  return {
    courses: data || [],
    isLoading: isLoading || isFetching,
    refetch,
  };
}
