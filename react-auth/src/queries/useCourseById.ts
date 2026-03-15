import { CourseService } from "../services/CourseService";
import type { CourseItem } from "../services/types";
import { useQuery } from "@tanstack/react-query";

export default function useCourseById(courseId: number) {
  const { data, isLoading, isFetching, refetch } = useQuery<CourseItem>({
    queryKey: ["get-course-by-id"],
    queryFn: async () => {
      const response = await CourseService.getCourseById(courseId);
      return response.data;
    },
  });

  return {
    course: data,
    isLoading: isLoading || isFetching,
    refetch,
  };
}
