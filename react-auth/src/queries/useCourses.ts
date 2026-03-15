import { CourseService } from "../services/CourseService";
import type { CourseListResponse } from "../services/types";
import { useQuery } from "@tanstack/react-query";

export default function useCourses(
  sortBy: string,
  sortDirection: string,
  query?: string,
  page?: number,
  fromDate?: string,
  toDate?: string
) {
  const { data, isLoading, isFetching, refetch } = useQuery<CourseListResponse>(
    {
      queryKey: ["get-courses"],
      queryFn: async () => {
        const response = await CourseService.getCourses(
          sortBy,
          sortDirection == "ascending" ? "asc" : "desc",
          query,
          page,
          fromDate,
          toDate
        );
        return response.data;
      },
    }
  );

  return {
    page: data?.page || 1,
    pageSize: data?.pageSize || 10,
    totalCount: data?.totalCount || 0,
    courses: data?.items || [],
    isLoading: isLoading || isFetching,
    refetch,
  };
}
