export interface LoginResponse {
  token: string;
}

export interface CourseItem {
  id: number;
  title: string;
  description: string;
  createdAt: string;
}

export interface CourseListResponse {
  totalCount: number;
  page: number;
  pageSize: number;
  items: CourseItem[];
}
