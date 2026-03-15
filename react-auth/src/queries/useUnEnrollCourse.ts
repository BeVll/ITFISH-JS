import { CourseService } from "../services/CourseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUnEnrollCourse() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await CourseService.unenroll(courseId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-courses", "get-my-courses"],
      });
    },
  });

  return {
    unenroll: (courseId: number) => {
      mutate(courseId);
    },
  };
}
