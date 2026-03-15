import { CourseService } from "../services/CourseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteCourse() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await CourseService.deleteCourse(courseId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-courses"] });
    },
  });

  return {
    delete: (courseId: number) => {
      mutate(courseId);
    },
  };
}
