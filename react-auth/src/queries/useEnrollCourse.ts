import { CourseService } from "../services/CourseService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEnrollCourse() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (courseId: number) => {
      const response = await CourseService.enroll(courseId);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-courses"] });
    },
  });

  return {
    enroll: (courseId: number) => {
      mutate(courseId);
    },
  };
}
