import { apiAuth } from "../axios";
import type {
  CreateCourseRequest,
  EditCourseRequest,
} from "../components/courses/types";
import type { CourseItem, CourseListResponse } from "./types";

export class CourseService {
  public static async getCourses(
    sortBy: string,
    sortDirection: string,
    query?: string,
    page?: number,
    fromDate?: string,
    toDate?: string
  ) {
    return await apiAuth.get<CourseListResponse>(
      `/courses?${query && `&search=${query}`}${page && `&page=${page}`}${
        fromDate ? `&fromDate=${fromDate}` : ""
      }${
        toDate ? `&toDate=${toDate}` : ""
      }&sortBy=${sortBy}&sortDirection=${sortDirection}`
    );
  }

  public static async getMyCourses() {
    return await apiAuth.get<CourseItem[]>(`/courses/my`);
  }

  public static async getCourseById(courseId: number) {
    return await apiAuth.get<CourseItem>(`/courses/${courseId}`);
  }

  public static async createCourse(data: CreateCourseRequest) {
    return await apiAuth.post("/courses", {
      title: data.title,
      description: data.description,
    });
  }

  public static async editCourse(courseId: number, data: EditCourseRequest) {
    return await apiAuth.put(`/courses/${courseId}`, {
      title: data.title,
      description: data.description,
    });
  }

  public static async deleteCourse(courseId: number) {
    return await apiAuth.delete(`courses/${courseId}`);
  }

  public static async enroll(courseId: number) {
    return await apiAuth.post(`/courses/${courseId}/enroll`);
  }
  public static async unenroll(courseId: number) {
    return await apiAuth.delete(`/courses/${courseId}/unenroll`);
  }
}
